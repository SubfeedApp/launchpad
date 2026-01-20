"use client";

import { Loader2, Globe, Sparkles, CheckCircle, XCircle } from "lucide-react";
import type { ToolStatus as ToolStatusType } from "@/types/summarizer";

interface ToolStatusProps {
  status: ToolStatusType;
}

const STATUS_CONFIG = {
  idle: null,
  scraping: {
    icon: Globe,
    label: "Reading page...",
    animate: true,
  },
  summarizing: {
    icon: Sparkles,
    label: "Generating summary...",
    animate: true,
  },
  done: {
    icon: CheckCircle,
    label: "Done",
    animate: false,
    iconClass: "text-green-500",
  },
  error: {
    icon: XCircle,
    label: "Failed",
    animate: false,
    iconClass: "text-red-500",
  },
};

export function ToolStatus({ status }: ToolStatusProps) {
  const config = STATUS_CONFIG[status.step];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
      {config.animate ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Icon className={`size-4 ${config.iconClass || ""}`} />
      )}
      <span>{status.message || config.label}</span>
    </div>
  );
}
