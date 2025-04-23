import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  formatPrice, 
  formatArea, 
  parsePropertyImages 
} from '@/lib/utils';

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['/api/properties/featured'],
  });
  
  const filteredProperties = properties 
    ? activeFilter === 'all' 
      ? properties 
      : properties.filter((property: any) => 
          property.propertyType.toLowerCase() === activeFilter ||
          property.status.toLowerCase() === activeFilter
        )
    : [];
  
  const propertyTypes = [
    { id: 'all', label: 'All' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'penthouse', label: 'Penthouses' },
    { id: 'off-plan', label: 'Off-Plan' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 animated-bg">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-montserrat font-semibold mb-2">Featured Properties</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of the most prestigious properties available in Dubai's most coveted locations.
          </p>
        </div>
        
        {/* Property Filters */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {propertyTypes.map(type => (
            <button
              key={type.id}
              className={`${
                activeFilter === type.id ? 'bg-primary text-white' : 'bg-white hover:bg-primary hover:text-white text-foreground'
              } px-6 py-2 rounded-full font-montserrat font-medium transition-colors duration-200`}
              onClick={() => setActiveFilter(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>
        
        {/* Property Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="h-60 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-6 w-1/4 mb-4" />
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-gray-500">
            Unable to load properties. Please try again later.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((property: any) => {
                const images = parsePropertyImages(property.images);
                const featuredImage = images.length > 0 ? images[0] : '';
                
                return (
                  <motion.div 
                    key={property.id}
                    className="property-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
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
            </motion.div>
          </AnimatePresence>
        )}
        
        <div className="mt-16 text-center">
          <Link href="/properties">
            <a className="bg-primary hover:bg-teal-dark text-white px-8 py-3 rounded-full font-montserrat font-medium transition-colors duration-200 shadow-md inline-flex items-center">
              Explore All Properties <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
