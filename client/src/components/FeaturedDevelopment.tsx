import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const FeaturedDevelopment = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  return (
    <section className="py-20 relative bg-dark text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1573599852326-2d4da0bbe516?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Luxury Development" 
          className="object-cover w-full h-full opacity-30"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-primary px-4 py-1 rounded-full text-sm font-medium mb-4">Featured Development</span>
              <h2 className="text-4xl font-playfair font-semibold mb-6">Palm Vistas By Emaar</h2>
              <p className="text-gray-300 mb-8 text-lg">
                An extraordinary collection of ultra-luxury residences set against the backdrop of Palm Jumeirah. 
                Offering unparalleled views and world-class amenities, this development represents the pinnacle of Dubai's premium real estate.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-secondary font-bold text-2xl mb-1">AED 8.5M+</p>
                  <p className="text-gray-400 text-sm">Starting Price</p>
                </div>
                <div>
                  <p className="text-secondary font-bold text-2xl mb-1">Q4 2025</p>
                  <p className="text-gray-400 text-sm">Completion Date</p>
                </div>
                <div>
                  <p className="text-secondary font-bold text-2xl mb-1">1-5 BR</p>
                  <p className="text-gray-400 text-sm">Unit Types</p>
                </div>
                <div>
                  <p className="text-secondary font-bold text-2xl mb-1">Emaar</p>
                  <p className="text-gray-400 text-sm">Developer</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/properties/1">
                  <a className="bg-primary hover:bg-teal-light text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center">
                    View Development <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </Link>
                <a 
                  href="#"
                  className="bg-transparent border border-white hover:bg-white hover:text-dark-darker text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center"
                >
                  Download Brochure <i className="fas fa-download ml-2"></i>
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1609102026400-3c0ca378e4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Palm Vistas Development" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* Virtual Tour Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-5 rounded-full transition-colors duration-200"
                  onClick={() => setIsVideoModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-play text-2xl"></i>
                </motion.button>
              </div>
              
              {/* Image Gallery Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div>
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
              onClick={() => setIsVideoModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="aspect-video bg-black flex items-center justify-center">
              <p className="text-white text-lg">Video player would be here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedDevelopment;
