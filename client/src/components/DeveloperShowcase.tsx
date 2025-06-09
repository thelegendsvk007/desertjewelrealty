import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef, useEffect } from 'react';
import { Developer } from '@/types';
import { developersData } from '@/data/developersData';

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
import solLogo from '@/assets/developers/sol.jpg';
import modonLogo from '@/assets/developers/modon.jpg';
import rakLogo from '@/assets/developers/rak.jpg';
import gfsLogo from '@/assets/developers/gfs.jpg';
import reportageLogo from '@/assets/developers/reportage.jpg';
import nabniLogo from '@/assets/developers/nabni.jpg';


interface DeveloperCardProps {
  name: string;
  projectCount: string | number;
  logo: string;
  id: number | string;
  description?: string;
  established?: number;
}

const DeveloperCard = ({ name, projectCount, logo, id, description, established }: DeveloperCardProps) => {
  return (
    <div className="block bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden p-4 text-center group mx-3 transform hover:scale-105 duration-300 w-[180px] h-[180px] flex flex-col justify-center items-center cursor-pointer">
      <Link href={`/developers/${id}`} className="block w-full h-full flex flex-col justify-center items-center">
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
      </Link>
    </div>
  );
};

const DeveloperShowcase = () => {
  const isLoading = false;
  const isError = false;

  const developerData: Developer[] = [
    {
    id: 1,
    name: "Emaar",
    projectCount: "42+",
    logo: emaarLogo,
    description: "Soar to new heights with Emaar Properties, a global titan in real estate since 1997! Renowned for the Burj Khalifa—the world’s tallest building—and the sprawling Dubai Mall, Emaar crafts vibrant communities like Downtown Dubai, blending modern elegance with aspirational lifestyles. With a valuation of US$15.5 billion, Emaar delivers luxury, sustainability, and high-return investments.",
    established: 1997,
  },
  {
    id: 2,
    name: "Damac",
    projectCount: "35+",
    logo: damacLogo,
    description: "Step into opulence with Damac Properties, a luxury leader since 2002! Known for bold designs like Damac Hills and Cavalli Tower, Damac collaborates with Versace and Paramount to create residences that are art pieces. With AED 4.13 billion in transactions in 2025, Damac redefines upscale living with infinity pools and golden facades.",
    established: 2002,
  },
  {
    id: 3,
    name: "Nakheel",
    projectCount: "25+",
    logo: nakheelLogo,
    description: "Dive into waterfront wonders with Nakheel, a visionary developer since 2003! Famous for Palm Jumeirah and The World Islands, Nakheel transforms Dubai’s coastline with 7km beachfronts and floating beach parks. With AED 3.78 billion in transactions in 2025, Nakheel delivers luxury and innovation for global investors.",
    established: 2003,
  },
  {
    id: 4,
    name: "Aldar Properties",
    projectCount: "30+",
    logo: aldarLogo,
    description: "Unveil innovation with Aldar Properties, Abu Dhabi’s premier developer since 2004! Iconic projects like Yas Island and Saadiyat Island, home to the Louvre Abu Dhabi, blend luxury with culture. With AED 862.14 million in 2025 transactions, Aldar crafts sustainable communities with yoga pavilions and swimmable lagoons.",
    established: 2004,
  },
  {
    id: 5,
    name: "Sobha Realty",
    projectCount: "30+",
    logo: sobhaLogo,
    description: "Discover timeless elegance with Sobha Realty, a luxury pioneer since 1976! Known for Sobha Hartland with its crystal lagoon, Sobha blends Indian craftsmanship with global standards. Featuring solar-powered designs and private beachfront clubs, Sobha delivers regal living with AED 1.5M starting prices.",
    established: 1976,
  },
  {
    id: 6,
    name: "Dubai Properties",
    projectCount: "42+",
    logo: dubaiPropertiesLogo,
    description: "Experience Dubai’s heartbeat with Dubai Properties, a master developer since 2004! Iconic communities like Jumeirah Beach Residence (JBR) with its 1.7km beachfront and The Villa redefine urban living. With projects like Culture Village featuring art promenades, Dubai Properties crafts vibrant, sustainable spaces.",
    established: 2004,
  },
  {
    id: 7,
    name: "Meraas",
    projectCount: "35+",
    logo: meraasLogo,
    description: "Immerse yourself in curated luxury with Meraas Holding, a visionary since 2007! Bluewaters Island, home to Ain Dubai, and City Walk showcase Meraas’s blend of culture and innovation. With AED 2 billion projects like Design Quarter, Meraas crafts urban destinations with private beaches and eco-friendly designs.",
    established: 2007,
  },
  {
    id: 8,
    name: "Arada",
    projectCount: "25+",
    logo: aradaLogo,
    description: "Unlock modern living with Arada, a rising star since 2017! Known for Aljada, Sharjah’s largest mixed-use community, and Masaar with its treetop walkways, Arada focuses on wellness and innovation. With smart homes and green spaces, Arada delivers vibrant lifestyles for families and investors.",
    established: 2017,
  },
  {
    id: 9,
    name: "Eagle Hills",
    projectCount: "30+",
    logo: eagleHillsLogo,
    description: "Experience global excellence with Eagle Hills, a luxury developer since 2014! Famous for The Address Fujairah and Maryam Island, Eagle Hills creates waterfront masterpieces with private beaches and marinas. With a global portfolio spanning Europe and Africa, Eagle Hills delivers sophistication and high ROI.",
    established: 2014,
  },
  {
    id: 10,
    name: "Object 1",
    projectCount: "30+",
    logo: object1Logo,
    description: "Redefine urban living with Object 1, a dynamic developer since 2013! Known for One Za’abeel with its cantilevered skybridge and Al Wasl Tower, Object 1 blends futuristic design with functionality. Offering smart homes and panoramic views, Object 1 attracts investors seeking innovation in Dubai’s skyline.",
    established: 2013,
  },
  {
    id: 11,
    name: "Samana Developers",
    projectCount: "42+",
    logo: samanaLogo,
    description: "Experience bold innovation with Samana Developers, a luxury force since 2018! Known for Samana Hills with its 100m lazy river and Samana Golf Avenue with PGA-standard courses, Samana offers private pools in apartments. With flexible 1% payment plans, Samana delivers resort-style living.",
    established: 2018,
  },
  {
    id: 12,
    name: "Binghatti",
    projectCount: "35+",
    logo: binghattiLogo,
    description: "Discover architectural artistry with Binghatti, a luxury innovator since 2008! Famous for Burj Al Arab Views and Binghatti Crystals with its geometric facades, Binghatti blends design with affordability. With over 40 projects, Binghatti offers modern residences with high ROI in prime locations.",
    established: 2008,
  },
  {
    id: 13,
    name: "Danube Properties",
    projectCount: "25+",
    logo: danubeLogo,
    description: "Embrace affordable luxury with Danube Properties, a game-changer since 1993! Known for Gemz with its 1km jogging track and Bayz 102 with sky gardens, Danube offers a 1% payment plan. With over 50 awards and AED 761.54 million in 2025 sales, Danube delivers stylish homes for all.",
    established: 1993,
  },
  {
    id: 14,
    name: "Ellington",
    projectCount: "30+",
    logo: ellingtonLogo,
    description: "Indulge in boutique luxury with Ellington, a design-driven developer since 2014! Known for Belgravia and Eaton Place with their minimalist elegance, Ellington focuses on art-inspired living. With wellness-focused amenities like rooftop yoga decks, Ellington creates serene, stylish residences in Dubai.",
    established: 2014,
  },
  {
    id: 15,
    name: "Nshama",
    projectCount: "30+",
    logo: nshamaLogo,
    description: "Live vibrantly with Nshama, a community-focused developer since 2014! Known for Town Square Dubai with its 750,000 sqm of green space, Nshama offers affordable homes with parks, retail, and schools. Projects like Zahra Apartments deliver modern living with a family-friendly twist.",
    established: 2014,
  },
  {
    id: 16,
    name: "Azizi Developments",
    projectCount: "42+",
    logo: aziziLogo,
    description: "Unleash your imagination with Azizi Developments, a trailblazer since 2007! Azizi Riviera brings French Riviera charm to Meydan Bay with canal promenades, while Azizi Mina offers beachfront villas. With over 100 nationalities investing and 8%+ returns, Azizi crafts European-inspired, high-value homes.",
    established: 2007,
  },
  {
    id: 17,
    name: "Select Group",
    projectCount: "35+",
    logo: selectGroupLogo,
    description: "Elevate your lifestyle with Select Group, a luxury leader since 2002! Known for Marina Gate in Dubai Marina and The Residences at Jumeirah, Select Group delivers waterfront elegance with infinity pools and marinas. With over 20 million sq ft developed, Select Group redefines upscale living.",
    established: 2002,
  },
  {
    id: 18,
    name: "Mag Development",
    projectCount: "25+",
    logo: magLogo,
    description: "Experience innovation with Mag Property Development, a visionary since 2003! Famous for MAG 5 Boulevard and Keturah Reserve with its bio-living concept, Mag focuses on wellness and sustainability. With smart homes and organic gardens, Mag delivers a holistic lifestyle in Dubai.",
    established: 2003,
  },
  {
    id: 19,
    name: "Bloom Properties",
    projectCount: "30+",
    logo: bloomLogo,
    description: "Blossom into luxury with Bloom Properties, a leader since 2007! Known for Bloom Towers in Dubai and Aldhay in Abu Dhabi, Bloom offers modern residences with rooftop gardens and pools. With a focus on community living, Bloom creates spaces that nurture and inspire.",
    established: 2007,
  },
  {
    id: 20,
    name: "Tiger Properties",
    projectCount: "30+",
    logo: tigerLogo,
    description: "Unleash bold ambition with Tiger Properties, a fierce contender since 1998! Projects like Tiger Skyz with its 360-degree rooftop deck and Tiger Bay with floating gardens offer affordable luxury. Expanding with Tiger Plaza in 2025, Tiger roars with potential in Dubai’s emerging areas.",
    established: 1998,
  },
  {
    id: 21,
    name: "Nabni Developments",
    projectCount: "11+",
    logo: nabniLogo,
    description: "Explore architectural artistry with Nabni Developments, a boutique luxury developer since 2002! Formerly Aljaziri Developments, Nabni’s Avenue Residences in Al Furjan feature Emirati-inspired designs with Barjeel wind towers and high-end Italian finishes. With a landmark partnership with Hilton for the Waldorf Astoria Residences Dubai Downtown—the first standalone outside the US—Nabni redefines opulence.",
    established: 2002,
  },
  {
    id: 22,
    name: "Modon Properties",
    projectCount: "15+",
    logo: modonLogo,
    description: "Build your future with Modon Properties, a sustainability leader since 2011! Based in Abu Dhabi, Modon’s projects like Hudayriyat Island with its 3km swimmable lagoon and Modon Deyaar with vertical gardens prioritize eco-friendly living. With solar-powered homes and community farms, Modon crafts green, connected communities.",
    established: 2011,
  },
  {
    id: 23,
    name: "Sol Arena Development",
    projectCount: "5+",
    logo: solLogo,
    description: "Dive into luxury with Sol Arena Development, a coastal innovator since 2019! Projects like Sol Bay with its underwater viewing tunnel and Sol Palm with a bioluminescent beach offer a resort-like experience. Launching Sol Waves with a tidal wave simulator in 2025, Sol Arena shines in Dubai’s waterfront scene.",
    established: 2019,
  },
  {
    id: 24,
    name: "Reportage Real Estate",
    projectCount: "20+",
    logo: reportageLogo,
    description: "Step into modern marvels with Reportage Real Estate, a rising star since 2014! Known for Reportage Towers with glass curtain walls and Park Gate Residences with sky bridges, Reportage focuses on high-growth areas like Masdar City. With 90%+ on-time delivery, Reportage delivers high-ROI contemporary living.",
    established: 2014,
  },
  {
    id: 25,
    name: "GFS Development",
    projectCount: "10+",
    logo: gfsLogo,
    description: "Elevate your lifestyle with GFS Development, a craftsmanship leader since 2005! Projects like GFS Garden Homes with edible landscapes and GFS Heights with a sky observatory offer bespoke living. Launching GFS Oasis with a zen garden atrium in 2025, GFS builds personalized, serene homes.",
    established: 2005,
  },
  {
    id: 26,
    name: "RAK Properties",
    projectCount: "15+",
    logo: rakLogo,
    description: "Discover natural splendor with RAK Properties, Ras Al Khaimah’s premier developer since 2005! Projects like Mina Al Arab with its 1.6km beachfront and Al Hamra Village with a PGA golf course blend nature and luxury. With solar-powered smart cities, RAK Properties offers a serene, sustainable escape.",
    established: 2005,
  },
  ];

  // Create duplicated array for seamless infinite scrolling
  const displayDevelopers = [...developerData, ...developerData];

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !sliderRef.current) return;

    const slider = sliderRef.current;
    let animationId: number;
    let startTime: number;
    const duration = 60000; // Slower animation to see all developers

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      const totalWidth = slider.scrollWidth;
      const containerWidth = slider.parentElement?.clientWidth || 0;
      const maxTranslateX = totalWidth / 2; // Only scroll half since we duplicated

      const translateX = -(progress * maxTranslateX);

      slider.style.transform = `translateX(${translateX}px)`;

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isLoading]);

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
                {displayDevelopers.map((developer: Developer, index: number) => (
                  <div 
                    key={`${developer.id || index}`} 
                    className="inline-block"
                  >
                    <DeveloperCard 
                      id={developer.id || index + 1}
                      name={developer.name}
                      projectCount={String(developer.projectCount || "25+")}
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