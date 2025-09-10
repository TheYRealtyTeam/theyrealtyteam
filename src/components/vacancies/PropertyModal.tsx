import React from 'react';
import { Property } from '@/types/property';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Phone,
  Mail,
  ExternalLink,
  Wifi,
  Zap
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
    return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
  };

  const getPetPolicyLabel = (policy: string) => {
    switch (policy) {
      case 'pets-allowed': return 'Pets Allowed';
      case 'cats-only': return 'Cats Only';
      case 'dogs-only': return 'Dogs Only';
      case 'no-pets': return 'No Pets';
      default: return policy;
    }
  };

  const getLaundryLabel = (laundry: string) => {
    switch (laundry) {
      case 'in-unit': return 'In-Unit Laundry';
      case 'on-site': return 'On-Site Laundry';
      case 'none': return 'No Laundry';
      default: return laundry;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{property.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.images.map((image, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(property.price)}
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Bed className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-xs text-muted-foreground">
                    {property.bedrooms === 0 ? 'Studio' : property.bedrooms === 1 ? 'Bed' : 'Beds'}
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Bath className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-xs text-muted-foreground">
                    {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Square className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="font-semibold">{property.squareFootage}</div>
                  <div className="text-xs text-muted-foreground">Sq Ft</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Property Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type:</span>
                    <span className="capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pet Policy:</span>
                    <span>{getPetPolicyLabel(property.petPolicy)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parking:</span>
                    <span>{property.parking ? 'Available' : 'Not Available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Laundry:</span>
                    <span>{getLaundryLabel(property.laundry)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Furnished:</span>
                    <span>{property.furnished ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Available: {formatDate(property.availableDate)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold mb-3">Amenities & Features</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Utilities */}
          {property.utilities.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Utilities Included</h3>
              <div className="flex flex-wrap gap-2">
                {property.utilities.map((utility) => (
                  <Badge key={utility} variant="outline">
                    <Zap className="h-3 w-3 mr-1" />
                    {utility}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href={`tel:${property.contactInfo.phone}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {property.contactInfo.phone}
              </a>
              <a 
                href={`mailto:${property.contactInfo.email}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                {property.contactInfo.email}
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
            
            {property.virtualTourUrl && (
              <Button 
                variant="outline" 
                asChild
              >
                <a href={property.virtualTourUrl} target="_blank" rel="noopener noreferrer">
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