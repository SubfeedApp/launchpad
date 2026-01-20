"use client";

import { CheckCircleIcon, CircleIcon, Loader2Icon, XCircleIcon } from "lucide-react";
import type { SummarizerStatus } from "@/types/summarizer";
import { cn } from "@/lib/utils";

interface ToolStatusProps {
  status: SummarizerStatus;
  error?: string;
}

const statusConfig: Record<
  SummarizerStatus,
  { scrape: "pending" | "active" | "done"; summarize: "pending" | "active" | "done" }
> = {
  idle: { scrape: "pending", summarize: "pending" },
  scraping: { scrape: "active", summarize: "pending" },
  summarizing: { scrape: "done", summarize: "active" },
  done: { scrape: "done", summarize: "done" },
  error: { scrape: "pending", summarize: "pending" },
};

function StepIcon({ state }: { state: "pending" | "active" | "done" }) {
  if (state === "done") {
    return <CheckCircleIcon className="size-4 text-green-500" />;
  }
  if (state === "active") {
    return <Loader2Icon className="size-4 animate-spin text-primary" />;
  }
  return <CircleIcon className="size-4 text-muted-foreground" />;
}

export function ToolStatus({ status, error }: ToolStatusProps) {
  if (status === "idle") return null;

  const config = statusConfig[status];

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
        <XCircleIcon className="size-4" />
        {error || "An error occurred"}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 rounded-lg border bg-muted/50 p-3 text-sm">
      <div className="flex items-center gap-2">
        <StepIcon state={config.scrape} />
        <span className={cn(config.scrape === "active" && "font-medium")}>
          Scraping URL
        </span>
      </div>
      <div className="flex items-center gap-2">
        <StepIcon state={config.summarize} />
        <span className={cn(config.summarize === "active" && "font-medium")}>
          Generating summary
        </span>
      </div>
    </div>
  );
}
