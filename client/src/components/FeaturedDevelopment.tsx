import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

const FeaturedDevelopment = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeDevelopment, setActiveDevelopment] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  
  // Array of featured developments from different developers
  const featuredDevelopments = [
    {
      id: 1,
      name: "Palm Vistas",
      developer: "Emaar Properties",
      description: "Luxurious beachfront residences with private access to pristine beaches and spectacular panoramic views of the Arabian Gulf. Experience unparalleled luxury living with premium finishes and smart home technology.",
      price: "AED 8.5M+",
      completion: "Q4 2025",
      units: "1-5 BR",
      image: "https://images.unsplash.com/photo-1609102026400-3c0ca378e4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      name: "Marina Heights",
      developer: "DAMAC Properties",
      description: "Spectacular waterfront living with breathtaking views of Dubai Marina. Premium residences featuring contemporary design, exclusive lifestyle amenities, and direct marina access for the ultimate luxury experience.",
      price: "AED 3.2M+",
      completion: "Q2 2024",
      units: "1-4 BR",
      image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      name: "The Oasis",
      developer: "Nakheel",
      description: "A lush green sanctuary in the heart of the city offering sustainable luxury living with smart home technology and resort-style amenities. Elegant architectural design with spacious layouts and premium finishing.",
      price: "AED 5.8M+",
      completion: "Q3 2024",
      units: "2-6 BR",
      image: "https://images.unsplash.com/photo-1565953554309-d181306db7b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isAutoSliding) {
      interval = setInterval(() => {
        setActiveDevelopment((prev) => (prev + 1) % featuredDevelopments.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSliding, featuredDevelopments.length]);

  // Pause auto-sliding when user interacts with the carousel
  const pauseAutoSlide = () => {
    setIsAutoSliding(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoSliding(true);
    }, 10000);
  };

  const currentDevelopment = featuredDevelopments[activeDevelopment];

  const handleNextDevelopment = () => {
    pauseAutoSlide();
    setActiveDevelopment((prev) => (prev + 1) % featuredDevelopments.length);
  };

  const handlePrevDevelopment = () => {
    pauseAutoSlide();
    setActiveDevelopment((prev) => (prev - 1 + featuredDevelopments.length) % featuredDevelopments.length);
  };
  
  return (
    <section className="py-20 relative bg-[#D4AF37] text-teal-700">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-100 to-amber-300 absolute inset-0 opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-teal-600 px-4 py-1 rounded-full text-sm font-medium mb-4 text-white">Featured Developments</span>
            <h2 className="text-4xl font-bold mb-2 text-teal-800">Discover Premium Projects</h2>
            <p className="text-teal-700 text-lg max-w-2xl mx-auto">
              Explore exclusive luxury developments from the UAE's most prestigious real estate developers, offering unparalleled amenities and investment opportunities.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDevelopment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="min-h-[340px]"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm mb-2">by {currentDevelopment.developer}</span>
                  <h3 className="text-4xl font-bold text-teal-800">{currentDevelopment.name}</h3>
                </div>
                
                <p className="text-teal-700 mb-8 text-lg leading-relaxed">
                  {currentDevelopment.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-teal-800 font-bold text-2xl mb-1">{currentDevelopment.price}</p>
                    <p className="text-teal-600 text-sm">Starting Price</p>
                  </div>
                  <div>
                    <p className="text-teal-800 font-bold text-2xl mb-1">{currentDevelopment.completion}</p>
                    <p className="text-teal-600 text-sm">Completion Date</p>
                  </div>
                  <div>
                    <p className="text-teal-800 font-bold text-2xl mb-1">{currentDevelopment.units}</p>
                    <p className="text-teal-600 text-sm">Unit Types</p>
                  </div>
                  <div>
                    <p className="text-teal-800 font-bold text-2xl mb-1">{currentDevelopment.developer}</p>
                    <p className="text-teal-600 text-sm">Developer</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link href={`/properties/${currentDevelopment.id}`}>
                    <a className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center">
                      View Development <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                  </Link>
                  <a 
                    href="#"
                    className="bg-transparent border border-teal-600 hover:bg-teal-600 hover:text-white text-teal-700 px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center"
                  >
                    Download Brochure <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentDevelopment.id} 
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img 
                    src={currentDevelopment.image}
                    alt={`${currentDevelopment.name} Development`}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Development Navigation Controls */}
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 z-20">
                <button 
                  className="bg-teal-600/80 backdrop-blur-sm hover:bg-teal-700 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none"
                  onClick={handlePrevDevelopment}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button 
                  className="bg-teal-600/80 backdrop-blur-sm hover:bg-teal-700 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none"
                  onClick={handleNextDevelopment}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
              
              {/* Virtual Tour Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button 
                  className="bg-teal-600/80 backdrop-blur-sm hover:bg-teal-700 text-white p-5 rounded-full transition-colors duration-200"
                  onClick={() => {
                    pauseAutoSlide();
                    setIsVideoModalOpen(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                </motion.button>
              </div>
              
              {/* Development Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {featuredDevelopments.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === activeDevelopment ? 'bg-teal-500' : 'bg-white/60 hover:bg-white'}`}
                    onClick={() => {
                      pauseAutoSlide();
                      setActiveDevelopment(index);
                    }}
                  />
                ))}
              </div>
              
              {/* Developer Badge */}
              <div className="absolute top-4 right-4 bg-[#D4AF37]/80 backdrop-blur-sm px-4 py-2 rounded-lg z-20">
                <p className="text-teal-800 font-medium">{currentDevelopment.developer}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Modal - Would implement with a proper video player in a real implementation */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative bg-black w-full max-w-4xl rounded-lg overflow-hidden">
            <button 
              className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoModalOpen(false);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="aspect-video bg-black flex items-center justify-center p-10 text-center">
              <div>
                <svg className="w-20 h-20 text-white/20 mx-auto mb-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                <h3 className="text-white text-2xl font-bold mb-3">{currentDevelopment.name}</h3>
                <p className="text-white/70 text-lg">
                  Virtual tour of {currentDevelopment.name} by {currentDevelopment.developer}.<br />
                  Experience the luxury and elegance of this premium development.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedDevelopment;
