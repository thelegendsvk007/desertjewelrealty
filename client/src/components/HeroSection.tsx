import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    locationId: '',
    budget: ''
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
    if (!searchParams.propertyType && !searchParams.locationId && !searchParams.budget) {
      toast({
        title: "Search criteria needed",
        description: "Please select at least one search criteria",
        variant: "destructive"
      });
      return;
    }
    
    // Construct the search URL
    let searchUrl = '/properties?';
    if (searchParams.propertyType) {
      searchUrl += `type=${searchParams.propertyType}&`;
    }
    if (searchParams.locationId) {
      searchUrl += `location=${searchParams.locationId}&`;
    }
    if (searchParams.budget) {
      searchUrl += `budget=${searchParams.budget}`;
    }
    
    // Navigate to the search results page
    window.location.href = searchUrl;
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
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
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
              <div className="flex-1">
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchParams.locationId}
                  onChange={(e) => setSearchParams({...searchParams, locationId: e.target.value})}
                >
                  <option value="">Location</option>
                  {locations?.map((location: any) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchParams.budget}
                  onChange={(e) => setSearchParams({...searchParams, budget: e.target.value})}
                >
                  <option value="">Budget</option>
                  <option value="1000000">Up to AED 1M</option>
                  <option value="3000000">AED 1M - 3M</option>
                  <option value="5000000">AED 3M - 5M</option>
                  <option value="999999999">AED 5M+</option>
                </select>
              </div>
              <div className="flex-none">
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-primary hover:bg-teal-dark text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 shadow-md"
                >
                  <i className="fas fa-search mr-2"></i> Search
                </button>
              </div>
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
