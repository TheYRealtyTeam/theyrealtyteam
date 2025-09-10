import React from 'react';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Car, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';

interface PropertyCardProps {
  property: Property;
  onContactClick: (property: Property) => void;
  onDetailsClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onContactClick, 
  onDetailsClick 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{property.address}, {property.city}</span>
          </div>
          
          <div className="text-2xl font-bold text-primary mb-3">
            {formatPrice(property.price)}<span className="text-sm font-normal text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span>{property.squareFootage} sq ft</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Available {formatDate(property.availableDate)}</span>
            </div>
            
            {property.parking && (
              <div className="flex items-center gap-1">
                <Car className="h-3 w-3" />
                <span>Parking</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => onDetailsClick(property)}
            variant="outline" 
            className="flex-1"
          >
            View Details
          </Button>
          <Button 
            onClick={() => onContactClick(property)}
            className="flex-1"
          >
            Contact
          </Button>
        </div>

        {property.virtualTourUrl && (
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-sm"
            asChild
          >
            <a href={property.virtualTourUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Virtual Tour
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;