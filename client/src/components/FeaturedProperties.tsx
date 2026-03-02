import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GoldenVisaIndicator from '@/components/GoldenVisaIndicator';
import { 
  formatPrice, 
  formatArea, 
  parsePropertyImages,
  formatBedrooms
} from '@/lib/utils';
import { Property } from '@/types';
import { getFeaturedProperties } from '@/data/properties';

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | NodeJS.Timeout>();
  const lastScrollTimeRef = useRef<number>(0);
  
  const properties = getFeaturedProperties();
  
  const filteredProperties = properties 
    ? activeFilter === 'all' 
      ? properties 
      : properties.filter((property: Property) => 
          property.propertyType?.toLowerCase() === activeFilter ||
          property.status?.toLowerCase() === activeFilter
        )
    : [];
  
  const propertyTypes = [
    { id: 'all', label: 'All' },
    { id: 'studio', label: 'Studios' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'townhouse', label: 'Townhouses' },
    { id: 'penthouse', label: 'Penthouses' },
    { id: 'duplex', label: 'Duplexes' },
    { id: 'off-plan', label: 'Off-Plan' }
  ];

  const startAutoScroll = () => {
    if (scrollContainerRef.current && filteredProperties.length > 0) {
      const container = scrollContainerRef.current;
      
      // Ultra smooth continuous scroll with faster speed
      const smoothScroll = (timestamp: number) => {
        if (!scrollContainerRef.current) return;
        
        if (timestamp - lastScrollTimeRef.current >= 8) { // ~120fps for ultra smooth
          const container = scrollContainerRef.current;
          const currentScroll = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          // Seamless infinite scroll with faster movement
          if (currentScroll >= maxScroll / 2) {
            // Reset to beginning portion (since content is duplicated)
            container.scrollLeft = currentScroll - (maxScroll / 2);
          } else {
            container.scrollLeft = currentScroll + 2.5; // Faster continuous movement
          }
          
          lastScrollTimeRef.current = timestamp;
        }
        
        autoScrollRef.current = requestAnimationFrame(smoothScroll);
      };
      
      autoScrollRef.current = requestAnimationFrame(smoothScroll);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      if (typeof autoScrollRef.current === 'number') {
        cancelAnimationFrame(autoScrollRef.current);
      } else {
        clearInterval(autoScrollRef.current);
      }
      autoScrollRef.current = undefined;
    }
  };

  // Reset scroll position when filter changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeFilter]);

  // Auto-scroll functionality - Always running
  useEffect(() => {
    if (filteredProperties.length > 1) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [filteredProperties]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Temporarily stop auto-scroll during manual navigation
      stopAutoScroll();
      
      const cardWidth = 300;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      
      // Resume auto-scroll after a short pause
      setTimeout(() => {
        startAutoScroll();
      }, 1000);
    }
  };

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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
        
        {/* Property Carousel */}
        <div className="relative group">
          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 hidden md:block"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 hidden md:block"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Scrollable Container */}
          <div 
            key={`carousel-${activeFilter}`}
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-6 md:px-12 
                       snap-x snap-mandatory md:snap-none"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
          >
{/* First set of properties */}
            {filteredProperties.map((property: Property) => {
              const images = parsePropertyImages(property.images);
              const featuredImage = images.length > 0 ? images[0] : '';
              
              return (
                <motion.div 
                  key={`${activeFilter}-${property.id}`}
                  className="flex-shrink-0 w-[85vw] max-w-[300px] md:w-[300px] h-[380px] property-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col snap-center mx-auto"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-[200px]">
                    <img 
                      src={featuredImage || 'https://via.placeholder.com/600x400?text=No+Image'} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Featured image failed to load:', featuredImage);
                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
                      }}
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

                    <div className="property-overlay absolute inset-0 bg-dark-darker/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/properties/${property.id}`}>
                        <div className="bg-white text-foreground hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                          View Property
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm line-clamp-1 group-hover:text-primary transition-colors duration-200">
                        {property.title}
                      </h3>
                      <p className="text-xl font-bold text-[#D4AF37] mb-1">{formatPrice(property.price)}</p>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{property.address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-primary">
                      <div className="text-center">
                        <span className="font-medium">{formatBedrooms(property.beds)}</span>
                        <div>{formatBedrooms(property.beds) === 'Studio' ? '' : 'beds'}</div>
                      </div>
                      <div className="text-center">
                        <span className="font-medium">{property.baths || 0}</span>
                        <div>baths</div>
                      </div>
                      <div className="text-center">
                        <span className="font-medium">{property.area ? Math.round(property.area).toLocaleString() : '0'}</span>
                        <div>sqft</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Duplicate set for seamless infinite scroll */}
            {filteredProperties.map((property: Property) => {
              const images = parsePropertyImages(property.images);
              const featuredImage = images.length > 0 ? images[0] : '';
              
              return (
                <motion.div 
                  key={`${activeFilter}-duplicate-${property.id}`}
                  className="flex-shrink-0 w-[85vw] max-w-[300px] md:w-[300px] h-[380px] property-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col snap-center mx-auto"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-[200px]">
                    <img 
                      src={featuredImage || 'https://via.placeholder.com/600x400?text=No+Image'} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Featured duplicate image failed to load:', featuredImage);
                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
                      }}
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

                    <div className="property-overlay absolute inset-0 bg-dark-darker/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/properties/${property.id}`}>
                        <div className="bg-white text-foreground hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                          View Property
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm line-clamp-1 group-hover:text-primary transition-colors duration-200">
                        {property.title}
                      </h3>
                      <p className="text-xl font-bold text-[#D4AF37] mb-1">{formatPrice(property.price)}</p>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{property.address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-primary">
                      <div className="text-center">
                        <span className="font-medium">{formatBedrooms(property.beds)}</span>
                        <div>{formatBedrooms(property.beds) === 'Studio' ? '' : 'beds'}</div>
                      </div>
                      <div className="text-center">
                        <span className="font-medium">{property.baths || 0}</span>
                        <div>baths</div>
                      </div>
                      <div className="text-center">
                        <span className="font-medium">{property.area ? Math.round(property.area).toLocaleString() : '0'}</span>
                        <div>sqft</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;