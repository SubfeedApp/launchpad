"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { createContext, useContext, useRef, useState } from "react";

type PromptInputContextType = {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
};

const PromptInputContext = createContext<PromptInputContextType | null>(null);

const usePromptInput = () => {
  const context = useContext(PromptInputContext);
  if (!context) {
    throw new Error("PromptInput components must be used within PromptInput");
  }
  return context;
};

export type PromptInputProps = HTMLAttributes<HTMLDivElement> & {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
};

export const PromptInput = ({
  className,
  isLoading = false,
  value: controlledValue,
  onValueChange,
  maxHeight = 240,
  onSubmit,
  disabled,
  ...props
}: PromptInputProps) => {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;
  const setValue = onValueChange ?? setInternalValue;

  const contextValue: PromptInputContextType = {
    isLoading,
    value,
    setValue,
    maxHeight,
    onSubmit,
    disabled,
  };

  return (
    <PromptInputContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex w-full flex-col rounded-2xl border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring",
          className
        )}
        {...props}
      />
    </PromptInputContext.Provider>
  );
};

export type PromptInputHeaderProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputHeader = ({
  className,
  children,
  ...props
}: PromptInputHeaderProps) => (
  <div
    className={cn("border-b px-3 py-2", className)}
    {...props}
  >
    {children}
  </div>
);

export type PromptInputBodyProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputBody = ({
  className,
  children,
  ...props
}: PromptInputBodyProps) => (
  <div className={cn("flex flex-col", className)} {...props}>
    {children}
  </div>
);

export type PromptInputTextareaProps = Omit<
  ComponentProps<typeof Textarea>,
  "value" | "onChange"
>;

export const PromptInputTextarea = ({
  className,
  onKeyDown,
  ...props
}: PromptInputTextareaProps) => {
  const { value, setValue, maxHeight, onSubmit, disabled, isLoading } = usePromptInput();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !isLoading && value.trim()) {
        onSubmit?.();
      }
    }
    onKeyDown?.(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      className={cn(
        "min-h-[60px] resize-none border-0 bg-transparent px-4 py-3 focus-visible:ring-0 focus-visible:ring-offset-0",
        className
      )}
      disabled={disabled || isLoading}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      style={{ maxHeight }}
      value={value}
      {...props}
    />
  );
};

export type PromptInputFooterProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputFooter = ({
  className,
  children,
  ...props
}: PromptInputFooterProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 px-3 py-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({
  className,
  children,
  ...props
}: PromptInputToolsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export type PromptInputActionsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputActions = ({
  className,
  children,
  ...props
}: PromptInputActionsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export type PromptInputSubmitProps = ComponentProps<typeof Button>;

export const PromptInputSubmit = ({
  className,
  children,
  disabled,
  ...props
}: PromptInputSubmitProps) => {
  const { value, onSubmit, disabled: contextDisabled, isLoading } = usePromptInput();
  const isDisabled = disabled ?? contextDisabled ?? isLoading ?? !value.trim();

  return (
    <Button
      className={cn("size-8 rounded-full p-0", className)}
      disabled={isDisabled}
      onClick={onSubmit}
      size="icon"
      type="button"
      {...props}
    >
      {children ?? <ArrowUpIcon className="size-4" />}
    </Button>
  );
};

export type PromptInputAttachmentProps = ComponentProps<typeof Button> & {
  onAttach?: () => void;
};

export const PromptInputAttachment = ({
  className,
  children,
  onAttach,
  ...props
}: PromptInputAttachmentProps) => (
  <Button
    className={cn("size-8 rounded-full p-0", className)}
    onClick={onAttach}
    size="icon"
    type="button"
    variant="ghost"
    {...props}
  >
    {children ?? <PaperclipIcon className="size-4" />}
  </Button>
);

export type PromptInputAttachmentsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputAttachments = ({
  className,
  children,
  ...props
}: PromptInputAttachmentsProps) => {
  if (!children) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 border-b px-3 py-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export type PromptInputAttachmentPreviewProps = HTMLAttributes<HTMLDivElement> & {
  url?: string;
  filename?: string;
  mediaType?: string;
  onRemove?: () => void;
};

export const PromptInputAttachmentPreview = ({
  className,
  url,
  filename,
  mediaType,
  onRemove,
  ...props
}: PromptInputAttachmentPreviewProps) => {
  const isImage = mediaType?.startsWith("image/");

  return (
    <div
      className={cn(
        "group relative size-16 overflow-hidden rounded-lg border bg-muted",
        className
      )}
      {...props}
    >
      {isImage && url ? (
        <img
          alt={filename || "attachment"}
          className="size-full object-cover"
          src={url}
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <PaperclipIcon className="size-4 text-muted-foreground" />
        </div>
      )}
      {onRemove && (
        <Button
          aria-label="Remove attachment"
          className="absolute top-1 right-1 size-5 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onRemove}
          size="icon"
          type="button"
          variant="secondary"
        >
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
};
