"use client";

import { useState, useCallback } from "react";
import type { SummaryResult, SummarizerStatus } from "@/types/summarizer";

export function useUrlSummarizer() {
  const [status, setStatus] = useState<SummarizerStatus>("idle");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const summarize = useCallback(async (url: string) => {
    setStatus("scraping");
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed: ${res.status}`);
      }

      setStatus("summarizing");

      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return {
    status,
    result,
    error,
    summarize,
    reset,
    isLoading: status === "scraping" || status === "summarizing",
  };
}
