"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useResearchChat } from "@/hooks/useResearchChat";
import { ToolStatus, SourceGrid } from "@/components/research-ai";
import { SidePane, Disclaimer } from "@/components/chat";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputActions,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";

export default function ResearchPage() {
  const { result, sources, toolStatus, isLoading, search, clear } =
    useResearchChat();
  const [input, setInput] = useState("");
  const [sidePaneOpen, setSidePaneOpen] = useState(false);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    search(input.trim());
    setInput("");
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <button onClick={clear} className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <span className="font-semibold">Research AI</span>
          </button>
          <div className="flex items-center gap-2">
            {sources.length > 0 && (
              <button
                onClick={() => setSidePaneOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {sources.length} sources
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!result ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full px-4">
              <Search className="size-12 text-muted-foreground/50 mb-4" />
              <h1 className="text-2xl font-semibold mb-2">
                What do you want to know?
              </h1>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                Ask any question and get answers with real-time sources from
                across the web.
              </p>

              <div className="w-full max-w-2xl">
                <PromptInput
                  isLoading={isLoading}
                  onSubmit={handleSubmit}
                  onValueChange={setInput}
                  value={input}
                >
                  <PromptInputBody>
                    <PromptInputTextarea placeholder="Ask anything..." />
                  </PromptInputBody>
                  <PromptInputFooter>
                    <div />
                    <PromptInputActions>
                      <PromptInputSubmit />
                    </PromptInputActions>
                  </PromptInputFooter>
                </PromptInput>
                <Disclaimer className="mt-2" />
              </div>
            </div>
          ) : (
            /* Results */
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
              {/* Query */}
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="size-4 text-primary" />
                </div>
                <p className="text-lg font-medium pt-1">{result.query}</p>
              </div>

              {/* Tool Status */}
              {toolStatus && <ToolStatus toolCall={toolStatus} />}

              {/* Answer */}
              {result.answer && (
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{result.answer}</p>
                </div>
              )}

              {/* Sources (Mobile) */}
              {sources.length > 0 && (
                <div className="lg:hidden">
                  <h3 className="text-sm font-medium mb-2">
                    Sources ({sources.length})
                  </h3>
                  <SourceGrid sources={sources} />
                </div>
              )}

              {/* Follow-up Input */}
              <div className="pt-4 border-t">
                <PromptInput
                  isLoading={isLoading}
                  onSubmit={handleSubmit}
                  onValueChange={setInput}
                  value={input}
                >
                  <PromptInputBody>
                    <PromptInputTextarea placeholder="Ask a follow-up..." />
                  </PromptInputBody>
                  <PromptInputFooter>
                    <div />
                    <PromptInputActions>
                      <PromptInputSubmit />
                    </PromptInputActions>
                  </PromptInputFooter>
                </PromptInput>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sources Panel (Desktop) */}
      <div className="hidden lg:block w-80 border-l overflow-y-auto p-4">
        <h2 className="font-semibold mb-4">Sources</h2>
        <SourceGrid sources={sources} />
      </div>

      {/* Sources Panel (Mobile) */}
      <SidePane
        open={sidePaneOpen}
        onClose={() => setSidePaneOpen(false)}
        title={`Sources (${sources.length})`}
      >
        <SourceGrid sources={sources} />
      </SidePane>
    </div>
  );
}
