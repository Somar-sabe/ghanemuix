/**
 * Typing Indicator
 * Three animated dots showing AI is "thinking"
 */
export function TypingIndicator() {
  return (
    <div 
      className="flex gap-1 mr-auto max-w-2xl bg-muted rounded-3xl p-4"
      role="status"
      aria-label="AI is typing"
      data-testid="typing-indicator"
    >
      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
    </div>
  );
}
