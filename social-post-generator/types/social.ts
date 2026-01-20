export type Platform = "x" | "linkedin" | "threads" | "facebook";

export interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
  maxLength: number;
  description: string;
}

export interface GeneratedPost {
  platform: Platform;
  content: string;
  characterCount: number;
}

export interface GenerateResult {
  topic: string;
  posts: Record<Platform, string>;
  timestamp: string;
}
