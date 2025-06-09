import { Developer } from '../types';
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

export const developersData: Developer[] = [
  {
    id: 1,
    name: "Emaar Properties",
    logo: emaarLogo,
    projectCount: 250,
    description: "Soar to new heights with Emaar Properties, a global titan that has redefined luxury living since 1997! Founded by Mohamed Alabbar, this Dubai-based developer is synonymous with architectural brilliance, delivering iconic landmarks like the Burj Khalifa—the world's tallest building at 829.8 meters—and the sprawling Dubai Mall, a retail paradise attracting over 100 million visitors annually. Emaar's vision transcends construction, crafting vibrant communities like Downtown Dubai that set new standards for modern living.",
    overviewParagraphs: [
      "Soar to new heights with Emaar Properties, a global titan that has redefined luxury living since 1997! Founded by Mohamed Alabbar, this Dubai-based developer is synonymous with architectural brilliance, delivering iconic landmarks like the Burj Khalifa—the world's tallest building at 829.8 meters—and the sprawling Dubai Mall, a retail paradise attracting over 100 million visitors annually. Emaar's vision transcends construction, crafting vibrant communities like Downtown Dubai that set new standards for modern living.",
      "Emaar's portfolio spans residential, commercial, retail, and hospitality sectors, with a presence in over 36 markets across the Middle East, North Africa, Asia, Europe, and North America. From the serene Dubai Hills Estate to the bustling Downtown Dubai, Emaar prioritizes sustainability and innovation, incorporating energy-efficient designs and lush green spaces into its projects. Its commitment to quality is evident in every detail, from the sleek architecture of its luxury villas to the world-class amenities that define its communities.",
      "With a valuation of approximately US$15.5 billion as of June 2021, Emaar continues to lead the industry with its forward-thinking approach. The developer has delivered over 85,000 residential units globally and is known for its off-plan properties, which offer investors lucrative returns and flexible payment plans. Whether it's the waterfront elegance of Emaar Beachfront or the resort-style luxury of Address Hotels in Ras Al Khaimah, Emaar Properties transforms skylines and lifestyles with unparalleled sophistication."
    ],
    keyProjects: ["Burj Khalifa", "Dubai Mall", "Downtown Dubai", "Dubai Marina", "Dubai Hills Estate"],
    uniqueSellingPoints: ["Record-breaking architectural landmarks like Burj Khalifa", "Master-planned communities with championship golf courses", "Solar-powered, eco-friendly designs with 80+ acres of greenery", "Award-winning 5-star hospitality with panoramic views", "High-return off-plan investments with 10%+ annual yields"],
    marketPosition: "Emaar Properties reigns as a global leader in luxury real estate, captivating investors and residents with its iconic, sustainable developments that set trends worldwide.",
    established: 1997,
    featured: true
  },
  {
    id: 2,
    name: "Damac Properties",
    logo: damacLogo,
    projectCount: 200,
    description: "Step into a realm of opulence with Damac Properties, where luxury meets innovation since 2002! Founded by Hussain Sajwani, Damac has become a trailblazer in high-end real estate, delivering over 48,000 homes across the UAE and beyond. Known for bold designs like Damac Hills—a 42-million-square-foot community with a Trump-branded golf course—Damac transforms Dubai's skyline into a gallery of lifestyle statements, blending grandeur with modern functionality for discerning buyers worldwide.",
    overviewParagraphs: [
      "Step into a realm of opulence with Damac Properties, where luxury meets innovation in the heart of the UAE! Founded in 2002 by Hussain Sajwani, Damac has risen to prominence as a trailblazer in high-end real estate, delivering over 48,000 homes and counting. Known for its bold designs and lavish finishes, Damac transforms Dubai's skyline with projects that are not just homes but lifestyle statements, blending grandeur with modern functionality.",
      "Damac's portfolio is a testament to its commitment to excellence, featuring collaborations with global luxury brands like Versace, Paramount Hotels & Resorts, and Roberto Cavalli. From the golf-centric gated community of Damac Hills to the Mediterranean-inspired Damac Lagoons, each development offers premium amenities and strategic locations that appeal to discerning investors and residents alike. The company's focus on creating vibrant, community-focused spaces ensures that every project becomes a destination in itself.",
      "With a record of 1,767 transactions totaling AED 4.13 billion in January 2025 alone, Damac continues to dominate the luxury real estate market. Its off-plan projects, such as the stunning Cavalli Tower, offer flexible payment plans starting around AED 1.1M, making luxury accessible to a broader audience. Damac Properties is more than a developer—it's a curator of extraordinary living experiences that redefine what it means to live in style across the Middle East."
    ],
    keyProjects: ["Damac Hills", "Damac Lagoons", "Cavalli Tower", "Akoya Oxygen", "Paramount Tower Hotel & Residences"],
    uniqueSellingPoints: ["Exclusive collaborations with luxury brands like Versace and Cavalli", "Opulent designs with private cinemas and infinity pools", "Golden-facade skyscrapers and crystal-clear lagoons", "Trump-branded golf courses and rooftop pools", "High transaction volume with AED 4.13 billion in 2025"],
    marketPosition: "Damac Properties leads the luxury real estate sector in Dubai, captivating high-net-worth individuals with its extravagant, brand-driven developments.",
    established: 2002,
    featured: true
  },
  {
    id: 3,
    name: "Nakheel",
    logo: nakheelLogo,
    projectCount: 100,
    description: "Dive into a world of waterfront wonders with Nakheel, the visionary developer transforming Dubai's coastline since 2003! Known for creating the iconic Palm Jumeirah—a man-made island with over 4,000 luxury residences—Nakheel has redefined coastal living with its ambitious projects. As a government-owned entity, Nakheel has expanded Dubai's infrastructure, adding new dimensions to the city with developments like The World Islands, a collection of 300 private islets shaped like a world map.",
    overviewParagraphs: [
      "Dive into a world of waterfront wonders with Nakheel, the visionary developer that has transformed Dubai's coastline since its establishment in 2003! Known for creating the iconic Palm Jumeirah—a man-made island that houses some of the world's most exclusive properties—Nakheel has redefined luxury living with its ambitious, large-scale projects. As a government-owned entity, Nakheel has been instrumental in expanding Dubai's infrastructure, literally adding new dimensions to the city.",
      "Nakheel's portfolio is a celebration of innovation, featuring developments like The World Islands and Jumeirah Village, which combine residential, retail, and leisure spaces into cohesive communities. In January 2025, Nakheel reported 411 transactions totaling AED 3.78 billion, reflecting its enduring appeal to global investors. The developer's projects are designed to offer a seamless blend of luxury and functionality, with amenities like Nakheel Mall and The Pointe enhancing the overall living experience.",
      "From the serene shores of Palm Jebel Ali to the vibrant International City, Nakheel continues to push the boundaries of urban planning. Despite facing challenges during the 2007-2010 financial crisis, Nakheel rebounded with a $10 billion investment from Abu Dhabi, cementing its role as a cornerstone of Dubai's growth. For those seeking a lifestyle that merges coastal elegance with modern convenience, Nakheel delivers a paradise unlike any other."
    ],
    keyProjects: ["Palm Jumeirah", "The World Islands", "Jumeirah Village", "International City", "Deira Islands"],
    uniqueSellingPoints: ["Man-made islands with 7km beachfronts", "Floating beach parks and rooftop cinemas", "World's largest fountain shows at The Pointe", "Sky pools connecting twin towers at 170 meters", "Diverse communities with 80+ nationalities"],
    marketPosition: "Nakheel leads Dubai's master development sector, captivating global investors with its transformative, waterfront projects that enhance tourism and luxury living.",
    established: 2003,
    featured: true
  },
  {
    id: 4,
    name: "Aldar Properties PJSC",
    logo: aldarLogo,
    projectCount: 120,
    description: "Unveil a legacy of innovation with Aldar Properties, Abu Dhabi's premier real estate developer since 2004! As a publicly traded company, Aldar has shaped the emirate's urban fabric with iconic projects like Yas Island, home to the Yas Marina Circuit hosting Formula 1 races, and Saadiyat Island, a cultural gem with the Louvre Abu Dhabi. With 88% of its properties in Abu Dhabi, Aldar is a cornerstone of the region's development, blending luxury with cultural significance.",
    overviewParagraphs: [
      "Unveil a legacy of innovation with Aldar Properties PJSC, Abu Dhabi's premier real estate developer since its founding in 2004! As a publicly traded company, Aldar has played a pivotal role in shaping the emirate's urban fabric, delivering iconic projects like Yas Island and Saadiyat Island that blend luxury with cultural significance. With 88% of its properties in Abu Dhabi, Aldar is a cornerstone of the region's development, known for creating vibrant, sustainable communities.",
      "Aldar's portfolio spans residential, commercial, retail, and hospitality sectors, with developments like Al Raha Beach and Reem Island offering residents a harmonious blend of modern living and natural beauty. The company's recent collaboration with Dubai Holding has led to the launch of 'Haven,' a wellness-focused residential neighborhood, showcasing Aldar's commitment to innovation and sustainability. Projects like Saadiyat Lagoons, with their eco-friendly villas, further cement Aldar's reputation as a forward-thinking developer.",
      "In January 2025, Aldar recorded 282 transactions worth AED 862.14 million, underscoring its strong market presence. With a diverse portfolio and a focus on integrated communities, Aldar continues to attract investors and residents seeking a balanced lifestyle. From the thrill of Yas Marina Circuit to the tranquility of Saadiyat Grove, Aldar Properties crafts spaces that inspire and elevate the human experience."
    ],
    keyProjects: ["Yas Island", "Saadiyat Island", "Al Raha Beach", "Reem Island", "Saadiyat Lagoons"],
    uniqueSellingPoints: ["Iconic cultural landmarks like Louvre Abu Dhabi", "Wellness-focused neighborhoods with yoga pavilions", "Eco-friendly villas with swimmable lagoons", "Mile-long promenades with luxury boutiques", "Hosts Formula 1 races at Yas Marina Circuit"],
    marketPosition: "Aldar Properties dominates Abu Dhabi's real estate market, captivating investors with its culturally rich, sustainable developments.",
    established: 2004,
    featured: true
  },
  {
    id: 5,
    name: "Sobha Realty",
    logo: sobhaLogo,
    projectCount: 150,
    description: "Discover timeless elegance with Sobha Realty, a multinational developer crafting architectural masterpieces since 1976! Founded by Indian entrepreneur PNC Menon, Sobha brings a legacy of meticulous craftsmanship to Dubai, establishing itself as a beacon of ultra-luxury with projects like Sobha Hartland, featuring the world's largest man-made crystal lagoon spanning 30,000 sqm. Operating in the UAE, Oman, Bahrain, Brunei, and India, Sobha's in-house design and construction ensure unparalleled quality.",
    keyProjects: ["Sobha Hartland", "Sobha Hartland 2", "Sobha Seahaven", "Creek Vistas Grande", "Skyscape Avenue"],
    uniqueSellingPoints: ["World's largest man-made crystal lagoon at 30,000 sqm", "LEED Gold-certified sustainable designs with solar panels", "Imported marble and custom woodwork for luxury finishes", "Private beachfront clubs and 200,000 sqm of greenery", "Over 100 awards for quality and craftsmanship"],
    marketPosition: "Sobha Realty is a top-tier luxury developer in Dubai, celebrated for its sustainable, craftsmanship-driven communities that attract global elites.",
    established: 1976,
    featured: true
  },
  {
    id: 6,
    name: "Dubai Properties",
    logo: dubaiPropertiesLogo,
    projectCount: 80,
    description: "Experience the heartbeat of Dubai with Dubai Properties, a master developer shaping the city's landscape since 2004! As a member of Dubai Holding, Dubai Properties is renowned for creating iconic communities like Jumeirah Beach Residence (JBR), with its 1.7km beachfront, and The Villa, a lush residential haven with Spanish-inspired architecture. With a focus on sustainable urban planning, Dubai Properties crafts spaces that cater to families, professionals, and investors alike.",
    keyProjects: ["Jumeirah Beach Residence (JBR)", "The Villa", "Business Bay", "Dubailand", "Serena"],
    uniqueSellingPoints: ["1.7km beachfronts and 2km cycling tracks", "Indoor ski slopes and art gallery promenades", "278 sqkm entertainment metropolises hosting Global Village", "Spanish-inspired architecture in residential havens", "Vibrant retail ecosystems with 300+ outlets"],
    marketPosition: "Dubai Properties is a key player in Dubai's real estate market, captivating residents and investors with its vibrant, sustainable communities.",
    established: 2004,
    featured: true
  },
  {
    id: 7,
    name: "Meraas Holding",
    logo: meraasLogo,
    projectCount: 50,
    description: "Immerse yourself in curated luxury with Meraas Holding, a visionary developer reshaping Dubai's urban landscape since 2007! Part of Dubai Holding, Meraas creates destination-focused projects that blend culture, design, and community, enhancing Dubai's global appeal. Bluewaters Island, home to the record-breaking Ain Dubai observation wheel at 250 meters, and City Walk, a chic urban hub with high-end retail, showcase Meraas's ability to craft inspiring spaces.",
    keyProjects: ["Bluewaters Island", "City Walk", "La Mer", "The Beach at JBR", "Port de La Mer"],
    uniqueSellingPoints: ["World's largest observation wheel at 250 meters", "Eco-friendly designs with artist studios and galleries", "Luxury villas with private beaches and 1.5km coastline", "Open-air cinema nights and vibrant retail hubs", "Cultural integration in modern urban destinations"],
    marketPosition: "Meraas Holding is a leading developer in Dubai, celebrated for its innovative, mixed-use projects that enhance the city's appeal as a global lifestyle destination.",
    established: 2007,
    featured: true
  },
  {
    id: 8,
    name: "Arada",
    logo: aradaLogo,
    projectCount: 40,
    description: "Unlock modern living with Arada, a rising star in the UAE's real estate market since 2017! Founded by Sheikh Sultan bin Ahmed Al Qasimi and Prince Khaled bin Alwaleed bin Talal, Arada focuses on creating vibrant, wellness-oriented communities in Sharjah and beyond. Its flagship project, Aljada, is Sharjah's largest mixed-use community, spanning 24 million sq ft with a focus on smart living and cultural innovation.\n\nArada's portfolio includes Masaar, a forested community with 50,000 trees and treetop walkways, emphasizing sustainability and nature integration. Known for delivering projects on time and exceeding expectations, Arada combines international expertise with local insights, creating homes that reflect modern UAE living while honoring cultural heritage.",
    keyProjects: ["Aljada", "Masaar", "Nasma Residences", "Jouri Hills", "Sarab"],
    uniqueSellingPoints: ["Sharjah's largest mixed-use community at 24 million sq ft", "Forested communities with 50,000 trees and treetop walkways", "Smart homes with integrated wellness amenities", "Luxury villas with rooftop terraces", "Cycling tracks and yoga retreats for modern living"],
    marketPosition: "Arada is an emerging leader in Sharjah's real estate market, captivating families and professionals with its wellness-focused, sustainable communities.",
    established: 2017,
    featured: false
  },
  {
    id: 9,
    name: "Eagle Hills",
    logo: eagleHillsLogo,
    projectCount: 30,
    description: "Experience global excellence with Eagle Hills, a luxury developer shaping skylines since 2014! Based in Abu Dhabi, Eagle Hills is known for its waterfront masterpieces like The Address Fujairah, a 5-star resort with private beach access, and Maryam Island in Sharjah, offering 3.3 million sq ft of coastal living. With a global portfolio spanning Europe, Africa, and the Middle East, Eagle Hills delivers sophistication on an international scale.\n\nEagle Hills' projects blend luxury hospitality with residential excellence, creating communities that offer resort-style living with world-class amenities. From floating villas to championship golf courses, Eagle Hills redefines luxury living with developments that attract global investors seeking premium waterfront properties.",
    keyProjects: ["The Address Fujairah", "Maryam Island", "Ramhan Island", "Ethmar International Towers", "The Point"],
    uniqueSellingPoints: ["Waterfront communities with floating villas", "5-star resorts with private beach access", "Global portfolio spanning Europe, Africa, and Middle East", "Marinas, golf courses, and cultural hubs", "High ROI in prime international locations"],
    marketPosition: "Eagle Hills is a global luxury developer, captivating investors with its waterfront masterpieces and international presence.",
    established: 2014,
    featured: false
  },
  {
    id: 10,
    name: "Object 1",
    logo: object1Logo,
    projectCount: 15,
    description: "Enter the avant-garde with Object 1, Dubai's most innovative architectural developer since 2019! Founded by visionary architects and design enthusiasts, Object 1 challenges conventional real estate norms with bold, artistic projects that blur the line between architecture and art. Known for creating Instagram-worthy developments with unique geometric facades and unconventional layouts, Object 1 attracts buyers seeking extraordinary living experiences.\n\nObject 1's philosophy centers on creating 'living sculptures' that serve as both homes and artistic statements. With projects featuring infinity pools suspended between buildings, rotating penthouses, and walls that change color with the seasons, Object 1 redefines what luxury living can be in the modern world.",
    keyProjects: ["Canvas Tower", "Sculpture Residences", "Prism Apartments", "Infinite Views", "Art House"],
    uniqueSellingPoints: ["Avant-garde architectural designs that challenge conventions", "Instagram-worthy developments with unique geometric facades", "Living sculptures that blend art and residential function", "Infinity pools suspended between buildings", "Rotating penthouses and color-changing walls"],
    marketPosition: "Object 1 is Dubai's premier artistic developer, attracting creative professionals and art enthusiasts seeking unique, unconventional luxury properties.",
    established: 2019,
    featured: false
  },
  {
    id: 11,
    name: "Samana Developers",
    logo: samanaLogo,
    projectCount: 25,
    description: "Discover contemporary luxury with Samana Developers, Dubai's bold innovator since 2017! Known for introducing private pools in apartments—a revolutionary concept that transformed residential expectations—Samana creates communities where every home feels like a resort. With projects featuring rooftop infinity pools, sky gardens, and wellness-focused amenities, Samana targets young professionals and modern families seeking lifestyle-driven properties.\n\nSamana's developments emphasize outdoor living and wellness, with features like outdoor gyms, meditation gardens, and co-working spaces integrated into residential towers. The developer's commitment to innovation and modern living has made it a favorite among millennials and Gen Z buyers looking for properties that match their dynamic lifestyles.",
    keyProjects: ["Samana Hills", "Samana Golf Avenue", "Samana Park Views", "Samana Greens", "Samana Miami"],
    uniqueSellingPoints: ["Private pools in apartments - a revolutionary concept", "Rooftop infinity pools and sky gardens in every project", "Wellness-focused amenities including outdoor gyms", "Modern communities targeting young professionals", "Flexible payment plans with attractive returns"],
    marketPosition: "Samana Developers is a rising star in Dubai's real estate market, captivating millennials and Gen Z with its innovative, lifestyle-driven properties.",
    established: 2017,
    featured: false
  },
  {
    id: 12,
    name: "Binghatti Developers",
    logo: binghattiLogo,
    projectCount: 35,
    description: "Experience architectural mastery with Binghatti Developers, Dubai's geometric genius since 2008! Founded by Muhammad Binghatti, this UAE-based developer is renowned for its distinctive diamond-shaped facades and innovative geometric designs that have become synonymous with modern Dubai architecture. Binghatti's projects stand out in the skyline with their unique angular patterns, premium materials, and attention to detail.\n\nBinghatti combines traditional Middle Eastern design elements with contemporary architecture, creating buildings that are both culturally relevant and globally appealing. With a focus on luxury finishes, smart home technology, and sustainable building practices, Binghatti appeals to discerning buyers who appreciate architectural innovation and premium quality.",
    keyProjects: ["Binghatti Phantom", "Binghatti Gateway", "Binghatti Stars", "Binghatti Corner", "Binghatti Crescent"],
    uniqueSellingPoints: ["Distinctive diamond-shaped facades and geometric designs", "Unique angular patterns that stand out in Dubai's skyline", "Premium materials and luxury finishes throughout", "Smart home technology and sustainable practices", "Cultural relevance combined with global appeal"],
    marketPosition: "Binghatti Developers is Dubai's leading architectural innovator, attracting buyers who value distinctive design and premium quality construction.",
    established: 2008,
    featured: false
  },
  {
    id: 13,
    name: "Danube Properties",
    logo: danubeLogo,
    projectCount: 40,
    description: "Embrace affordable luxury with Danube Properties, Dubai's accessibility champion since 2014! Part of the renowned Danube Group, which has been a regional retail giant since 1993, Danube Properties revolutionized homeownership with its innovative 1% monthly payment plan. This developer has made luxury living accessible to middle-income families without compromising on quality, amenities, or design excellence.\n\nDanube Properties focuses on creating value-driven developments with premium amenities typically found in much more expensive projects. From infinity pools and fully equipped gyms to landscaped gardens and children's play areas, Danube ensures that affordable housing doesn't mean sacrificing luxury experiences.",
    keyProjects: ["Gemz", "Bayz 102", "Diamondz", "Elitz", "Oceanz"],
    uniqueSellingPoints: ["Revolutionary 1% monthly payment plan making homeownership accessible", "Luxury amenities at affordable prices", "Premium designs without the premium price tag", "Family-focused communities with children's amenities", "Part of established Danube Group with 30+ years experience"],
    marketPosition: "Danube Properties leads the affordable luxury segment in Dubai, making high-quality living accessible to middle-income families and first-time buyers.",
    established: 2014,
    featured: false
  },
  {
    id: 14,
    name: "Ellington Properties",
    logo: ellingtonLogo,
    projectCount: 20,
    description: "Discover refined elegance with Ellington Properties, Dubai's boutique luxury specialist since 2014! Known for creating intimate, low-rise communities that prioritize quality over quantity, Ellington focuses on crafting homes with character and soul. With projects featuring private gardens, swimming pools, and premium finishes, Ellington appeals to discerning buyers seeking exclusivity and personalized living experiences.\n\nEllington's developments emphasize community living with shared amenities like clubhouses, tennis courts, and landscaped parks. The developer's commitment to creating neighborhoods rather than just buildings has earned it a reputation among families and professionals who value privacy, quality, and community connection.",
    keyProjects: ["Belgravia Heights", "Belgravia Square", "DT1", "Wilton Park Residences", "The Crestmark"],
    uniqueSellingPoints: ["Intimate, low-rise communities with character and soul", "Private gardens and swimming pools for most units", "Premium finishes and attention to detail", "Family-friendly neighborhoods with community amenities", "Exclusive developments prioritizing quality over quantity"],
    marketPosition: "Ellington Properties is Dubai's premier boutique developer, attracting families and professionals seeking exclusive, community-focused luxury living.",
    established: 2014,
    featured: false
  },
  {
    id: 15,
    name: "Nshama",
    logo: nshamaLogo,
    projectCount: 30,
    description: "Experience community-centric living with Nshama, Dubai's master community developer since 2014! Founded by Fred Durie, Nshama is dedicated to creating vibrant neighborhoods that foster genuine community connections. Known for Town Square, a family-friendly development spanning 750 acres with parks, schools, retail outlets, and recreational facilities, Nshama prioritizes creating places where residents can live, work, and play.\n\nNshama's developments feature extensive green spaces, community centers, and family-oriented amenities that encourage neighborly interactions and community building. With a focus on affordability and quality, Nshama creates homes that appeal to young families and professionals seeking a balanced lifestyle in Dubai.",
    keyProjects: ["Town Square", "Hayat Island", "Cherrywoods", "Zahra", "Mudon Views"],
    uniqueSellingPoints: ["Master communities spanning hundreds of acres", "Extensive green spaces and family-friendly amenities", "Community centers fostering neighbor connections", "Affordable pricing for young families", "Live, work, play concept in single developments"],
    marketPosition: "Nshama is Dubai's leading community-focused developer, creating master-planned neighborhoods that appeal to families seeking quality and affordability.",
    established: 2014,
    featured: false
  },
  {
    id: 16,
    name: "Azizi Developments",
    logo: aziziLogo,
    projectCount: 60,
    description: "Embrace modern living with Azizi Developments, Dubai's prolific creator of contemporary communities since 2007! Founded by Mirwais Azizi, this developer has delivered thousands of homes across Dubai with a focus on modern design, premium amenities, and strategic locations. Known for projects like Azizi Riviera and Azizi Venice, the company creates resort-style living experiences in the heart of the city.\n\nAzizi Developments emphasizes creating lifestyle destinations with amenities like crystal lagoons, beach access, and world-class fitness facilities. The developer's commitment to timely delivery and quality construction has earned trust among investors and residents looking for reliable, value-driven properties.",
    keyProjects: ["Azizi Riviera", "Azizi Venice", "Azizi Beachfront", "Azizi Creek Views", "Azizi Shaista"],
    uniqueSellingPoints: ["Resort-style living in urban locations", "Crystal lagoons and beach access in city developments", "Modern design with premium amenities", "Reliable delivery track record", "Strategic locations across Dubai's prime areas"],
    marketPosition: "Azizi Developments is a major player in Dubai's real estate market, delivering modern, amenity-rich communities that appeal to diverse buyers and investors.",
    established: 2007,
    featured: false
  },
  {
    id: 17,
    name: "Select Group",
    logo: selectGroupLogo,
    projectCount: 25,
    description: "Enter the realm of luxury hospitality with Select Group, Dubai's premier hospitality-residential developer since 2002! Specializing in hotel-branded residences and luxury serviced apartments, Select Group creates properties that offer the sophistication of five-star hotels with the comfort of home ownership. Known for partnerships with international hotel brands, Select Group delivers properties with world-class service and amenities.\n\nSelect Group's developments feature concierge services, spa facilities, fine dining restaurants, and professional property management that ensures consistent rental returns for investors. The company's focus on hospitality-grade service and luxury amenities attracts high-net-worth individuals and investors seeking premium rental yields.",
    keyProjects: ["Palazzo Versace Residences", "Four Seasons Resort", "Kempinski Residences", "W Residences", "Edition Residences"],
    uniqueSellingPoints: ["Hotel-branded residences with five-star service", "Partnerships with international luxury hotel brands", "Concierge services and spa facilities", "Professional property management ensuring rental returns", "Hospitality-grade amenities and services"],
    marketPosition: "Select Group leads the luxury hospitality-residential sector in Dubai, attracting high-net-worth buyers and investors seeking premium branded experiences.",
    established: 2002,
    featured: false
  },
  {
    id: 18,
    name: "MAG Group",
    logo: magLogo,
    projectCount: 45,
    description: "Discover diverse excellence with MAG Group, Dubai's multi-sector development leader since 1982! Originally focused on engineering and construction, MAG has evolved into a comprehensive real estate developer creating everything from affordable housing to luxury waterfront communities. Known for MAG of Life and MAG Eye developments, the company offers diverse property options catering to various budgets and lifestyles.\n\nMAG Group's strength lies in its vertical integration, handling everything from land acquisition and development to construction and property management. This comprehensive approach ensures quality control and cost efficiency, allowing MAG to offer competitive pricing without compromising on quality or amenities.",
    keyProjects: ["MAG of Life", "MAG Eye", "MAG 230", "MAG Creek", "MAG Meydan"],
    uniqueSellingPoints: ["Diverse portfolio from affordable to luxury segments", "Vertical integration ensuring quality and cost efficiency", "40+ years of engineering and construction experience", "Competitive pricing without compromising quality", "Multiple developments across Dubai's key locations"],
    marketPosition: "MAG Group is a versatile developer in Dubai's real estate market, offering diverse property solutions that cater to various buyer segments and investment goals.",
    established: 1982,
    featured: false
  },
  {
    id: 19,
    name: "Bloom Properties",
    logo: bloomLogo,
    projectCount: 15,
    description: "Experience botanical luxury with Bloom Properties, Dubai's nature-inspired developer since 2017! Specializing in green developments that integrate natural elements with modern architecture, Bloom creates communities where residents can connect with nature without leaving the city. Known for extensive landscaping, rooftop gardens, and biophilic design principles, Bloom appeals to environmentally conscious buyers.\n\nBloom Properties focuses on sustainability and wellness, incorporating features like air purification systems, natural lighting, and green walls throughout their developments. The company's commitment to creating healthy living environments attracts families and professionals who prioritize well-being and environmental responsibility.",
    keyProjects: ["Bloom Gardens", "Bloom Heights", "Bloom Towers", "Eden Gardens", "Green Square"],
    uniqueSellingPoints: ["Nature-inspired developments with extensive landscaping", "Biophilic design principles promoting wellness", "Sustainable features like air purification systems", "Rooftop gardens and green walls throughout", "Environmental responsibility and healthy living focus"],
    marketPosition: "Bloom Properties is Dubai's leading green developer, attracting environmentally conscious buyers seeking sustainable, wellness-focused living spaces.",
    established: 2017,
    featured: false
  },
  {
    id: 20,
    name: "Tiger Properties",
    logo: tigerLogo,
    projectCount: 20,
    description: "Unleash bold living with Tiger Properties, Dubai's dynamic developer creating striking residential experiences since 2016! Known for its aggressive marketing and eye-catching architectural designs, Tiger Properties targets young professionals and investors with projects that stand out in Dubai's competitive landscape. The company focuses on creating Instagram-worthy developments with unique features and amenities.\n\nTiger Properties emphasizes modern technology integration, featuring smart home systems, high-speed connectivity, and tech-forward amenities that appeal to digitally savvy residents. The developer's focus on contemporary design and technology-driven living attracts millennials and tech professionals seeking modern urban experiences.",
    keyProjects: ["Tiger Heights", "Tiger Towers", "Digital District", "Smart Homes", "Tech Valley"],
    uniqueSellingPoints: ["Bold architectural designs that stand out", "Technology integration with smart home systems", "Instagram-worthy developments with unique features", "Modern amenities targeting young professionals", "Aggressive pricing and flexible payment options"],
    marketPosition: "Tiger Properties targets the young professional and investor market in Dubai, offering technology-driven developments with bold designs and competitive pricing.",
    established: 2016,
    featured: false
  },
  {
    id: 21,
    name: "Sol Properties",
    logo: solLogo,
    projectCount: 12,
    description: "Embrace radiant living with Sol Properties, Dubai's sunshine-inspired developer since 2018! Specializing in bright, airy developments that maximize natural light and outdoor living, Sol creates properties that embody the joy and energy of sunny Dubai. Known for floor-to-ceiling windows, expansive balconies, and sun-drenched common areas, Sol appeals to residents who want to live in harmony with Dubai's beautiful climate.\n\nSol Properties focuses on creating mood-enhancing environments with features like vitamin D gardens, solar energy integration, and circadian rhythm lighting systems. The company's commitment to promoting mental and physical well-being through thoughtful design attracts health-conscious buyers seeking uplifting living spaces.",
    keyProjects: ["Sol Gardens", "Sunshine Towers", "Radiant Heights", "Solar District", "Bright Homes"],
    uniqueSellingPoints: ["Developments maximizing natural light and outdoor living", "Floor-to-ceiling windows and expansive balconies", "Vitamin D gardens and circadian rhythm lighting", "Solar energy integration and sustainable practices", "Mood-enhancing environments promoting well-being"],
    marketPosition: "Sol Properties creates sunshine-inspired developments in Dubai, attracting health-conscious buyers seeking bright, uplifting living environments that promote well-being.",
    established: 2018,
    featured: false
  },
  {
    id: 22,
    name: "Modon Properties",
    logo: modonLogo,
    projectCount: 18,
    description: "Discover urban sophistication with Modon Properties, Dubai's contemporary lifestyle developer since 2015! Focusing on creating modern urban communities that blend convenience with luxury, Modon develops properties in prime locations with easy access to business districts, entertainment hubs, and transportation networks. Known for sleek architectural designs and premium amenities, Modon attracts urban professionals and investors.\n\nModon Properties emphasizes smart urban planning with mixed-use developments that combine residential, retail, and office spaces. The company's projects feature co-working spaces, fitness centers, and rooftop lounges that cater to the needs of modern city dwellers seeking convenience and connectivity.",
    keyProjects: ["Urban District", "City Heights", "Metro Gardens", "Business Square", "Downtown Living"],
    uniqueSellingPoints: ["Prime locations with excellent connectivity", "Mixed-use developments combining multiple functions", "Smart urban planning for modern city living", "Co-working spaces and business amenities", "Sleek architectural designs with premium finishes"],
    marketPosition: "Modon Properties specializes in urban lifestyle developments in Dubai, attracting professionals and investors seeking convenient, well-connected properties with modern amenities.",
    established: 2015,
    featured: false
  },
  {
    id: 23,
    name: "RAK Properties",
    logo: rakLogo,
    projectCount: 35,
    description: "Experience northern charm with RAK Properties, the Emirate of Ras Al Khaimah's premier developer since 2005! As a publicly listed company, RAK Properties has been instrumental in developing the northern emirate's real estate landscape with projects that showcase the region's natural beauty and cultural heritage. Known for waterfront developments and mountain-view communities, RAK Properties offers alternatives to Dubai's urban intensity.\n\nRAK Properties focuses on creating resort-style communities that take advantage of Ras Al Khaimah's stunning coastline and mountain landscapes. The company's developments feature marina access, golf courses, and spa facilities, attracting buyers seeking peaceful luxury away from the bustling city centers.",
    keyProjects: ["Mina Al Arab", "Al Hamra Village", "Flamingo Villas", "Bermuda Views", "Mangrove Place"],
    uniqueSellingPoints: ["Northern emirate locations with natural beauty", "Waterfront and mountain-view communities", "Resort-style developments with marina access", "Golf courses and spa facilities", "Peaceful luxury away from urban intensity"],
    marketPosition: "RAK Properties is the leading developer in Ras Al Khaimah, offering unique waterfront and mountain developments that provide peaceful luxury alternatives to city living.",
    established: 2005,
    featured: false
  },
  {
    id: 24,
    name: "GFS Properties",
    logo: gfsLogo,
    projectCount: 22,
    description: "Build with reliability through GFS Properties, Dubai's construction-focused developer since 2012! With deep roots in the construction industry, GFS Properties brings engineering excellence and build quality to every project. Known for solid construction practices, timely delivery, and value engineering, GFS appeals to practical buyers and investors who prioritize structural integrity and long-term value.\n\nGFS Properties leverages its construction expertise to offer competitive pricing while maintaining high build standards. The company's developments feature robust construction methods, energy-efficient systems, and low-maintenance designs that reduce long-term ownership costs and maximize investment returns.",
    keyProjects: ["Builder's Choice", "Solid Foundations", "Quality Heights", "Reliable Homes", "Engineering Excellence"],
    uniqueSellingPoints: ["Construction industry expertise ensuring build quality", "Timely delivery and reliable project completion", "Value engineering for competitive pricing", "Energy-efficient systems and low-maintenance designs", "Focus on structural integrity and long-term value"],
    marketPosition: "GFS Properties attracts practical buyers and investors in Dubai who prioritize construction quality, reliability, and long-term value over flashy amenities.",
    established: 2012,
    featured: false
  },
  {
    id: 25,
    name: "Reportage Properties",
    logo: reportageLogo,
    projectCount: 28,
    description: "Embrace family-focused living with Reportage Properties, the UAE's community-centered developer since 2014! Specializing in creating neighborhoods that prioritize family life and community connections, Reportage develops master-planned communities with schools, parks, retail centers, and recreational facilities all within walking distance. Known for affordable luxury and family-oriented amenities, Reportage attracts growing families and multi-generational households.\n\nReportage Properties focuses on creating self-contained communities where residents can access daily necessities without leaving their neighborhood. The company's developments feature children's play areas, family pools, community centers, and educational facilities, fostering strong neighborhood bonds and family-friendly atmospheres.",
    keyProjects: ["Al Tawan", "Gardenia Townhomes", "Village Gardens", "Family Square", "Community Central"],
    uniqueSellingPoints: ["Master-planned communities with comprehensive amenities", "Family-oriented facilities and children's areas", "Self-contained neighborhoods with schools and retail", "Affordable luxury targeting growing families", "Focus on community connections and neighborhood bonds"],
    marketPosition: "Reportage Properties specializes in family-focused communities in the UAE, creating self-contained neighborhoods that attract growing families seeking comprehensive amenities and community living.",
    established: 2014,
    featured: false
  },
  {
    id: 26,
    name: "Nabni Properties",
    logo: nabniLogo,
    projectCount: 16,
    description: "Build tomorrow with Nabni Properties, Dubai's innovation-focused developer since 2019! Emphasizing cutting-edge technology and sustainable building practices, Nabni creates smart developments that anticipate future living needs. Known for incorporating IoT systems, renewable energy, and adaptive building technologies, Nabni appeals to forward-thinking buyers who want homes ready for the future.\n\nNabni Properties focuses on creating resilient developments that can adapt to changing environmental and technological conditions. The company's projects feature modular designs, smart grid integration, and climate-responsive architecture that positions residents at the forefront of sustainable urban living.",
    keyProjects: ["Future Homes", "Smart District", "Adaptive Living", "Green Tech", "Innovation Square"],
    uniqueSellingPoints: ["Cutting-edge technology and IoT integration", "Sustainable building practices and renewable energy", "Adaptive building technologies for future needs", "Climate-responsive and resilient architecture", "Forward-thinking designs anticipating future living"],
    marketPosition: "Nabni Properties targets innovation-focused buyers in Dubai who seek future-ready developments with cutting-edge technology and sustainable design principles.",
    established: 2019,
    featured: false
  }
];

// Export functions for compatibility with existing code
export const getDeveloperById = (id: number) => developersData.find(d => d.id === id);
export const getFeaturedDevelopers = () => developersData.filter(d => d.featured);

// Export for compatibility
export default developersData;