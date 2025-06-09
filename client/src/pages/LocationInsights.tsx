import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import sharjah from '../assets/insights/sharjah.webp'
import ajman from '../assets/insights/Ajman.webp'
import rak from '../assets/insights/rak.webp'
import uaq from '../assets/insights/uaq.webp'
import fujairah from '../assets/insights/Fujairah.webp'
import { 
  MapPin, 
  Home, 
  Users, 
  Star,
  Wifi,
  Car,
  ShoppingBag,
  GraduationCap,
  Heart,
  TreePine,
  Waves
} from 'lucide-react';

import MetroTransportLayer from '@/components/MetroTransportLayer';


interface CityData {
  id: string;
  name: string;
  description: string;
  image: string;
  population: string;
  area: string;
  highlights: string[];
  keyAreas: string[];
  averagePrice: string;
  rentalYield: string;
  lifestyle: {
    walkability: number;
    familyFriendly: number;
    amenities: number;
    connectivity: number;
  };
}

const LocationInsights = () => {
  const [selectedTab, setSelectedTab] = useState('emirates');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const emiratesData: CityData[] = [
    {
      id: 'dubai',
      name: 'Dubai',
      description: 'The most cosmopolitan city in the UAE, known for its luxury lifestyle, world-class infrastructure, and diverse communities.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      population: '3.5M+',
      area: '4,114 km²',
      highlights: ['Global Business Hub', 'Tax-Free Income', 'World-Class Infrastructure', 'Cultural Diversity'],
      keyAreas: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Business Bay', 'DIFC', 'JBR'],
      averagePrice: 'AED 1,200 - 2,500 per sqft',
      rentalYield: '5-8%',
      lifestyle: {
        walkability: 85,
        familyFriendly: 90,
        amenities: 95,
        connectivity: 90
      }
    },
    {
      id: 'abudhabi',
      name: 'Abu Dhabi',
      description: 'The capital and largest emirate, offering a perfect blend of traditional culture and modern luxury with excellent investment opportunities.',
      image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      population: '2.9M+',
      area: '67,340 km²',
      highlights: ['Capital City', 'Cultural Heritage', 'Government Hub', 'Stable Investment'],
      keyAreas: ['Corniche', 'Saadiyat Island', 'Yas Island', 'Al Reem Island', 'Masdar City'],
      averagePrice: 'AED 900 - 2,000 per sqft',
      rentalYield: '6-9%',
      lifestyle: {
        walkability: 80,
        familyFriendly: 95,
        amenities: 90,
        connectivity: 85
      }
    },
    {
      id: 'sharjah',
      name: 'Sharjah',
      description: 'Known as the cultural capital of the UAE, offering affordable living with rich heritage and excellent educational institutions.',
      image: sharjah,
      population: '1.8M+',
      area: '2,590 km²',
      highlights: ['Cultural Capital', 'Affordable Living', 'Educational Hub', 'Art & Heritage'],
      keyAreas: ['Al Majaz', 'Al Khan', 'Muwailih', 'Al Nahda', 'University City'],
      averagePrice: 'AED 600 - 1,200 per sqft',
      rentalYield: '7-10%',
      lifestyle: {
        walkability: 75,
        familyFriendly: 90,
        amenities: 80,
        connectivity: 75
      }
    },
    {
      id: 'ajman',
      name: 'Ajman',
      description: 'The smallest emirate offering great value for money with beautiful beaches and growing infrastructure development.',
      image: ajman,
      population: '540K+',
      area: '259 km²',
      highlights: ['Affordable Housing', 'Beach Living', 'Growing Economy', 'Investment Potential'],
      keyAreas: ['Ajman Corniche', 'Al Nuaimiya', 'Al Rashidiya', 'Al Hamidiya'],
      averagePrice: 'AED 450 - 900 per sqft',
      rentalYield: '8-12%',
      lifestyle: {
        walkability: 70,
        familyFriendly: 85,
        amenities: 70,
        connectivity: 70
      }
    },
    {
      id: 'ras-al-khaimah',
      name: 'Ras Al Khaimah',
      description: 'Northern emirate known for its natural beauty, mountains, and emerging tourism sector with excellent investment opportunities.',
      image: rak,
      population: '400K+',
      area: '1,684 km²',
      highlights: ['Natural Beauty', 'Tourism Growth', 'Adventure Sports', 'Mountain Views'],
      keyAreas: ['Al Hamra', 'Mina Al Arab', 'Julfar', 'Al Marjan Island'],
      averagePrice: 'AED 500 - 1,000 per sqft',
      rentalYield: '7-11%',
      lifestyle: {
        walkability: 65,
        familyFriendly: 80,
        amenities: 75,
        connectivity: 65
      }
    },
    {
      id: 'fujairah',
      name: 'Fujairah',
      description: 'East coast emirate offering unique mountain and sea landscapes with growing tourism and logistics sectors.',
      image: fujairah,
      population: '250K+',
      area: '1,166 km²',
      highlights: ['East Coast', 'Mountain & Sea', 'Tourism Development', 'Port Hub'],
      keyAreas: ['Fujairah City', 'Dibba', 'Khor Fakkan', 'Al Faseel'],
      averagePrice: 'AED 400 - 800 per sqft',
      rentalYield: '8-12%',
      lifestyle: {
        walkability: 60,
        familyFriendly: 75,
        amenities: 65,
        connectivity: 60
      }
    },
    {
      id: 'umm-al-quwain',
      name: 'Umm Al Quwain',
      description: 'Peaceful emirate known for its mangroves, water sports, and emerging residential developments with great potential.',
      image: uaq,
      population: '80K+',
      area: '777 km²',
      highlights: ['Peaceful Living', 'Natural Mangroves', 'Water Sports', 'Development Potential'],
      keyAreas: ['UAQ City', 'Al Salam City', 'Flamingo Villas', 'Marina'],
      averagePrice: 'AED 350 - 700 per sqft',
      rentalYield: '9-13%',
      lifestyle: {
        walkability: 55,
        familyFriendly: 80,
        amenities: 60,
        connectivity: 55
      }
    }
  ];

  const selectedCityData = selectedCity ? emiratesData.find(city => city.id === selectedCity) : null;

  const LifestyleIndicator = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm font-semibold">{value}%</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-montserrat font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              UAE Location Insights
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
              Discover the unique characteristics, investment opportunities, and lifestyle benefits 
              of each emirate and city across the United Arab Emirates.
            </p>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white border">
              <TabsTrigger value="emirates" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Emirates Overview
              </TabsTrigger>
              <TabsTrigger value="transport" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Car className="w-4 h-4 mr-2" />
                Transport Access
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emirates" className="space-y-6">
              {!selectedCity ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emiratesData.map((city, index) => (
                    <motion.div
                      key={city.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                        onClick={() => setSelectedCity(city.id)}
                      >
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img 
                            src={city.image} 
                            alt={city.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{city.name}</h3>
                            <p className="text-sm opacity-90">Population: {city.population}</p>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <p className="text-gray-600 mb-4 line-clamp-3">{city.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {city.highlights.slice(0, 2).map((highlight, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-primary font-semibold">{city.averagePrice}</span>
                            <span className="text-green-600 font-medium">{city.rentalYield} yield</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : selectedCityData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCity(null)}
                    className="mb-4"
                  >
                    ← Back to Emirates
                  </Button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-lg">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={selectedCityData.image} 
                          alt={selectedCityData.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <h2 className="text-3xl font-bold">{selectedCityData.name}</h2>
                          <p className="text-lg opacity-90">Population: {selectedCityData.population}</p>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-gray-600 mb-6">{selectedCityData.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <h4 className="font-semibold mb-2">Average Price</h4>
                            <p className="text-primary font-bold">{selectedCityData.averagePrice}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Rental Yield</h4>
                            <p className="text-green-600 font-bold">{selectedCityData.rentalYield}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Key Highlights</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCityData.highlights.map((highlight, idx) => (
                              <Badge key={idx} variant="outline">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-6">
                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle>Lifestyle Scores</CardTitle>
                          <CardDescription>Quality of life indicators</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <LifestyleIndicator 
                            label="Walkability" 
                            value={selectedCityData.lifestyle.walkability} 
                            icon={Users}
                          />
                          <LifestyleIndicator 
                            label="Family Friendly" 
                            value={selectedCityData.lifestyle.familyFriendly} 
                            icon={Heart}
                          />
                          <LifestyleIndicator 
                            label="Amenities" 
                            value={selectedCityData.lifestyle.amenities} 
                            icon={ShoppingBag}
                          />
                          <LifestyleIndicator 
                            label="Connectivity" 
                            value={selectedCityData.lifestyle.connectivity} 
                            icon={Wifi}
                          />
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle>Key Areas</CardTitle>
                          <CardDescription>Popular neighborhoods and districts</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedCityData.keyAreas.map((area, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="text-sm">{area}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="transport" className="space-y-6">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-montserrat font-semibold mb-2">Metro & Transport Accessibility</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover properties with excellent connectivity to Dubai's public transport network including 
                  Metro, Tram, Ferry, and Bus stations.
                </p>
              </div>
              <MetroTransportLayer />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocationInsights;