import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";

interface Community {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  badges: {
    walkability: number;
    familyFriendly: number;
    amenities: number;
    connectivity: number;
  };
  demographics: {
    expats: number;
    locals: number;
    families: number;
    professionals: number;
  };
  amenities: string[];
  plannedInfrastructure: string[];
  overview: string;
  lifestyleFeatures: string[];
}

const communities: Community[] = [
  {
    id: 1,
    name: "Dubai Marina",
    slug: "dubai-marina",
    description: "Premier waterfront community with luxury high-rise apartments and vibrant lifestyle amenities.",
    image: "https://images.unsplash.com/photo-1593110408355-bb4b0b7d896d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badges: {
      walkability: 9,
      familyFriendly: 7,
      amenities: 10,
      connectivity: 9
    },
    demographics: {
      expats: 85,
      locals: 15,
      families: 40,
      professionals: 60
    },
    amenities: [
      "Marina Walk",
      "Dubai Marina Mall",
      "Beachfront access",
      "Yacht clubs",
      "Restaurants and cafes",
      "Fitness centers",
      "Outdoor recreation spaces"
    ],
    plannedInfrastructure: [
      "Marina 101 completion",
      "New pedestrian bridges",
      "Expanded bicycle lanes network",
      "Smart lighting initiatives"
    ],
    overview: "Dubai Marina is an affluent residential neighborhood along a 3 km stretch of Persian Gulf shoreline. Known for its stunning skyscrapers, waterfront lifestyle, and vibrant community, it has become one of Dubai's most sought-after areas for both residents and tourists.",
    lifestyleFeatures: [
      "Waterfront dining options",
      "Marina-view apartments",
      "Proximity to JBR Beach",
      "Outdoor fitness facilities",
      "Active nightlife scene",
      "Multicultural environment"
    ]
  },
  {
    id: 2,
    name: "Dubai South",
    slug: "dubai-south",
    description: "Purpose-built urban development surrounding Al Maktoum International Airport and Expo City Dubai.",
    image: "https://images.unsplash.com/photo-1668931709101-71e5ce6e7d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badges: {
      walkability: 6,
      familyFriendly: 8,
      amenities: 7,
      connectivity: 8
    },
    demographics: {
      expats: 75,
      locals: 25,
      families: 55,
      professionals: 45
    },
    amenities: [
      "Expo City Dubai",
      "Community parks",
      "Sports facilities",
      "Retail centers",
      "Educational institutions",
      "Healthcare facilities"
    ],
    plannedInfrastructure: [
      "Al Maktoum International Airport expansion",
      "New metro line connections",
      "Logistics corridor",
      "Sustainable city initiatives",
      "Exhibition centers",
      "Smart city infrastructure"
    ],
    overview: "Dubai South is a 145 sq km master-planned city centered around Al Maktoum International Airport and the site of Expo 2020 (now Expo City Dubai). This emerging hub is designed to become a sustainable urban destination, with focused districts for logistics, aviation, residential, commercial, and golf.",
    lifestyleFeatures: [
      "Modern community planning",
      "Integrated transportation",
      "Green spaces and parks",
      "Affordable housing options",
      "Business district proximity",
      "Educational facilities"
    ]
  },
  {
    id: 3,
    name: "Jumeirah",
    slug: "jumeirah",
    description: "Prestigious coastal residential area known for luxury villas and Emirati heritage.",
    image: "https://images.unsplash.com/photo-1622853304177-0a04a8b5f05a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badges: {
      walkability: 7,
      familyFriendly: 9,
      amenities: 8,
      connectivity: 7
    },
    demographics: {
      expats: 60,
      locals: 40,
      families: 70,
      professionals: 30
    },
    amenities: [
      "Jumeirah Beach",
      "Mercato Shopping Mall",
      "Jumeirah Mosque",
      "International schools",
      "La Mer beachfront development",
      "Jumeirah Beach Park"
    ],
    plannedInfrastructure: [
      "Beach restoration projects",
      "New commercial developments",
      "Cultural preservation initiatives",
      "Road widening and traffic improvements"
    ],
    overview: "Jumeirah is one of Dubai's most exclusive residential districts, stretching along the coastline with beautiful beaches and a mix of traditional and modern architecture. It's home to many UAE nationals and long-term expatriate residents, offering a more relaxed pace compared to Dubai's newer developments.",
    lifestyleFeatures: [
      "Seaside living",
      "Private beach access",
      "Traditional neighborhoods",
      "High-end dining establishments",
      "Luxury villa communities",
      "Cultural proximity"
    ]
  },
  {
    id: 4,
    name: "Downtown Dubai",
    slug: "downtown-dubai",
    description: "Iconic central district featuring Burj Khalifa, Dubai Mall, and vibrant urban lifestyle.",
    image: "https://images.unsplash.com/photo-1546412414-e1885c3fe479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badges: {
      walkability: 10,
      familyFriendly: 7,
      amenities: 10,
      connectivity: 10
    },
    demographics: {
      expats: 80,
      locals: 20,
      families: 35,
      professionals: 65
    },
    amenities: [
      "The Dubai Mall",
      "Burj Khalifa",
      "Dubai Opera",
      "Souk Al Bahar",
      "Dubai Fountain",
      "Luxury hotels",
      "Gourmet restaurants"
    ],
    plannedInfrastructure: [
      "New skyscrapers and residential towers",
      "Pedestrianization projects",
      "Cultural district expansion",
      "Smart city technology implementation"
    ],
    overview: "Downtown Dubai is the city's dynamic central district, home to global icons like Burj Khalifa and The Dubai Mall. This vibrant neighborhood combines commercial, residential, entertainment, and tourist attractions in a walkable urban core that exemplifies Dubai's modern aspirations.",
    lifestyleFeatures: [
      "Luxury apartment living",
      "World-class shopping",
      "Fine dining scene",
      "Cultural performances",
      "Vibrant nightlife",
      "Iconic views"
    ]
  }
];

const CommunityDeepDives = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const openCommunityDetail = (community: Community) => {
    setSelectedCommunity(community);
    setIsDialogOpen(true);
    setActiveTab('overview');
  };

  const getBadgeColor = (score: number) => {
    if (score >= 8) return "bg-green-500 hover:bg-green-600";
    if (score >= 6) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-gray-500 hover:bg-gray-600";
  };
  
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-montserrat font-semibold mb-2">Community Deep Dives</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore detailed insights about Dubai's most desirable neighborhoods, including lifestyle profiles, 
            demographics, walkability scores, and planned infrastructure developments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={community.image} 
                    alt={community.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{community.name}</CardTitle>
                  <CardDescription>{community.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className={getBadgeColor(community.badges.walkability)}>
                      Walk Score: {community.badges.walkability}/10
                    </Badge>
                    <Badge variant="secondary" className={getBadgeColor(community.badges.connectivity)}>
                      Transport: {community.badges.connectivity}/10
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex justify-between mb-1">
                      <span>Families:</span>
                      <span>{formatPercentage(community.demographics.families)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: formatPercentage(community.demographics.families) }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span>Expats:</span>
                      <span>{formatPercentage(community.demographics.expats)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: formatPercentage(community.demographics.expats) }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => openCommunityDetail(community)}
                  >
                    Explore {community.name} <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Community Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedCommunity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-montserrat">{selectedCommunity.name}</DialogTitle>
                <DialogDescription>{selectedCommunity.description}</DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <img 
                  src={selectedCommunity.image} 
                  alt={selectedCommunity.name}
                  className="w-full h-64 object-cover rounded-md mb-6" 
                />
                
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="demographics">Demographics</TabsTrigger>
                    <TabsTrigger value="future">Future Development</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4">
                    <div className="prose prose-emerald max-w-none">
                      <p className="text-gray-700">{selectedCommunity.overview}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Walkability Score</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                              <div 
                                className="bg-primary h-3 rounded-full" 
                                style={{ width: `${selectedCommunity.badges.walkability * 10}%` }}
                              ></div>
                            </div>
                            <span className="font-bold">{selectedCommunity.badges.walkability}/10</span>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Family-Friendly Score</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                              <div 
                                className="bg-primary h-3 rounded-full" 
                                style={{ width: `${selectedCommunity.badges.familyFriendly * 10}%` }}
                              ></div>
                            </div>
                            <span className="font-bold">{selectedCommunity.badges.familyFriendly}/10</span>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Amenities Score</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                              <div 
                                className="bg-primary h-3 rounded-full" 
                                style={{ width: `${selectedCommunity.badges.amenities * 10}%` }}
                              ></div>
                            </div>
                            <span className="font-bold">{selectedCommunity.badges.amenities}/10</span>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Connectivity Score</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                              <div 
                                className="bg-primary h-3 rounded-full" 
                                style={{ width: `${selectedCommunity.badges.connectivity * 10}%` }}
                              ></div>
                            </div>
                            <span className="font-bold">{selectedCommunity.badges.connectivity}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lifestyle" className="mt-4">
                    <div className="prose prose-emerald max-w-none">
                      <h3 className="text-xl font-medium mb-4">Lifestyle Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCommunity.lifestyleFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities" className="mt-4">
                    <div className="prose prose-emerald max-w-none">
                      <h3 className="text-xl font-medium mb-4">Available Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCommunity.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-start">
                            <i className="fas fa-star text-primary mt-1 mr-2"></i>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="demographics" className="mt-4">
                    <div className="prose prose-emerald max-w-none">
                      <h3 className="text-xl font-medium mb-4">Community Demographics</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Expats vs. Locals</span>
                          </div>
                          <div className="w-full h-6 rounded-lg overflow-hidden bg-gray-200 relative mb-4">
                            <div 
                              className="absolute h-full bg-primary" 
                              style={{ width: formatPercentage(selectedCommunity.demographics.expats) }}
                            >
                              <span className="text-xs text-white absolute inset-0 flex items-center justify-center">
                                Expats {formatPercentage(selectedCommunity.demographics.expats)}
                              </span>
                            </div>
                            <div 
                              className="absolute h-full right-0 bg-blue-600" 
                              style={{ width: formatPercentage(selectedCommunity.demographics.locals) }}
                            >
                              <span className="text-xs text-white absolute inset-0 flex items-center justify-center">
                                Locals {formatPercentage(selectedCommunity.demographics.locals)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between mb-1">
                            <span>Families vs. Professionals</span>
                          </div>
                          <div className="w-full h-6 rounded-lg overflow-hidden bg-gray-200 relative">
                            <div 
                              className="absolute h-full bg-amber-500" 
                              style={{ width: formatPercentage(selectedCommunity.demographics.families) }}
                            >
                              <span className="text-xs text-white absolute inset-0 flex items-center justify-center">
                                Families {formatPercentage(selectedCommunity.demographics.families)}
                              </span>
                            </div>
                            <div 
                              className="absolute h-full right-0 bg-purple-600" 
                              style={{ width: formatPercentage(selectedCommunity.demographics.professionals) }}
                            >
                              <span className="text-xs text-white absolute inset-0 flex items-center justify-center">
                                Professionals {formatPercentage(selectedCommunity.demographics.professionals)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="future" className="mt-4">
                    <div className="prose prose-emerald max-w-none">
                      <h3 className="text-xl font-medium mb-4">Planned Infrastructure & Future Development</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedCommunity.plannedInfrastructure.map((item, index) => (
                          <div key={index} className="flex items-start border p-3 rounded-lg">
                            <i className="fas fa-hard-hat text-primary mt-1 mr-3 text-lg"></i>
                            <div>
                              <span className="font-medium">{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <DialogFooter className="mt-6">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CommunityDeepDives;