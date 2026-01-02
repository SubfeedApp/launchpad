export interface Source {
  index: number;
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
}

export interface ToolCall {
  id: string;
  tool: "web_search" | "web_extract" | "web_map";
  status: "pending" | "running" | "completed" | "error";
  duration?: number;
}

export interface SearchResult {
  query: string;
  answer: string;
  sources: Source[];
}

export interface SearchResponse {
  success: boolean;
  data?: {
    answer?: string;
    results: Array<{
      title: string;
      url: string;
      snippet: string;
    }>;
  };
  duration_ms: number;
  usage?: {
    actions_used: number;
    actions_limit: number;
  };
}
