import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const HeroSection = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    city: '',
    locationId: '',
    budget: '',
    status: '', // Ready to Move / Off Plan filter
    bedrooms: '',
    bathrooms: '',
    minArea: 0,
    maxArea: 5000,
    landmark: '',
    developer: '',
    handoverYear: '',
    furnishing: '',
    view: '',
    amenities: [] as string[],
    floor: '',
    features: [] as string[],
    isGoldenVisaEligible: false,
    isMortgageAvailable: false
  });
  const { toast } = useToast();

  // Fetch locations for the dropdown
  const { data: locations } = useQuery({
    queryKey: ['/api/locations'],
    staleTime: 300000 // 5 minutes
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate search parameters
    if (!searchParams.propertyType && !searchParams.city && !searchParams.locationId && 
        !searchParams.budget && !searchParams.status && !searchParams.bedrooms && 
        !searchParams.bathrooms && searchParams.features.length === 0 && 
        searchParams.amenities.length === 0 && !searchParams.isGoldenVisaEligible) {
      toast({
        title: "Search criteria needed",
        description: "Please select at least one search criteria",
        variant: "destructive"
      });
      return;
    }
    
    // Construct the search URL
    const params = new URLSearchParams();
    
    // Add basic filters
    if (searchParams.propertyType) params.append('type', searchParams.propertyType);
    if (searchParams.city) params.append('city', searchParams.city);
    if (searchParams.locationId) params.append('location', searchParams.locationId);
    if (searchParams.budget) params.append('budget', searchParams.budget);
    if (searchParams.status) params.append('status', searchParams.status);
    
    // Add advanced filters
    if (searchParams.bedrooms) params.append('bedrooms', searchParams.bedrooms);
    if (searchParams.bathrooms) params.append('bathrooms', searchParams.bathrooms);
    if (searchParams.minArea > 0) params.append('minArea', searchParams.minArea.toString());
    if (searchParams.maxArea < 5000) params.append('maxArea', searchParams.maxArea.toString());
    if (searchParams.landmark) params.append('landmark', searchParams.landmark);
    if (searchParams.developer) params.append('developer', searchParams.developer);
    if (searchParams.handoverYear) params.append('handoverYear', searchParams.handoverYear);
    if (searchParams.furnishing) params.append('furnishing', searchParams.furnishing);
    
    // Add features and amenities as arrays
    searchParams.features.forEach(feature => params.append('features', feature));
    searchParams.amenities.forEach(amenity => params.append('amenities', amenity));
    
    // Add investment filters
    if (searchParams.isGoldenVisaEligible) params.append('isGoldenVisaEligible', 'true');
    if (searchParams.isMortgageAvailable) params.append('isMortgageAvailable', 'true');
    
    // Navigate to the search results page
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-dark-darker">
        {/* Background image with overlay */}
        <img 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Dubai Skyline" 
          className="object-cover w-full h-full opacity-70"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-4 leading-tight text-shadow">
            Discover <span className="text-secondary">Luxurious</span> Properties in Dubai
          </h1>
          <p className="text-xl text-white/90 mb-8 font-light max-w-xl">
            Explore exclusive residential and commercial opportunities across the UAE with Dubai's premier real estate brokerage
          </p>
          
          {/* Search Bar */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchParams.propertyType}
                    onChange={(e) => setSearchParams({...searchParams, propertyType: e.target.value})}
                  >
                    <option value="">Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>
                <div>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchParams.city}
                    onChange={(e) => {
                      // Reset location when city changes
                      setSearchParams({...searchParams, city: e.target.value, locationId: ''});
                    }}
                  >
                    <option value="">Select City (Emirate)</option>
                    <option value="dubai">Dubai</option>
                    <option value="abudhabi">Abu Dhabi</option>
                    <option value="sharjah">Sharjah</option>
                    <option value="ajman">Ajman</option>
                    <option value="rasalkhaimah">Ras Al Khaimah</option>
                    <option value="fujairah">Fujairah</option>
                    <option value="ummalquwain">Umm Al Quwain</option>
                  </select>
                </div>
                <div>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchParams.locationId}
                    onChange={(e) => setSearchParams({...searchParams, locationId: e.target.value})}
                    disabled={!searchParams.city}
                  >
                    <option value="">Select Area</option>
                    {locations && Array.isArray(locations) ? 
                      locations
                        .filter((location: any) => 
                          !searchParams.city || 
                          location.city?.toLowerCase() === searchParams.city.toLowerCase()
                        )
                        .map((location: any) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        )) 
                      : null}
                  </select>
                </div>
                <div>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchParams.budget}
                    onChange={(e) => setSearchParams({...searchParams, budget: e.target.value})}
                  >
                    <option value="">Budget</option>
                    <option value="1000000">Up to AED 1M</option>
                    <option value="3000000">AED 1M - 3M</option>
                    <option value="5000000">AED 3M - 5M</option>
                    <option value="10000000">AED 5M - 10M</option>
                    <option value="999999999">AED 10M+</option>
                  </select>
                </div>
              </div>

              {/* Property Status Filter Buttons */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ${
                      searchParams.status === 'ready' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSearchParams({
                      ...searchParams, 
                      status: searchParams.status === 'ready' ? '' : 'ready'
                    })}
                  >
                    <i className="fas fa-check-circle mr-2"></i> Ready to Move In
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ${
                      searchParams.status === 'off-plan' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSearchParams({
                      ...searchParams, 
                      status: searchParams.status === 'off-plan' ? '' : 'off-plan'
                    })}
                  >
                    <i className="fas fa-hard-hat mr-2"></i> Off Plan
                  </button>
                </div>

                <button 
                  type="submit"
                  className="bg-primary hover:bg-teal-dark text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 shadow-md"
                >
                  <i className="fas fa-search mr-2"></i> Search
                </button>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-primary hover:text-teal-dark text-sm flex items-center"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  Advanced Filters 
                  <i className={`fas fa-chevron-${showAdvancedFilters ? 'up' : 'down'} ml-1`}></i>
                </button>
              </div>
              
              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Accordion type="single" collapsible className="w-full">
                    {/* Bedrooms & Bathrooms */}
                    <AccordionItem value="bedrooms-bathrooms">
                      <AccordionTrigger className="text-sm font-medium">Bedrooms & Bathrooms</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              value={searchParams.bedrooms}
                              onChange={(e) => setSearchParams({...searchParams, bedrooms: e.target.value})}
                            >
                              <option value="">Any</option>
                              <option value="studio">Studio</option>
                              <option value="1">1 Bedroom</option>
                              <option value="2">2 Bedrooms</option>
                              <option value="3">3 Bedrooms</option>
                              <option value="4">4 Bedrooms</option>
                              <option value="5">5 Bedrooms</option>
                              <option value="6+">6+ Bedrooms</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Bathrooms</label>
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              value={searchParams.bathrooms}
                              onChange={(e) => setSearchParams({...searchParams, bathrooms: e.target.value})}
                            >
                              <option value="">Any</option>
                              <option value="1">1 Bathroom</option>
                              <option value="2">2 Bathrooms</option>
                              <option value="3">3 Bathrooms</option>
                              <option value="4">4 Bathrooms</option>
                              <option value="5+">5+ Bathrooms</option>
                            </select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Area Size */}
                    <AccordionItem value="area-size">
                      <AccordionTrigger className="text-sm font-medium">Area Size</AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Min: {searchParams.minArea} sq.ft</span>
                            <span>Max: {searchParams.maxArea} sq.ft</span>
                          </div>
                          <Slider
                            defaultValue={[searchParams.minArea, searchParams.maxArea]}
                            max={10000}
                            step={100}
                            onValueChange={(values) => 
                              setSearchParams({
                                ...searchParams, 
                                minArea: values[0], 
                                maxArea: values[1]
                              })
                            }
                            className="my-4"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Developers & Landmarks */}
                    <AccordionItem value="developer-landmark">
                      <AccordionTrigger className="text-sm font-medium">Developer & Landmarks</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Developer</label>
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              value={searchParams.developer}
                              onChange={(e) => setSearchParams({...searchParams, developer: e.target.value})}
                            >
                              <option value="">Any Developer</option>
                              <option value="emaar">Emaar Properties</option>
                              <option value="damac">DAMAC Properties</option>
                              <option value="nakheel">Nakheel</option>
                              <option value="sobha">Sobha Realty</option>
                              <option value="meraas">Meraas</option>
                              <option value="aldar">Aldar Properties</option>
                              <option value="selectgroup">Select Group</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Nearby Landmark</label>
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              value={searchParams.landmark}
                              onChange={(e) => setSearchParams({...searchParams, landmark: e.target.value})}
                            >
                              <option value="">Select Landmark</option>
                              <option value="burj-khalifa">Burj Khalifa</option>
                              <option value="palm-jumeirah">Palm Jumeirah</option>
                              <option value="dubai-mall">Dubai Mall</option>
                              <option value="dubai-marina">Dubai Marina</option>
                              <option value="expo-city">Expo City</option>
                              <option value="dubai-creek">Dubai Creek</option>
                              <option value="difc">DIFC</option>
                              <option value="mall-of-emirates">Mall of Emirates</option>
                            </select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Property Features */}
                    <AccordionItem value="property-features">
                      <AccordionTrigger className="text-sm font-medium">Property Features</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="furnished" 
                              checked={searchParams.furnishing === 'furnished'}
                              onCheckedChange={(checked) => 
                                setSearchParams({...searchParams, furnishing: checked ? 'furnished' : ''})
                              }
                            />
                            <Label htmlFor="furnished" className="text-sm">Furnished</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="balcony" 
                              checked={searchParams.features.includes('balcony')}
                              onCheckedChange={(checked) => {
                                const newFeatures = checked 
                                  ? [...searchParams.features, 'balcony']
                                  : searchParams.features.filter(f => f !== 'balcony');
                                setSearchParams({...searchParams, features: newFeatures});
                              }}
                            />
                            <Label htmlFor="balcony" className="text-sm">Balcony</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="maids-room" 
                              checked={searchParams.features.includes('maids-room')}
                              onCheckedChange={(checked) => {
                                const newFeatures = checked 
                                  ? [...searchParams.features, 'maids-room']
                                  : searchParams.features.filter(f => f !== 'maids-room');
                                setSearchParams({...searchParams, features: newFeatures});
                              }}
                            />
                            <Label htmlFor="maids-room" className="text-sm">Maid's Room</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="private-pool" 
                              checked={searchParams.features.includes('private-pool')}
                              onCheckedChange={(checked) => {
                                const newFeatures = checked 
                                  ? [...searchParams.features, 'private-pool']
                                  : searchParams.features.filter(f => f !== 'private-pool');
                                setSearchParams({...searchParams, features: newFeatures});
                              }}
                            />
                            <Label htmlFor="private-pool" className="text-sm">Private Pool</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Building Amenities */}
                    <AccordionItem value="building-amenities">
                      <AccordionTrigger className="text-sm font-medium">Building Amenities</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="gym" 
                              checked={searchParams.amenities.includes('gym')}
                              onCheckedChange={(checked) => {
                                const newAmenities = checked 
                                  ? [...searchParams.amenities, 'gym']
                                  : searchParams.amenities.filter(a => a !== 'gym');
                                setSearchParams({...searchParams, amenities: newAmenities});
                              }}
                            />
                            <Label htmlFor="gym" className="text-sm">Gym</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="pool" 
                              checked={searchParams.amenities.includes('pool')}
                              onCheckedChange={(checked) => {
                                const newAmenities = checked 
                                  ? [...searchParams.amenities, 'pool']
                                  : searchParams.amenities.filter(a => a !== 'pool');
                                setSearchParams({...searchParams, amenities: newAmenities});
                              }}
                            />
                            <Label htmlFor="pool" className="text-sm">Swimming Pool</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="security" 
                              checked={searchParams.amenities.includes('security')}
                              onCheckedChange={(checked) => {
                                const newAmenities = checked 
                                  ? [...searchParams.amenities, 'security']
                                  : searchParams.amenities.filter(a => a !== 'security');
                                setSearchParams({...searchParams, amenities: newAmenities});
                              }}
                            />
                            <Label htmlFor="security" className="text-sm">24/7 Security</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="kids-area" 
                              checked={searchParams.amenities.includes('kids-area')}
                              onCheckedChange={(checked) => {
                                const newAmenities = checked 
                                  ? [...searchParams.amenities, 'kids-area']
                                  : searchParams.amenities.filter(a => a !== 'kids-area');
                                setSearchParams({...searchParams, amenities: newAmenities});
                              }}
                            />
                            <Label htmlFor="kids-area" className="text-sm">Kids Play Area</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Investment Filters */}
                    <AccordionItem value="investment-filters">
                      <AccordionTrigger className="text-sm font-medium">Investment Focused</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="golden-visa" 
                              checked={searchParams.isGoldenVisaEligible}
                              onCheckedChange={(checked) => 
                                setSearchParams({...searchParams, isGoldenVisaEligible: !!checked})
                              }
                            />
                            <Label htmlFor="golden-visa" className="text-sm">Golden Visa Eligible</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="mortgage" 
                              checked={searchParams.isMortgageAvailable}
                              onCheckedChange={(checked) => 
                                setSearchParams({...searchParams, isMortgageAvailable: !!checked})
                              }
                            />
                            <Label htmlFor="mortgage" className="text-sm">Mortgage Available</Label>
                          </div>
                          <div className="mt-3">
                            <Label className="text-sm font-medium mb-1 block">Handover Year</Label>
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              value={searchParams.handoverYear}
                              onChange={(e) => setSearchParams({...searchParams, handoverYear: e.target.value})}
                            >
                              <option value="">Any Year</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028+">2028 and beyond</option>
                            </select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm mr-2"
                      onClick={() => {
                        // Reset all advanced filters
                        setSearchParams({
                          ...searchParams,
                          bedrooms: '',
                          bathrooms: '',
                          minArea: 0,
                          maxArea: 5000,
                          landmark: '',
                          developer: '',
                          handoverYear: '',
                          furnishing: '',
                          view: '',
                          amenities: [],
                          floor: '',
                          features: [],
                          isGoldenVisaEligible: false,
                          isMortgageAvailable: false
                        });
                      }}
                    >
                      Clear Filters
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-teal-dark text-white px-4 py-2 rounded-md text-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-6 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="text-center">
              <p className="text-white text-3xl font-bold mb-1">1500+</p>
              <p className="text-white/80 text-sm">Properties</p>
            </div>
            <div className="text-center">
              <p className="text-white text-3xl font-bold mb-1">25+</p>
              <p className="text-white/80 text-sm">Developers</p>
            </div>
            <div className="text-center">
              <p className="text-white text-3xl font-bold mb-1">98%</p>
              <p className="text-white/80 text-sm">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-white text-3xl font-bold mb-1">15+</p>
              <p className="text-white/80 text-sm">Years Experience</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="custom-shape-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;