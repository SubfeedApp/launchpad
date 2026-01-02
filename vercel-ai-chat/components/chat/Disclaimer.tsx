import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  text?: string;
  className?: string;
}

export function Disclaimer({
  text = "AI can make mistakes. Please double-check important information.",
  className,
}: DisclaimerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground",
        className
      )}
    >
      <AlertCircle className="hidden sm:block size-3" />
      <span>{text}</span>
    </div>
  );
}
