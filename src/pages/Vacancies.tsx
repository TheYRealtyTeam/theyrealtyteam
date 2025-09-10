import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import PropertyCard from '@/components/vacancies/PropertyCard';
import PropertyFilters from '@/components/vacancies/PropertyFilters';
import PropertyModal from '@/components/vacancies/PropertyModal';
import { sampleProperties } from '@/data/properties';
import { Property, PropertyFilters as Filters, PropertySearchParams } from '@/types/property';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

const Vacancies = () => {
  console.log('VACANCIES COMPONENT RENDERING - Route: /vacancies', window.location.pathname);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<PropertySearchParams['sortBy']>('date-newest');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = sampleProperties;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.amenities.some(amenity => amenity.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms!);
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }
    if (filters.petPolicy) {
      filtered = filtered.filter(p => p.petPolicy === filters.petPolicy);
    }
    if (filters.parking !== undefined) {
      filtered = filtered.filter(p => p.parking === filters.parking);
    }
    if (filters.furnished !== undefined) {
      filtered = filtered.filter(p => p.furnished === filters.furnished);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'date-newest':
        filtered.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        break;
      case 'date-oldest':
        filtered.sort((a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handlePropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handlePropertyContact = (property: Property) => {
    toast({
      title: "Contact Information",
      description: `Call ${property.contactInfo.phone} or email ${property.contactInfo.email} to inquire about ${property.title}`,
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <PageLayout 
      title="Available Vacancies" 
      subtitle="Browse our current rental listings and find your perfect home"
      metaDescription="View available rental properties managed by Y Realty Team. Find your next home from our curated selection of quality rental units."
    >
      <div className="w-full">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to previous page
          </button>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, location, or amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-newest">Newest First</SelectItem>
                  <SelectItem value="date-oldest">Oldest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Filter Properties</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <PropertyFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedProperties.length} of {sampleProperties.length} properties
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>
          
          <div className="lg:col-span-3">
            {filteredAndSortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredAndSortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onContactClick={handlePropertyContact}
                    onDetailsClick={handlePropertyDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {filteredAndSortedProperties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAndSortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onContactClick={handlePropertyContact}
                  onDetailsClick={handlePropertyDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-muted rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Don't see what you're looking for?</h3>
          <p className="text-muted-foreground mb-4">
            Our team can help you find the perfect rental property that meets your specific needs.
          </p>
          <Button onClick={() => navigate('/contact')}>
            Contact Our Team
          </Button>
        </div>

        {/* Property Details Modal */}
        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProperty(null);
          }}
          onContact={handlePropertyContact}
        />
      </div>
    </PageLayout>
  );
};

export default Vacancies;