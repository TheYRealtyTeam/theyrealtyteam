import React, { useState } from 'react';
import { Property } from '@/types/property';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Plus, Pencil, Trash2, MapPin, Bed, Bath, Square } from 'lucide-react';
import { format } from 'date-fns';

const PropertyManagement = () => {
  const { properties, loading, addProperty, updateProperty, deleteProperty } = useProperties();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    square_footage: '',
    property_type: 'apartment' as Property['property_type'],
    images: [] as string[],
    amenities: [] as string[],
    description: '',
    available_date: '',
    pet_policy: 'no-pets' as Property['pet_policy'],
    parking: false,
    laundry: 'none' as Property['laundry'],
    furnished: false,
    utilities: [] as string[],
    contact_phone: '',
    contact_email: '',
    virtual_tour_url: '',
    featured: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      square_footage: '',
      property_type: 'apartment',
      images: [],
      amenities: [],
      description: '',
      available_date: '',
      pet_policy: 'no-pets',
      parking: false,
      laundry: 'none',
      furnished: false,
      utilities: [],
      contact_phone: '',
      contact_email: '',
      virtual_tour_url: '',
      featured: false
    });
    setEditingProperty(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseFloat(formData.bathrooms),
      square_footage: formData.square_footage ? parseInt(formData.square_footage) : undefined,
      active: true
    };

    let success = false;
    if (editingProperty) {
      success = await updateProperty(editingProperty.id, propertyData);
    } else {
      success = await addProperty(propertyData);
    }

    if (success) {
      resetForm();
      setIsAddModalOpen(false);
    }
  };

  const handleEdit = (property: Property) => {
    setFormData({
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      zip_code: property.zip_code,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      square_footage: property.square_footage?.toString() || '',
      property_type: property.property_type,
      images: property.images,
      amenities: property.amenities,
      description: property.description || '',
      available_date: property.available_date,
      pet_policy: property.pet_policy || 'no-pets',
      parking: property.parking,
      laundry: property.laundry || 'none',
      furnished: property.furnished,
      utilities: property.utilities,
      contact_phone: property.contact_phone || '',
      contact_email: property.contact_email || '',
      virtual_tour_url: property.virtual_tour_url || '',
      featured: property.featured
    });
    setEditingProperty(property);
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Property Management</h2>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-muted-foreground">Manage your rental property listings</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="property_type">Property Type *</Label>
                  <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value as Property['property_type']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zip_code">ZIP Code *</Label>
                  <Input
                    id="zip_code"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="price">Monthly Rent ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="square_footage">Square Feet</Label>
                  <Input
                    id="square_footage"
                    type="number"
                    min="0"
                    value={formData.square_footage}
                    onChange={(e) => setFormData({...formData, square_footage: e.target.value})}
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="available_date">Available Date *</Label>
                  <Input
                    id="available_date"
                    type="date"
                    value={formData.available_date}
                    onChange={(e) => setFormData({...formData, available_date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pet_policy">Pet Policy</Label>
                  <Select value={formData.pet_policy} onValueChange={(value) => setFormData({...formData, pet_policy: value as Property['pet_policy']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-pets">No Pets</SelectItem>
                      <SelectItem value="cats-only">Cats Only</SelectItem>
                      <SelectItem value="dogs-only">Dogs Only</SelectItem>
                      <SelectItem value="pets-allowed">Pets Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="parking" 
                    checked={formData.parking}
                    onCheckedChange={(checked) => setFormData({...formData, parking: !!checked})}
                  />
                  <Label htmlFor="parking">Parking Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="furnished" 
                    checked={formData.furnished}
                    onCheckedChange={(checked) => setFormData({...formData, furnished: !!checked})}
                  />
                  <Label htmlFor="furnished">Furnished</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured" 
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})}
                  />
                  <Label htmlFor="featured">Featured Property</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingProperty ? 'Update Property' : 'Add Property'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Properties List */}
      {properties.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first property to start managing your rental listings.
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{property.city}, {property.state}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(property)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(property.price)}/month
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="h-3 w-3" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-3 w-3" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    {property.square_footage && (
                      <div className="flex items-center gap-1">
                        <Square className="h-3 w-3" />
                        <span>{property.square_footage} sq ft</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant={property.active ? "default" : "secondary"}>
                      {property.active ? "Active" : "Inactive"}
                    </Badge>
                    {property.featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                    <Badge variant="outline">
                      {property.property_type}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Available: {format(new Date(property.available_date), 'MMM dd, yyyy')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;