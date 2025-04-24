import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef, useEffect } from 'react';

interface DeveloperCardProps {
  name: string;
  projectCount: string | number;
  logo: string;
  id: number | string;
  description?: string;
  established?: number;
}

interface Developer {
  id: number;
  name: string;
  projectCount: string | number;
  logo: string;
  description?: string;
  established?: number;
  [key: string]: any;
}

const DeveloperCard = ({ name, projectCount, logo, id, description, established }: DeveloperCardProps) => {
  return (
    <Link href={`/developers/${id}`}>
      <a className="block bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden p-4 text-center group mx-3 transform hover:scale-105 duration-300 w-[180px] h-[180px] flex flex-col justify-center items-center">
        <div className="w-full h-20 flex items-center justify-center mb-2">
          <img 
            src={logo || "https://via.placeholder.com/150?text=Logo"}
            alt={`${name} Logo`}
            className="h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1">{name}</h3>
        <p className="text-xs text-gray-500">{projectCount}+ Projects</p>
        {established && (
          <p className="text-xs text-teal-600 mt-1">Est. {established}</p>
        )}
      </a>
    </Link>
  );
};

const DeveloperShowcase = () => {
  const { data: developers, isLoading, isError } = useQuery<Developer[]>({
    queryKey: ['/api/developers/featured'],
  });

  // Create some fallback data in case the API fails
  const developerData: Developer[] = [
    {
      id: 1,
      name: "Emaar Properties",
      projectCount: "42+",
      logo: "https://logowik.com/content/uploads/images/emaar-properties4133.jpg",
      description: "One of the UAE's most valuable real estate development companies.",
      established: 1997
    },
    {
      id: 2,
      name: "Damac Properties",
      projectCount: "35+",
      logo: "https://logowik.com/content/uploads/images/damac-properties8251.jpg",
      description: "At the forefront of the Middle East's luxury real estate market since 2002.",
      established: 2002
    },
    {
      id: 3,
      name: "Nakheel",
      projectCount: "25+",
      logo: "https://logowik.com/content/uploads/images/nakheel9523.jpg",
      description: "A world-leading developer and major contributor to Dubai's iconic skyline.",
      established: 2000
    },
    {
      id: 4,
      name: "Aldar Properties",
      projectCount: "30+",
      logo: "https://logowik.com/content/uploads/images/aldar-properties6278.jpg",
      description: "Abu Dhabi's leading property development and management company.",
      established: 2005
    }
  ];

  // Use our sample data if API fails, otherwise use API data
  const displayDevelopers = isLoading || isError ? developerData : (developers || []);
  
  // Refs for the scroll animation
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isLoading || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    let animationId: number;
    let startTime: number;
    const duration = 15000; // 15 seconds to complete one cycle (faster animation)
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      // Calculate how far through the animation we are (0 to 1)
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Calculate the translateX value - move from 0% to -100% to show all developers
      const totalWidth = slider.scrollWidth;
      const containerWidth = slider.parentElement?.clientWidth || 0;
      const maxTranslateX = totalWidth - containerWidth;
      
      // Ensure we only scroll as far as needed
      const translateX = -(progress * maxTranslateX);
      
      // Apply the transform
      slider.style.transform = `translateX(${translateX}px)`;
      
      // Continue animation
      animationId = requestAnimationFrame(step);
    };
    
    // Start animation
    animationId = requestAnimationFrame(step);
    
    // Clean up animation on unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isLoading, displayDevelopers]);
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white via-[#D4AF3715] to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Premier UAE Developers</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore prestigious projects from the UAE's leading property developers, curated by Desert Jewel Realty.
          </p>
        </div>

        <div className="relative mb-10 overflow-hidden">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden mx-auto">
              {/* Continuous Slider */}
              <div 
                ref={sliderRef}
                className="flex whitespace-nowrap transition-transform ease-linear py-4"
                style={{ width: 'auto' }}
              >
                {displayDevelopers.map((developer: Developer, index: number) => (
                  <div 
                    key={`${developer.id || index}`} 
                    className="inline-block"
                  >
                    <DeveloperCard 
                      id={developer.id || index + 1}
                      name={developer.name}
                      projectCount={developer.projectCount || "25+"}
                      logo={developer.logo}
                      description={developer.description}
                      established={developer.established}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Gradient overlays for smooth edge transitions */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>

        <div className="text-center">
          <Link href="/developers">
            <a className="inline-flex items-center text-teal-600 hover:text-[#D4AF37] font-medium transition-colors duration-200">
              View All Developers <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeveloperShowcase;