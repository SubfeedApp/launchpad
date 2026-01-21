import type { Source, ToolCall } from "@/types/research-ai";

/**
 * Transform Subfeed API response to UI-friendly format
 */
export function parseSearchResults(raw: any): Source[] {
  if (!raw?.data?.results) return [];

  return raw.data.results.map((r: any, i: number) => ({
    index: i + 1,
    title: r.title,
    url: r.url,
    snippet: r.snippet,
    favicon: getFavicon(r.url),
  }));
}

export function getFavicon(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return "";
  }
}

export function createToolCall(tool: ToolCall["tool"]): ToolCall {
  return {
    id: crypto.randomUUID(),
    tool,
    status: "running",
  };
}
