import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TransportType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface TransportStation {
  id: number;
  name: string;
  location: string;
  type: string;
  lines: string[];
  connections: string[];
  walkableAmenities: string[];
  nearbyProperties: number;
  image: string;
  openYear: number;
  description: string;
}

const transportTypes: TransportType[] = [
  { id: 'metro', name: 'Metro', icon: 'fa-train', color: 'bg-red-600' },
  { id: 'tram', name: 'Tram', icon: 'fa-tram', color: 'bg-blue-500' },
  { id: 'bus', name: 'Bus Stations', icon: 'fa-bus', color: 'bg-green-600' },
  { id: 'ferry', name: 'Ferry Terminals', icon: 'fa-ship', color: 'bg-yellow-600' },
  { id: 'monorail', name: 'Monorail', icon: 'fa-subway', color: 'bg-purple-600' }
];

const metroStations: TransportStation[] = [
  {
    id: 1,
    name: "Burj Khalifa/Dubai Mall",
    location: "Downtown Dubai",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Dubai Trolley", "Bus Routes F13, 27, 28, 29"],
    walkableAmenities: ["Dubai Mall", "Burj Khalifa", "Dubai Fountain", "Souk Al Bahar"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "One of Dubai's busiest metro stations serving the iconic Downtown area, providing direct access to Burj Khalifa, Dubai Mall, and numerous residential towers. The station features a climate-controlled walkway connecting to Dubai Mall."
  },
  {
    id: 2,
    name: "Dubai Marina",
    location: "Dubai Marina",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Tram Station", "Bus Routes 8, F37, X28"],
    walkableAmenities: ["Marina Walk", "Marina Mall", "The Beach JBR", "Restaurants"],
    nearbyProperties: 62,
    image: "https://images.unsplash.com/photo-1594397508722-5dcbf412b865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Key metro station serving the Dubai Marina residential district with direct connection to the Dubai Tram. The station provides convenient access to the Marina promenade, shopping, dining, and the beach."
  },
  {
    id: 3,
    name: "Mall of the Emirates",
    location: "Al Barsha",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 84, F30, F33"],
    walkableAmenities: ["Mall of the Emirates", "Ski Dubai", "Kempinski Hotel", "Restaurants"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1608569731245-fa26b9a4458f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Major transport hub connected directly to Mall of the Emirates, one of Dubai's premier shopping destinations. The station serves the Al Barsha residential area and provides easy access to Ski Dubai and numerous hotels."
  }
];

const tramStations: TransportStation[] = [
  {
    id: 4,
    name: "JBR 1",
    location: "Jumeirah Beach Residence",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Bus Routes 8, 84"],
    walkableAmenities: ["The Beach JBR", "JBR Walk", "Restaurants", "Beach access"],
    nearbyProperties: 31,
    image: "https://images.unsplash.com/photo-1513415431789-427cc2a0a96d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Tram station serving the popular Jumeirah Beach Residence area, providing residents and visitors with easy access to the beachfront, retail outlets, and dining establishments along JBR Walk."
  },
  {
    id: 5,
    name: "Dubai Marina Mall",
    location: "Dubai Marina",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Metro Red Line", "Bus Routes F37, 8"],
    walkableAmenities: ["Dubai Marina Mall", "Marina Promenade", "Yacht Club", "Restaurants"],
    nearbyProperties: 47,
    image: "https://images.unsplash.com/photo-1625588651255-2be42bf5156e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Centrally located tram station with direct access to Dubai Marina Mall and the scenic Marina Promenade. Connects with the Dubai Metro Red Line, providing integrated public transportation for residents and tourists."
  }
];

const ferryTerminals: TransportStation[] = [
  {
    id: 6,
    name: "Dubai Marina Ferry Terminal",
    location: "Dubai Marina",
    type: "ferry",
    lines: ["Blue Line", "Green Line"],
    connections: ["Tram Station", "Bus Routes 8, F37"],
    walkableAmenities: ["Marina Walk", "Marina Mall", "Restaurants", "Yacht Club"],
    nearbyProperties: 29,
    image: "https://images.unsplash.com/photo-1595761799644-b2e973d66fa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2012,
    description: "Ferry terminal providing scenic water transport between Dubai Marina and other coastal destinations including Al Ghubaiba and Dubai Canal. Offers alternative transportation with panoramic views of Dubai's skyline."
  },
  {
    id: 7,
    name: "Al Jaddaf Marine Transport Station",
    location: "Al Jaddaf",
    type: "ferry",
    lines: ["Red Line"],
    connections: ["Al Jaddaf Metro Station", "Bus Routes F08"],
    walkableAmenities: ["Dubai Culture Village", "Versace Hotel", "Restaurants"],
    nearbyProperties: 15,
    image: "https://images.unsplash.com/photo-1580674684089-3c73d4639f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2016,
    description: "Modern marine transport station on Dubai Creek, connecting the cultural and historical areas with the newer developments along the waterfront. Part of the integrated water transport network of Dubai."
  }
];

// Combine all stations
const allStations = [...metroStations, ...tramStations, ...ferryTerminals];

const MetroTransportLayer = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<TransportStation | null>(null);
  
  const filteredStations = selectedType 
    ? allStations.filter(station => station.type === selectedType)
    : allStations;
  
  const getTransportTypeInfo = (typeId: string) => {
    return transportTypes.find(type => type.id === typeId) || transportTypes[0];
  };
  
  const getTypeColor = (typeId: string) => {
    const type = getTransportTypeInfo(typeId);
    return type.color;
  };
  
  const getTypeIcon = (typeId: string) => {
    const type = getTransportTypeInfo(typeId);
    return type.icon;
  };
  
  const getTypeName = (typeId: string) => {
    const type = getTransportTypeInfo(typeId);
    return type.name;
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-montserrat font-semibold mb-2">Metro & Transport Accessibility</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover properties with excellent connectivity to Dubai's public transport network including Metro, Tram, 
            Ferry, and Bus stations. Evaluate commute times and walkability scores.
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Button 
            variant={selectedType === null ? "default" : "outline"}
            onClick={() => setSelectedType(null)}
            className="flex items-center"
          >
            <i className="fas fa-layer-group mr-2"></i> All Transport
          </Button>
          
          {transportTypes.map(type => (
            <Button 
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              onClick={() => setSelectedType(type.id)}
              className="flex items-center"
            >
              <i className={`fas ${type.icon} mr-2`}></i> {type.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={station.image} 
                    alt={station.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${getTypeColor(station.type)}`}
                    >
                      <i className={`fas ${getTypeIcon(station.type)} mr-1`}></i>
                      {getTypeName(station.type)}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{station.name}</span>
                    <Badge variant="outline" className="ml-2">Since {station.openYear}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {station.location} • {station.lines.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">Walkable Amenities:</div>
                    <div className="flex flex-wrap gap-1">
                      {station.walkableAmenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {amenity}
                        </Badge>
                      ))}
                      {station.walkableAmenities.length > 3 && (
                        <Badge variant="outline" className="bg-gray-100">
                          +{station.walkableAmenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Nearby Properties:</div>
                  <div className="font-medium text-primary">{station.nearbyProperties} properties within 500m</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => setSelectedStation(station)}
                  >
                    View Transport Details <i className="fas fa-train ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Station Detail Modal */}
        {selectedStation && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedStation.image} 
                  alt={selectedStation.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="rounded-full h-10 w-10 p-0 bg-white/80 hover:bg-white text-gray-800"
                    onClick={() => setSelectedStation(null)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge 
                    className={`text-white ${getTypeColor(selectedStation.type)} text-lg py-1 px-3`}
                  >
                    <i className={`fas ${getTypeIcon(selectedStation.type)} mr-2`}></i>
                    {getTypeName(selectedStation.type)}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-montserrat font-semibold mb-1">{selectedStation.name}</h2>
                <div className="flex items-center text-gray-500 mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{selectedStation.location}</span>
                  <span className="mx-2">•</span>
                  <span>Operational since {selectedStation.openYear}</span>
                </div>
                
                <p className="text-gray-700 mb-6">{selectedStation.description}</p>
                
                <Tabs defaultValue="connectivity" className="w-full">
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
                    <TabsTrigger value="amenities">Walkable Amenities</TabsTrigger>
                    <TabsTrigger value="properties">Nearby Properties</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="connectivity" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3 flex items-center">
                          <i className={`fas ${getTypeIcon(selectedStation.type)} mr-2 text-primary`}></i>
                          {selectedStation.type.charAt(0).toUpperCase() + selectedStation.type.slice(1)} Lines
                        </h4>
                        <div className="space-y-2">
                          {selectedStation.lines.map((line, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3 flex items-center">
                          <i className="fas fa-exchange-alt mr-2 text-primary"></i>
                          Transport Connections
                        </h4>
                        <div className="space-y-2">
                          {selectedStation.connections.map((connection, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                              <span>{connection}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 md:col-span-2">
                        <h4 className="font-medium mb-3 flex items-center">
                          <i className="fas fa-walking mr-2 text-primary"></i>
                          Walking Distance Destinations
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedStation.walkableAmenities.map((amenity, index) => (
                            <div key={index} className="flex items-center">
                              <i className="fas fa-check-circle text-green-500 mr-2"></i>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities" className="mt-0">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium mb-4">Points of Interest Within 500m</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedStation.walkableAmenities.map((amenity, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex items-start">
                            <div className="rounded-full bg-primary text-white h-8 w-8 flex items-center justify-center mr-3">
                              <i className="fas fa-map-pin"></i>
                            </div>
                            <div>
                              <div className="font-medium">{amenity}</div>
                              <div className="text-sm text-gray-500">~{Math.floor(Math.random() * 5) + 1} min walk</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="properties" className="mt-0">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Properties Near This Station</h4>
                        <div className="text-primary font-medium">
                          {selectedStation.nearbyProperties} Available
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Average Price</div>
                          <div className="text-primary font-bold">
                            AED {(Math.floor(Math.random() * 5) + 1).toLocaleString()},XXX,XXX
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          For properties within 500m of this station
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        View All Nearby Properties <i className="fas fa-arrow-right ml-2"></i>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="p-6 pt-0 flex justify-end">
                <Button variant="outline" onClick={() => setSelectedStation(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MetroTransportLayer;