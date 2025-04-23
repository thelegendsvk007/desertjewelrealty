import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatArea, parsePropertyImages } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const Properties = () => {
  const [location, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    locationId: '',
    minPrice: 0,
    maxPrice: 50000000,
    beds: '',
    status: ''
  });

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const loc = params.get('location');
    const budget = params.get('budget');
    
    if (type) {
      setSearchParams(prev => ({ ...prev, propertyType: type }));
    }
    
    if (loc) {
      setSearchParams(prev => ({ ...prev, locationId: loc }));
    }
    
    if (budget) {
      setSearchParams(prev => ({ ...prev, maxPrice: parseInt(budget) }));
    }
  }, [location]);

  // Fetch properties with search parameters
  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['/api/properties/search', searchParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchParams.propertyType) params.append('propertyType', searchParams.propertyType);
      if (searchParams.locationId) params.append('locationId', searchParams.locationId);
      if (searchParams.maxPrice) params.append('price', searchParams.maxPrice.toString());
      if (searchParams.beds) params.append('beds', searchParams.beds);
      if (searchParams.status) params.append('status', searchParams.status);
      
      const res = await fetch(`/api/properties/search?${params.toString()}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch properties');
      return res.json();
    }
  });

  // Fetch locations for filter
  const { data: locations } = useQuery({
    queryKey: ['/api/locations'],
  });

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
      minPrice: 0,
      maxPrice: 50000000,
      beds: '',
      status: ''
    });
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
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-darker/40 to-dark-darker/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Discover Exceptional Properties</h1>
            <p className="text-lg text-white/80 mb-0">
              Explore our curated collection of premium properties across the UAE
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-montserrat font-semibold mb-6">Filter Properties</h2>
              
              <div className="space-y-6">
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
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Penthouse">Penthouse</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Location */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select 
                    value={searchParams.locationId}
                    onValueChange={(value) => setSearchParams({...searchParams, locationId: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All Locations</SelectItem>
                      {locations?.map((location: any) => (
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
                      onValueChange={(values) => setSearchParams({...searchParams, maxPrice: values[0]})}
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
                    onValueChange={(value) => setSearchParams({...searchParams, beds: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
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
                        onCheckedChange={(checked) => setSearchParams({...searchParams, status: checked ? 'Ready' : ''})}
                      />
                      <label htmlFor="ready" className="text-sm">Ready to Move</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="offplan"
                        checked={searchParams.status === 'Off-Plan'}
                        onCheckedChange={(checked) => setSearchParams({...searchParams, status: checked ? 'Off-Plan' : ''})}
                      />
                      <label htmlFor="offplan" className="text-sm">Off-Plan</label>
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
                   `${properties.length} Properties Found`}
                </h2>
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Sort by:</label>
                  <Select defaultValue="featured">
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
                          className="w-full h-60 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          {property.premium && (
                            <Badge variant="premium" className="mr-2">Premium</Badge>
                          )}
                          {property.exclusive && (
                            <Badge variant="exclusive" className="mr-2">Exclusive</Badge>
                          )}
                          {property.newLaunch && (
                            <Badge variant="new">New Launch</Badge>
                          )}
                        </div>
                        <div className="absolute top-4 right-4">
                          <button className="bg-white/80 hover:bg-white text-foreground p-2 rounded-full">
                            <i className="far fa-heart"></i>
                          </button>
                        </div>
                        {/* Property overlay */}
                        <div className="property-overlay absolute inset-0 bg-dark-darker/40 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                          <Link href={`/properties/${property.id}`}>
                            <a className="bg-white text-foreground hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-md transition-colors duration-200">
                              View Property
                            </a>
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
                            <p className="text-secondary font-bold text-xl">{formatPrice(property.price)}</p>
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
                            <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{property.status}</span>
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
            
            {/* Pagination - would be implemented with actual pagination from API */}
            {properties && properties.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <a href="#" className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-primary hover:text-white">
                    <i className="fas fa-chevron-left mr-1"></i> Previous
                  </a>
                  <a href="#" className="px-4 py-2 rounded-md bg-primary text-white">1</a>
                  <a href="#" className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-primary hover:text-white">2</a>
                  <a href="#" className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-primary hover:text-white">3</a>
                  <span className="px-2">...</span>
                  <a href="#" className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-primary hover:text-white">10</a>
                  <a href="#" className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-primary hover:text-white">
                    Next <i className="fas fa-chevron-right ml-1"></i>
                  </a>
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
