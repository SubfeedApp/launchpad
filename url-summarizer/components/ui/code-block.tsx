"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { useState, type HTMLAttributes } from "react";

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  language?: string;
  code: string;
  showLineNumbers?: boolean;
};

export function CodeBlock({
  language,
  code,
  className,
  showLineNumbers = false,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension = getFileExtension(language);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "group relative my-4 overflow-hidden rounded-lg border border-border bg-muted/30",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <span className="text-xs text-muted-foreground font-mono">
          {language || "text"}
        </span>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Download code"
            className="size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleDownload}
            size="icon"
            type="button"
            variant="ghost"
          >
            <DownloadIcon className="size-3.5" />
          </Button>
          <Button
            aria-label={copied ? "Copied" : "Copy code"}
            className="size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleCopy}
            size="icon"
            type="button"
            variant="ghost"
          >
            {copied ? (
              <CheckIcon className="size-3.5 text-green-500" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {showLineNumbers ? (
              code.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground">
                    {i + 1}
                  </span>
                  <span>{highlightSyntax(line, language)}</span>
                </div>
              ))
            ) : (
              highlightCode(code, language)
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

function getFileExtension(language?: string): string {
  const extensions: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    jsx: "jsx",
    tsx: "tsx",
    python: "py",
    ruby: "rb",
    go: "go",
    rust: "rs",
    java: "java",
    cpp: "cpp",
    c: "c",
    csharp: "cs",
    php: "php",
    swift: "swift",
    kotlin: "kt",
    html: "html",
    css: "css",
    scss: "scss",
    json: "json",
    yaml: "yaml",
    yml: "yml",
    markdown: "md",
    sql: "sql",
    bash: "sh",
    shell: "sh",
    sh: "sh",
  };
  return extensions[language?.toLowerCase() || ""] || "txt";
}

function highlightCode(code: string, language?: string): React.ReactNode {
  return code.split("\n").map((line, i) => (
    <div key={i}>{highlightSyntax(line, language) || " "}</div>
  ));
}

function highlightSyntax(line: string, language?: string): React.ReactNode {
  if (!language) return line;

  const lang = language.toLowerCase();

  // JavaScript/TypeScript/JSX/TSX highlighting
  if (["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(lang)) {
    return highlightJS(line);
  }

  // Python highlighting
  if (["python", "py"].includes(lang)) {
    return highlightPython(line);
  }

  // Default: no highlighting
  return line;
}

function highlightJS(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  // Keywords
  const keywords = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|void|null|undefined|true|false|this|super)\b/g;

  // Methods/functions (word followed by parenthesis)
  const methods = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

  // Strings
  const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;

  // Comments
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;

  // Simple tokenization
  const tokens: { type: string; value: string; index: number }[] = [];

  // Find comments first
  let match;
  while ((match = comments.exec(line)) !== null) {
    tokens.push({ type: "comment", value: match[0], index: match.index });
  }

  // Find strings
  while ((match = strings.exec(line)) !== null) {
    const isInComment = tokens.some(
      (t) => t.type === "comment" && match!.index >= t.index && match!.index < t.index + t.value.length
    );
    if (!isInComment) {
      tokens.push({ type: "string", value: match[0], index: match.index });
    }
  }

  // Find keywords
  while ((match = keywords.exec(line)) !== null) {
    const isInOther = tokens.some(
      (t) => match!.index >= t.index && match!.index < t.index + t.value.length
    );
    if (!isInOther) {
      tokens.push({ type: "keyword", value: match[0], index: match.index });
    }
  }

  // Sort tokens by index
  tokens.sort((a, b) => a.index - b.index);

  // Build highlighted line
  let lastIndex = 0;
  for (const token of tokens) {
    if (token.index > lastIndex) {
      parts.push(<span key={key++}>{line.slice(lastIndex, token.index)}</span>);
    }

    const colorClass = {
      keyword: "text-purple-600 dark:text-purple-400",
      string: "text-green-600 dark:text-green-400",
      comment: "text-gray-500 italic",
      method: "text-blue-600 dark:text-blue-400",
    }[token.type] || "";

    parts.push(
      <span key={key++} className={colorClass}>
        {token.value}
      </span>
    );
    lastIndex = token.index + token.value.length;
  }

  if (lastIndex < line.length) {
    parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : line;
}

function highlightPython(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;

  const keywords = /\b(def|class|if|elif|else|for|while|try|except|finally|with|as|import|from|return|yield|raise|pass|break|continue|and|or|not|in|is|None|True|False|lambda|global|nonlocal|async|await)\b/g;
  const strings = /(["']{3}[\s\S]*?["']{3}|["'](?:(?!\1)[^\\]|\\.)*["'])/g;
  const comments = /(#.*$)/g;

  const tokens: { type: string; value: string; index: number }[] = [];

  let match;
  while ((match = comments.exec(line)) !== null) {
    tokens.push({ type: "comment", value: match[0], index: match.index });
  }

  while ((match = strings.exec(line)) !== null) {
    const isInComment = tokens.some(
      (t) => t.type === "comment" && match!.index >= t.index && match!.index < t.index + t.value.length
    );
    if (!isInComment) {
      tokens.push({ type: "string", value: match[0], index: match.index });
    }
  }

  while ((match = keywords.exec(line)) !== null) {
    const isInOther = tokens.some(
      (t) => match!.index >= t.index && match!.index < t.index + t.value.length
    );
    if (!isInOther) {
      tokens.push({ type: "keyword", value: match[0], index: match.index });
    }
  }

  tokens.sort((a, b) => a.index - b.index);

  let lastIndex = 0;
  for (const token of tokens) {
    if (token.index > lastIndex) {
      parts.push(<span key={key++}>{line.slice(lastIndex, token.index)}</span>);
    }

    const colorClass = {
      keyword: "text-purple-600 dark:text-purple-400",
      string: "text-green-600 dark:text-green-400",
      comment: "text-gray-500 italic",
    }[token.type] || "";

    parts.push(
      <span key={key++} className={colorClass}>
        {token.value}
      </span>
    );
    lastIndex = token.index + token.value.length;
  }

  if (lastIndex < line.length) {
    parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : line;
}
