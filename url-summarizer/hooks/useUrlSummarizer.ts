"use client";

import { useState, useCallback } from "react";
import type { ScrapeResult, ToolStatus } from "@/types/summarizer";

export function useUrlSummarizer() {
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [status, setStatus] = useState<ToolStatus>({ step: "idle" });
  const [history, setHistory] = useState<ScrapeResult[]>([]);

  const summarize = useCallback(async (url: string) => {
    setStatus({ step: "scraping" });
    setResult(null);

    try {
      // Call our API route
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to summarize");
      }

      // Update to summarizing step
      setStatus({ step: "summarizing" });

      // Small delay to show the step
      await new Promise((r) => setTimeout(r, 500));

      const scrapeResult: ScrapeResult = {
        url: data.url,
        title: data.title,
        content: data.content,
        summary: data.summary,
      };

      setResult(scrapeResult);
      setHistory((prev) => [scrapeResult, ...prev.slice(0, 9)]);
      setStatus({ step: "done" });

      // Reset status after delay
      setTimeout(() => setStatus({ step: "idle" }), 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setStatus({ step: "error", message });
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setStatus({ step: "idle" });
  }, []);

  return {
    result,
    status,
    history,
    isLoading: status.step === "scraping" || status.step === "summarizing",
    summarize,
    clear,
  };
}
