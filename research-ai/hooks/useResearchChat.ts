"use client";

import { useState, useCallback } from "react";
import type { Source, ToolCall, SearchResult } from "@/types/research-ai";
import { createToolCall } from "@/lib/research-ai";

export function useResearchChat() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [toolStatus, setToolStatus] = useState<ToolCall | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    const toolCall = createToolCall("web_search");
    setToolStatus(toolCall);
    setIsLoading(true);
    setError(null);
    setResult({ query, answer: "", sources: [] });

    try {
      const startTime = Date.now();
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const duration = Date.now() - startTime;

      if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setToolStatus({ ...toolCall, status: "completed", duration });
      setResult({
        query,
        answer: data.answer,
        sources: data.sources,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setToolStatus({ ...toolCall, status: "error" });
      setError(errorMessage);
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setToolStatus(null), 5000);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setToolStatus(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    result,
    sources: result?.sources || [],
    toolStatus,
    isLoading,
    error,
    search,
    clear,
    clearError,
  };
}
