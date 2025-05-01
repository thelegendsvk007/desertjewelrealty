import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { Developer } from '@/types'; // Use the @ alias

// Import local images
import emaarLogo from '@/assets/developers/emaar.jpg';
import damacLogo from '@/assets/developers/damac.jpg';
import nakheelLogo from '@/assets/developers/nakheel.jpg';
import aldarLogo from '@/assets/developers/aldar.jpg';
import sobhaLogo from '@/assets/developers/sobha.jpg';
import dubaiPropertiesLogo from '@/assets/developers/dubai_properties.jpg';
import meraasLogo from '@/assets/developers/meraas.jpg';
import aradaLogo from '@/assets/developers/arada.jpg';
import eagleHillsLogo from '@/assets/developers/eagle_hills.jpg';
import object1Logo from '@/assets/developers/object_1.jpg';
import samanaLogo from '@/assets/developers/samana.jpg';
import binghattiLogo from '@/assets/developers/binghatti.jpg';
import danubeLogo from '@/assets/developers/danube.jpg';
import ellingtonLogo from '@/assets/developers/ellington.jpg';
import nshamaLogo from '@/assets/developers/nshama.jpg';
import aziziLogo from '@/assets/developers/azizi.jpg';
import selectGroupLogo from '@/assets/developers/select_group.jpg';
import magLogo from '@/assets/developers/mag.jpg';
import bloomLogo from '@/assets/developers/bloom.jpg';
import tigerLogo from '@/assets/developers/tiger.jpg';

const Developers = () => {
  const developers: Developer[] = [
    {
      id: 1,
      name: "Emaar",
      projectCount: "42+",
      logo: emaarLogo,
      description: "One of the UAE's most valuable real estate development companies.",
      established: 1997,
    },
    {
      id: 2,
      name: "Damac",
      projectCount: "35+",
      logo: damacLogo,
      description: "At the forefront of the Middle East's luxury real estate market since 2002.",
      established: 2002,
    },
    {
      id: 3,
      name: "Nakheel",
      projectCount: "25+",
      logo: nakheelLogo,
      description: "A world-leading developer and major contributor to Dubai's iconic skyline.",
      established: 2000,
    },
    {
      id: 4,
      name: "Aldar Properties",
      projectCount: "30+",
      logo: aldarLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 2004,
    },
    {
      id: 5,
      name: "Sobha Realty",
      projectCount: "30+",
      logo: sobhaLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 1976,
    },
    {
      id: 6,
      name: "Dubai Properties",
      projectCount: "42+",
      logo: dubaiPropertiesLogo,
      description: "One of the UAE's most valuable real estate development companies.",
      established: 2002,
    },
    {
      id: 7,
      name: "Meraas",
      projectCount: "35+",
      logo: meraasLogo,
      description: "At the forefront of the Middle East's luxury real estate market since 2002.",
      established: 2007,
    },
    {
      id: 8,
      name: "Arada",
      projectCount: "25+",
      logo: aradaLogo,
      description: "A world-leading developer and major contributor to Dubai's iconic skyline.",
      established: 2017,
    },
    {
      id: 9,
      name: "Eagle Hills",
      projectCount: "30+",
      logo: eagleHillsLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 2014,
    },
    {
      id: 10,
      name: "Object 1",
      projectCount: "30+",
      logo: object1Logo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 2013,
    },
    {
      id: 11,
      name: "Samana Developers",
      projectCount: "42+",
      logo: samanaLogo,
      description: "One of the UAE's most valuable real estate development companies.",
      established: 2015,
    },
    {
      id: 12,
      name: "Binghatti",
      projectCount: "35+",
      logo: binghattiLogo,
      description: "At the forefront of the Middle East's luxury real estate market since 2002.",
      established: 2008,
    },
    {
      id: 13,
      name: "Danube Properties",
      projectCount: "25+",
      logo: danubeLogo,
      description: "A world-leading developer and major contributor to Dubai's iconic skyline.",
      established: 1993,
    },
    {
      id: 14,
      name: "Ellington",
      projectCount: "30+",
      logo: ellingtonLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 2014,
    },
    {
      id: 15,
      name: "Nshama",
      projectCount: "30+",
      logo: nshamaLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 2014,
    },
    {
      id: 16,
      name: "Azizi Developments",
      projectCount: "42+",
      logo: aziziLogo,
      description: "One of the UAE's most valuable real estate development companies.",
      established: 2007,
    },
    {
      id: 17,
      name: "Select Group",
      projectCount: "35+",
      logo: selectGroupLogo,
      description: "At the forefront of the Middle East's luxury real estate market since 2002.",
      established: 2002,
    },
    {
      id: 18,
      name: "Mag Property Development",
      projectCount: "25+",
      logo: magLogo,
      description: "A world-leading developer and major contributor to Dubai's iconic skyline.",
      established: 2003,
    },
    {
      id: 19,
      name: "Bloom Properties",
      projectCount: "30+",
      logo: bloomLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 2007,
    },
    {
      id: 20,
      name: "Tiger Properties",
      projectCount: "30+",
      logo: tigerLogo,
      description: "Abu Dhabi's leading property development and management company.",
      established: 1976,
    },
  ];

  const isLoading = false;
  const isError = false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 animated-bg"
    >
      <section className="relative py-24 bg-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Dubai Developers" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-darker/40 to-dark-darker/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Premier UAE Developers</h1>
            <p className="text-lg text-white/80 mb-0">
              Discover prestigious projects from the UAE's leading property developers
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-montserrat font-semibold mb-4">
            Trusted Real Estate Developers
          </h2>
          <p className="text-gray-600">
            Desert Jewel Realty partners with the UAE's most prestigious property developers to bring you exceptional investment opportunities. Explore their portfolios and discover your next premium property.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-red-500 font-medium mb-2">Error Loading Developers</h3>
            <p className="text-gray-600 mb-4">We're unable to load developers at this time. Please try again later.</p>
            <button 
              className="bg-primary hover:bg-teal-dark text-white py-2 px-4 rounded-md transition-colors duration-200"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : developers && developers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((developer, index) => (
              <motion.div 
                key={developer.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center p-6">
                  <img 
                    src={developer.logo} 
                    alt={`${developer.name} Logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-2">{developer.name}</h3>
                  <p className="text-gray-500 mb-1">Established {developer.established}</p>
                  <p className="text-gray-500 mb-4">{developer.projectCount}+ Projects</p>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {developer.description}
                  </p>
                  
                  <Link href={`/developers/${developer.id}`}>
                    <a className="block w-full text-center bg-primary hover:bg-teal-dark text-white py-2 rounded-md transition-colors duration-200">
                      View Projects
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No developers found.</p>
          </div>
        )}
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-montserrat font-semibold mb-4">
              Why Choose UAE Developers?
            </h2>
            <p className="text-gray-600">
              UAE's property developers are known worldwide for their commitment to excellence and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-medal text-xl"></i>
              </div>
              <h3 className="text-lg font-montserrat font-semibold mb-2">Quality Excellence</h3>
              <p className="text-gray-600">
                UAE developers maintain rigorous quality standards in all their developments, ensuring premium living spaces.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-lightbulb text-xl"></i>
              </div>
              <h3 className="text-lg font-montserrat font-semibold mb-2">Innovative Design</h3>
              <p className="text-gray-600">
                Pushing architectural boundaries, UAE developers create iconic structures that define Dubai's futuristic skyline.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-leaf text-xl"></i>
              </div>
              <h3 className="text-lg font-montserrat font-semibold mb-2">Sustainability Focus</h3>
              <p className="text-gray-600">
                Modern UAE developments incorporate sustainable practices and smart technologies for eco-friendly living.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-primary py-16 px-4 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 0L600 100V400H0L500 0Z" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-montserrat font-bold text-white mb-6">
              Looking for Developer Recommendations?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Our real estate experts can help you identify the best developer for your investment goals and preferences.
            </p>
            
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-montserrat font-medium transition-colors duration-200 inline-flex items-center justify-center shadow-md">
                <i className="fas fa-comments mr-2"></i> Speak with an Expert
              </a>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Developers;