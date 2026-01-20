export interface ScrapeResult {
  url: string;
  title: string;
  content: string;
  summary?: string;
}

export interface ToolStatus {
  step: "idle" | "scraping" | "summarizing" | "done" | "error";
  message?: string;
}
