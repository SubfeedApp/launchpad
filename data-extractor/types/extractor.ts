export type ExtractFormat = "markdown" | "text" | "html";

export interface ExtractResult {
  url: string;
  title: string;
  content: string;
  format: ExtractFormat;
  metadata?: {
    description?: string;
    language?: string;
    sourceURL?: string;
    [key: string]: any;
  };
}

export interface ToolStatus {
  step: "idle" | "extracting" | "done" | "error";
  message?: string;
}
