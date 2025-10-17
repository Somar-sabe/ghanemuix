import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message, Product } from '@/types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  products: Product[];
  onSendMessage: (text: string) => void;
  onProductClick?: (product: Product) => void;
  isTyping?: boolean;
}

/**
 * Chat Window Component
 * Message list with auto-scroll, input area, and send button
 * Auto-expanding textarea
 */
export function ChatWindow({
  messages,
  products,
  onSendMessage,
  onProductClick,
  isTyping = false
}: ChatWindowProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onSendMessage(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto py-6 space-y-6" data-testid="chat-messages">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">
                Start a conversation
              </h2>
              <p className="text-muted-foreground">
                Ask me anything about products you're looking for
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  products={products}
                  onProductClick={onProductClick}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about products, compare prices, or find deals..."
            className="resize-none min-h-[44px] max-h-32"
            rows={1}
            data-testid="input-chat-message"
            aria-label="Type your message"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim()}
            data-testid="button-send-message"
            aria-label="Send message"
            className="flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
