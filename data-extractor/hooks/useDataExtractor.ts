"use client";

import { useState, useCallback } from "react";
import type { ExtractResult, ExtractFormat, ToolStatus } from "@/types/extractor";

export function useDataExtractor() {
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [status, setStatus] = useState<ToolStatus>({ step: "idle" });
  const [format, setFormat] = useState<ExtractFormat>("markdown");
  const [history, setHistory] = useState<ExtractResult[]>([]);

  const extract = useCallback(async (url: string, extractFormat?: ExtractFormat) => {
    const useFormat = extractFormat || format;
    setStatus({ step: "extracting" });
    setResult(null);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, format: useFormat }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to extract");
      }

      const extractResult: ExtractResult = {
        url: data.url,
        title: data.title,
        content: data.content,
        format: useFormat,
        metadata: data.metadata,
      };

      setResult(extractResult);
      setHistory((prev) => [extractResult, ...prev.slice(0, 9)]);
      setStatus({ step: "done" });

      setTimeout(() => setStatus({ step: "idle" }), 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setStatus({ step: "error", message });
    }
  }, [format]);

  const clear = useCallback(() => {
    setResult(null);
    setStatus({ step: "idle" });
  }, []);

  return {
    result,
    status,
    format,
    setFormat,
    history,
    isLoading: status.step === "extracting",
    extract,
    clear,
  };
}
