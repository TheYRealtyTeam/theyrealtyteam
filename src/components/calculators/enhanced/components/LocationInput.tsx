import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

// Comprehensive US locations including all 50 states and major cities
const popularLocations = [
  // All 50 US States
  'Alabama, AL',
  'Alaska, AK',
  'Arizona, AZ',
  'Arkansas, AR',
  'California, CA',
  'Colorado, CO',
  'Connecticut, CT',
  'Delaware, DE',
  'Florida, FL',
  'Georgia, GA',
  'Hawaii, HI',
  'Idaho, ID',
  'Illinois, IL',
  'Indiana, IN',
  'Iowa, IA',
  'Kansas, KS',
  'Kentucky, KY',
  'Louisiana, LA',
  'Maine, ME',
  'Maryland, MD',
  'Massachusetts, MA',
  'Michigan, MI',
  'Minnesota, MN',
  'Mississippi, MS',
  'Missouri, MO',
  'Montana, MT',
  'Nebraska, NE',
  'Nevada, NV',
  'New Hampshire, NH',
  'New Jersey, NJ',
  'New Mexico, NM',
  'New York, NY',
  'North Carolina, NC',
  'North Dakota, ND',
  'Ohio, OH',
  'Oklahoma, OK',
  'Oregon, OR',
  'Pennsylvania, PA',
  'Rhode Island, RI',
  'South Carolina, SC',
  'South Dakota, SD',
  'Tennessee, TN',
  'Texas, TX',
  'Utah, UT',
  'Vermont, VT',
  'Virginia, VA',
  'Washington, WA',
  'West Virginia, WV',
  'Wisconsin, WI',
  'Wyoming, WY',
  
  // Major cities
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'Fort Worth, TX',
  'Columbus, OH',
  'Charlotte, NC',
  'San Francisco, CA',
  'Indianapolis, IN',
  'Seattle, WA',
  'Denver, CO',
  'Washington, DC',
  'Boston, MA',
  'Nashville, TN',
  'El Paso, TX',
  'Detroit, MI',
  'Memphis, TN',
  'Portland, OR',
  'Oklahoma City, OK',
  'Las Vegas, NV',
  'Louisville, KY',
  'Baltimore, MD',
  'Milwaukee, WI',
  'Albuquerque, NM',
  'Tucson, AZ',
  'Fresno, CA',
  'Sacramento, CA',
  'Mesa, AZ',
  'Kansas City, MO',
  'Atlanta, GA',
  'Long Beach, CA',
  'Colorado Springs, CO',
  'Raleigh, NC',
  'Miami, FL',
  'Virginia Beach, VA',
  'Omaha, NE',
  'Oakland, CA',
  'Minneapolis, MN',
  'Tulsa, OK',
  'Wichita, KS',
  'New Orleans, LA',
  'Arlington, TX',
  'Cleveland, OH',
  'Tampa, FL',
  'Bakersfield, CA',
  'Aurora, CO',
  'Anaheim, CA',
  'Honolulu, HI',
  'Santa Ana, CA',
  'Riverside, CA',
  'Corpus Christi, TX',
  'Lexington, KY',
  'Stockton, CA',
  'Henderson, NV',
  'Saint Paul, MN',
  'St. Louis, MO',
  'Cincinnati, OH',
  'Pittsburgh, PA',
  'Greensboro, NC',
  'Anchorage, AK',
  'Plano, TX',
  'Lincoln, NE',
  'Orlando, FL',
  'Irvine, CA',
  'Newark, NJ',
  'Durham, NC',
  'Chula Vista, CA',
  'Toledo, OH',
  'Fort Wayne, IN',
  'St. Petersburg, FL',
  'Laredo, TX',
  'Jersey City, NJ',
  'Chandler, AZ',
  'Madison, WI',
  'Lubbock, TX',
  'Scottsdale, AZ',
  'Reno, NV',
  'Buffalo, NY',
  'Gilbert, AZ',
  'Glendale, AZ',
  'North Las Vegas, NV',
  'Winston-Salem, NC',
  'Chesapeake, VA',
  'Norfolk, VA',
  'Fremont, CA',
  'Garland, TX',
  'Irving, TX',
  'Hialeah, FL',
  'Richmond, VA',
  'Boise, ID',
  'Spokane, WA',
  'Baton Rouge, LA',
];

const LocationInput = ({ 
  value, 
  onChange, 
  label = "Location (Optional)", 
  placeholder = "City, State",
  className 
}: LocationInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    // Filter suggestions based on input
    if (newValue.length >= 1) {
      const searchTerm = newValue.toLowerCase();
      const filtered = popularLocations.filter(location =>
        location.toLowerCase().includes(searchTerm)
      );
      
      // Prioritize: exact matches first, then starts with, then contains
      const sorted = filtered.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        
        // Exact match
        if (aLower === searchTerm) return -1;
        if (bLower === searchTerm) return 1;
        
        // Starts with search term
        const aStarts = aLower.startsWith(searchTerm);
        const bStarts = bLower.startsWith(searchTerm);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        // Alphabetical for same priority
        return a.localeCompare(b);
      });
      
      setSuggestions(sorted.slice(0, 10)); // Show max 10 suggestions
      setShowSuggestions(sorted.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className={cn("space-y-2 relative", className)}>
      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
        <Input
          id="location"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className="pl-10"
          autoComplete="off"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2",
                  index === selectedIndex && "bg-gray-100"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {inputValue && (
        <p className="text-xs text-gray-500">
          Location will be used for market insights and property analysis
        </p>
      )}
    </div>
  );
};

export default LocationInput;
