import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, categoryCounts }: CategoryFilterProps) => {
  const getCategoryLabel = (category: string) => {
    if (!category) return 'All Posts';
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === '' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('')}
          className="gap-2"
        >
          All Posts
          {categoryCounts && (
            <Badge variant="secondary" className="ml-1">
              {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
            </Badge>
          )}
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="gap-2"
          >
            {getCategoryLabel(category)}
            {categoryCounts && categoryCounts[category] && (
              <Badge variant="secondary" className="ml-1">
                {categoryCounts[category]}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
