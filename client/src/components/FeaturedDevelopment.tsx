import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

import SobhaAquamontBrochure from '../assets/brochures/Sobha_Aquamont_Downtown_UAQ.pdf?url';
import SobhaAquamontVideo from '../assets/videos/sobha-aquamont-tour.mp4?url';
import SiniyaIslandBrochure from '../assets/brochures/Siniya_Island_Beach_Residences.pdf?url';
import SiniyaIslandVideo from '../assets/videos/siniya-island-tour.mp4?url';
import ChelseaResidencesBrochure from '../assets/brochures/chelseabrochure.pdf'
import ChelseaResidencesVideo from '../assets/videos/chelsea.mp4'

const FeaturedDevelopment = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Array of featured developments (Sobha Aquamont and Beach Residences at Siniya Island)
  const featuredDevelopments = [
    {
      id: 'sobha',
      name: "Sobha Aquamont",
      developer: "Sobha Realty",
      description: "A coastal city masterpiece in Umm Al Quwain, blending urban sophistication with serene beachfront living. Featuring luxurious residences, yacht clubs, marinas, and 50% green spaces for a harmonious lifestyle.",
      price: "AED 1.1M+",
      completion: "December 2027",
      units: "1-3 BR",
      brochure: SobhaAquamontBrochure,
      video: SobhaAquamontVideo
    },
    {
  id: 'chelsea',
  name: "Chelsea Residences",
  developer: "Damac",
  description: "An elegant urban oasis in the heart of the city, Chelsea Residences by Damac redefines upscale living with contemporary design, smart home features, and premium amenities. Perfectly positioned for both comfort and connectivity.",
  price: "AED 2.17M+",
  completion: "December 2029",
  units: "1-3 BR",
  brochure: ChelseaResidencesBrochure,
  video: ChelseaResidencesVideo
},

    {
      id: 'siniya-island',
      name: "Beach Residences at Siniya Island",
      developer: "Sobha Realty",
      description: "An exclusive beachfront community on Siniya Island, Umm Al Quwain, offering luxury villas and apartments with direct beach access, stunning sea views, and resort-style amenities for an unparalleled living experience.",
      price: "AED 13M+",
      completion: "June 2028",
      units: "4-6 BR",
      brochure: SiniyaIslandBrochure,
      video: SiniyaIslandVideo
    }
  ];

  const currentDevelopment = featuredDevelopments[currentIndex];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredDevelopments.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredDevelopments.length]);

  const handleNextDevelopment = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredDevelopments.length);
  };

  const handlePrevDevelopment = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredDevelopments.length - 1 : prevIndex - 1
    );
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
            <span className="inline-block bg-teal-600 px-4 py-1 rounded-full text-sm font-medium mb-4 text-white">Featured Development</span>
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
                    href={currentDevelopment.brochure}
                    className="bg-transparent border border-teal-600 hover:bg-teal-600 hover:text-white text-teal-700 px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center"
                    download
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
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-teal-700">{currentDevelopment.name} Development</h4>
            </div>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
              <motion.div 
                className="absolute inset-0"
                key={currentDevelopment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <video
                  className="object-cover w-full h-full"
                  poster={currentDevelopment.video}
                  muted
                  preload="metadata"
                >
                  <source src={currentDevelopment.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>

              {/* Virtual Tour Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button 
                  className="bg-teal-600/80 backdrop-blur-sm hover:bg-teal-700 text-white p-5 rounded-full transition-colors duration-200"
                  onClick={() => setIsVideoModalOpen(true)}
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
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === index ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevDevelopment}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-600/80 backdrop-blur-sm hover:bg-teal-700 text-white p-3 rounded-full z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button
                onClick={handleNextDevelopment}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-600/80 backdrop-blur-sm hover:bg-teal-700 text-white p-3 rounded-full z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              {/* Developer Badge */}
              <div className="absolute top-4 right-4 bg-[#D4AF37]/80 backdrop-blur-sm px-4 py-2 rounded-lg z-20">
                <p className="text-teal-800 font-medium">{currentDevelopment.developer}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
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
            <div className="aspect-video bg-black">
              <video 
                className="w-full h-full object-cover"
                controls
                autoPlay
              >
                <source src={currentDevelopment.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedDevelopment;