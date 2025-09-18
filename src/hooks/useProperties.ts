import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Property } from '@/types/property';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setError(error.message);
        return;
      }

      // Type assertion to ensure enum types are correctly typed
      const typedData = (data || []).map(prop => ({
        ...prop,
        property_type: prop.property_type as Property['property_type'],
        pet_policy: prop.pet_policy as Property['pet_policy'],
        laundry: prop.laundry as Property['laundry']
      }));

      setProperties(typedData);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add properties.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .insert([{
          ...propertyData,
          user_id: user.id
        }]);

      if (error) {
        console.error('Error adding property:', error);
        toast({
          title: "Error",
          description: "Failed to add property. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Property added successfully!"
      });

      fetchProperties(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to update properties.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating property:', error);
        toast({
          title: "Error",
          description: "Failed to update property. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Property updated successfully!"
      });

      fetchProperties(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteProperty = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to delete properties.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting property:', error);
        toast({
          title: "Error",
          description: "Failed to delete property. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Property deleted successfully!"
      });

      fetchProperties(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    addProperty,
    updateProperty,
    deleteProperty
  };
};