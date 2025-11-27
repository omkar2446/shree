import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    media_url: string | null;
    media_type: string | null;
    created_at: string;
    profiles: {
      name: string;
      avatar_url: string | null;
    };
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(post.profiles.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{post.profiles.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <p className="text-sm whitespace-pre-wrap">{post.content}</p>
        {post.media_url && (
          <div className="rounded-lg overflow-hidden bg-muted">
            {post.media_type === "video" ? (
              <video
                src={post.media_url}
                controls
                className="w-full max-h-96 object-contain"
              />
            ) : (
              <img
                src={post.media_url}
                alt="Post media"
                className="w-full max-h-96 object-contain"
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
