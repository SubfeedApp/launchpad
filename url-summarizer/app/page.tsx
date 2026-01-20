"use client";

import { FileText, History, Sparkles } from "lucide-react";
import { useUrlSummarizer } from "@/hooks/useUrlSummarizer";
import { UrlInput, SummaryCard, ToolStatus } from "@/components/summarizer";
import { Disclaimer } from "@/components/chat";

export default function UrlSummarizerPage() {
  const { result, status, history, isLoading, summarize, clear } = useUrlSummarizer();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <button onClick={clear} className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <span className="font-semibold">URL Summarizer</span>
        </button>
        {result && (
          <button
            onClick={clear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            New URL
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!result ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-57px)] px-4 py-8">
            <FileText className="size-12 text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Summarize any URL instantly
            </h1>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Paste a link to any article, blog post, or documentation. AI will read and summarize it for you.
            </p>

            <div className="w-full max-w-xl space-y-4">
              <UrlInput onSubmit={summarize} isLoading={isLoading} />

              {status.step !== "idle" && <ToolStatus status={status} />}

              <Disclaimer text="AI-generated summary. Verify important information." />

              {/* History */}
              {history.length > 0 && !isLoading && (
                <div className="pt-6 border-t mt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <History className="size-4" />
                    <span>Recent</span>
                  </div>
                  <div className="space-y-2">
                    {history.slice(0, 5).map((item, i) => (
                      <button
                        key={i}
                        onClick={() => summarize(item.url)}
                        className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Result */
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {status.step !== "idle" && status.step !== "done" && (
              <ToolStatus status={status} />
            )}

            <SummaryCard result={result} />

            {/* Summarize Another */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Summarize another URL:</p>
              <UrlInput onSubmit={summarize} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
