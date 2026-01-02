"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2Icon, Menu } from "lucide-react";
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

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [model, setModel] = useState("openai/gpt-5-nano");
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [sidePaneOpen, setSidePaneOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleAttach = (files: File[]) => {
    setPendingFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async () => {
    if ((!input.trim() && pendingFiles.length === 0) || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setPendingFiles([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          model,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSessionId(data.sessionId);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const reload = async () => {
    if (messages.length === 0 || isLoading) return;

    // Remove last assistant message and resend last user message
    const lastUserMessageIndex = messages.findLastIndex(
      (m) => m.role === "user"
    );
    if (lastUserMessageIndex === -1) return;

    const lastUserMessage = messages[lastUserMessageIndex];
    setMessages(messages.slice(0, -1)); // Remove last assistant message
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: lastUserMessage.content,
          sessionId,
          model,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSessionId(data.sessionId);

      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <Message from="assistant">
                <MessageContent>
                  <div className="flex items-center gap-2">
                    <Loader2Icon className="size-4 animate-spin" />
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </MessageContent>
              </Message>
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
