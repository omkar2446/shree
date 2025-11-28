import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { compressVideo } from "@/utils/compressVideo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Image, Video, X } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  // NEW STATES (Required for compression)
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  // 📌 FILE HANDLER (Image + Video + Compression)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let finalFile = file;

    // ✔ VIDEO → COMPRESS TO < 9MB
    if (file.type.startsWith("video/")) {
      setIsCompressing(true);
      finalFile = await compressVideo(file); // compress function
      setIsCompressing(false);
      setMediaType("video");
    }

    // ✔ IMAGE
    else if (file.type.startsWith("image/")) {
      setMediaType("image");
    }

    // ❌ Not allowed
    else {
      toast.error("Only image or video allowed");
      return;
    }

    // Save final compressed file
    setMediaFile(finalFile);

    // Create preview
    setPreview(URL.createObjectURL(finalFile));
  };

  // 📌 CLEAR FILE
  const clearFile = () => {
    setMediaFile(null);
    setPreview(null);
    setMediaType(null);
  };

  // 📌 FORM SUBMIT → Upload to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !mediaFile) {
      toast.error("Please add some content or media");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      let mediaUrl = null;
      let media_type = null;

      // 📌 Upload media if exists
      if (mediaFile) {
        const fileExt = mediaFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        // Upload compressed or normal file
        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(fileName, mediaFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("media").getPublicUrl(fileName);

        mediaUrl = publicUrl;
        media_type = mediaType;
      }

      // 📌 Insert into posts table
      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        content: content.trim(),
        media_url: mediaUrl,
        media_type: media_type,
      });

      if (error) throw error;

      toast.success("Post created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to create post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Create a new post</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* CONTENT */}
              <div className="space-y-2">
                <Label htmlFor="content">What's on your mind?</Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* MEDIA PREVIEW */}
              {preview && (
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  {mediaType === "video" ? (
                    <video src={preview} controls className="w-full max-h-96" />
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-96 object-contain"
                    />
                  )}

                  {/* REMOVE BUTTON */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={clearFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* COMPRESSION LOADER */}
              {isCompressing && (
                <p className="text-sm text-muted-foreground">
                  Compressing video… please wait
                </p>
              )}

              {/* UPLOAD BUTTONS */}
              <div className="flex flex-wrap gap-2">
                {/* IMAGE */}
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent transition-colors">
                    <Image className="h-4 w-4" />
                    <span className="text-sm">Add Photo</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>

                {/* VIDEO */}
                <Label htmlFor="video-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent transition-colors">
                    <Video className="h-4 w-4" />
                    <span className="text-sm">Add Video</span>
                  </div>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>
              </div>

              {/* SUBMIT */}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating post...
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreatePost;
