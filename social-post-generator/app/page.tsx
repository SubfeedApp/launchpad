"use client";

import { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { useSocialGenerator } from "@/hooks/useSocialGenerator";
import { PlatformSelector, PostGrid } from "@/components/social";
import { Disclaimer } from "@/components/chat";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputActions,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import type { Platform } from "@/types/social";

export default function SocialPostGeneratorPage() {
  const { result, posts, isLoading, regeneratingPlatform, generate, regenerate, clear } =
    useSocialGenerator();
  const [input, setInput] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["x", "linkedin"]);

  const handleSubmit = () => {
    if (!input.trim() || selectedPlatforms.length === 0 || isLoading) return;
    generate(input.trim(), selectedPlatforms);
  };

  const handleNewTopic = () => {
    clear();
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <button onClick={handleNewTopic} className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <span className="font-semibold">Social Post Generator</span>
        </button>
        {result && (
          <button
            onClick={handleNewTopic}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            New topic
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!result ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-57px)] px-4 py-8">
            <Zap className="size-12 text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Generate viral social posts
            </h1>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Enter a topic and select platforms. AI will create optimized posts for each.
            </p>

            <div className="w-full max-w-xl space-y-6">
              {/* Platform Selector */}
              <PlatformSelector
                selected={selectedPlatforms}
                onChange={setSelectedPlatforms}
                disabled={isLoading}
              />

              {/* Topic Input */}
              <PromptInput
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onValueChange={setInput}
                value={input}
              >
                <PromptInputBody>
                  <PromptInputTextarea
                    placeholder="What's your topic? e.g., 'Just launched our AI platform'"
                  />
                </PromptInputBody>
                <PromptInputFooter>
                  <span className="text-xs text-muted-foreground">
                    {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
                  </span>
                  <PromptInputActions>
                    <PromptInputSubmit />
                  </PromptInputActions>
                </PromptInputFooter>
              </PromptInput>

              <Disclaimer text="AI-generated content. Review before posting." />
            </div>
          </div>
        ) : (
          /* Results */
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Topic Header */}
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Topic</p>
                <p className="text-lg font-medium">{result.topic}</p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && Object.keys(posts).length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Sparkles className="size-5 animate-pulse" />
                  <span>Generating posts...</span>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            <PostGrid
              posts={posts}
              onRegenerate={regenerate}
              regeneratingPlatform={regeneratingPlatform}
            />

            {/* Generate More */}
            {!isLoading && Object.keys(posts).length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Generate for more platforms:
                </p>
                <PlatformSelector
                  selected={selectedPlatforms}
                  onChange={setSelectedPlatforms}
                  disabled={isLoading}
                />
                <div className="mt-4">
                  <button
                    onClick={() => generate(result.topic, selectedPlatforms)}
                    disabled={isLoading || selectedPlatforms.length === 0}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    Generate for selected
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
