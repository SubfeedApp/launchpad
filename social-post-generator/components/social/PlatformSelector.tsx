"use client";

import { cn } from "@/lib/utils";
import { PLATFORMS } from "@/lib/social";
import type { Platform } from "@/types/social";

interface PlatformSelectorProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
  disabled?: boolean;
}

export function PlatformSelector({
  selected,
  onChange,
  disabled,
}: PlatformSelectorProps) {
  const togglePlatform = (platform: Platform) => {
    if (disabled) return;

    if (selected.includes(platform)) {
      onChange(selected.filter((p) => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  const selectAll = () => {
    if (disabled) return;
    onChange(PLATFORMS.map((p) => p.id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Platforms</span>
        <button
          type="button"
          onClick={selectAll}
          disabled={disabled}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          Select all
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PLATFORMS.map((platform) => {
          const isSelected = selected.includes(platform.id);

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                "hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border"
              )}
            >
              <span className="flex items-center justify-center size-8 rounded-md bg-muted text-sm font-bold">
                {platform.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{platform.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {platform.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
