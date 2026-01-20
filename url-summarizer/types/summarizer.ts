export interface ScrapeResult {
  url: string;
  title: string;
  content: string;
}

export interface SummaryResult {
  url: string;
  title: string;
  content: string;
  summary: string;
}

export type SummarizerStatus = "idle" | "scraping" | "summarizing" | "done" | "error";
