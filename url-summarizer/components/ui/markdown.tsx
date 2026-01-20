"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import { memo, useMemo, type HTMLAttributes } from "react";

export type MarkdownProps = HTMLAttributes<HTMLDivElement> & {
  children: string;
};

export const Markdown = memo(
  ({ children, className, ...props }: MarkdownProps) => {
    const rendered = useMemo(() => parseMarkdown(children), [children]);

    return (
      <div className={cn("prose", className)} {...props}>
        {rendered}
      </div>
    );
  }
);

Markdown.displayName = "Markdown";

function parseMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const lines = text.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }

      elements.push(
        <CodeBlock
          key={key++}
          code={codeLines.join("\n")}
          language={language || undefined}
        />
      );
      i++; // Skip closing ```
      continue;
    }

    // Headers
    if (line.startsWith("######")) {
      elements.push(<h6 key={key++}>{parseInline(line.slice(6).trim())}</h6>);
      i++;
      continue;
    }
    if (line.startsWith("#####")) {
      elements.push(<h5 key={key++}>{parseInline(line.slice(5).trim())}</h5>);
      i++;
      continue;
    }
    if (line.startsWith("####")) {
      elements.push(<h4 key={key++}>{parseInline(line.slice(4).trim())}</h4>);
      i++;
      continue;
    }
    if (line.startsWith("###")) {
      elements.push(<h3 key={key++}>{parseInline(line.slice(3).trim())}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("##")) {
      elements.push(<h2 key={key++}>{parseInline(line.slice(2).trim())}</h2>);
      i++;
      continue;
    }
    if (line.startsWith("#")) {
      elements.push(<h1 key={key++}>{parseInline(line.slice(1).trim())}</h1>);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      elements.push(<hr key={key++} />);
      i++;
      continue;
    }

    // Unordered list
    if (/^[\s]*[-*+]\s/.test(line)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^[\s]*[-*+]\s/.test(lines[i])) {
        const content = lines[i].replace(/^[\s]*[-*+]\s/, "");
        listItems.push(<li key={listItems.length}>{parseInline(content)}</li>);
        i++;
      }
      elements.push(<ul key={key++}>{listItems}</ul>);
      continue;
    }

    // Ordered list
    if (/^[\s]*\d+\.\s/.test(line)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^[\s]*\d+\.\s/.test(lines[i])) {
        const content = lines[i].replace(/^[\s]*\d+\.\s/, "");
        listItems.push(<li key={listItems.length}>{parseInline(content)}</li>);
        i++;
      }
      elements.push(<ol key={key++}>{listItems}</ol>);
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].slice(1).trim());
        i++;
      }
      elements.push(
        <blockquote key={key++}>
          {parseInline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph - collect consecutive non-empty lines
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith(">") &&
      !/^[\s]*[-*+]\s/.test(lines[i]) &&
      !/^[\s]*\d+\.\s/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p key={key++}>{parseInline(paragraphLines.join(" "))}</p>
      );
    }
  }

  return elements;
}

function parseInline(text: string): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      elements.push(<code key={key++}>{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Bold (** or __)
    const boldMatch = remaining.match(/^(\*\*|__)(.+?)\1/);
    if (boldMatch) {
      elements.push(<strong key={key++}>{parseInline(boldMatch[2])}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic (* or _)
    const italicMatch = remaining.match(/^(\*|_)(.+?)\1/);
    if (italicMatch) {
      elements.push(<em key={key++}>{parseInline(italicMatch[2])}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Strikethrough
    const strikeMatch = remaining.match(/^~~(.+?)~~/);
    if (strikeMatch) {
      elements.push(<del key={key++}>{parseInline(strikeMatch[1])}</del>);
      remaining = remaining.slice(strikeMatch[0].length);
      continue;
    }

    // Link
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      elements.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Image
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      elements.push(
        <img
          key={key++}
          alt={imgMatch[1]}
          src={imgMatch[2]}
          className="max-w-full rounded"
        />
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // Plain text - consume until next special character
    const plainMatch = remaining.match(/^[^`*_~\[!]+/);
    if (plainMatch) {
      elements.push(<span key={key++}>{plainMatch[0]}</span>);
      remaining = remaining.slice(plainMatch[0].length);
      continue;
    }

    // Single special character that didn't match patterns
    elements.push(<span key={key++}>{remaining[0]}</span>);
    remaining = remaining.slice(1);
  }

  return elements.length === 1 ? elements[0] : elements;
}
