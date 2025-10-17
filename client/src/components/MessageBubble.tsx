import { Message, Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageBubbleProps {
  message: Message;
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

/**
 * Message Bubble Component
 * User messages: right-aligned, primary color
 * AI messages: left-aligned, muted background
 * Product grids: special layout with product cards
 */
export function MessageBubble({ message, products = [], onProductClick }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  if (message.type === 'product-grid' && message.products) {
    const gridProducts = products.filter(p => message.products?.includes(p.id));
    
    return (
      <div className="flex gap-3 mr-auto max-w-full" data-testid={`message-${message.id}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gridProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick?.(product)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-3 ${isUser ? 'ml-auto' : 'mr-auto'} max-w-2xl`}
      data-testid={`message-${message.id}`}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`rounded-3xl p-4 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
