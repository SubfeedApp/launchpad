"use client";

import { useState, useCallback } from "react";
import type { Platform, GenerateResult } from "@/types/social";

export function useSocialGenerator() {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingPlatform, setRegeneratingPlatform] = useState<Platform | null>(null);

  const generate = useCallback(async (topic: string, platforms: Platform[]) => {
    if (!topic.trim() || platforms.length === 0) return;

    setIsLoading(true);
    setResult({ topic, posts: {} as Record<Platform, string>, timestamp: "" });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platforms }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setResult({
        topic,
        posts: data.posts,
        timestamp: data.timestamp,
      });
    } catch (error) {
      console.error("Generate error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const regenerate = useCallback(async (platform: Platform) => {
    if (!result?.topic) return;

    setRegeneratingPlatform(platform);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: result.topic, platforms: [platform] }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setResult((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          posts: { ...prev.posts, [platform]: data.posts[platform] },
        };
      });
    } catch (error) {
      console.error("Regenerate error:", error);
    } finally {
      setRegeneratingPlatform(null);
    }
  }, [result?.topic]);

  const clear = useCallback(() => {
    setResult(null);
  }, []);

  return {
    result,
    posts: result?.posts || {},
    isLoading,
    regeneratingPlatform,
    generate,
    regenerate,
    clear,
  };
}
