import React from 'react';
import { Property } from '@/types/property';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Calendar,
  Car,
  Wifi,
  Zap,
  Phone,
  Mail,
  ExternalLink,
  X
} from 'lucide-react';
import { format } from 'date-fns';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: (property: Property) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ 
  property, 
  isOpen, 
  onClose, 
  onContact 
}) => {
  if (!property) return null;

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

  const getUtilityIcon = (utility: string) => {
    switch (utility.toLowerCase()) {
      case 'internet':
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'electricity':
      case 'electric':
        return <Zap className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          {property.images && property.images.length > 0 && (
            <div className="aspect-[16/9] overflow-hidden rounded-lg">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{property.address}, {property.city}, {property.state} {property.zip_code}</span>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(property.price)}
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Bed className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-xs text-muted-foreground">
                    {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Bath className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-xs text-muted-foreground">
                    {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Square className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="font-semibold">{property.square_footage || 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Sq Ft</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Property Features */}
              <div>
                <h4 className="font-semibold mb-2">Property Type & Features</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">
                    {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
                  </Badge>
                  
                  {property.pet_policy && (
                    <Badge variant="outline">
                      {property.pet_policy === 'pets-allowed' ? 'Pets Allowed' :
                       property.pet_policy === 'cats-only' ? 'Cats Only' :
                       property.pet_policy === 'dogs-only' ? 'Dogs Only' : 'No Pets'}
                    </Badge>
                  )}
                  
                  {property.furnished && (
                    <Badge variant="outline">Furnished</Badge>
                  )}
                  
                  {property.parking && (
                    <Badge variant="outline">
                      <Car className="h-3 w-3 mr-1" />
                      Parking
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Available: {formatDate(property.available_date)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          {property.description && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Amenities</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Utilities */}
          {property.utilities && property.utilities.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Utilities Included</h4>
              <div className="flex flex-wrap gap-2">
                {property.utilities.map((utility, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {getUtilityIcon(utility)}
                    {utility}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <div className="space-y-2">
              <a 
                href={`tel:${property.contact_phone || '(555) 123-4567'}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {property.contact_phone || '(555) 123-4567'}
              </a>
              <a 
                href={`mailto:${property.contact_email || 'info@yrealty.com'}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                {property.contact_email || 'info@yrealty.com'}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => onContact(property)}
              className="flex-1"
            >
              Contact About This Property
            </Button>
            
            {property.virtual_tour_url && (
              <Button 
                variant="outline" 
                asChild
              >
                <a href={property.virtual_tour_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Virtual Tour
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;