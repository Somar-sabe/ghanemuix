import { useState } from 'react';
import { Eye } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { MobileNav } from '@/components/MobileNav';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailDrawer } from '@/components/ProductDetailDrawer';
import { Button } from '@/components/ui/button';
import { useViewed } from '@/hooks/useViewed';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';

/**
 * Recently Viewed Page
 * Display products user has viewed
 */
export default function Viewed() {
  const { viewed, clearViewed } = useViewed();
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const viewedProducts = viewed
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined)
    .reverse();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      
      <main className="flex-1 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Recently Viewed
              </h1>
              <p className="text-muted-foreground">
                {viewed.length} product{viewed.length !== 1 ? 's' : ''} viewed
              </p>
            </div>
            {viewed.length > 0 && (
              <Button
                variant="outline"
                onClick={clearViewed}
                data-testid="button-clear-viewed"
              >
                Clear History
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {viewedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No viewing history</h2>
              <p className="text-muted-foreground mb-6">
                Products you view will appear here
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
              {viewedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
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
