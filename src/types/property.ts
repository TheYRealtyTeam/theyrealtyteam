export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  propertyType: 'apartment' | 'house' | 'condo' | 'townhouse';
  images: string[];
  amenities: string[];
  description: string;
  availableDate: string;
  petPolicy: 'no-pets' | 'cats-only' | 'dogs-only' | 'pets-allowed';
  parking: boolean;
  laundry: 'in-unit' | 'on-site' | 'none';
  furnished: boolean;
  utilities: string[];
  contactInfo: {
    phone: string;
    email: string;
  };
  virtualTourUrl?: string;
  featured: boolean;
  datePosted: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: Property['propertyType'];
  petPolicy?: Property['petPolicy'];
  parking?: boolean;
  furnished?: boolean;
  availableDate?: string;
}

export interface PropertySearchParams {
  query?: string;
  filters?: PropertyFilters;
  sortBy?: 'price-asc' | 'price-desc' | 'date-newest' | 'date-oldest';
}