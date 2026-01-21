"use client";

import { CitationCard } from "./CitationCard";
import type { Source } from "@/types/research-ai";

interface SourceGridProps {
  sources: Source[];
}

export function SourceGrid({ sources }: SourceGridProps) {
  if (sources.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        Sources will appear here
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {sources.map((source) => (
        <CitationCard key={source.index} source={source} />
      ))}
    </div>
  );
}
