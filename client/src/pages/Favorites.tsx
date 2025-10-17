import { useState } from 'react';
import { Heart, Scale } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { MobileNav } from '@/components/MobileNav';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailDrawer } from '@/components/ProductDetailDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { useProducts } from '@/hooks/useProducts';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Product } from '@/types';

/**
 * Favorites Page
 * Saved products with comparison feature (2-4 items side-by-side)
 */
export default function Favorites() {
  const { favorites } = useFavorites();
  const { products } = useProducts();
  const { trackEvent } = useAnalytics();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareItems, setCompareItems] = useState<string[]>([]);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const toggleCompareItem = (productId: string) => {
    setCompareItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleCompare = () => {
    if (compareItems.length >= 2) {
      trackEvent({ type: 'compare_products', productIds: compareItems });
      setCompareMode(true);
    }
  };

  const compareProducts = products.filter(p => compareItems.includes(p.id));

  if (compareMode && compareProducts.length >= 2) {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <TopBar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                  Comparing {compareProducts.length} Products
                </h1>
                <p className="text-muted-foreground">
                  Side-by-side comparison of key features and pricing
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCompareMode(false)}
                data-testid="button-exit-compare"
              >
                Exit Comparison
              </Button>
            </div>

            {/* Comparison Table */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {compareProducts.map(product => (
                <div key={product.id} className="space-y-4">
                  {/* Product Image */}
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3">
                    <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-bold">
                          {product.currency === 'USD' ? '$' : 'AED '}{product.price}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Score</span>
                        <Badge variant="secondary">{product.score}</Badge>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-medium">{product.rating} ⭐</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Marketplace</span>
                        <span className="font-medium text-xs">{product.marketplace}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium text-xs">{product.category}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                      data-testid={`button-view-${product.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <MobileNav />
        <ProductDetailDrawer
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      
      <main className="flex-1 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Favorite Products
              </h1>
              <p className="text-muted-foreground">
                {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            {compareItems.length >= 2 && (
              <Button
                onClick={handleCompare}
                data-testid="button-compare"
              >
                <Scale className="mr-2 h-4 w-4" />
                Compare ({compareItems.length})
              </Button>
            )}
          </div>

          {/* Selection Mode Notice */}
          {compareItems.length > 0 && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm">
                {compareItems.length < 2
                  ? `Select ${2 - compareItems.length} more product${2 - compareItems.length !== 1 ? 's' : ''} to compare`
                  : `${compareItems.length} products selected. Click Compare to view side-by-side.`
                }
                {compareItems.length >= 4 && ' (Maximum 4 products)'}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start adding products to your favorites to see them here
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                data-testid="button-browse-products"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteProducts.map(product => (
                <div key={product.id} className="relative">
                  {compareItems.length > 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <Button
                        size="sm"
                        variant={compareItems.includes(product.id) ? 'default' : 'outline'}
                        className="rounded-full"
                        onClick={() => toggleCompareItem(product.id)}
                        data-testid={`button-select-compare-${product.id}`}
                      >
                        {compareItems.includes(product.id) ? '✓' : '+'}
                      </Button>
                    </div>
                  )}
                  <ProductCard
                    product={product}
                    onClick={() => !compareItems.length && setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <MobileNav />

      <ProductDetailDrawer
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
