import { Property } from '@/types/property';

export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    address: '123 Main Street, Apt 4B',
    city: 'Downtown',
    state: 'CA',
    zipCode: '90210',
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    propertyType: 'apartment',
    images: [
      '/lovable-uploads/4aab176d-95ee-4ae9-bda7-892530d680f6.png',
      '/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png'
    ],
    amenities: [
      'Air Conditioning',
      'Hardwood Floors',
      'Balcony',
      'Dishwasher',
      'Stainless Steel Appliances',
      'Fitness Center',
      'Pool'
    ],
    description: 'Beautiful modern apartment in the heart of downtown. Recently renovated with high-end finishes, this unit features an open floor plan, large windows with city views, and access to building amenities including a rooftop pool and fitness center.',
    availableDate: '2025-01-15',
    petPolicy: 'cats-only',
    parking: true,
    laundry: 'in-unit',
    furnished: false,
    utilities: ['Water', 'Trash'],
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'leasing@yrealty.com'
    },
    virtualTourUrl: 'https://example.com/tour/1',
    featured: true,
    datePosted: '2025-01-01'
  },
  {
    id: '2',
    title: 'Cozy Family Home',
    address: '456 Oak Avenue',
    city: 'Suburbia',
    state: 'CA',
    zipCode: '90211',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1800,
    propertyType: 'house',
    images: [
      '/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png',
      '/lovable-uploads/4aab176d-95ee-4ae9-bda7-892530d680f6.png'
    ],
    amenities: [
      'Backyard',
      'Garage',
      'Fireplace',
      'Updated Kitchen',
      'Central Air',
      'Washer/Dryer Hookups'
    ],
    description: 'Charming single-family home perfect for families. Features a spacious backyard, two-car garage, and recently updated kitchen with granite countertops. Located in a quiet neighborhood with excellent schools nearby.',
    availableDate: '2025-02-01',
    petPolicy: 'pets-allowed',
    parking: true,
    laundry: 'on-site',
    furnished: false,
    utilities: ['Trash'],
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'homes@yrealty.com'
    },
    featured: false,
    datePosted: '2025-01-03'
  },
  {
    id: '3',
    title: 'Luxury High-Rise Condo',
    address: '789 Skyline Drive, Unit 2501',
    city: 'Metro City',
    state: 'CA',
    zipCode: '90212',
    price: 4500,
    bedrooms: 2,
    bathrooms: 3,
    squareFootage: 1600,
    propertyType: 'condo',
    images: [
      '/lovable-uploads/4aab176d-95ee-4ae9-bda7-892530d680f6.png',
      '/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png'
    ],
    amenities: [
      'Floor-to-Ceiling Windows',
      'Marble Countertops',
      'Concierge Service',
      'Rooftop Terrace',
      'Wine Storage',
      'Valet Parking',
      'Spa'
    ],
    description: 'Stunning luxury condominium on the 25th floor with panoramic city views. This elegant unit features premium finishes, a gourmet kitchen with marble countertops, and access to world-class building amenities including concierge service and rooftop terrace.',
    availableDate: '2025-01-20',
    petPolicy: 'no-pets',
    parking: true,
    laundry: 'in-unit',
    furnished: true,
    utilities: ['Water', 'Trash', 'Internet'],
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'luxury@yrealty.com'
    },
    virtualTourUrl: 'https://example.com/tour/3',
    featured: true,
    datePosted: '2024-12-28'
  },
  {
    id: '4',
    title: 'Affordable Studio',
    address: '321 Student Lane, Unit 12',
    city: 'College Town',
    state: 'CA',
    zipCode: '90213',
    price: 1200,
    bedrooms: 0,
    bathrooms: 1,
    squareFootage: 500,
    propertyType: 'apartment',
    images: [
      '/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png'
    ],
    amenities: [
      'Murphy Bed',
      'Compact Kitchen',
      'Study Nook',
      'Laundry Facility',
      'Bike Storage'
    ],
    description: 'Perfect studio apartment for students or young professionals. Efficiently designed space with a murphy bed, compact kitchen, and dedicated study area. Walking distance to campus and public transportation.',
    availableDate: '2025-01-10',
    petPolicy: 'no-pets',
    parking: false,
    laundry: 'on-site',
    furnished: true,
    utilities: ['Water', 'Trash', 'Internet'],
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'student@yrealty.com'
    },
    featured: false,
    datePosted: '2025-01-05'
  }
];