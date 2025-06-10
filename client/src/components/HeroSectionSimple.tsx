import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { developersData } from '@/data/developersData';

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    category: 'residential', // residential or commercial
    city: '',
    locationId: '',
    budget: '',
    developer: '',
    status: '', // Ready to Move / Off Plan filter
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the search URL
    const params = new URLSearchParams();
    
    // Add basic filters
    if (searchParams.propertyType) params.append('type', searchParams.propertyType);
    if (searchParams.city) params.append('city', searchParams.city);
    if (searchParams.locationId) params.append('location', searchParams.locationId);
    if (searchParams.budget) params.append('budget', searchParams.budget);
    if (searchParams.developer) params.append('developer', searchParams.developer);
    if (searchParams.status) params.append('status', searchParams.status);
    
    // Navigate to the search results page using client-side routing
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-[90vh] overflow-visible">
      <div className="absolute inset-0 bg-dark-darker">
        {/* Background image with overlay */}
        <img 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Dubai Skyline" 
          className="object-cover w-full h-full opacity-70"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.div 
          className="max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-4 leading-tight text-shadow">
            Discover <span className="text-secondary">Luxurious</span> Properties in Dubai
          </h1>
          <p className="text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Explore exclusive residential and commercial opportunities across the UAE with Dubai's premier real estate brokerage
          </p>
          
          {/* Search Bar */}
          <motion.div 
            className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mb-8 border border-white/20 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSearch}>
              {/* Category Toggle */}
              <div className="flex justify-center mb-8">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
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
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                    value={searchParams.locationId}
                    onChange={(e) => setSearchParams({...searchParams, locationId: e.target.value})}
                    disabled={!searchParams.city}
                  >
                    <option value="">Select Area</option>
                    {searchParams.city === 'dubai' && (
                      <>
                        <option value="palm-jumeirah">Palm Jumeirah</option>
                        <option value="dubai-marina">Dubai Marina</option>
                        <option value="downtown-dubai">Downtown Dubai</option>
                        <option value="business-bay">Business Bay</option>
                        <option value="jumeirah-lake-towers">Jumeirah Lake Towers (JLT)</option>
                        <option value="dubai-hills-estate">Dubai Hills Estate</option>
                        <option value="dubai-creek-harbour">Dubai Creek Harbour</option>
                        <option value="emaar-beachfront">Emaar Beachfront</option>
                        <option value="dubai-harbour">Dubai Harbour</option>
                        <option value="city-walk">City Walk</option>
                      </>
                    )}
                    {searchParams.city === 'abudhabi' && (
                      <>
                        <option value="yas-island">Yas Island</option>
                        <option value="saadiyat-island">Saadiyat Island</option>
                        <option value="al-reem-island">Al Reem Island</option>
                        <option value="al-maryah-island">Al Maryah Island</option>
                        <option value="masdar-city">Masdar City</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <select 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm"
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
                <div>
                  <select 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 shadow-sm"
                    value={searchParams.developer}
                    onChange={(e) => setSearchParams({...searchParams, developer: e.target.value})}
                  >
                    <option value="">Developer</option>
                    {developersData.map((developer) => (
                      <option key={developer.id} value={developer.id.toString()}>
                        {developer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Status Filter Buttons */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-sm ${
                      searchParams.status === 'Ready to Move' 
                        ? 'bg-primary text-white shadow-lg transform scale-105' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setSearchParams({
                      ...searchParams, 
                      status: searchParams.status === 'Ready to Move' ? '' : 'Ready to Move'
                    })}
                  >
                    <i className="fas fa-check-circle mr-2"></i> Ready to Move In
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-sm ${
                      searchParams.status === 'Off-Plan' 
                        ? 'bg-primary text-white shadow-lg transform scale-105' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setSearchParams({
                      ...searchParams, 
                      status: searchParams.status === 'Off-Plan' ? '' : 'Off-Plan'
                    })}
                  >
                    <i className="fas fa-hard-hat mr-2"></i> Off Plan
                  </button>
                </div>

                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-10 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <i className="fas fa-search mr-2"></i> Search Properties
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;