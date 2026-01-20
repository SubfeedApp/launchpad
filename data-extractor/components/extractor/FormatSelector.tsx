"use client";

import { cn } from "@/lib/utils";
import type { ExtractFormat } from "@/types/extractor";

interface FormatSelectorProps {
  selected: ExtractFormat;
  onChange: (format: ExtractFormat) => void;
  disabled?: boolean;
}

const FORMATS: { id: ExtractFormat; label: string; description: string }[] = [
  { id: "markdown", label: "Markdown", description: "Clean, formatted text" },
  { id: "text", label: "Plain Text", description: "Raw text content" },
  { id: "html", label: "HTML", description: "Structured markup" },
];

export function FormatSelector({ selected, onChange, disabled }: FormatSelectorProps) {
  return (
    <div className="flex gap-2">
      {FORMATS.map((format) => (
        <button
          key={format.id}
          type="button"
          onClick={() => onChange(format.id)}
          disabled={disabled}
          className={cn(
            "flex-1 px-3 py-2 rounded-lg border text-sm transition-colors",
            "hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed",
            selected === format.id
              ? "border-primary bg-primary/5 font-medium"
              : "border-border"
          )}
        >
          {format.label}
        </button>
      ))}
    </div>
  );
}
