import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

type LocationTab = 'dubai' | 'abudhabi' | 'sharjah' | 'rasalkhaimah';

const InteractiveMap = () => {
  const [activeTab, setActiveTab] = useState<LocationTab>('dubai');
  
  const { data: locations, isLoading } = useQuery({
    queryKey: ['/api/locations'],
  });
  
  // Filter locations based on active tab (city)
  const filteredLocations = locations
    ? locations.filter((location: any) => {
        if (activeTab === 'dubai') return location.city === 'Dubai';
        if (activeTab === 'abudhabi') return location.city === 'Abu Dhabi';
        if (activeTab === 'sharjah') return location.city === 'Sharjah';
        if (activeTab === 'rasalkhaimah') return location.city === 'Ras Al Khaimah';
        return false;
      })
    : [];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-montserrat font-semibold mb-6">Discover Properties Across UAE</h2>
            <p className="text-gray-600 mb-8">
              Our interactive map helps you explore premium real estate opportunities throughout the UAE. 
              Search by location, property type, or developer to find your ideal investment.
            </p>
            
            {/* Location Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4 mb-6">
                <button 
                  className={`${activeTab === 'dubai' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white text-foreground'} px-5 py-2 rounded-md font-medium transition-colors duration-200`}
                  onClick={() => setActiveTab('dubai')}
                >
                  Dubai
                </button>
                <button 
                  className={`${activeTab === 'abudhabi' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white text-foreground'} px-5 py-2 rounded-md font-medium transition-colors duration-200`}
                  onClick={() => setActiveTab('abudhabi')}
                >
                  Abu Dhabi
                </button>
                <button 
                  className={`${activeTab === 'sharjah' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white text-foreground'} px-5 py-2 rounded-md font-medium transition-colors duration-200`}
                  onClick={() => setActiveTab('sharjah')}
                >
                  Sharjah
                </button>
                <button 
                  className={`${activeTab === 'rasalkhaimah' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white text-foreground'} px-5 py-2 rounded-md font-medium transition-colors duration-200`}
                  onClick={() => setActiveTab('rasalkhaimah')}
                >
                  Ras Al Khaimah
                </button>
              </div>
              
              {/* Location Spots */}
              {isLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              ) : filteredLocations.length === 0 ? (
                <p className="text-gray-500 py-4">No locations available for this city yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredLocations.map((location: any) => (
                    <Link key={location.id} href={`/properties?location=${location.id}`}>
                      <a className="bg-gray-50 p-4 rounded-lg hover:shadow-md cursor-pointer transition-shadow duration-200">
                        <h3 className="font-montserrat font-medium mb-1">{location.name}</h3>
                        <p className="text-sm text-gray-500">{location.propertyCount} Properties Available</p>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/properties">
              <a className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full font-montserrat font-medium transition-colors duration-200 inline-flex items-center">
                View Full Map Experience <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </Link>
          </div>
          
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg h-[450px] relative">
            {/* Map visualization */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1577086664693-894d8405334a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="UAE Map" 
                className="w-full h-full object-cover"
              />
              
              {/* Map Overlay with markers */}
              <div className="absolute inset-0 z-10">
                {/* Dubai Marker */}
                <motion.div 
                  className="absolute" 
                  style={{ top: '45%', left: '50%' }}
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { 
                      repeat: Infinity, 
                      duration: 2 
                    }
                  }}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse-slow">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-md shadow-md">
                      <p className="text-xs font-medium whitespace-nowrap">Dubai: 250+ Properties</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Abu Dhabi Marker */}
                <motion.div 
                  className="absolute" 
                  style={{ top: '65%', left: '30%' }}
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { 
                      repeat: Infinity, 
                      duration: 2,
                      delay: 0.5
                    }
                  }}
                >
                  <div className="relative">
                    <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center animate-pulse-slow">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Sharjah Marker */}
                <motion.div 
                  className="absolute" 
                  style={{ top: '30%', left: '60%' }}
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { 
                      repeat: Infinity, 
                      duration: 2,
                      delay: 1
                    }
                  }}
                >
                  <div className="relative">
                    <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center animate-pulse-slow">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-col space-y-2">
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-primary hover:text-white rounded transition-colors duration-200">
                    <i className="fas fa-plus"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-primary hover:text-white rounded transition-colors duration-200">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-primary hover:text-white rounded transition-colors duration-200">
                    <i className="fas fa-expand"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
