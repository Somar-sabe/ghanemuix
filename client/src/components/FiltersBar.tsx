import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FiltersBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'score' | 'price' | 'rating';
  onSortChange: (sort: 'score' | 'price' | 'rating') => void;
}

/**
 * Filters Bar Component
 * Pill-style category filters and sort options
 * Sticky below header on scroll
 */
export function FiltersBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}: FiltersBarProps) {
  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3">
      <div className="max-w-7xl mx-auto px-4">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Category:
          </span>
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className="rounded-full whitespace-nowrap"
            data-testid="filter-category-all"
          >
            All
            {selectedCategory === 'all' && (
              <X className="ml-1 h-3 w-3" />
            )}
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="rounded-full whitespace-nowrap"
              data-testid={`filter-category-${category.toLowerCase()}`}
            >
              {category}
              {selectedCategory === category && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Sort by:
          </span>
          <Badge
            variant={sortBy === 'score' ? 'default' : 'outline'}
            className="cursor-pointer hover-elevate whitespace-nowrap"
            onClick={() => onSortChange('score')}
            data-testid="sort-score"
          >
            Best Score
          </Badge>
          <Badge
            variant={sortBy === 'price' ? 'default' : 'outline'}
            className="cursor-pointer hover-elevate whitespace-nowrap"
            onClick={() => onSortChange('price')}
            data-testid="sort-price"
          >
            Price
          </Badge>
          <Badge
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            className="cursor-pointer hover-elevate whitespace-nowrap"
            onClick={() => onSortChange('rating')}
            data-testid="sort-rating"
          >
            Rating
          </Badge>
        </div>
      </div>
    </div>
  );
}
