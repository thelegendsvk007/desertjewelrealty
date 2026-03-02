import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { Filter, X, Search, ChevronDown, MapPin, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { developersData } from '@/data/developersData';
import { propertiesData } from '@/data/properties';
import { locationsData } from '@/data/locations';
import DirhamLogo from '@/components/ui/DirhamLogo';
import uae1 from '../assets/uae/uae1.webp';
import uae2 from '../assets/uae/uae2.webp';
import uae3 from '../assets/uae/uae3.webp';
import uae4 from '../assets/uae/uae4.webp';
import uae5 from '../assets/uae/uae5.webp';
import uae6 from '../assets/uae/uae6.webp';
import uae7 from '../assets/uae/uae7.webp';
import uae8 from '../assets/uae/uae8.webp';
import uae9 from '../assets/uae/uae9.webp';
import uae10 from '../assets/uae/uae10.webp';
import uae11 from '../assets/uae/uae11.webp';
import uae12 from '../assets/uae/uae12.webp';
import uae13 from '../assets/uae/uae13.webp';
import uae14 from '../assets/uae/uae14.webp';
import uae15 from '../assets/uae/uae15.webp';
import uae16 from '../assets/uae/uae16.webp';
import uae17 from '../assets/uae/uae17.webp';
import uae18 from '../assets/uae/uae18.webp';
import uae19 from '../assets/uae/uae19.webp';
import uae20 from '../assets/uae/uae20.webp';
import uae21 from '../assets/uae/uae21.webp';
import uae22 from '../assets/uae/uae22.webp';
import uae23 from '../assets/uae/uae23.webp';
import uae24 from '../assets/uae/uae24.webp';
import uae25 from '../assets/uae/uae25.webp';
import uae26 from '../assets/uae/uae26.webp';
import uae27 from '../assets/uae/uae27.webp';
import uae28 from '../assets/uae/uae28.webp';
import uae29 from '../assets/uae/uae29.webp';
import uae30 from '../assets/uae/uae30.webp';
import uae31 from '../assets/uae/uae31.webp';
import uae32 from '../assets/uae/uae32.webp';
import uae33 from '../assets/uae/uae33.webp';
import uae34 from '../assets/uae/uae34.webp';
import uae35 from '../assets/uae/uae35.webp';

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Abbreviation mapping for common Dubai location abbreviations
  const locationAbbreviations: Record<string, string[]> = {
    // Existing abbreviations
    'jvc': ['jumeirah village circle'],
    'jvt': ['jumeirah village triangle'],
    'jlt': ['jumeirah lake towers'],
    'dm': ['dubai marina'],
    'bb': ['business bay'],
    'dtd': ['downtown dubai'],
    'dtdb': ['downtown dubai'],
    'dd': ['downtown dubai'],
    'dip': ['dubai investment park'],
    'd3': ['dubai design district'],
    'mbr': ['mohammed bin rashid city'],
    'mbrc': ['mohammed bin rashid city'],
    'mbr city': ['mohammed bin rashid city'],
    'szr': ['sheikh zayed road'],
    'dhe': ['dubai hills estate'],
    'pj': ['palm jumeirah'],
    'dmc': ['dubai media city'],
    'dso': ['dubai silicon oasis'],
    'difc': ['dubai international financial centre'],
    'tecom': ['barsha heights'],
    'bh': ['barsha heights'],
    'dxb': ['dubai'],
    'auh': ['abu dhabi'],
    'shj': ['sharjah'],
    'rak': ['ras al khaimah'],
    'ajm': ['ajman'],
    'fjr': ['fujairah'],
    'uaq': ['umm al quwain'],
    
    // New location abbreviations from the locations data
    'dmcity': ['dubai maritime city'],
    'si': ['siniyah island'],
    'dh2': ['damac hills 2'],
    'dl': ['damac lagoons'],
    'dlrc': ['dubai land residence complex'],
    'aw4': ['al warsan 4'],
    'saadiyat': ['saadiyat island'],
    'di': ['dubai islands'],
    'ec': ['expo city'],
    'dh': ['dubai harbour'],
    'coa': ['city of arabia'],
    'jum': ['jumeirah'],
    'cw': ['city walk'],
    'pja': ['palm jebel ali'],
    'jav': ['jebel ali village'],
    'tv': ['the valley'],
    'dubailand': ['dubai land'],
    'mr': ['mina rashid'],
    'maa': ['mina al arab'],
    'es': ['emaar south'],
    'af': ['al furjan'],
    'ath': ['athlon'],
    'hi': ['hayat island'],
    'hba': ['haven by aldar'],
    'maj': ['majan'],
    'ahi': ['al hudayriat island'],
    'us': ['umm suqeim'],
    'sh2': ['sobha hartland ii'],
    'gv': ['green vistas'],
    'lm': ['la mer'],
    
    // Additional common variations
    'palm jebel ali': ['palm jebel ali'],
    'palm jumeirah': ['palm jumeirah'],
    'business bay': ['business bay'],
    'downtown': ['downtown dubai'],
    'marina': ['dubai marina'],
    'jlt': ['jumeirah lake towers'],
    'design district': ['dubai design district'],
    'media city': ['dubai media city'],
    'silicon oasis': ['dubai silicon oasis'],
    'investment park': ['dubai investment park'],
    'hills estate': ['dubai hills estate'],
    'harbour': ['dubai harbour'],
    'islands': ['dubai islands'],
    'land': ['dubai land'],
    'village circle': ['jumeirah village circle'],
    'village triangle': ['jumeirah village triangle']
  };

  // Function to expand abbreviations in search query
  const expandAbbreviations = (query: string): string[] => {
    const queryLower = query.toLowerCase().trim();
    const expandedTerms = [queryLower]; // Always include original query
    
    // Check if query matches any abbreviation
    if (locationAbbreviations[queryLower]) {
      expandedTerms.push(...locationAbbreviations[queryLower]);
    }
    
    // Also check if any abbreviation matches the query as a substring
    Object.entries(locationAbbreviations).forEach(([abbrev, fullNames]) => {
      if (queryLower.includes(abbrev) || abbrev.includes(queryLower)) {
        expandedTerms.push(...fullNames);
      }
    });
    
    return [...new Set(expandedTerms)]; // Remove duplicates
  };
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    category: 'residential', // residential or commercial
    city: '',
    locationId: '',
    budget: '',
    developer: '',
    status: '', // Ready to Move / Off Plan filter
  });

  // Mobile search state
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [mobileAdvancedFilters, setMobileAdvancedFilters] = useState({
    propertyType: '',
    developer: '',
    beds: '',
    emirate: '',
    minArea: '',
    maxArea: ''
  });

  // Desktop search state
  const [desktopSearchQuery, setDesktopSearchQuery] = useState('');
  const [showDesktopSearchDropdown, setShowDesktopSearchDropdown] = useState(false);
  const [desktopSearchSuggestions, setDesktopSearchSuggestions] = useState<any[]>([]);

  // Background images for rotation
  const backgroundImages = [
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1549180030-48bf079fb38a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    uae1,
  uae2,
  uae3,
  uae4,
  uae5,
  uae6,
  uae7,
  uae8,
  uae9,
  uae10,
  uae11,
  uae12,
  uae13,
  uae14,
  uae15,
  uae16,
  uae17,
  uae18,
  uae19,
  uae20,
  uae21,
  uae22,
  uae23,
  uae24,
  uae25,
  uae26,
  uae27,
  uae28,
  uae29,
  uae30,
  uae31,
  uae32,
  uae33,
  uae34,
  uae35
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change background image every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the search URL
    const params = new URLSearchParams();
    
    // Add basic filters
    if (searchParams.propertyType) params.append('type', searchParams.propertyType);
    if (searchParams.category) params.append('category', searchParams.category);
    if (searchParams.city) params.append('city', searchParams.city);
    if (searchParams.locationId) params.append('location', searchParams.locationId);
    if (searchParams.budget) params.append('budget', searchParams.budget);
    if (searchParams.developer) params.append('developer', searchParams.developer);
    if (searchParams.status) params.append('status', searchParams.status);
    
    // Navigate to the search results page using client-side routing
    setLocation(`/properties?${params.toString()}`);
  };

  const handleMobileSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Construct the search URL with mobile search parameters
    const params = new URLSearchParams();
    
    // Add search query if provided
    if (mobileSearchQuery.trim()) {
      params.append('search', mobileSearchQuery.trim());
    }
    
    // Add advanced filters if provided
    if (searchParams.category) params.append('category', searchParams.category);
    if (mobileAdvancedFilters.propertyType) params.append('type', mobileAdvancedFilters.propertyType);
    if (mobileAdvancedFilters.developer) params.append('developer', mobileAdvancedFilters.developer);
    if (mobileAdvancedFilters.beds) params.append('beds', mobileAdvancedFilters.beds);
    if (mobileAdvancedFilters.emirate) params.append('city', mobileAdvancedFilters.emirate);
    if (mobileAdvancedFilters.minArea) params.append('minArea', mobileAdvancedFilters.minArea);
    if (mobileAdvancedFilters.maxArea) params.append('maxArea', mobileAdvancedFilters.maxArea);
    
    // Debug logging
    console.log('Mobile search params:', {
      search: mobileSearchQuery,
      filters: mobileAdvancedFilters,
      url: `/properties?${params.toString()}`
    });
    
    // Navigate to the properties page with search parameters
    setLocation(`/properties?${params.toString()}`);
    setShowSearchDropdown(false);
  };

  // Generate search suggestions based on query
  const generateSearchSuggestions = (query: string) => {
    if (!query || query.length < 2) {
      setSearchSuggestions([]);
      setShowSearchDropdown(false);
      return;
    }

    const suggestions: any[] = [];
    const expandedQueries = expandAbbreviations(query);

    // Search in properties - show individual properties with bedroom counts
    const matchingProperties = propertiesData.filter(property => 
      expandedQueries.some(q => 
        property.title.toLowerCase().includes(q) ||
        property.address.toLowerCase().includes(q) ||
        property.propertyType.toLowerCase().includes(q)
      )
    ).slice(0, 4); // Show up to 4 individual properties

    // Add each property as a separate suggestion
    matchingProperties.forEach(property => {
      const bedroomText = property.beds ? 
        (property.beds === 'studio' ? 'Studio' : `${property.beds} Bedrooms`) : 
        'Bedrooms: N/A';
      
      suggestions.push({
        type: 'property',
        id: property.id,
        title: property.title,
        subtitle: bedroomText,
        icon: Building,
        properties: [property] // Store single property
      });
    });

    // Search in locations - calculate actual property counts
    const matchingLocations = locationsData.filter(location => 
      expandedQueries.some(q => 
        location.name.toLowerCase().includes(q) ||
        location.city.toLowerCase().includes(q)
      )
    ).slice(0, 3);

    matchingLocations.forEach(location => {
      // Calculate actual property count for this location
      const actualPropertyCount = propertiesData.filter(p => p.locationId === location.id).length;
      suggestions.push({
        type: 'location',
        id: location.id,
        title: location.name,
        subtitle: `${location.city} - ${actualPropertyCount} properties`,
        icon: MapPin
      });
    });

    // Search in developers - calculate actual property counts
    const matchingDevelopers = developersData.filter(developer => 
      expandedQueries.some(q => 
        developer.name.toLowerCase().includes(q)
      )
    ).slice(0, 2);

    matchingDevelopers.forEach(developer => {
      // Calculate actual property count for this developer
      const actualPropertyCount = propertiesData.filter(p => p.developerId === developer.id).length;
      suggestions.push({
        type: 'developer',
        id: developer.id,
        title: developer.name,
        subtitle: `${actualPropertyCount} properties available`,
        icon: User
      });
    });

    setSearchSuggestions(suggestions.slice(0, 6));
    setShowSearchDropdown(suggestions.length > 0);
  };

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    setShowSearchDropdown(false);
    
    if (suggestion.type === 'property') {
      // Each property suggestion now represents a single property, go directly to its detail page
      setLocation(`/properties/${suggestion.id}`);
    } else if (suggestion.type === 'location') {
      // Navigate to properties page filtered by location
      const params = new URLSearchParams();
      params.append('location', suggestion.id.toString());
      setLocation(`/properties?${params.toString()}`);
    } else if (suggestion.type === 'developer') {
      // Navigate to the specific developer's page
      setLocation(`/developers/${suggestion.id}`);
    }
    
    setMobileSearchQuery(suggestion.title);
  };

  // Handle search input change
  const handleSearchInputChange = (value: string) => {
    setMobileSearchQuery(value);
    generateSearchSuggestions(value);
  };

  // Handle desktop search input change
  const handleDesktopSearchInputChange = (value: string) => {
    setDesktopSearchQuery(value);
    generateDesktopSearchSuggestions(value);
  };

  // Generate desktop search suggestions
  const generateDesktopSearchSuggestions = (query: string) => {
    if (!query || query.length < 2) {
      setDesktopSearchSuggestions([]);
      setShowDesktopSearchDropdown(false);
      return;
    }

    const suggestions: any[] = [];
    const expandedQueries = expandAbbreviations(query);

    // Search in properties - show individual properties with bedroom counts
    const matchingProperties = propertiesData.filter(property => 
      expandedQueries.some(q => 
        property.title.toLowerCase().includes(q) ||
        property.address.toLowerCase().includes(q) ||
        property.propertyType.toLowerCase().includes(q)
      )
    ).slice(0, 4); // Show up to 4 individual properties

    // Add each property as a separate suggestion
    matchingProperties.forEach(property => {
      const bedroomText = property.beds ? 
        (property.beds === 'studio' ? 'Studio' : `${property.beds} Bedrooms`) : 
        'Bedrooms: N/A';
      
      suggestions.push({
        type: 'property',
        id: property.id,
        title: property.title,
        subtitle: bedroomText,
        icon: Building,
        properties: [property] // Store single property
      });
    });

    // Search in locations - calculate actual property counts
    const matchingLocations = locationsData.filter(location => 
      expandedQueries.some(q => 
        location.name.toLowerCase().includes(q) ||
        location.city.toLowerCase().includes(q)
      )
    ).slice(0, 3);

    matchingLocations.forEach(location => {
      // Calculate actual property count for this location
      const actualPropertyCount = propertiesData.filter(p => p.locationId === location.id).length;
      suggestions.push({
        type: 'location',
        id: location.id,
        title: location.name,
        subtitle: `${location.city} - ${actualPropertyCount} properties`,
        icon: MapPin
      });
    });

    // Search in developers - calculate actual property counts
    const matchingDevelopers = developersData.filter(developer => 
      expandedQueries.some(q => 
        developer.name.toLowerCase().includes(q)
      )
    ).slice(0, 2);

    matchingDevelopers.forEach(developer => {
      // Calculate actual property count for this developer
      const actualPropertyCount = propertiesData.filter(p => p.developerId === developer.id).length;
      suggestions.push({
        type: 'developer',
        id: developer.id,
        title: developer.name,
        subtitle: `${actualPropertyCount} properties available`,
        icon: User
      });
    });

    setDesktopSearchSuggestions(suggestions.slice(0, 6));
    setShowDesktopSearchDropdown(suggestions.length > 0);
  };

  // Handle desktop search suggestion click
  const handleDesktopSuggestionClick = (suggestion: any) => {
    setShowDesktopSearchDropdown(false);
    
    if (suggestion.type === 'property') {
      // Each property suggestion now represents a single property, go directly to its detail page
      setLocation(`/properties/${suggestion.id}`);
    } else if (suggestion.type === 'location') {
      // Navigate to properties page filtered by location
      const params = new URLSearchParams();
      params.append('location', suggestion.id.toString());
      setLocation(`/properties?${params.toString()}`);
    } else if (suggestion.type === 'developer') {
      // Navigate to the specific developer's page
      setLocation(`/developers/${suggestion.id}`);
    }
    
    setDesktopSearchQuery(suggestion.title);
  };

  // Clear search when navigating
  const clearSearchAndNavigate = () => {
    setMobileSearchQuery('');
    setShowSearchDropdown(false);
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-dark-darker overflow-hidden">
        {/* Background images with immediate first image display */}
        {backgroundImages.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Dubai Real Estate ${index + 1}`}
            className="object-cover w-full h-full absolute inset-0"
            initial={{ opacity: index === 0 ? 0.7 : 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 0.7 : 0
            }}
            transition={{ 
              duration: index === 0 ? 0 : 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.div 
          className="max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold text-white mb-4 leading-tight text-shadow-xl">
            Discover <span className="text-secondary">Luxurious</span> Properties in Dubai
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 font-light max-w-2xl mx-auto text-shadow-md">
            Explore exclusive residential and commercial opportunities across the UAE with Dubai's premier real estate brokerage
          </p>
          
          {/* Search Bar */}
          <motion.div 
            className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-2xl shadow-2xl mb-8 border border-white/20 relative max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >


            <form onSubmit={handleSearch}>
              {/* Category Toggle - Always visible */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
                  <button
                    type="button"
                    className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      searchParams.category === 'residential'
                        ? 'bg-primary text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    onClick={() => setSearchParams({...searchParams, category: 'residential', propertyType: ''})}
                  >
                    Residential
                  </button>
                  <button
                    type="button"
                    className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      searchParams.category === 'commercial'
                        ? 'bg-primary text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    onClick={() => setSearchParams({...searchParams, category: 'commercial', propertyType: ''})}
                  >
                    Commercial
                  </button>
                </div>
              </div>
              
              {/* Desktop Search Bar - Between tabs and filters */}
              <div className="hidden md:block mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search properties, developers, or locations..."
                    value={desktopSearchQuery}
                    onChange={(e) => handleDesktopSearchInputChange(e.target.value)}
                    onFocus={() => generateDesktopSearchSuggestions(desktopSearchQuery)}
                    onBlur={() => setTimeout(() => setShowDesktopSearchDropdown(false), 150)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm placeholder-gray-500"
                  />
                  
                  {/* Desktop Search Dropdown */}
                  <AnimatePresence>
                    {showDesktopSearchDropdown && desktopSearchSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 mt-2 max-h-72 overflow-y-auto"
                      >
                        {desktopSearchSuggestions.map((suggestion, index) => {
                          const IconComponent = suggestion.icon;
                          return (
                            <div
                              key={`${suggestion.type}-${suggestion.id}`}
                              onClick={() => handleDesktopSuggestionClick(suggestion)}
                              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                            >
                              <div className="flex-shrink-0 mr-4">
                                <IconComponent className="h-5 w-5 text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {suggestion.title}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  {suggestion.subtitle}
                                </div>
                              </div>
                              <div className="flex-shrink-0 ml-3">
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                  suggestion.type === 'property' ? 'bg-blue-100 text-blue-800' :
                                  suggestion.type === 'location' ? 'bg-green-100 text-green-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {suggestion.type === 'property' ? 'Property' : 
                                   suggestion.type === 'location' ? 'Area' : 'Developer'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile Search Bar - Replacing Filter Section */}
              <div className="md:hidden mb-4">
                <div className="space-y-3">
                  {/* Main Search Bar */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search properties, developers, or locations"
                      value={mobileSearchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleMobileSearch();
                        }
                      }}
                      onFocus={() => generateSearchSuggestions(mobileSearchQuery)}
                      onBlur={() => setTimeout(() => setShowSearchDropdown(false), 150)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-500"
                    />
                    
                    {/* Search Dropdown */}
                    <AnimatePresence>
                      {showSearchDropdown && searchSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto"
                        >
                          {searchSuggestions.map((suggestion, index) => {
                            const IconComponent = suggestion.icon;
                            return (
                              <div
                                key={`${suggestion.type}-${suggestion.id}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex-shrink-0 mr-3">
                                  <IconComponent className="h-4 w-4 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {suggestion.title}
                                  </div>
                                  <div className="text-xs text-gray-500 truncate">
                                    {suggestion.subtitle}
                                  </div>
                                </div>
                                <div className="flex-shrink-0 ml-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    suggestion.type === 'property' ? 'bg-blue-100 text-blue-800' :
                                    suggestion.type === 'location' ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    {suggestion.type === 'property' ? 'Property' : 
                                     suggestion.type === 'location' ? 'Area' : 'Developer'}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Advanced Filters Button */}
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="w-full text-left text-gray-600 text-sm font-medium py-2 px-1 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                  >
                    <span>Advanced Filters</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Advanced Filters Dropdown */}
                  <AnimatePresence>
                    {showAdvancedFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        {/* Two Column Layout with 3 boxes each */}
                        <div className="grid grid-cols-2 gap-3">
                          {/* Left Column */}
                          <div className="space-y-3">
                            {/* Property Type */}
                            <div>
                              <select
                                value={mobileAdvancedFilters.propertyType}
                                onChange={(e) => setMobileAdvancedFilters({...mobileAdvancedFilters, propertyType: e.target.value})}
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              >
                                <option value="">Property Type</option>
                                {searchParams.category === 'residential' ? (
                                  <>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                    <option value="penthouse">Penthouse</option>
                                    <option value="townhouse">Townhouse</option>
                                    <option value="studio">Studio</option>
                                    <option value="duplex">Duplex</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="office">Office</option>
                                    <option value="retail">Retail Space</option>
                                    <option value="warehouse">Warehouse</option>
                                    <option value="showroom">Showroom</option>
                                    <option value="building">Full Building</option>
                                    <option value="land">Commercial Land</option>
                                  </>
                                )}
                              </select>
                            </div>
                            
                            {/* Beds */}
                            <div>
                              <select
                                value={mobileAdvancedFilters.beds}
                                onChange={(e) => setMobileAdvancedFilters({...mobileAdvancedFilters, beds: e.target.value})}
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              >
                                <option value="">Bedrooms</option>
                                <option value="studio">Studio</option>
                                <option value="1">1 Bedroom</option>
                                <option value="2">2 Bedrooms</option>
                                <option value="3">3 Bedrooms</option>
                                <option value="4">4 Bedrooms</option>
                                <option value="5+">5+ Bedrooms</option>
                              </select>
                            </div>
                            
                            {/* Min Area */}
                            <div>
                              <select
                                value={mobileAdvancedFilters.minArea}
                                onChange={(e) => setMobileAdvancedFilters({...mobileAdvancedFilters, minArea: e.target.value})}
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              >
                                <option value="">Min Area (sqft)</option>
                                <option value="500">500+ sqft</option>
                                <option value="1000">1,000+ sqft</option>
                                <option value="1500">1,500+ sqft</option>
                                <option value="2000">2,000+ sqft</option>
                                <option value="2500">2,500+ sqft</option>
                                <option value="3000">3,000+ sqft</option>
                                <option value="5000">5,000+ sqft</option>
                              </select>
                            </div>
                          </div>
                          
                          {/* Right Column */}
                          <div className="space-y-3">
                            {/* Developer */}
                            <div>
                              <select
                                value={mobileAdvancedFilters.developer}
                                onChange={(e) => setMobileAdvancedFilters({...mobileAdvancedFilters, developer: e.target.value})}
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              >
                                <option value="">Developer</option>
                                {developersData.map(developer => (
                                  <option key={developer.id} value={developer.id.toString()}>
                                    {developer.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Emirate */}
                            <div>
                              <select
                                value={mobileAdvancedFilters.emirate}
                                onChange={(e) => setMobileAdvancedFilters({...mobileAdvancedFilters, emirate: e.target.value})}
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              >
                                <option value="">Emirate</option>
                                <option value="dubai">Dubai</option>
                                <option value="abudhabi">Abu Dhabi</option>
                                <option value="sharjah">Sharjah</option>
                                <option value="ajman">Ajman</option>
                                <option value="rasalkhaimah">Ras Al Khaimah</option>
                                <option value="fujairah">Fujairah</option>
                                <option value="ummalquwain">Umm Al Quwain</option>
                              </select>
                            </div>
                            
                            {/* Max Area */}
                            <div>
                              <select
                                value={mobileAdvancedFilters.maxArea}
                                onChange={(e) => setMobileAdvancedFilters({...mobileAdvancedFilters, maxArea: e.target.value})}
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              >
                                <option value="">Max Area (sqft)</option>
                                <option value="1000">Up to 1,000 sqft</option>
                                <option value="1500">Up to 1,500 sqft</option>
                                <option value="2000">Up to 2,000 sqft</option>
                                <option value="2500">Up to 2,500 sqft</option>
                                <option value="3000">Up to 3,000 sqft</option>
                                <option value="5000">Up to 5,000 sqft</option>
                                <option value="10000">Up to 10,000 sqft</option>
                                <option value="999999">10,000+ sqft</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Search Button */}
                  <button
                    type="button"
                    onClick={handleMobileSearch}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Search Properties
                  </button>
                </div>
              </div>

              {/* Desktop Filter Grid */}
              <div className="hidden md:block">
                {/* First row with 4 filters including Developer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4">
                  <div>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm"
                      value={searchParams.propertyType}
                      onChange={(e) => setSearchParams({...searchParams, propertyType: e.target.value})}
                    >
                      <option value="">Property Type</option>
                      {searchParams.category === 'residential' ? (
                        <>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="penthouse">Penthouse</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="studio">Studio</option>
                          <option value="duplex">Duplex</option>
                        </>
                      ) : (
                        <>
                          <option value="office">Office</option>
                          <option value="retail">Retail Space</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="showroom">Showroom</option>
                          <option value="building">Full Building</option>
                          <option value="land">Commercial Land</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm"
                      value={searchParams.locationId}
                      onChange={(e) => setSearchParams({...searchParams, locationId: e.target.value})}
                    >
                      <option value="">Select Area</option>
                      <option value="palm-jumeirah">Palm Jumeirah</option>
                      <option value="dubai-marina">Dubai Marina</option>
                      <option value="downtown-dubai">Downtown Dubai</option>
                      <option value="business-bay">Business Bay</option>
                      <option value="jumeirah-lake-towers">Jumeirah Lake Towers (JLT)</option>
                      <option value="jumeirah-village-circle">Jumeirah Village Circle (JVC)</option>
                      <option value="jumeirah-village-triangle">Jumeirah Village Triangle (JVT)</option>
                      <option value="dubai-silicon-oasis">Dubai Silicon Oasis</option>
                      <option value="arabian-ranches">Arabian Ranches</option>
                      <option value="the-springs">The Springs</option>
                      <option value="the-meadows">The Meadows</option>
                      <option value="emirates-hills">Emirates Hills</option>
                      <option value="al-barari">Al Barari</option>
                      <option value="dubai-sports-city">Dubai Sports City</option>
                      <option value="dubai-motor-city">Dubai Motor City</option>
                      <option value="international-city">International City</option>
                      <option value="discovery-gardens">Discovery Gardens</option>
                      <option value="al-furjan">Al Furjan</option>
                      <option value="mirdif-hills">Mirdif Hills</option>
                      <option value="dubai-south">Dubai South</option>
                      <option value="bluewaters-island">Bluewaters Island</option>
                      <option value="emaar-beachfront">Emaar Beachfront</option>
                      <option value="dubai-creek-harbour">Dubai Creek Harbour</option>
                      <option value="dubai-hills-estate">Dubai Hills Estate</option>
                      <option value="tilal-al-ghaf">Tilal Al Ghaf</option>
                      <option value="damac-hills">DAMAC Hills</option>
                      <option value="damac-lagoons">DAMAC Lagoons</option>
                      <option value="city-walk">City Walk</option>
                      <option value="la-mer">La Mer</option>
                      <option value="pearl-jumeirah">Pearl Jumeirah</option>
                      <option value="dubai-harbour">Dubai Harbour</option>
                      <option value="al-wasl">Al Wasl</option>
                      <option value="barsha-heights">Barsha Heights (Tecom)</option>
                      <option value="dubai-production-city">Dubai Production City</option>
                      <option value="dubai-studio-city">Dubai Studio City</option>
                      <option value="dubai-science-park">Dubai Science Park</option>
                      <option value="dubai-investment-park">Dubai Investment Park (DIP)</option>
                      <option value="difc">Dubai International Financial Centre (DIFC)</option>
                      <option value="madinat-jumeirah-living">Madinat Jumeirah Living</option>
                      <option value="liwan">Liwan</option>
                      <option value="remraam">Remraam</option>
                      <option value="al-sufouh">Al Sufouh</option>
                      <option value="yas-island">Yas Island</option>
                      <option value="saadiyat-island">Saadiyat Island</option>
                      <option value="al-reem-island">Al Reem Island</option>
                      <option value="al-maryah-island">Al Maryah Island</option>
                      <option value="masdar-city">Masdar City</option>
                      <option value="al-raha-beach">Al Raha Beach</option>
                      <option value="al-ghadeer">Al Ghadeer</option>
                      <option value="al-reef">Al Reef</option>
                      <option value="al-shamkha">Al Shamkha</option>
                      <option value="al-raha-gardens">Al Raha Gardens</option>
                      <option value="hydra-village">Hydra Village</option>
                      <option value="aljada">Aljada</option>
                      <option value="tilal-city">Tilal City</option>
                      <option value="maryam-island">Maryam Island</option>
                      <option value="al-mamsha">Al Mamsha</option>
                      <option value="sharjah-waterfront-city">Sharjah Waterfront City</option>
                      <option value="sharjah-garden-city">Sharjah Garden City</option>
                      <option value="al-khan">Al Khan</option>
                    </select>
                  </div>
                  <div>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm"
                      value={searchParams.budget}
                      onChange={(e) => setSearchParams({...searchParams, budget: e.target.value})}
                    >
                      <option value="">Budget</option>
                      <option value="500000">Up to AED 500K</option>
                      <option value="1000000">Up to AED 1M</option>
                      <option value="2000000">Up to AED 2M</option>
                      <option value="3000000">Up to AED 3M</option>
                      <option value="5000000">Up to AED 5M</option>
                      <option value="10000000">Up to AED 10M</option>
                      <option value="20000000">Up to AED 20M</option>
                      <option value="500000000">Above AED 20M</option>
                    </select>
                  </div>
                  <div>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm"
                      value={searchParams.developer}
                      onChange={(e) => setSearchParams({...searchParams, developer: e.target.value})}
                    >
                      <option value="">Developer</option>
                      {developersData.map(developer => (
                        <option key={developer.id} value={developer.id.toString()}>
                          {developer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Second row with button style filters and search button */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Button style for Ready to Move In / Off Plan */}
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setSearchParams({...searchParams, status: searchParams.status === 'Ready to Move' ? '' : 'Ready to Move'})}
                        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                          searchParams.status === 'Ready to Move'
                            ? 'bg-gray-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Ready to Move In
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchParams({...searchParams, status: searchParams.status === 'Off-Plan' ? '' : 'Off-Plan'})}
                        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                          searchParams.status === 'Off-Plan'
                            ? 'bg-gray-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Off Plan
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Button moved to the right */}
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Properties
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;