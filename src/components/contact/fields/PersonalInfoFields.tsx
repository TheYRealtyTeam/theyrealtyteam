
import React from 'react';
import { Input } from "@/components/ui/input";

interface PersonalInfoFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfoFields = ({ formData, onInputChange }: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
          maxLength={100}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="Enter your email address"
          required
          maxLength={254}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PersonalInfoFields;
