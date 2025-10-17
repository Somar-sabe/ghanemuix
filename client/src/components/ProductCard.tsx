import { Heart, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  layout?: 'grid' | 'list';
}

/**
 * Product Card Component
 * Displays product with image overlay, favorite button, and hover effects
 * Pinterest-style card with gradient overlay on image
 */
export function ProductCard({ product, onClick, layout = 'grid' }: ProductCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const { trackEvent } = useAnalytics();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFavorite = favorites.includes(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    trackEvent({
      type: 'favorite_toggle',
      productId: product.id,
      action: isFavorite ? 'remove' : 'add'
    });
  };

  const handleCardClick = () => {
    trackEvent({ type: 'product_view', productId: product.id });
    onClick?.();
  };

  if (layout === 'list') {
    return (
      <div
        className="flex gap-4 bg-card rounded-xl overflow-hidden hover-elevate cursor-pointer transition-all duration-200 border border-card-border"
        onClick={handleCardClick}
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative w-32 h-32 flex-shrink-0">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 -mt-1 -mr-1"
              onClick={handleFavoriteClick}
              data-testid={`button-favorite-${product.id}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isFavorite ? 'fill-destructive text-destructive' : ''
                }`}
              />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xl">
                {product.currency === 'USD' ? '$' : 'AED '}{product.price}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
            </div>
            <Badge variant="secondary" className="font-mono text-xs">
              Score: {product.score}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl"
      onClick={handleCardClick}
      data-testid={`card-product-${product.id}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <img
          src={product.image}
          alt={product.alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleFavoriteClick}
          data-testid={`button-favorite-${product.id}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-destructive text-destructive' : ''
            }`}
          />
        </Button>

        {/* Score Badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm font-mono"
        >
          {product.score}
        </Badge>

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-xl">
                {product.currency === 'USD' ? '$' : 'AED '}{product.price}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span className="text-white/70 ml-2 text-xs">{product.marketplace}</span>
              </div>
            </div>
            <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
}
