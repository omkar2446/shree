import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    media_url: string | null;
    media_type: string | null;
    created_at: string;
    profiles:
      | {
          full_name: string | null;
          avatar_url: string | null;
        }
      | {
          full_name: string | null;
          avatar_url: string | null;
        }[]
      | null;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  // Handle profiles being either array or single object
  const profile = Array.isArray(post.profiles)
    ? post.profiles[0]
    : post.profiles;

  // Use full_name instead of name
  const userName = profile?.full_name || "Anonymous";
  const avatarUrl = profile?.avatar_url;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          )}

          <div>
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">{post.content}</p>

        {post.media_url && (
          <div className="rounded-lg overflow-hidden bg-muted">
            {post.media_type === "video" ? (
              <video src={post.media_url} controls className="w-full max-h-96" />
            ) : (
              <img
                src={post.media_url}
                alt="Post media"
                className="w-full max-h-96 object-cover"
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
 