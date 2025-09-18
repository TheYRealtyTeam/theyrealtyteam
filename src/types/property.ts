export interface Property {
  id: string;
  user_id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_footage?: number;
  property_type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'studio';
  images: string[];
  amenities: string[];
  description?: string;
  available_date: string;
  pet_policy?: 'pets-allowed' | 'cats-only' | 'dogs-only' | 'no-pets';
  parking: boolean;
  laundry?: 'in-unit' | 'on-site' | 'none';
  furnished: boolean;
  utilities: string[];
  contact_phone?: string;
  contact_email?: string;
  virtual_tour_url?: string;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: Property['property_type'];
  petPolicy?: Property['pet_policy'];
  parking?: boolean;
  furnished?: boolean;
  availableDate?: string;
}

export interface PropertySearchParams {
  query?: string;
  filters?: PropertyFilters;
  sortBy?: 'price-asc' | 'price-desc' | 'date-newest' | 'date-oldest';
}