"use client";

import { PostCard } from "./PostCard";
import type { Platform } from "@/types/social";

interface PostGridProps {
  posts: Partial<Record<Platform, string>>;
  onRegenerate?: (platform: Platform) => void;
  regeneratingPlatform?: Platform | null;
}

export function PostGrid({
  posts,
  onRegenerate,
  regeneratingPlatform,
}: PostGridProps) {
  const platforms = Object.keys(posts) as Platform[];

  if (platforms.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        Generated posts will appear here
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {platforms.map((platform) => (
        <PostCard
          key={platform}
          platform={platform}
          content={posts[platform] || ""}
          onRegenerate={onRegenerate ? () => onRegenerate(platform) : undefined}
          isRegenerating={regeneratingPlatform === platform}
        />
      ))}
    </div>
  );
}
