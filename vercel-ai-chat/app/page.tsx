"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Menu } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputActions,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import {
  ModelSelector,
  MessageActions,
  Disclaimer,
  AttachmentButton,
  AttachmentPreview,
  SidePane,
} from "@/components/chat";

export default function Chat() {
  const [model, setModel] = useState("gpt-5-nano");
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [sidePaneOpen, setSidePaneOpen] = useState(false);

  const { messages, input, setInput, handleSubmit, status, reload } = useChat({
    body: { model },
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleAttach = (files: File[]) => {
    setPendingFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = () => {
    if (input.trim() || pendingFiles.length > 0) {
      handleSubmit();
      setPendingFiles([]);
    }
  };

  return (
    <div className="flex h-full">
      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <h1 className="font-semibold">AI Chat</h1>
          <div className="flex items-center gap-2">
            <ModelSelector
              value={model}
              onChange={setModel}
              disabled={isLoading}
            />
            <button
              onClick={() => setSidePaneOpen(true)}
              className="p-2 rounded-lg hover:bg-accent transition-colors lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <Conversation className="flex-1">
          <ConversationContent className="mx-auto max-w-3xl">
            {messages.length === 0 ? (
              <ConversationEmptyState
                title="Start a conversation"
                description="Send a message to begin"
              />
            ) : (
              messages.map((message, index) => (
                <Message key={message.id} from={message.role} className="group">
                  <MessageContent>
                    {message.role === "assistant" ? (
                      <MessageResponse>{message.content}</MessageResponse>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </MessageContent>
                  {message.role === "assistant" && (
                    <MessageActions
                      content={message.content}
                      onRegenerate={
                        index === messages.length - 1
                          ? () => reload()
                          : undefined
                      }
                    />
                  )}
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input Area */}
        <div className="border-t bg-background">
          <div className="mx-auto max-w-3xl p-4 space-y-2">
            <AttachmentPreview
              files={pendingFiles}
              onRemove={handleRemoveFile}
            />

            <PromptInput
              isLoading={isLoading}
              onSubmit={handleFormSubmit}
              onValueChange={setInput}
              value={input}
            >
              <PromptInputBody>
                <PromptInputTextarea placeholder="Send a message..." />
              </PromptInputBody>
              <PromptInputFooter>
                <AttachmentButton
                  onAttach={handleAttach}
                  disabled={isLoading}
                />
                <PromptInputActions>
                  <PromptInputSubmit />
                </PromptInputActions>
              </PromptInputFooter>
            </PromptInput>

            <Disclaimer />
          </div>
        </div>
      </div>

      {/* Side Pane */}
      <SidePane
        open={sidePaneOpen}
        onClose={() => setSidePaneOpen(false)}
        title="Context"
      >
        <div className="text-sm text-muted-foreground">
          <p>Sources and context will appear here.</p>
        </div>
      </SidePane>
    </div>
  );
}
