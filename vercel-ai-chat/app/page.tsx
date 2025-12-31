"use client";

import { useChat } from "@ai-sdk/react";
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
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { Loader2Icon } from "lucide-react";

const SUGGESTIONS = [
  "What can you help me with?",
  "Tell me about Subfeed",
  "How do I get started?",
];

export default function Chat() {
  const { messages, input, setInput, handleSubmit, status, append } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  const handleSuggestionClick = (suggestion: string) => {
    append({ role: "user", content: suggestion });
  };

  const handleFormSubmit = () => {
    if (input.trim()) {
      handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto max-w-3xl">
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Hello there!"
              description="How can I help you today?"
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.role === "assistant" ? (
                    <MessageResponse>{message.content}</MessageResponse>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </MessageContent>
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

      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <Suggestions>
              {SUGGESTIONS.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  onClick={handleSuggestionClick}
                  suggestion={suggestion}
                />
              ))}
            </Suggestions>
          )}

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
              <div />
              <PromptInputActions>
                <PromptInputSubmit />
              </PromptInputActions>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
