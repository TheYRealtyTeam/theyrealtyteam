
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactDetailsFieldsProps {
  formData: {
    phone: string;
    propertyType: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const ContactDetailsFields = ({ formData, onInputChange }: ContactDetailsFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="Enter your phone number"
          maxLength={20}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyType" className="text-sm font-medium text-gray-700">
          Property Type *
        </label>
        <Select value={formData.propertyType} onValueChange={(value) => onInputChange('propertyType', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single-family">Single Family Home</SelectItem>
            <SelectItem value="multi-family">Multi-Family Property</SelectItem>
            <SelectItem value="condo">Condominium</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="commercial">Commercial Property</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ContactDetailsFields;
