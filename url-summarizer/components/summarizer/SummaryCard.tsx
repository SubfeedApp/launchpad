"use client";

import { Markdown } from "@/components/ui/markdown";
import { ExternalLinkIcon } from "lucide-react";
import type { SummaryResult } from "@/types/summarizer";

interface SummaryCardProps {
  result: SummaryResult;
}

export function SummaryCard({ result }: SummaryCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-lg font-semibold hover:text-primary"
        >
          {result.title}
          <ExternalLinkIcon className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
        <p className="mt-1 text-sm text-muted-foreground truncate">
          {result.url}
        </p>
      </div>
      <div className="border-t pt-4">
        <Markdown>{result.summary}</Markdown>
      </div>
    </div>
  );
}
