import type { Platform, PlatformConfig } from "@/types/social";

export const PLATFORMS: PlatformConfig[] = [
  {
    id: "x",
    name: "X / Twitter",
    icon: "𝕏",
    maxLength: 280,
    description: "Punchy, viral, line breaks for impact",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "in",
    maxLength: 3000,
    description: "Professional, value-driven, hook + CTA",
  },
  {
    id: "threads",
    name: "Threads",
    icon: "@",
    maxLength: 500,
    description: "Conversational, authentic, relatable",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    maxLength: 63206,
    description: "Friendly, community-focused, engaging",
  },
];

export const PLATFORM_PROMPTS: Record<Platform, string> = {
  x: "Write a viral X/Twitter post. Max 280 characters. Punchy, engaging, use line breaks for impact. No hashtags unless essential.",
  linkedin: "Write a professional LinkedIn post. 150-300 words. Hook in first line, provide value, end with question or CTA. Use line breaks for readability.",
  threads: "Write a Threads post. Conversational, authentic, 500 characters max. Feel like talking to a friend.",
  facebook: "Write a Facebook post. Friendly, relatable, 100-250 words. Encourage engagement and comments.",
};

export function getPlatformConfig(platform: Platform): PlatformConfig {
  return PLATFORMS.find((p) => p.id === platform) || PLATFORMS[0];
}

export function getCharacterCount(content: string): number {
  return content.length;
}
