import { useState } from 'react';
import { motion } from 'framer-motion';
import { developersData } from '@/data/developersData';

const HeroSection = () => {
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    category: 'residential', // residential or commercial
    city: '',
    locationId: '',
    budget: '',
    developer: '',
    status: '', // Ready to Move / Off Plan filter
  });

  // Fetch locations for the dropdown
  const { data: locations } = useQuery({
    queryKey: ['/api/locations'],
    staleTime: 300000 // 5 minutes
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if any filter is selected
    const hasBasicFilters = searchParams.propertyType || searchParams.city || 
                           searchParams.locationId || searchParams.budget || searchParams.status;
    
    const hasAdvancedFilters = searchParams.bedrooms || searchParams.bathrooms || 
                              searchParams.landmark || searchParams.developer || 
                              searchParams.handoverYear || searchParams.furnishing ||
                              searchParams.features.length > 0 || searchParams.amenities.length > 0 ||
                              searchParams.isGoldenVisaEligible || searchParams.isMortgageAvailable ||
                              searchParams.minArea > 0 || searchParams.maxArea < 5000;
    
    // Always route to properties page, whether filters are selected or not
    // If no filters selected, show all properties
    
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
                      </>
                    )}
                    {searchParams.city === 'abudhabi' && (
                      <>
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
                      </>
                    )}
                    {searchParams.city === 'sharjah' && (
                      <>
                        <option value="aljada">Aljada</option>
                        <option value="tilal-city">Tilal City</option>
                        <option value="maryam-island">Maryam Island</option>
                        <option value="al-mamsha">Al Mamsha</option>
                        <option value="sharjah-waterfront-city">Sharjah Waterfront City</option>
                        <option value="sharjah-garden-city">Sharjah Garden City</option>
                        <option value="al-khan">Al Khan</option>
                      </>
                    )}
                    {searchParams.city === 'ajman' && (
                      <>
                        <option value="al-zorah">Al Zorah</option>
                        <option value="emirates-city">Emirates City</option>
                        <option value="ajman-one">Ajman One</option>
                        <option value="city-towers">City Towers</option>
                        <option value="al-humaid-city">Al Humaid City</option>
                        <option value="marmooka-city">Marmooka City</option>
                        <option value="mermaid-city">Mermaid City</option>
                      </>
                    )}
                    {searchParams.city === 'rasalkhaimah' && (
                      <>
                        <option value="al-hamra-village">Al Hamra Village</option>
                        <option value="mina-al-arab">Mina Al Arab</option>
                        <option value="al-marjan-island">Al Marjan Island</option>
                        <option value="bab-al-bahr">Bab Al Bahr</option>
                        <option value="pacific">Pacific</option>
                        <option value="dafan-al-nakheel">Dafan Al Nakheel</option>
                      </>
                    )}
                    {searchParams.city === 'fujairah' && (
                      <>
                        <option value="fujairah-creative-city">Fujairah Creative City</option>
                        <option value="fujairah-beach">Fujairah Beach</option>
                        <option value="dibba">Dibba (select projects)</option>
                      </>
                    )}
                    {searchParams.city === 'ummalquwain' && (
                      <>
                        <option value="emirates-modern-industrial-area">Emirates Modern Industrial Area</option>
                        <option value="al-salamah">Al Salamah</option>
                        <option value="al-ramlah">Al Ramlah</option>
                        <option value="al-maidan">Al Maidan</option>
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
                    <option value="1">Emaar Properties</option>
                    <option value="2">Damac Properties</option>
                    <option value="3">Nakheel</option>
                    <option value="4">Aldar Properties</option>
                    <option value="5">Sobha Realty</option>
                    <option value="6">Dubai Properties</option>
                    <option value="7">Meraas</option>
                    <option value="8">Arada</option>
                    <option value="9">Eagle Hills</option>
                    <option value="10">Object 1</option>
                    <option value="11">Samana Developers</option>
                    <option value="12">Binghatti</option>
                    <option value="13">Danube Properties</option>
                    <option value="14">Ellington Properties</option>
                    <option value="15">Nshama</option>
                    <option value="16">Azizi Developments</option>
                    <option value="17">Select Group</option>
                    <option value="18">MAG Property Development</option>
                    <option value="19">Bloom Properties</option>
                    <option value="20">Tiger Properties</option>
                    <option value="21">Sol Properties</option>
                    <option value="22">Modon Properties</option>
                    <option value="23">RAK Properties</option>
                    <option value="24">GFS Projects</option>
                    <option value="25">Reportage Properties</option>
                    <option value="26">Nabni Developments</option>
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


              
              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <>
                  {/* Backdrop - only covers content below hero section */}
                  <div 
                    className="fixed left-0 right-0 bottom-0 bg-black/60 z-[9998]" 
                    style={{ top: '90vh' }}
                    onClick={() => setShowAdvancedFilters(false)}
                  ></div>
                  {/* Panel */}
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-[9999] max-h-96 overflow-y-auto">
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
                </>
              )}
            </form>
          </motion.div>


        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className={`custom-shape-divider ${showAdvancedFilters ? 'z-[1]' : 'z-10'} relative`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 md:h-20 ${showAdvancedFilters ? 'fill-white/40' : 'fill-white'} transition-all duration-300`}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;