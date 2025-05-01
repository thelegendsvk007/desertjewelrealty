import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef, useEffect } from 'react';
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

interface DeveloperCardProps {
  name: string;
  projectCount: string | number;
  logo: string;
  id: number | string;
  description?: string;
  established?: number | string;
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

  const developerData: Developer[] = [
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

  const displayDevelopers = isLoading || isError ? developerData : (developers || []);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isLoading || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    let animationId: number;
    let startTime: number;
    const duration = 25000;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      const totalWidth = slider.scrollWidth;
      const containerWidth = slider.parentElement?.clientWidth || 0;
      const maxTranslateX = totalWidth - containerWidth;
      
      const translateX = -(progress * maxTranslateX);
      
      slider.style.transform = `translateX(${translateX}px)`;
      
      animationId = requestAnimationFrame(step);
    };
    
    animationId = requestAnimationFrame(step);
    
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
              <div 
                ref={sliderRef}
                className="flex whitespace-nowrap transition-transform ease-linear py-4"
                style={{ width: 'auto' }}
              >
                {displayDevelopers.map((developer, index) => (
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