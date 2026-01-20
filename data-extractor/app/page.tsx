"use client";

import { FileCode, History, Database } from "lucide-react";
import { useDataExtractor } from "@/hooks/useDataExtractor";
import { UrlInput, FormatSelector, ExtractCard, ToolStatus } from "@/components/extractor";

export default function DataExtractorPage() {
  const { result, status, format, setFormat, history, isLoading, extract, clear } =
    useDataExtractor();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <button onClick={clear} className="flex items-center gap-2">
          <Database className="size-5 text-primary" />
          <span className="font-semibold">Data Extractor</span>
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
            <FileCode className="size-12 text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Extract content from any URL
            </h1>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Get clean, structured content from any webpage in Markdown, plain text, or HTML format.
            </p>

            <div className="w-full max-w-xl space-y-4">
              <FormatSelector
                selected={format}
                onChange={setFormat}
                disabled={isLoading}
              />

              <UrlInput onSubmit={(url) => extract(url)} isLoading={isLoading} />

              {status.step !== "idle" && <ToolStatus status={status} />}

              <p className="text-xs text-center text-muted-foreground">
                Content extracted from source. Respect copyright.
              </p>

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
                        onClick={() => extract(item.url, item.format)}
                        className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <p className="text-sm font-medium truncate">{item.title || item.url}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.url} • {item.format}
                        </p>
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

            <ExtractCard result={result} />

            {/* Extract Another */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Extract another URL:</p>
              <FormatSelector
                selected={format}
                onChange={setFormat}
                disabled={isLoading}
              />
              <div className="mt-2">
                <UrlInput onSubmit={(url) => extract(url)} isLoading={isLoading} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
