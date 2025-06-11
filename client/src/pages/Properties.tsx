import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatArea, parsePropertyImages } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import GoldenVisaIndicator from '@/components/GoldenVisaIndicator';
import SubmitListingForm from '@/components/SubmitListingForm';
import { propertiesData, searchProperties } from '@/data/properties';
import { locationsData } from '@/data/locations';
import { developersData } from '@/data/developersData';

const Properties = () => {
  const [location, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    locationId: '',
    city: '',
    category: 'residential', // residential or commercial
    minPrice: 0,
    maxPrice: 50000000,
    beds: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
    minArea: 0,
    maxArea: 5000,
    landmark: '',
    developer: '',
    handoverYear: '',
    furnishing: '',
    features: [] as string[],
    amenities: [] as string[],
    isGoldenVisaEligible: false,
    isMortgageAvailable: false
  });
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const propertiesPerPage = 10;

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const loc = params.get('location');
    const budget = params.get('budget');
    const city = params.get('city');
    const status = params.get('status');
    const bedrooms = params.get('bedrooms');
    const bathrooms = params.get('bathrooms');
    const minArea = params.get('minArea');
    const maxArea = params.get('maxArea');
    const landmark = params.get('landmark');
    const developer = params.get('developer');
    const handoverYear = params.get('handoverYear');
    const furnishing = params.get('furnishing');
    const features = params.getAll('features');
    const amenities = params.getAll('amenities');
    const isGoldenVisaEligible = params.get('isGoldenVisaEligible') === 'true';
    const isMortgageAvailable = params.get('isMortgageAvailable') === 'true';
    

    
    setSearchParams(prev => ({
      ...prev,
      propertyType: type || '',
      locationId: loc || '',
      city: city ? (() => {
        const cityMapping: { [key: string]: string } = {
          'dubai': 'Dubai',
          'abudhabi': 'Abu Dhabi',
          'sharjah': 'Sharjah',
          'ajman': 'Ajman',
          'rasalkhaimah': 'Ras Al Khaimah',
          'fujairah': 'Fujairah',
          'ummalquwain': 'Umm Al Quwain'
        };
        return cityMapping[city.toLowerCase()] || city;
      })() : '',
      maxPrice: budget ? parseInt(budget) : 50000000,
      status: status || '',
      bedrooms: bedrooms || '',
      bathrooms: bathrooms || '',
      minArea: minArea ? parseInt(minArea) : 0,
      maxArea: maxArea ? parseInt(maxArea) : 5000,
      landmark: landmark || '',
      developer: developer || '',
      handoverYear: handoverYear || '',
      furnishing: furnishing || '',
      features: features,
      amenities: amenities,
      isGoldenVisaEligible,
      isMortgageAvailable
    }));
  }, [location]);

  // Filter properties with search parameters
  const allProperties = propertiesData;
  let filteredProperties = propertiesData.filter(property => {
    // Property type filter
    if (searchParams.propertyType && searchParams.propertyType !== '' && searchParams.propertyType !== 'all-types') {
      if (property.propertyType.toLowerCase() !== searchParams.propertyType.toLowerCase()) {
        return false;
      }
    }
    
    // Location filter
    if (searchParams.locationId && searchParams.locationId !== '' && searchParams.locationId !== 'all-areas') {
      if (property.locationId !== parseInt(searchParams.locationId)) {
        return false;
      }
    }
    
    // Beds filter
    if (searchParams.beds && searchParams.beds !== '' && searchParams.beds !== 'any-beds') {
      const bedCount = searchParams.beds === '5' ? 5 : parseInt(searchParams.beds);
      if (searchParams.beds === '5') {
        if ((property.beds || 0) < 5) return false;
      } else {
        if ((property.beds || 0) !== bedCount) return false;
      }
    }
    
    // Status filter
    if (searchParams.status && searchParams.status !== '') {
      if (property.status !== searchParams.status) {
        return false;
      }
    }
    // Price filter
    if (property.price < searchParams.minPrice || property.price > searchParams.maxPrice) {
      return false;
    }
    
    // City/Emirate filter
    if (searchParams.city && searchParams.city !== '' && searchParams.city !== 'all-emirates') {
      const locationData = locationsData.find(loc => loc.id === property.locationId);
      if (!locationData?.city.toLowerCase().includes(searchParams.city.toLowerCase())) {
        return false;
      }
    }
    
    // Advanced filters
    if (searchParams.bedrooms && searchParams.bedrooms !== '' && searchParams.bedrooms !== 'any-beds') {
      const bedroomCount = searchParams.bedrooms === 'studio' ? 0 : 
                          searchParams.bedrooms === '6+' ? 6 : parseInt(searchParams.bedrooms);
      if (searchParams.bedrooms === '6+') {
        if ((property.beds || 0) < 6) return false;
      } else {
        if ((property.beds || 0) !== bedroomCount) return false;
      }
    }
    
    if (searchParams.bathrooms && searchParams.bathrooms !== '' && searchParams.bathrooms !== 'any-baths') {
      const bathroomCount = searchParams.bathrooms === '5+' ? 5 : parseInt(searchParams.bathrooms);
      if (searchParams.bathrooms === '5+') {
        if ((property.baths || 0) < 5) return false;
      } else {
        if ((property.baths || 0) !== bathroomCount) return false;
      }
    }
    
    // Area filter
    if (searchParams.minArea > 0 && (property.area || 0) < searchParams.minArea) {
      return false;
    }
    if (searchParams.maxArea < 5000 && (property.area || 0) > searchParams.maxArea) {
      return false;
    }
    
    // Golden Visa eligibility
    if (searchParams.isGoldenVisaEligible && property.price < 2000000) {
      return false;
    }
    
    // Features filter
    if (searchParams.features.length > 0 && property.features) {
      const hasAllFeatures = searchParams.features.every(feature => 
        property.features?.some(propFeature => 
          propFeature.toLowerCase().includes(feature.toLowerCase())
        )
      );
      if (!hasAllFeatures) return false;
    }
    
    // Amenities filter
    if (searchParams.amenities.length > 0 && property.amenities) {
      const hasAllAmenities = searchParams.amenities.every(amenity => 
        property.amenities?.some(propAmenity => 
          propAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasAllAmenities) return false;
    }
    
    // Developer filter
    if (searchParams.developer && searchParams.developer !== '' && searchParams.developer !== 'any-developer') {
      const developerId = parseInt(searchParams.developer);
      if (property.developerId !== developerId) {
        return false;
      }
    }
    
    // Completion year filter
    if (searchParams.handoverYear && searchParams.handoverYear !== '' && searchParams.handoverYear !== 'any-year') {
      if (searchParams.handoverYear === '2028') {
        if (!property.completionYear || property.completionYear < 2028) return false;
      } else {
        const year = parseInt(searchParams.handoverYear);
        if (!property.completionYear || property.completionYear !== year) return false;
      }
    }
    
    // Furnishing filter
    if (searchParams.furnishing && searchParams.furnishing !== '' && searchParams.furnishing !== 'any-furnishing') {
      // This would need to be added to property data structure
      // For now, we'll skip this filter since it's not in the current property model
    }
    
    return true;
  });

  // Apply sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        // Sort by newest first (higher ID = newer)
        return (b.id || 0) - (a.id || 0);
      case 'featured':
      default:
        // Featured properties first, then by premium, exclusive, new launch
        const aScore = (a.premium ? 3 : 0) + (a.exclusive ? 2 : 0) + (a.newLaunch ? 1 : 0);
        const bScore = (b.premium ? 3 : 0) + (b.exclusive ? 2 : 0) + (b.newLaunch ? 1 : 0);
        return bScore - aScore;
    }
  });

  // Calculate pagination
  const totalProperties = sortedProperties.length;
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const properties = sortedProperties.slice(startIndex, endIndex);
  
  const isLoading = false;
  const isError = false;

  // Use locations from frontend data
  const locations = locationsData;

  const handleSearch = () => {
    // Update URL with search params without page reload
    const params = new URLSearchParams();
    if (searchParams.propertyType) params.append('type', searchParams.propertyType);
    if (searchParams.locationId) params.append('location', searchParams.locationId);
    if (searchParams.maxPrice) params.append('budget', searchParams.maxPrice.toString());
    
    setLocation(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchParams({
      propertyType: '',
      locationId: '',
      city: '',
      category: 'residential',
      minPrice: 0,
      maxPrice: 50000000,
      beds: '',
      status: '',
      bedrooms: '',
      bathrooms: '',
      minArea: 0,
      maxArea: 5000,
      landmark: '',
      developer: '',
      handoverYear: '',
      furnishing: '',
      features: [],
      amenities: [],
      isGoldenVisaEligible: false,
      isMortgageAvailable: false
    });
    setLocation('/properties');
  };

  const hasActiveFilters = () => {
    return searchParams.propertyType !== '' || 
           searchParams.locationId !== '' || 
           searchParams.city !== '' || 
           searchParams.beds !== '' || 
           searchParams.status !== '' ||
           searchParams.minPrice > 0 ||
           searchParams.maxPrice < 50000000;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 animated-bg"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Properties in Dubai" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 text-shadow-lg">Discover Exceptional Properties</h1>
            <p className="text-lg text-white mb-0 text-shadow-md font-medium">
              Explore our curated collection of premium properties across the UAE
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => {
              console.log('Filter button clicked, setting showMobileFilters to true');
              setShowMobileFilters(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl"
          >
            <Filter size={20} />
            Filter Properties
          </Button>
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9999] lg:hidden"
              onClick={() => {
                console.log('Background clicked, closing modal');
                setShowMobileFilters(false);
              }}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Filter Header - Sticky */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Filter Properties</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </Button>
                </div>

                {/* Mobile Filter Content - Scrollable */}
                <div className="overflow-y-auto h-full pb-20 px-4 py-4">
                  <div className="space-y-6">
                    {/* Category Toggle */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            searchParams.category === 'residential'
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:text-gray-800'
                          }`}
                          onClick={() => setSearchParams({...searchParams, category: 'residential'})}
                        >
                          Residential
                        </button>
                        <button
                          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            searchParams.category === 'commercial'
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:text-gray-800'
                          }`}
                          onClick={() => setSearchParams({...searchParams, category: 'commercial'})}
                        >
                          Commercial
                        </button>
                      </div>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Property Type</label>
                      <Select 
                        value={searchParams.propertyType}
                        onValueChange={(value) => setSearchParams({...searchParams, propertyType: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-types">All Types</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="duplex">Duplex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Emirate/City */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Emirate</label>
                      <Select 
                        value={searchParams.city}
                        onValueChange={(value) => setSearchParams({...searchParams, city: value, locationId: ''})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select emirate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-emirates">All Emirates</SelectItem>
                          <SelectItem value="Dubai">Dubai</SelectItem>
                          <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                          <SelectItem value="Sharjah">Sharjah</SelectItem>
                          <SelectItem value="Ajman">Ajman</SelectItem>
                          <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                          <SelectItem value="Fujairah">Fujairah</SelectItem>
                          <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Area/Location */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Area</label>
                      <Select 
                        value={searchParams.locationId}
                        onValueChange={(value) => setSearchParams({...searchParams, locationId: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-areas">All Areas</SelectItem>
                          {locations
                            .filter(location => 
                              !searchParams.city || 
                              searchParams.city === 'all-emirates' || 
                              location.city === searchParams.city
                            )
                            .map((location) => (
                              <SelectItem key={location.id} value={location.id.toString()}>
                                {location.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Price Range: AED {searchParams.minPrice.toLocaleString()} - AED {searchParams.maxPrice.toLocaleString()}
                      </label>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500">Min Price</label>
                          <Slider
                            value={[searchParams.minPrice]}
                            onValueChange={(value) => setSearchParams({...searchParams, minPrice: value[0]})}
                            max={50000000}
                            step={100000}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Max Price</label>
                          <Slider
                            value={[searchParams.maxPrice]}
                            onValueChange={(value) => setSearchParams({...searchParams, maxPrice: value[0]})}
                            max={50000000}
                            step={100000}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                      <Select 
                        value={searchParams.beds}
                        onValueChange={(value) => setSearchParams({...searchParams, beds: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any-beds">Any</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Property Status */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Property Status</label>
                      <Select 
                        value={searchParams.status}
                        onValueChange={(value) => setSearchParams({...searchParams, status: value})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Status</SelectItem>
                          <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                          <SelectItem value="Off-Plan">Off-Plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Property Features */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Features</label>
                      <div className="space-y-2">
                        {['balcony', 'parking', 'maids room', 'study'].map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-${feature}`}
                              checked={searchParams.features.includes(feature)}
                              onCheckedChange={(checked) => {
                                const newFeatures = checked 
                                  ? [...searchParams.features, feature]
                                  : searchParams.features.filter(f => f !== feature);
                                setSearchParams(prev => ({...prev, features: newFeatures}));
                              }}
                            />
                            <label htmlFor={`mobile-${feature}`} className="text-sm capitalize">
                              {feature === 'maids room' ? "Maid's Room" : feature === 'study' ? 'Study Room' : feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amenities</label>
                      <div className="space-y-2">
                        {['pool', 'gym', 'playground', 'security'].map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-${amenity}`}
                              checked={searchParams.amenities.includes(amenity)}
                              onCheckedChange={(checked) => {
                                const newAmenities = checked 
                                  ? [...searchParams.amenities, amenity]
                                  : searchParams.amenities.filter(a => a !== amenity);
                                setSearchParams(prev => ({...prev, amenities: newAmenities}));
                              }}
                            />
                            <label htmlFor={`mobile-${amenity}`} className="text-sm">
                              {amenity === 'pool' ? 'Swimming Pool' : 
                               amenity === 'gym' ? 'Gymnasium' : 
                               amenity === 'playground' ? "Children's Play Area" : 
                               amenity === 'security' ? '24/7 Security' : amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Options */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Special Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-goldenvisa"
                            checked={searchParams.isGoldenVisaEligible}
                            onCheckedChange={(checked) => setSearchParams(prev => ({...prev, isGoldenVisaEligible: !!checked}))}
                          />
                          <label htmlFor="mobile-goldenvisa" className="text-sm">Golden Visa Eligible</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-mortgage"
                            checked={searchParams.isMortgageAvailable}
                            onCheckedChange={(checked) => setSearchParams(prev => ({...prev, isMortgageAvailable: !!checked}))}
                          />
                          <label htmlFor="mobile-mortgage" className="text-sm">Mortgage Available</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Filter Footer - Sticky */}
                <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                    onClick={() => {
                      handleSearch();
                      setShowMobileFilters(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full py-3"
                    onClick={() => {
                      clearFilters();
                      setShowMobileFilters(false);
                    }}
                  >
                    Clear All Filters
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full py-2 text-gray-500"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X size={16} className="mr-2" />
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop Only */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-montserrat font-semibold mb-6">Filter Properties</h2>
              
              <div className="space-y-6">
                {/* Category Toggle */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        searchParams.category === 'residential'
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setSearchParams({...searchParams, category: 'residential'})}
                    >
                      Residential
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        searchParams.category === 'commercial'
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setSearchParams({...searchParams, category: 'commercial'})}
                    >
                      Commercial
                    </button>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select 
                    value={searchParams.propertyType}
                    onValueChange={(value) => setSearchParams({...searchParams, propertyType: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Emirate/City */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Emirate</label>
                  <Select 
                    value={searchParams.city}
                    onValueChange={(value) => setSearchParams({...searchParams, city: value, locationId: ''})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Emirate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-emirates">All Emirates</SelectItem>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                      <SelectItem value="sharjah">Sharjah</SelectItem>
                      <SelectItem value="ajman">Ajman</SelectItem>
                      <SelectItem value="rasalkhaimah">Ras Al Khaimah</SelectItem>
                      <SelectItem value="fujairah">Fujairah</SelectItem>
                      <SelectItem value="ummalquwain">Umm Al Quwain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Area/Location */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Area</label>
                  <Select 
                    value={searchParams.locationId}
                    onValueChange={(value) => setSearchParams(prev => ({...prev, locationId: value}))}
                    disabled={!searchParams.city}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-areas">All Areas</SelectItem>
                      {searchParams.city === 'dubai' && (
                        <>
                          <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                          <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                          <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                          <SelectItem value="business-bay">Business Bay</SelectItem>
                          <SelectItem value="jumeirah-lake-towers">Jumeirah Lake Towers (JLT)</SelectItem>
                          <SelectItem value="jumeirah-village-circle">Jumeirah Village Circle (JVC)</SelectItem>
                          <SelectItem value="jumeirah-village-triangle">Jumeirah Village Triangle (JVT)</SelectItem>
                          <SelectItem value="dubai-silicon-oasis">Dubai Silicon Oasis</SelectItem>
                          <SelectItem value="arabian-ranches">Arabian Ranches</SelectItem>
                          <SelectItem value="the-springs">The Springs</SelectItem>
                          <SelectItem value="the-meadows">The Meadows</SelectItem>
                          <SelectItem value="emirates-hills">Emirates Hills</SelectItem>
                          <SelectItem value="al-barari">Al Barari</SelectItem>
                          <SelectItem value="dubai-sports-city">Dubai Sports City</SelectItem>
                          <SelectItem value="dubai-motor-city">Dubai Motor City</SelectItem>
                          <SelectItem value="international-city">International City</SelectItem>
                          <SelectItem value="discovery-gardens">Discovery Gardens</SelectItem>
                          <SelectItem value="al-furjan">Al Furjan</SelectItem>
                          <SelectItem value="mirdif-hills">Mirdif Hills</SelectItem>
                          <SelectItem value="dubai-south">Dubai South</SelectItem>
                          <SelectItem value="bluewaters-island">Bluewaters Island</SelectItem>
                          <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                          <SelectItem value="dubai-creek-harbour">Dubai Creek Harbour</SelectItem>
                          <SelectItem value="dubai-hills-estate">Dubai Hills Estate</SelectItem>
                          <SelectItem value="tilal-al-ghaf">Tilal Al Ghaf</SelectItem>
                          <SelectItem value="damac-hills">DAMAC Hills</SelectItem>
                          <SelectItem value="damac-lagoons">DAMAC Lagoons</SelectItem>
                          <SelectItem value="city-walk">City Walk</SelectItem>
                          <SelectItem value="la-mer">La Mer</SelectItem>
                          <SelectItem value="pearl-jumeirah">Pearl Jumeirah</SelectItem>
                          <SelectItem value="dubai-harbour">Dubai Harbour</SelectItem>
                          <SelectItem value="al-wasl">Al Wasl</SelectItem>
                          <SelectItem value="barsha-heights">Barsha Heights (Tecom)</SelectItem>
                          <SelectItem value="dubai-production-city">Dubai Production City</SelectItem>
                          <SelectItem value="dubai-studio-city">Dubai Studio City</SelectItem>
                          <SelectItem value="dubai-science-park">Dubai Science Park</SelectItem>
                          <SelectItem value="dubai-investment-park">Dubai Investment Park (DIP)</SelectItem>
                          <SelectItem value="difc">Dubai International Financial Centre (DIFC)</SelectItem>
                          <SelectItem value="madinat-jumeirah-living">Madinat Jumeirah Living</SelectItem>
                          <SelectItem value="liwan">Liwan</SelectItem>
                          <SelectItem value="remraam">Remraam</SelectItem>
                          <SelectItem value="al-sufouh">Al Sufouh</SelectItem>
                        </>
                      )}
                      {searchParams.city === 'abudhabi' && (
                        <>
                          <SelectItem value="yas-island">Yas Island</SelectItem>
                          <SelectItem value="saadiyat-island">Saadiyat Island</SelectItem>
                          <SelectItem value="al-reem-island">Al Reem Island</SelectItem>
                          <SelectItem value="al-maryah-island">Al Maryah Island</SelectItem>
                          <SelectItem value="masdar-city">Masdar City</SelectItem>
                          <SelectItem value="al-raha-beach">Al Raha Beach</SelectItem>
                          <SelectItem value="al-ghadeer">Al Ghadeer</SelectItem>
                          <SelectItem value="al-reef">Al Reef</SelectItem>
                          <SelectItem value="al-shamkha">Al Shamkha</SelectItem>
                          <SelectItem value="al-raha-gardens">Al Raha Gardens</SelectItem>
                          <SelectItem value="hydra-village">Hydra Village</SelectItem>
                        </>
                      )}
                      {searchParams.city === 'sharjah' && (
                        <>
                          <SelectItem value="aljada">Aljada</SelectItem>
                          <SelectItem value="tilal-city">Tilal City</SelectItem>
                          <SelectItem value="maryam-island">Maryam Island</SelectItem>
                          <SelectItem value="al-mamsha">Al Mamsha</SelectItem>
                          <SelectItem value="sharjah-waterfront-city">Sharjah Waterfront City</SelectItem>
                          <SelectItem value="sharjah-garden-city">Sharjah Garden City</SelectItem>
                          <SelectItem value="al-khan">Al Khan</SelectItem>
                        </>
                      )}
                      {searchParams.city === 'ajman' && (
                        <>
                          <SelectItem value="al-zorah">Al Zorah</SelectItem>
                          <SelectItem value="emirates-city">Emirates City</SelectItem>
                          <SelectItem value="ajman-one">Ajman One</SelectItem>
                          <SelectItem value="city-towers">City Towers</SelectItem>
                          <SelectItem value="al-humaid-city">Al Humaid City</SelectItem>
                          <SelectItem value="marmooka-city">Marmooka City</SelectItem>
                          <SelectItem value="mermaid-city">Mermaid City</SelectItem>
                        </>
                      )}
                      {searchParams.city === 'rasalkhaimah' && (
                        <>
                          <SelectItem value="al-hamra-village">Al Hamra Village</SelectItem>
                          <SelectItem value="mina-al-arab">Mina Al Arab</SelectItem>
                          <SelectItem value="al-marjan-island">Al Marjan Island</SelectItem>
                          <SelectItem value="flamingo-villas">Flamingo Villas</SelectItem>
                          <SelectItem value="julphar-towers">Julphar Towers</SelectItem>
                        </>
                      )}
                      {searchParams.city === 'fujairah' && (
                        <>
                          <SelectItem value="al-faseel">Al Faseel</SelectItem>
                          <SelectItem value="al-qurm">Al Qurm</SelectItem>
                          <SelectItem value="address-fujairah">Address Fujairah</SelectItem>
                          <SelectItem value="fujairah-beach">Fujairah Beach</SelectItem>
                        </>
                      )}
                      {searchParams.city === 'ummalquwain' && (
                        <>
                          <SelectItem value="flamingo-beach">Flamingo Beach</SelectItem>
                          <SelectItem value="al-salamah">Al Salamah</SelectItem>
                          <SelectItem value="old-town">Old Town</SelectItem>
                        </>
                      )}
                      {!searchParams.city && locations?.map((location: any) => (
                        <SelectItem key={location.id} value={location.id.toString()}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range (AED)</label>
                  <div className="mb-4 mt-6">
                    <Slider
                      defaultValue={[searchParams.maxPrice]}
                      max={50000000}
                      step={500000}
                      onValueChange={(values) => setSearchParams(prev => ({...prev, maxPrice: values[0]}))}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{formatPrice(0, 'AED')}</span>
                    <span>Up to {formatPrice(searchParams.maxPrice, 'AED')}</span>
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                  <Select 
                    value={searchParams.beds}
                    onValueChange={(value) => setSearchParams(prev => ({...prev, beds: value}))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-beds">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Status */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Status</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ready"
                        checked={searchParams.status === 'Ready'}
                        onCheckedChange={(checked) => setSearchParams(prev => ({...prev, status: checked ? 'Ready' : ''}))}
                      />
                      <label htmlFor="ready" className="text-sm">Ready to Move</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="offplan"
                        checked={searchParams.status === 'Off-Plan'}
                        onCheckedChange={(checked) => setSearchParams(prev => ({...prev, status: checked ? 'Off-Plan' : ''}))}
                      />
                      <label htmlFor="offplan" className="text-sm">Off-Plan</label>
                    </div>
                  </div>
                </div>
                
                {/* Advanced Filters */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Bathrooms</label>
                  <Select 
                    value={searchParams.bathrooms}
                    onValueChange={(value) => setSearchParams(prev => ({...prev, bathrooms: value}))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-baths">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Area (sq ft)</label>
                  <div className="mb-4 mt-6">
                    <Slider
                      defaultValue={[searchParams.minArea, searchParams.maxArea]}
                      max={5000}
                      min={0}
                      step={100}
                      onValueChange={(values) => setSearchParams(prev => ({...prev, minArea: values[0], maxArea: values[1]}))}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{formatArea(searchParams.minArea)}</span>
                    <span>{formatArea(searchParams.maxArea)}</span>
                  </div>
                </div>

                {/* Developer Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Developer</label>
                  <Select 
                    value={searchParams.developer}
                    onValueChange={(value) => setSearchParams(prev => ({...prev, developer: value}))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Developer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-developer">Any Developer</SelectItem>
                      {developersData.map((developer) => (
                        <SelectItem key={developer.id} value={developer.id.toString()}>
                          {developer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Completion Year */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Completion Year</label>
                  <Select 
                    value={searchParams.handoverYear}
                    onValueChange={(value) => setSearchParams(prev => ({...prev, handoverYear: value}))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-year">Any Year</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Features */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Features</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="balcony"
                        checked={searchParams.features.includes('balcony')}
                        onCheckedChange={(checked) => {
                          const newFeatures = checked 
                            ? [...searchParams.features, 'balcony']
                            : searchParams.features.filter(f => f !== 'balcony');
                          setSearchParams(prev => ({...prev, features: newFeatures}));
                        }}
                      />
                      <label htmlFor="balcony" className="text-sm">Balcony</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="parking"
                        checked={searchParams.features.includes('parking')}
                        onCheckedChange={(checked) => {
                          const newFeatures = checked 
                            ? [...searchParams.features, 'parking']
                            : searchParams.features.filter(f => f !== 'parking');
                          setSearchParams(prev => ({...prev, features: newFeatures}));
                        }}
                      />
                      <label htmlFor="parking" className="text-sm">Parking</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="maidsroom"
                        checked={searchParams.features.includes('maids room')}
                        onCheckedChange={(checked) => {
                          const newFeatures = checked 
                            ? [...searchParams.features, 'maids room']
                            : searchParams.features.filter(f => f !== 'maids room');
                          setSearchParams(prev => ({...prev, features: newFeatures}));
                        }}
                      />
                      <label htmlFor="maidsroom" className="text-sm">Maid's Room</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="study"
                        checked={searchParams.features.includes('study')}
                        onCheckedChange={(checked) => {
                          const newFeatures = checked 
                            ? [...searchParams.features, 'study']
                            : searchParams.features.filter(f => f !== 'study');
                          setSearchParams(prev => ({...prev, features: newFeatures}));
                        }}
                      />
                      <label htmlFor="study" className="text-sm">Study Room</label>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Amenities</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pool"
                        checked={searchParams.amenities.includes('pool')}
                        onCheckedChange={(checked) => {
                          const newAmenities = checked 
                            ? [...searchParams.amenities, 'pool']
                            : searchParams.amenities.filter(a => a !== 'pool');
                          setSearchParams(prev => ({...prev, amenities: newAmenities}));
                        }}
                      />
                      <label htmlFor="pool" className="text-sm">Swimming Pool</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="gym"
                        checked={searchParams.amenities.includes('gym')}
                        onCheckedChange={(checked) => {
                          const newAmenities = checked 
                            ? [...searchParams.amenities, 'gym']
                            : searchParams.amenities.filter(a => a !== 'gym');
                          setSearchParams(prev => ({...prev, amenities: newAmenities}));
                        }}
                      />
                      <label htmlFor="gym" className="text-sm">Gymnasium</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="playground"
                        checked={searchParams.amenities.includes('playground')}
                        onCheckedChange={(checked) => {
                          const newAmenities = checked 
                            ? [...searchParams.amenities, 'playground']
                            : searchParams.amenities.filter(a => a !== 'playground');
                          setSearchParams(prev => ({...prev, amenities: newAmenities}));
                        }}
                      />
                      <label htmlFor="playground" className="text-sm">Children's Play Area</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="security"
                        checked={searchParams.amenities.includes('security')}
                        onCheckedChange={(checked) => {
                          const newAmenities = checked 
                            ? [...searchParams.amenities, 'security']
                            : searchParams.amenities.filter(a => a !== 'security');
                          setSearchParams(prev => ({...prev, amenities: newAmenities}));
                        }}
                      />
                      <label htmlFor="security" className="text-sm">24/7 Security</label>
                    </div>
                  </div>
                </div>

                {/* Golden Visa & Mortgage */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Special Options</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="goldenvisa"
                        checked={searchParams.isGoldenVisaEligible}
                        onCheckedChange={(checked) => setSearchParams(prev => ({...prev, isGoldenVisaEligible: !!checked}))}
                      />
                      <label htmlFor="goldenvisa" className="text-sm">Golden Visa Eligible</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mortgage"
                        checked={searchParams.isMortgageAvailable}
                        onCheckedChange={(checked) => setSearchParams(prev => ({...prev, isMortgageAvailable: !!checked}))}
                      />
                      <label htmlFor="mortgage" className="text-sm">Mortgage Available</label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button 
                    className="bg-primary hover:bg-teal-dark text-white py-2 px-4 rounded-md transition-colors duration-200"
                    onClick={handleSearch}
                  >
                    Apply Filters
                  </button>
                  <button 
                    className="bg-gray-100 hover:bg-gray-200 text-foreground py-2 px-4 rounded-md transition-colors duration-200"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Listing */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h2 className="text-2xl font-montserrat font-semibold mb-4 md:mb-0">
                  {isLoading ? 'Loading properties...' : 
                   isError ? 'Error loading properties' : 
                   totalProperties === 0 ? '0 Properties Found (Page 1 of 0)' :
                   hasActiveFilters() ? 
                     `${totalProperties} Properties Found (Page ${currentPage} of ${totalPages})` :
                     `Total Properties - ${totalProperties} (Page ${currentPage} of ${totalPages})`}
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <SubmitListingForm 
                    buttonVariant="default"
                    buttonClass="bg-primary text-white mb-4 md:mb-0 w-full md:w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Sort by:</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                        <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <Skeleton className="h-60 w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-6 w-1/4 mb-4" />
                      <div className="border-t border-gray-100 pt-4">
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl text-red-500 font-medium mb-2">Error Loading Properties</h3>
                <p className="text-gray-600 mb-4">We're unable to load properties at this time. Please try again later.</p>
                <button 
                  className="bg-primary hover:bg-teal-dark text-white py-2 px-4 rounded-md transition-colors duration-200"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search filters to find more properties.</p>
                <button 
                  className="bg-primary hover:bg-teal-dark text-white py-2 px-4 rounded-md transition-colors duration-200"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property: any) => {
                  const images = parsePropertyImages(property.images);
                  const featuredImage = images.length > 0 ? images[0] : '';
                  
                  return (
                    <motion.div 
                      key={property.id}
                      className="property-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative">
                        <img 
                          src={featuredImage} 
                          alt={property.title} 
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {property.premium && (
                            <Badge variant="premium">Premium</Badge>
                          )}
                          {property.exclusive && (
                            <Badge variant="exclusive">Exclusive</Badge>
                          )}
                          {property.newLaunch && (
                            <Badge variant="new">New Launch</Badge>
                          )}
                          {property.fastSelling && (
                            <Badge variant="fastSelling">Fast Selling</Badge>
                          )}
                          {property.status === 'off-plan' && (
                            <Badge variant="destructive">Off Plan</Badge>
                          )}
                          {property.status === 'ready' && (
                            <Badge variant="default">Ready to Move In</Badge>
                          )}
                          {property.completionYear && (
                            <Badge variant="secondary">
                              Completion {property.completionQuarter ? `${property.completionQuarter} ` : ''}{property.completionYear}
                            </Badge>
                          )}
                        </div>
                        {property.soldOut && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <div className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold animate-pulse">
                              SOLD OUT
                            </div>
                          </div>
                        )}
                        {property.comingSoon && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <Badge variant="comingSoon" className="px-8 py-4 text-xl font-bold">
                              COMING SOON
                            </Badge>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <button 
                            className="bg-white/80 hover:bg-white text-foreground p-2 rounded-full transition-all duration-200"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const url = `${window.location.origin}/properties/${property.id}`;
                              if (navigator.share) {
                                navigator.share({
                                  title: property.title,
                                  text: `Check out this property: ${property.title}`,
                                  url: url
                                });
                              } else {
                                navigator.clipboard.writeText(url);
                              }
                            }}
                          >
                            <i className="fas fa-share-alt"></i>
                          </button>
                        </div>
                        
                        {/* Hover overlay with View Property button */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Link href={`/properties/${property.id}`}>
                            <button className="bg-white text-gray-900 hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                              View Property
                            </button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-montserrat text-xl font-semibold mb-1">{property.title}</h3>
                            <p className="text-gray-500 flex items-center">
                              <i className="fas fa-map-marker-alt text-primary mr-2"></i> {property.address}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex flex-col items-end gap-2">
                              <p className="text-secondary font-bold text-xl">{formatPrice(property.price)}</p>
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                                Starting From
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4">
                          <div className="flex justify-between text-gray-600">
                            <div className="flex items-center">
                              <i className="fas fa-bed text-primary mr-2"></i>
                              <span>{property.beds} Beds</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-bath text-primary mr-2"></i>
                              <span>{property.baths} Baths</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-ruler-combined text-primary mr-2"></i>
                              <span>{formatArea(property.area)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 card-actions">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{property.status}</span>
                              {/* Golden Visa Indicator */}
                              <GoldenVisaIndicator price={property.price} />
                            </div>
                            <div className="flex space-x-2">
                              <button className="bg-gray-100 hover:bg-gray-200 text-foreground p-2 rounded-full transition-colors duration-200">
                                <i className="fas fa-share-alt"></i>
                              </button>
                              <Link href={`/properties/${property.id}`}>
                                <a className="bg-gray-100 hover:bg-gray-200 text-foreground p-2 rounded-full transition-colors duration-200">
                                  <i className="fas fa-info-circle"></i>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <i className="fas fa-chevron-left mr-1"></i> Previous
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = pageNum === 1 || 
                                   pageNum === totalPages || 
                                   Math.abs(pageNum - currentPage) <= 1;
                    
                    if (!showPage && pageNum !== 2 && pageNum !== totalPages - 1) {
                      // Show ellipsis for gaps
                      if (pageNum === 2 && currentPage > 4) {
                        return <span key={pageNum} className="px-2 text-gray-500">...</span>;
                      }
                      if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                        return <span key={pageNum} className="px-2 text-gray-500">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          pageNum === currentPage
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                  >
                    Next <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-primary py-16 px-4 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 0L600 100V400H0L500 0Z" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-montserrat font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Let our expert real estate consultants help you find your perfect property. We have access to exclusive listings that might not be available online.
            </p>
            
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-montserrat font-medium transition-colors duration-200 inline-flex items-center justify-center shadow-md">
                <i className="fas fa-phone-alt mr-2"></i> Contact a Consultant
              </a>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Properties;
