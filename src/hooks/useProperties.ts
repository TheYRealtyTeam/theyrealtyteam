import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/types/property';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProperties = async (retryCount = 0): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        // If connection error and we haven't retried 3 times yet, retry
        if (retryCount < 3 && (error.message.includes('Failed to fetch') || error.message.includes('network'))) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          return fetchProperties(retryCount + 1);
        }
        
        if (import.meta.env.DEV) {
          console.error('Error fetching properties:', error);
        }
        setError('Unable to load properties. Please try again later.');
        return false;
      }

      // Type assertion to ensure enum types are correctly typed
      const typedData = (data || []).map(prop => ({
        ...prop,
        property_type: prop.property_type as Property['property_type'],
        pet_policy: prop.pet_policy as Property['pet_policy'],
        laundry: prop.laundry as Property['laundry']
      }));

      setProperties(typedData);
      return true;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error:', err);
      }
      setError('Unable to load properties. Please try again later.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Property management requires admin authentication (disabled)
  const addProperty = async (propertyData: Omit<Property, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    toast({
      title: "Feature Unavailable",
      description: "Property management requires admin access.",
      variant: "destructive"
    });
    return false;
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    toast({
      title: "Feature Unavailable",
      description: "Property management requires admin access.",
      variant: "destructive"
    });
    return false;
  };

  const deleteProperty = async (id: string) => {
    toast({
      title: "Feature Unavailable",
      description: "Property management requires admin access.",
      variant: "destructive"
    });
    return false;
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