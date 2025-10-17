import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Star, Heart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ProductDetailDrawerProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

/**
 * Product Detail Drawer
 * Slides from right (desktop) or bottom sheet (mobile)
 * Features image carousel, score badge, specs table, and buy CTA
 */
export function ProductDetailDrawer({ product, open, onClose }: ProductDetailDrawerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { favorites, toggleFavorite } = useFavorites();
  const { trackEvent } = useAnalytics();

  if (!product) return null;

  const isFavorite = favorites.includes(product.id);
  const images = [product.image];

  const handleBuyClick = () => {
    trackEvent({
      type: 'buy_click',
      productId: product.id,
      marketplace: product.marketplace
    });
    window.open(product.buyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
    trackEvent({
      type: 'favorite_toggle',
      productId: product.id,
      action: isFavorite ? 'remove' : 'add'
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        data-testid="drawer-backdrop"
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[500px] bg-background shadow-2xl z-50 transition-transform duration-300 overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid={`drawer-product-${product.id}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg line-clamp-1">Product Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-drawer"
            aria-label="Close product details"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-square bg-muted">
          <img
            src={images[currentImageIndex]}
            alt={product.alt}
            className="w-full h-full object-cover"
          />

          {/* Score Badge */}
          <div className="absolute top-4 right-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-chart-2"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - product.score / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-background/90 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="font-bold text-lg">{product.score}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={() => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)}
                data-testid="button-carousel-prev"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                data-testid="button-carousel-next"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Favorite */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
              <p className="text-muted-foreground">{product.summary}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              data-testid={`button-favorite-drawer-${product.id}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`h-6 w-6 ${isFavorite ? 'fill-destructive text-destructive' : ''}`}
              />
            </Button>
          </div>

          {/* Price & Rating */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div>
              <div className="text-3xl font-bold mb-1">
                {product.currency === 'USD' ? '$' : 'AED '}{product.price}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{product.rating}</span>
                <span>rating</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {product.category}
            </Badge>
          </div>

          {/* Specs Table */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Product Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Marketplace</span>
                <span className="font-medium">{product.marketplace}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">SmartScore</span>
                <span className="font-medium font-mono">{product.score}/100</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Product ID</span>
                <span className="font-mono text-sm">{product.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Buy Button */}
        <div className="sticky bottom-0 p-4 bg-background border-t border-border">
          <Button
            className="w-full"
            size="lg"
            onClick={handleBuyClick}
            data-testid={`button-buy-${product.id}`}
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Buy on {product.marketplace}
          </Button>
        </div>
      </div>
    </>
  );
}
