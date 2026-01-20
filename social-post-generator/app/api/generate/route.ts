import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/subfeed";
import { PLATFORM_PROMPTS } from "@/lib/social";
import type { Platform } from "@/types/social";

export async function POST(req: NextRequest) {
  try {
    const { topic, platforms } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "topic is required" }, { status: 400 });
    }

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: "platforms is required (array of: x, linkedin, threads, facebook)" },
        { status: 400 }
      );
    }

    const validPlatforms = platforms.filter(
      (p): p is Platform => p in PLATFORM_PROMPTS
    );

    if (validPlatforms.length === 0) {
      return NextResponse.json(
        { error: "No valid platforms provided" },
        { status: 400 }
      );
    }

    const posts: Partial<Record<Platform, string>> = {};

    // Generate for each platform in parallel for better performance
    const results = await Promise.all(
      validPlatforms.map(async (platform) => {
        const response = await generate(topic, PLATFORM_PROMPTS[platform]);
        return { platform, content: response.data?.response || "" };
      })
    );

    for (const { platform, content } of results) {
      posts[platform] = content;
    }

    return NextResponse.json({
      topic,
      posts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
