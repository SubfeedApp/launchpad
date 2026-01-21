"use client";

import { Loader2, Search, Globe, CheckCircle, XCircle } from "lucide-react";
import type { ToolCall } from "@/types/research-ai";

interface ToolStatusProps {
  toolCall: ToolCall;
}

const TOOL_CONFIG = {
  web_search: {
    icon: Search,
    label: "Searching the web",
    completedLabel: "Search complete",
  },
  web_extract: {
    icon: Globe,
    label: "Reading page",
    completedLabel: "Page extracted",
  },
  web_map: {
    icon: Globe,
    label: "Mapping site",
    completedLabel: "Site mapped",
  },
};

export function ToolStatus({ toolCall }: ToolStatusProps) {
  const config = TOOL_CONFIG[toolCall.tool];

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
      {toolCall.status === "running" && (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>{config.label}...</span>
        </>
      )}

      {toolCall.status === "completed" && (
        <>
          <CheckCircle className="size-4 text-green-500" />
          <span>{config.completedLabel}</span>
          {toolCall.duration && (
            <span className="text-muted-foreground/60">
              ({(toolCall.duration / 1000).toFixed(1)}s)
            </span>
          )}
        </>
      )}

      {toolCall.status === "error" && (
        <>
          <XCircle className="size-4 text-red-500" />
          <span>Search failed</span>
        </>
      )}
    </div>
  );
}
