"use client";

import { Loader2, Globe, CheckCircle, XCircle } from "lucide-react";
import type { ToolStatus as ToolStatusType } from "@/types/extractor";

interface ToolStatusProps {
  status: ToolStatusType;
}

const STATUS_CONFIG = {
  idle: null,
  extracting: {
    icon: Globe,
    label: "Extracting content...",
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
