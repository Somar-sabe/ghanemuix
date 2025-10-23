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
{/* ChatGPT-like Input Area */}
<div className="p-4 bg-background border-t border-border">
  <div className="max-w-3xl mx-auto grid grid-cols-[auto_1fr_auto] items-end gap-2 rounded-[28px] shadow-sm bg-white/60 backdrop-blur-md px-4 py-2.5 transition focus-within:ring-2 focus-within:ring-black/10 dark:bg-[#303030]">
    
    {/* Left button (e.g., plus icon) */}
    <button
      type="button"
      className="composer-btn flex items-center justify-center text-gray-500 hover:text-gray-800 transition"
      aria-label="Add files and more"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.33496 16.5V10.665H3.5C3.13273 10.665 2.83496 10.3673 2.83496 10C2.83496 9.63273 3.13273 9.33496 3.5 9.33496H9.33496V3.5C9.33496 3.13273 9.63273 2.83496 10 2.83496C10.3673 2.83496 10.665 3.13273 10.665 3.5V9.33496H16.5L16.6338 9.34863C16.9369 9.41057 17.165 9.67857 17.165 10C17.165 10.3214 16.9369 10.5894 16.6338 10.6514L16.5 10.665H10.665V16.5C10.665 16.8673 10.3673 17.165 10 17.165C9.63273 17.165 9.33496 16.8673 9.33496 16.5Z"></path>
      </svg>
    </button>

    {/* Textarea (center) */}
    <Textarea
      ref={textareaRef}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Ask anything..."
      className="resize-none w-full border-0 bg-transparent focus-visible:ring-0 focus:outline-none text-sm text-gray-900 placeholder:text-gray-400 dark:text-gray-100"
      rows={1}
      data-testid="input-chat-message"
      aria-label="Type your message"
        style={{ minHeight: "40px", lineHeight: "1.5" }} 
    />

    {/* Send button (right side) */}
    <Button
      size="icon"
      onClick={handleSend}
      disabled={!input.trim()}
      data-testid="button-send-message"
      aria-label="Send message"
      className="flex-shrink-0 rounded-full bg-black text-white p-2 hover:bg-gray-800 disabled:opacity-30"
    >
      <Send className="h-5 w-5" />
    </Button>
  </div>
</div>

    </div>
  );
}
