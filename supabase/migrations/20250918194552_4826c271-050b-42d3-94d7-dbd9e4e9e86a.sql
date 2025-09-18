-- Create properties table for user's actual rental properties
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms DECIMAL(3,1) NOT NULL DEFAULT 0,
  square_footage INTEGER,
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'condo', 'townhouse', 'studio')),
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  description TEXT,
  available_date DATE NOT NULL,
  pet_policy TEXT CHECK (pet_policy IN ('pets-allowed', 'cats-only', 'dogs-only', 'no-pets')),
  parking BOOLEAN DEFAULT FALSE,
  laundry TEXT CHECK (laundry IN ('in-unit', 'on-site', 'none')),
  furnished BOOLEAN DEFAULT FALSE,
  utilities TEXT[] DEFAULT '{}',
  contact_phone TEXT,
  contact_email TEXT,
  virtual_tour_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for properties
CREATE POLICY "Users can view active properties" 
ON public.properties 
FOR SELECT 
USING (active = true);

CREATE POLICY "Property owners can view their own properties" 
ON public.properties 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Property owners can create their own properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Property owners can update their own properties" 
ON public.properties 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Property owners can delete their own properties" 
ON public.properties 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_properties_user_id ON public.properties(user_id);
CREATE INDEX idx_properties_active ON public.properties(active);
CREATE INDEX idx_properties_available_date ON public.properties(available_date);
CREATE INDEX idx_properties_price ON public.properties(price);