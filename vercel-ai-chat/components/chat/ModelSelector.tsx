'use client';

import { useState } from 'react';
import { Check, ChevronDown, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const MODELS = [
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'anthropic/claude-3.5-haiku', name: 'Claude 3.5 Haiku', provider: 'Anthropic' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'google/gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', provider: 'Google' },
  { id: 'deepseek/deepseek-chat-v3.1', name: 'DeepSeek V3.1', provider: 'DeepSeek' },
];

interface ModelSelectorProps {
  value: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
}

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedModel = MODELS.find((m) => m.id === value) || MODELS[0];
  const providers = [...new Set(MODELS.map((m) => m.provider))];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
            'border bg-background hover:bg-accent transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <Cpu className="size-4 text-muted-foreground" />
          <span>{selectedModel.name}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-2">
        {providers.map((provider) => (
          <div key={provider}>
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              {provider}
            </div>
            {MODELS.filter((m) => m.provider === provider).map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onChange(model.id);
                  setOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-2 py-2 rounded-md text-sm',
                  'hover:bg-accent transition-colors',
                  value === model.id && 'bg-accent'
                )}
              >
                <span>{model.name}</span>
                {value === model.id && <Check className="size-4" />}
              </button>
            ))}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
