import React from 'react';
import { PropertyFilters as Filters } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="$0"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Any"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Bedrooms</Label>
          <Select 
            value={filters.bedrooms?.toString() || ''} 
            onValueChange={(value) => updateFilter('bedrooms', value ? Number(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Bathrooms</Label>
          <Select 
            value={filters.bathrooms?.toString() || ''} 
            onValueChange={(value) => updateFilter('bathrooms', value ? Number(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+ Bathroom</SelectItem>
              <SelectItem value="2">2+ Bathrooms</SelectItem>
              <SelectItem value="3">3+ Bathrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Property Type</Label>
          <Select 
            value={filters.propertyType || ''} 
            onValueChange={(value) => updateFilter('propertyType', value as any || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Type</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pet Policy */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Pet Policy</Label>
          <Select 
            value={filters.petPolicy || ''} 
            onValueChange={(value) => updateFilter('petPolicy', value as any || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="pets-allowed">Pets Allowed</SelectItem>
              <SelectItem value="cats-only">Cats Only</SelectItem>
              <SelectItem value="dogs-only">Dogs Only</SelectItem>
              <SelectItem value="no-pets">No Pets</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Additional Options</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={filters.parking || false}
                onCheckedChange={(checked) => updateFilter('parking', checked === true ? true : undefined)}
              />
              <Label htmlFor="parking" className="text-sm">Parking Available</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished"
                checked={filters.furnished || false}
                onCheckedChange={(checked) => updateFilter('furnished', checked === true ? true : undefined)}
              />
              <Label htmlFor="furnished" className="text-sm">Furnished</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;