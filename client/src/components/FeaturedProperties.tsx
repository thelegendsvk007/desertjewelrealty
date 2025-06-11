import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GoldenVisaIndicator from '@/components/GoldenVisaIndicator';
import { 
  formatPrice, 
  formatArea, 
  parsePropertyImages 
} from '@/lib/utils';
import { Property } from '@/types';
import { getFeaturedProperties } from '@/data/properties';

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout>();
  const touchStartRef = useRef<number>(0);
  
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
    { id: 'penthouse', label: 'Penthouses' },
    { id: 'duplex', label: 'Duplexes' },
    { id: 'off-plan', label: 'Off-Plan' }
  ];

  const startAutoScroll = () => {
    if (scrollContainerRef.current && filteredProperties.length > 0 && isAutoPlaying) {
      autoScrollRef.current = setInterval(() => {
        if (scrollContainerRef.current && isAutoPlaying) {
          const container = scrollContainerRef.current;
          const containerWidth = container.clientWidth;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          // Center the cards by scrolling by container width
          const scrollAmount = containerWidth > 768 ? 300 : containerWidth * 0.8;
          
          if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ 
              left: scrollAmount, 
              behavior: 'smooth' 
            });
          }
        }
      }, 4000); // 4 seconds interval
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = undefined;
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (filteredProperties.length > 1 && isAutoPlaying) {
      startAutoScroll();
    }

    return () => stopAutoScroll();
  }, [filteredProperties, isAutoPlaying]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const cardWidth = 300; // Card width + gap
      
      // Stop auto-scroll when arrows are clicked
      stopAutoScroll();
      setIsAutoPlaying(false);
      
      // Center the cards by scrolling by container width
      const scrollAmount = containerWidth > 768 ? cardWidth : containerWidth * 0.8;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    // Stop auto-scroll on touch interaction
    stopAutoScroll();
    setIsAutoPlaying(false);
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left (next)
        scroll('right');
      } else {
        // Swipe right (previous)
        scroll('left');
      }
    }
  };

  const handleCardTouch = () => {
    // Stop auto-scroll when card is touched
    stopAutoScroll();
    setIsAutoPlaying(false);
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
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-12 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {filteredProperties.map((property: Property) => {
              const imageData = typeof property.images === 'string' ? property.images : JSON.stringify(property.images);
              const images = parsePropertyImages(imageData);
              const featuredImage = images.length > 0 ? images[0] : '';
              
              return (
                <motion.div 
                  key={property.id}
                  className="flex-shrink-0 w-[280px] h-[380px] property-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col snap-center"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  onTouchStart={handleCardTouch}
                >
                  <div className="relative h-[200px]">
                    <img 
                      src={featuredImage} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
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
                            // You could add a toast notification here
                          }
                        }}
                      >
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
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
                        <span className="font-medium">{property.beds || 0}</span>
                        <div>beds</div>
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