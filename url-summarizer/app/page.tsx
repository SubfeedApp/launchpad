"use client";

import { UrlInput, SummaryCard, ToolStatus } from "@/components/summarizer";
import { useUrlSummarizer } from "@/hooks/useUrlSummarizer";

export default function Home() {
  const { status, result, error, summarize, isLoading } = useUrlSummarizer();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">URL Summarizer</h1>
            <p className="mt-2 text-muted-foreground">
              Paste any URL to get an AI-powered summary
            </p>
          </div>

          <UrlInput onSubmit={summarize} isLoading={isLoading} />

          <ToolStatus status={status} error={error ?? undefined} />

          {result && <SummaryCard result={result} />}
        </div>
      </main>

      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        Powered by{" "}
        <a
          href="https://subfeed.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Subfeed
        </a>
      </footer>
    </div>
  );
}
