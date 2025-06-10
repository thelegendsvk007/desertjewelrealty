import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Users, Wifi, Car, Train, Bus, Ship, Zap, Home } from 'lucide-react';

interface TransportType {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
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
  coordinates?: [number, number];
}

const transportTypes: TransportType[] = [
  { 
    id: 'metro', 
    name: 'Dubai Metro', 
    icon: Train, 
    color: 'bg-red-600',
    description: 'Automated rail system connecting key areas across Dubai with Red and Green lines'
  },
  { 
    id: 'tram', 
    name: 'Dubai Tram', 
    icon: Zap, 
    color: 'bg-blue-500',
    description: 'Modern tram system serving Dubai Marina, JBR, and Al Sufouh areas'
  },
  { 
    id: 'bus', 
    name: 'RTA Bus Network', 
    icon: Bus, 
    color: 'bg-green-600',
    description: 'Comprehensive bus network covering all emirates with express and local routes'
  },
  { 
    id: 'ferry', 
    name: 'Dubai Ferry', 
    icon: Ship, 
    color: 'bg-blue-700',
    description: 'Water transport connecting Dubai Marina, Al Ghubaiba, and other waterfront areas'
  },
  { 
    id: 'monorail', 
    name: 'Palm Monorail', 
    icon: Car, 
    color: 'bg-purple-600',
    description: 'Connecting the gateway to Atlantis on Palm Jumeirah island'
  }
];

// Complete Red Line Metro Stations (R11-R38)
const redLineStations: TransportStation[] = [
  {
    id: 1,
    name: "Centrepoint (R11)",
    location: "Al Rashidiya",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 5, 6, 13", "Taxi Service"],
    walkableAmenities: ["Centrepoint Mall", "Residential Areas", "Community Center"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Terminal station of the Red Line serving the Al Rashidiya area with direct access to Centrepoint shopping complex."
  },
  {
    id: 2,
    name: "Emirates (R12)",
    location: "Al Qusais",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 7, 8", "Intercity Bus"],
    walkableAmenities: ["Emirates Aviation University", "Residential Communities"],
    nearbyProperties: 18,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Station serving the aviation hub area with connections to Emirates facilities and educational institutions."
  },
  {
    id: 3,
    name: "Airport Terminal 3 (R13)",
    location: "Dubai International Airport",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Airport Shuttle", "Bus Routes 4, 11", "Taxi Service"],
    walkableAmenities: ["Terminal 3", "Duty Free", "Hotels", "Restaurants"],
    nearbyProperties: 12,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Direct access to Dubai International Airport Terminal 3, serving millions of passengers annually."
  },
  {
    id: 4,
    name: "Airport Terminal 1 (R14)",
    location: "Dubai International Airport",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Airport Shuttle", "Bus Routes", "Taxi Service"],
    walkableAmenities: ["Terminal 1", "Duty Free", "Hotels", "Car Rental"],
    nearbyProperties: 8,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Airport Terminal 1 station serving domestic and regional flights."
  },
  {
    id: 5,
    name: "GGICO (R15)",
    location: "Garhoud",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Taxi Service"],
    walkableAmenities: ["Business Centers", "Hotels", "Restaurants"],
    nearbyProperties: 15,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Commercial district station serving Garhoud business area."
  },
  {
    id: 6,
    name: "City Centre Deira (R16)",
    location: "Deira",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 33, 42", "Shopping Shuttle"],
    walkableAmenities: ["Deira City Centre", "Hotels", "Restaurants", "Shopping"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Major shopping and entertainment hub in Deira district."
  },
  {
    id: 7,
    name: "Al Rigga (R17)",
    location: "Deira",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Traditional Transport"],
    walkableAmenities: ["Al Rigga Street", "Shopping", "Hotels", "Restaurants"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Historic commercial street station in the heart of Deira."
  },
  {
    id: 8,
    name: "Union (R18)",
    location: "Deira/Bur Dubai",
    type: "metro",
    lines: ["Red Line", "Green Line"],
    connections: ["Bus Network Hub", "Water Taxi", "Abra Traditional Boats"],
    walkableAmenities: ["Union Square", "Grand Souq Deira", "Heritage Areas", "Hotels"],
    nearbyProperties: 55,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Major interchange station connecting Red and Green lines."
  },
  {
    id: 9,
    name: "BurJuman (R19)",
    location: "Bur Dubai",
    type: "metro",
    lines: ["Red Line", "Green Line"],
    connections: ["Bus Network", "BurJuman Shopping Shuttle"],
    walkableAmenities: ["BurJuman Centre", "Dubai Museum", "Bastakiya Quarter", "Textile Souq"],
    nearbyProperties: 52,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Historic Bur Dubai station with shopping and cultural access."
  },
  {
    id: 10,
    name: "ADCB (R20)",
    location: "Bur Dubai",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Banking District Shuttle"],
    walkableAmenities: ["Abu Dhabi Commercial Bank", "Business Centers", "Restaurants"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Banking and financial district station."
  },
  {
    id: 11,
    name: "Max (R21)",
    location: "Bur Dubai",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 12, 13", "Al Satwa Access"],
    walkableAmenities: ["Max Fashion", "Shopping Centers", "Restaurants"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Retail and commercial area station."
  },
  {
    id: 12,
    name: "World Trade Centre (R22)",
    location: "Trade Centre",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Exhibition Shuttle"],
    walkableAmenities: ["World Trade Centre", "Exhibition Halls", "Hotels", "Business Centers"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Major business and exhibition center station."
  },
  {
    id: 13,
    name: "Emirates Towers (R23)",
    location: "Trade Centre",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Emirates Towers Shuttle"],
    walkableAmenities: ["Emirates Towers", "Boulevard", "Hotels", "Business Centers"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Iconic twin towers business district station."
  },
  {
    id: 14,
    name: "Financial Centre (R24)",
    location: "DIFC",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "DIFC Shuttle"],
    walkableAmenities: ["DIFC", "Financial Institutions", "Restaurants", "Art Galleries"],
    nearbyProperties: 48,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Dubai International Financial Centre station."
  },
  {
    id: 15,
    name: "Burj Khalifa/Dubai Mall (R25)",
    location: "Downtown Dubai",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Dubai Trolley", "Bus Routes F13, 27, 28, 29"],
    walkableAmenities: ["Dubai Mall", "Burj Khalifa", "Dubai Fountain", "Souk Al Bahar", "Address Hotels"],
    nearbyProperties: 85,
    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Premier station serving Downtown Dubai with direct access to the world's tallest building and largest shopping mall."
  },
  {
    id: 16,
    name: "Business Bay (R26)",
    location: "Business Bay",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 21A, 21B", "Water Taxi"],
    walkableAmenities: ["Business Bay Mall", "Canal Walk", "Restaurants", "Corporate Towers"],
    nearbyProperties: 72,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Central business district station serving the rapidly growing Business Bay area with canal-side developments."
  },
  {
    id: 17,
    name: "ONPASSIVE (R29)",
    location: "Business Bay",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Tech Shuttle"],
    walkableAmenities: ["ONPASSIVE", "Tech Companies", "Business Centers"],
    nearbyProperties: 30,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Technology company headquarters station."
  },
  {
    id: 18,
    name: "Equiti (R31)",
    location: "Al Barsha",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Financial Services"],
    walkableAmenities: ["Equiti Group", "Financial Services", "Business Centers"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Financial services hub station."
  },
  {
    id: 19,
    name: "Mall of the Emirates (R32)",
    location: "Al Barsha",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes 84, F30, F33"],
    walkableAmenities: ["Mall of the Emirates", "Ski Dubai", "Kempinski Hotel", "Al Barsha Pond Park"],
    nearbyProperties: 65,
    image: "https://images.unsplash.com/photo-1608569731245-fa26b9a4458f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Shopping and entertainment hub with direct mall access and proximity to Ski Dubai indoor slopes."
  },
  {
    id: 20,
    name: "Mashreq (R33)",
    location: "Al Barsha",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Banking Services"],
    walkableAmenities: ["Mashreq Bank", "Business Centers", "Hotels"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Banking and financial services station."
  },
  {
    id: 21,
    name: "Dubai Internet City (R34)",
    location: "Dubai Internet City",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Dubai Tram", "Bus Routes X28, F55"],
    walkableAmenities: ["Tech Companies", "Business Parks", "Restaurants", "Hotels"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Technology and business hub serving major corporations and startups in Dubai's tech ecosystem."
  },
  {
    id: 22,
    name: "Al Khail (R35)",
    location: "Dubai Marina",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Dubai Tram", "Bus Routes"],
    walkableAmenities: ["Al Khail Gate", "Marina Development", "Hotels"],
    nearbyProperties: 48,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Marina area development station."
  },
  {
    id: 23,
    name: "Sobha Realty (R36)",
    location: "Dubai Marina",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Dubai Tram", "Bus Routes 8, F37, X28"],
    walkableAmenities: ["Sobha Realty", "Marina Towers", "Restaurants"],
    nearbyProperties: 52,
    image: "https://images.unsplash.com/photo-1594397508722-5dcbf412b865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Property development center in Marina district."
  },
  {
    id: 24,
    name: "DMCC (R37)",
    location: "Dubai Marina",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Dubai Tram", "Bus Routes"],
    walkableAmenities: ["DMCC", "Marina Walk", "The Beach JBR", "Restaurants", "Yacht Club"],
    nearbyProperties: 95,
    image: "https://images.unsplash.com/photo-1594397508722-5dcbf412b865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Dubai Multi Commodities Centre station with direct tram connections to JBR and beachfront areas."
  },
  {
    id: 25,
    name: "Jabal Ali (R38)",
    location: "Jebel Ali",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Port Shuttle", "Industrial Area Transport"],
    walkableAmenities: ["Jebel Ali Port", "Free Zone", "Industrial Areas"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Port and free zone industrial area station."
  },
  {
    id: 26,
    name: "Ibn Battuta (R39)",
    location: "Jebel Ali",
    type: "metro",
    lines: ["Red Line"],
    connections: ["Bus Routes", "Shopping Mall Shuttle"],
    walkableAmenities: ["Ibn Battuta Mall", "Hotels", "Restaurants", "Theme Courts"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Themed shopping mall station with unique architectural courts."
  },
  {
    id: 27,
    name: "Energy (R40)",
    location: "Jebel Ali",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Bus Routes", "Industrial Area Shuttle"],
    walkableAmenities: ["Energy Companies", "Industrial Facilities", "Business Centers"],
    nearbyProperties: 18,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Energy sector and industrial area station."
  },
  {
    id: 33,
    name: "Danube (R41)",
    location: "Jebel Ali",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Residential Shuttle", "Community Transport"],
    walkableAmenities: ["Danube Properties", "Residential Areas", "Community Centers"],
    nearbyProperties: 22,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Residential development area station."
  },
  {
    id: 34,
    name: "UAE Exchange (R42)",
    location: "Jebel Ali",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Financial Services", "Community Transport"],
    walkableAmenities: ["UAE Exchange", "Financial Services", "Shopping Centers"],
    nearbyProperties: 20,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Financial services and exchange center station."
  },
  {
    id: 35,
    name: "The Gardens (R70)",
    location: "Discovery Gardens",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Community Shuttle", "Gardens Transport"],
    walkableAmenities: ["The Gardens Community", "Shopping Centers", "Parks"],
    nearbyProperties: 48,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Garden community station serving residential developments."
  },
  {
    id: 36,
    name: "Discovery Gardens (R71)",
    location: "Discovery Gardens",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Community Shuttle", "Bus Routes"],
    walkableAmenities: ["Discovery Gardens Community", "Shopping Centers", "Parks"],
    nearbyProperties: 55,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Community station serving Discovery Gardens residential area."
  },
  {
    id: 37,
    name: "Al Furjan (R72)",
    location: "Al Furjan",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Al Furjan Shuttle", "Community Transport"],
    walkableAmenities: ["Al Furjan Community", "Shopping Centers", "Schools", "Parks"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Residential community station serving Al Furjan development."
  },
  {
    id: 38,
    name: "Jumeirah Golf Estates (R73)",
    location: "Jumeirah Golf Estates",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Golf Estate Shuttle", "Residential Transport"],
    walkableAmenities: ["Golf Courses", "Luxury Residences", "Club Houses", "Sports Facilities"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Luxury golf community station serving premium residential and sports facilities."
  },
  {
    id: 39,
    name: "Dubai Investment Park (R74)",
    location: "Dubai Investment Park",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["DIP Shuttle", "Business Transport"],
    walkableAmenities: ["Dubai Investment Park", "Business Centers", "Shopping", "Restaurants"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Investment and business park station serving commercial and residential areas."
  },
  {
    id: 40,
    name: "Expo 2020 (R76)",
    location: "Dubai South",
    type: "metro",
    lines: ["Red Line - Route 2020"],
    connections: ["Bus Routes to Al Maktoum Airport", "Shuttle Services"],
    walkableAmenities: ["Expo City Dubai", "Country Pavilions", "Hotels", "Restaurants"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2020,
    description: "Terminal station serving the Expo 2020 site, now a permanent city development with ongoing attractions."
  }
];

// Complete Green Line Metro Stations (G11-G30)
const greenLineStations: TransportStation[] = [
  {
    id: 101,
    name: "Etisalat by e& (G11)",
    location: "Al Qusais",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes 5, 6", "Intercity Transport"],
    walkableAmenities: ["Etisalat Academy", "Residential Areas", "Shopping Centers"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Northern terminus of Green Line serving Al Qusais residential and commercial areas."
  },
  {
    id: 102,
    name: "Al Qusais (G12)",
    location: "Al Qusais",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Community Shuttle"],
    walkableAmenities: ["Al Qusais Residential", "Community Centers", "Schools"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Residential community station in Al Qusais area."
  },
  {
    id: 103,
    name: "Dubai Airport Free Zone (G13)",
    location: "Dubai Airport Free Zone",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Airport Shuttle", "Free Zone Transport"],
    walkableAmenities: ["DAFZ Companies", "Business Centers", "Hotels"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Dubai Airport Free Zone business district station."
  },
  {
    id: 104,
    name: "Al Nahda (G14)",
    location: "Al Nahda",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Cross-Border Transport"],
    walkableAmenities: ["Al Nahda Mall", "Residential Areas", "Community Centers"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Border community station serving Al Nahda residential area."
  },
  {
    id: 105,
    name: "Stadium (G15)",
    location: "Al Nahda",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Sports Facility Access"],
    walkableAmenities: ["Sports Facilities", "Stadium", "Community Areas"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Sports and recreation facility station."
  },
  {
    id: 106,
    name: "Al Qiyadah (G16)",
    location: "Al Qusais",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Leadership Institute Access"],
    walkableAmenities: ["Mohammed Bin Rashid Leadership Institute", "Educational Centers"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Leadership and educational institution station."
  },
  {
    id: 107,
    name: "Abu Hail (G17)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Traditional Transport"],
    walkableAmenities: ["Traditional Markets", "Residential Areas", "Mosques"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Traditional Deira neighborhood station."
  },
  {
    id: 108,
    name: "Abu Baker Al Siddique (G18)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Local Transport"],
    walkableAmenities: ["Residential Areas", "Local Markets", "Community Centers"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Residential area station in Deira."
  },
  {
    id: 109,
    name: "Salah Al Din (G19)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Heritage Access"],
    walkableAmenities: ["Heritage Areas", "Traditional Markets", "Cultural Sites"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Heritage and cultural district station."
  },
  {
    id: 110,
    name: "Union (G20)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line", "Red Line"],
    connections: ["Bus Network Hub", "Water Taxi", "Abra Traditional Boats"],
    walkableAmenities: ["Union Square", "Grand Souq Deira", "Heritage Areas", "Hotels"],
    nearbyProperties: 55,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Major interchange station connecting Red and Green lines in the heart of historic Deira."
  },
  {
    id: 111,
    name: "Baniyas Square (G21)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Souq Access"],
    walkableAmenities: ["Baniyas Square", "Traditional Souqs", "Banks", "Hotels"],
    nearbyProperties: 52,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Central square and traditional shopping area."
  },
  {
    id: 112,
    name: "Gold Souq (G22)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes 33, 42", "Water Taxi", "Traditional Abra"],
    walkableAmenities: ["Gold Souq", "Spice Souq", "Deira City Centre", "Traditional Markets"],
    nearbyProperties: 48,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Gateway to Dubai's famous Gold Souq and traditional trading districts."
  },
  {
    id: 113,
    name: "Al Ras (G23)",
    location: "Deira",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Water Taxi", "Traditional Abra"],
    walkableAmenities: ["Traditional Markets", "Heritage Area", "Waterfront"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Historic waterfront area station."
  },
  {
    id: 114,
    name: "Al Ghubaiba (G24)",
    location: "Bur Dubai",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Network Hub", "Ferry Terminal", "Traditional Abra"],
    walkableAmenities: ["Al Ghubaiba Bus Station", "Ferry Terminal", "Traditional Souqs"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Major transport hub with bus and ferry connections."
  },
  {
    id: 115,
    name: "Sharaf DG (G25)",
    location: "Bur Dubai",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Shopping Access"],
    walkableAmenities: ["Sharaf DG", "Electronics Shopping", "Business Centers"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Electronics retail and business district station."
  },
  {
    id: 116,
    name: "BurJuman (G26)",
    location: "Bur Dubai",
    type: "metro",
    lines: ["Green Line", "Red Line"],
    connections: ["Bus Network", "BurJuman Shopping Shuttle"],
    walkableAmenities: ["BurJuman Centre", "Dubai Museum", "Bastakiya Quarter", "Textile Souq"],
    nearbyProperties: 52,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Historic Bur Dubai station with access to cultural sites and traditional souqs."
  },
  {
    id: 117,
    name: "Oud Metha (G27)",
    location: "Oud Metha",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Medical District Access"],
    walkableAmenities: ["Oud Metha Area", "Business Centers", "Restaurants"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Central Oud Metha district station."
  },
  {
    id: 118,
    name: "Dubai Healthcare City (G28)",
    location: "Oud Metha",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes 10, 17", "Medical Shuttle Services"],
    walkableAmenities: ["Hospitals", "Medical Centers", "Dubai Creek", "Hotels"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Specialized station serving Dubai's medical district and healthcare facilities."
  },
  {
    id: 119,
    name: "Al Jadaf (G29)",
    location: "Al Jadaf",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Bus Routes", "Waterfront Access"],
    walkableAmenities: ["Al Jadaf Shipyard", "Cultural District", "Dubai Creek"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2011,
    description: "Cultural and maritime heritage district station."
  },
  {
    id: 120,
    name: "Creek (G30)",
    location: "Dubai Creek Harbour",
    type: "metro",
    lines: ["Green Line"],
    connections: ["Water Taxi", "Bus Routes 14, 15"],
    walkableAmenities: ["Dubai Creek", "Creek Island", "Future Developments", "Waterfront Dining"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Southern terminus serving the historic Creek area and emerging Dubai Creek Harbour development."
  }
];

// Complete Dubai Tram Stations (All 11 Official Stations)
const tramStations: TransportStation[] = [
  {
    id: 201,
    name: "Jumeirah Beach Residence 1",
    location: "Jumeirah Beach Residence",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Bus Routes 8, 84", "Beach Shuttle"],
    walkableAmenities: ["The Beach JBR", "JBR Walk", "Restaurants", "Beach Access", "Hotels"],
    nearbyProperties: 68,
    image: "https://images.unsplash.com/photo-1513415431789-427cc2a0a96d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Beachfront tram station serving the popular JBR residential and entertainment district."
  },
  {
    id: 202,
    name: "Jumeirah Beach Residence 2",
    location: "Jumeirah Beach Residence",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Bus Routes 8, 84"],
    walkableAmenities: ["JBR Towers", "Marina Walk Extension", "Beach Access", "Restaurants"],
    nearbyProperties: 52,
    image: "https://images.unsplash.com/photo-1513415431789-427cc2a0a96d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Secondary JBR station providing additional access to residential towers and amenities."
  },
  {
    id: 203,
    name: "Jumeirah Lakes Towers",
    location: "Jumeirah Lakes Towers",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Bus Routes", "JLT Shuttle"],
    walkableAmenities: ["JLT Towers", "Business Centers", "Restaurants", "Shopping"],
    nearbyProperties: 85,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Major business and residential district station serving Jumeirah Lakes Towers."
  },
  {
    id: 204,
    name: "Dubai Marina Mall",
    location: "Dubai Marina",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Marina Mall Shuttle", "Ferry Terminal"],
    walkableAmenities: ["Dubai Marina Mall", "Marina Walk", "Restaurants", "Ferry Terminal"],
    nearbyProperties: 62,
    image: "https://images.unsplash.com/photo-1594397508722-5dcbf412b865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Shopping and entertainment hub in Dubai Marina with ferry connections."
  },
  {
    id: 205,
    name: "Dubai Marina",
    location: "Dubai Marina",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Dubai Metro Red Line", "Bus Network", "Ferry Terminal"],
    walkableAmenities: ["Marina Walk", "Marina Towers", "Restaurants", "Yacht Club"],
    nearbyProperties: 95,
    image: "https://images.unsplash.com/photo-1594397508722-5dcbf412b865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Central Marina station connecting to metro with access to luxury residential towers."
  },
  {
    id: 206,
    name: "Marina Towers",
    location: "Dubai Marina",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Marina Promenade", "Bus Routes"],
    walkableAmenities: ["Marina Towers", "Marina Promenade", "Restaurants", "Shopping"],
    nearbyProperties: 72,
    image: "https://images.unsplash.com/photo-1594397508722-5dcbf412b865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Marina waterfront station with access to residential towers and promenade."
  },
  {
    id: 207,
    name: "Mina Seyahi",
    location: "Al Sufouh",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Hotel Shuttles", "Beach Access"],
    walkableAmenities: ["Le Meridien Mina Seyahi", "Beach Resort", "Water Sports", "Hotels"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Beachfront resort area station serving luxury hotels and beach facilities."
  },
  {
    id: 208,
    name: "Media City",
    location: "Dubai Media City",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Metro Feeder Bus", "Business Shuttles"],
    walkableAmenities: ["Media Companies", "Business Centers", "Restaurants", "Hotels"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Business district station serving media and telecommunications companies."
  },
  {
    id: 209,
    name: "Palm Jumeirah",
    location: "Palm Jumeirah Gateway",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Palm Monorail", "Bus Routes", "Taxi Services"],
    walkableAmenities: ["Palm Gateway", "Hotels", "Nakheel Mall", "Restaurants"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Gateway station to Palm Jumeirah with monorail connections to the trunk and fronds."
  },
  {
    id: 210,
    name: "Knowledge Village",
    location: "Dubai Knowledge Village",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Bus Routes", "University Shuttles"],
    walkableAmenities: ["Universities", "Educational Centers", "Student Housing", "Libraries"],
    nearbyProperties: 22,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Educational hub serving multiple universities and training institutions."
  },
  {
    id: 211,
    name: "Al Sufouh",
    location: "Al Sufouh",
    type: "tram",
    lines: ["Dubai Tram"],
    connections: ["Bus Routes to Mall of Emirates", "Hotel Shuttles"],
    walkableAmenities: ["Hotels", "Beach Access", "Restaurants", "Wild Wadi Water Park"],
    nearbyProperties: 18,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2014,
    description: "Terminal station serving Al Sufouh hotel district and beach areas."
  }
];

// Palm Monorail Stations
const monorailStations: TransportStation[] = [
  {
    id: 301,
    name: "Gateway Station",
    location: "Palm Jumeirah",
    type: "monorail",
    lines: ["Palm Monorail"],
    connections: ["Dubai Tram", "Bus Routes", "Taxi Services"],
    walkableAmenities: ["Palm Gateway", "Hotels", "Shopping", "Restaurants"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Main entrance to Palm Jumeirah with tram connections."
  },
  {
    id: 302,
    name: "Golden Mile Galleria",
    location: "Palm Jumeirah",
    type: "monorail",
    lines: ["Palm Monorail"],
    connections: ["Palm Shuttle", "Taxi Services"],
    walkableAmenities: ["Golden Mile Galleria", "Shopping", "Restaurants", "Beach Access"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Shopping and dining hub on Palm Jumeirah trunk."
  },
  {
    id: 303,
    name: "Al Ittihad Park",
    location: "Palm Jumeirah",
    type: "monorail",
    lines: ["Palm Monorail"],
    connections: ["Palm Shuttle", "Walking Paths"],
    walkableAmenities: ["Al Ittihad Park", "Green Spaces", "Walking Trails", "Beach Access"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Park and recreation area station."
  },
  {
    id: 304,
    name: "Nakheel Mall",
    location: "Palm Jumeirah",
    type: "monorail",
    lines: ["Palm Monorail"],
    connections: ["Shopping Shuttle", "Palm Transport"],
    walkableAmenities: ["Nakheel Mall", "Shopping", "Dining", "Entertainment"],
    nearbyProperties: 48,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Major shopping destination on Palm Jumeirah."
  },
  {
    id: 305,
    name: "The Pointe",
    location: "Palm Jumeirah",
    type: "monorail",
    lines: ["Palm Monorail"],
    connections: ["Resort Shuttles", "Water Transport"],
    walkableAmenities: ["The Pointe", "Dining", "Entertainment", "Fountain Shows"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Entertainment and dining destination."
  },
  {
    id: 306,
    name: "Atlantis Aquaventure",
    location: "Palm Jumeirah",
    type: "monorail",
    lines: ["Palm Monorail"],
    connections: ["Resort Transport", "Hotel Shuttles"],
    walkableAmenities: ["Atlantis Resort", "Aquaventure", "Lost Chambers", "Restaurants"],
    nearbyProperties: 15,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2009,
    description: "Terminal station at Atlantis resort complex."
  }
];

// Ferry Terminals
const ferryTerminals: TransportStation[] = [
  {
    id: 401,
    name: "Dubai Marina Ferry Terminal",
    location: "Dubai Marina",
    type: "ferry",
    lines: ["Dubai Ferry Route"],
    connections: ["Dubai Metro", "Dubai Tram", "Bus Network"],
    walkableAmenities: ["Marina Walk", "Restaurants", "Yacht Club", "Shopping"],
    nearbyProperties: 85,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2007,
    description: "Primary ferry terminal offering scenic water transport connections across Dubai's coastline."
  },
  {
    id: 402,
    name: "Al Ghubaiba Ferry Terminal",
    location: "Bur Dubai",
    type: "ferry",
    lines: ["Dubai Ferry Route", "Traditional Abra"],
    connections: ["Bus Network", "Traditional Souqs Access"],
    walkableAmenities: ["Traditional Souqs", "Heritage Area", "Restaurants", "Museums"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2007,
    description: "Historic waterfront terminal connecting modern ferry services with traditional abra boats."
  },
  {
    id: 403,
    name: "Dubai Canal Station",
    location: "Business Bay",
    type: "ferry",
    lines: ["Dubai Canal Water Bus"],
    connections: ["Metro Business Bay", "Water Taxi"],
    walkableAmenities: ["Dubai Canal", "Canal Walk", "Restaurants", "Shopping"],
    nearbyProperties: 65,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2016,
    description: "Modern canal transport station serving Business Bay area."
  }
];

// Major Bus Stations (Comprehensive UAE Network)
const busStations: TransportStation[] = [
  // Dubai Major Bus Stations
  {
    id: 501,
    name: "Al Ghubaiba Bus Station",
    location: "Bur Dubai",
    type: "bus",
    lines: ["Multiple Routes", "Intercity", "Express", "Abu Dhabi", "Al Ain", "Sharjah"],
    connections: ["Metro Green Line", "Ferry Terminal", "Traditional Abra"],
    walkableAmenities: ["Traditional Souqs", "Heritage Area", "Dubai Museum", "Restaurants"],
    nearbyProperties: 48,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Major intercity bus hub serving heritage areas and connecting to all emirates."
  },
  {
    id: 502,
    name: "Union Square Bus Station",
    location: "Deira",
    type: "bus",
    lines: ["City Routes", "Express", "Intercity", "Hatta", "Ajman", "Sharjah"],
    connections: ["Metro Red/Green Lines", "Traditional Transport"],
    walkableAmenities: ["Union Square", "Shopping", "Heritage Areas", "Hotels"],
    nearbyProperties: 55,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1985,
    description: "Central bus terminal at major metro interchange with emirate connections."
  },
  {
    id: 503,
    name: "Gold Souq Bus Station",
    location: "Deira",
    type: "bus",
    lines: ["Local Routes", "Traditional Area Access", "Souq Shuttles"],
    connections: ["Metro Green Line", "Traditional Abra", "Water Taxi"],
    walkableAmenities: ["Gold Souq", "Spice Souq", "Traditional Markets", "Heritage Sites"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1980,
    description: "Historic market area bus station serving traditional trading districts."
  },
  {
    id: 504,
    name: "Mall of the Emirates Bus Station",
    location: "Al Barsha",
    type: "bus",
    lines: ["Shopping Routes", "Express", "Local", "Global Village", "Miracle Garden"],
    connections: ["Metro Red Line", "Shopping Shuttles"],
    walkableAmenities: ["Mall of the Emirates", "Ski Dubai", "Hotels", "Restaurants"],
    nearbyProperties: 65,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2005,
    description: "Major shopping center transport hub with seasonal attractions access."
  },
  {
    id: 505,
    name: "Ibn Battuta Bus Station",
    location: "Jebel Ali",
    type: "bus",
    lines: ["Intercity", "Express", "Abu Dhabi", "Dubai Parks"],
    connections: ["Metro Red Line", "Mall Shuttles"],
    walkableAmenities: ["Ibn Battuta Mall", "Theme Courts", "Hotels", "Restaurants"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2005,
    description: "Western Dubai transport hub with themed mall and theme park access."
  },
  {
    id: 506,
    name: "Al Satwa Bus Station",
    location: "Al Satwa",
    type: "bus",
    lines: ["Local Routes", "Community Access", "Global Village"],
    connections: ["Community Transport", "Local Shuttles"],
    walkableAmenities: ["Al Satwa Market", "Community Centers", "Traditional Areas"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1995,
    description: "Community-focused transport station with seasonal event access."
  },
  {
    id: 507,
    name: "Al Qusais Bus Station",
    location: "Al Qusais",
    type: "bus",
    lines: ["Industrial Routes", "Residential Access", "Express", "Sharjah"],
    connections: ["Metro Green Line", "Industrial Shuttles"],
    walkableAmenities: ["Residential Areas", "Industrial Zones", "Community Centers"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2000,
    description: "Industrial and residential area transport hub with Sharjah connections."
  },
  {
    id: 508,
    name: "Hatta Bus Station",
    location: "Hatta",
    type: "bus",
    lines: ["Mountain Routes", "Union Connection", "Tourism"],
    connections: ["Mountain Transport", "Heritage Village Access"],
    walkableAmenities: ["Hatta Heritage Village", "Hatta Dam", "Mountain Resorts", "Adventure Sports"],
    nearbyProperties: 15,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Mountain destination transport hub serving Hatta tourism and heritage areas."
  },
  {
    id: 509,
    name: "Sabkha Bus Station",
    location: "Deira",
    type: "bus",
    lines: ["Local Routes", "Traditional Access", "Heritage Tours"],
    connections: ["Traditional Transport", "Heritage Areas"],
    walkableAmenities: ["Traditional Markets", "Heritage Buildings", "Local Shopping"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1985,
    description: "Traditional area bus station serving heritage and cultural districts."
  },
  // Abu Dhabi Bus Stations (Complete Network)
  {
    id: 510,
    name: "Al Wahda Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["City Routes", "Intercity", "Dubai Connection"],
    connections: ["Abu Dhabi Metro (Planned)", "City Transport"],
    walkableAmenities: ["Al Wahda Mall", "Business Centers", "Hotels"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1995,
    description: "Major Abu Dhabi transport hub with Dubai connections."
  },
  {
    id: 511,
    name: "Musaffah Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["Industrial Routes", "Worker Transport", "City Access"],
    connections: ["Industrial Shuttles", "Worker Housing"],
    walkableAmenities: ["Industrial Areas", "Worker Accommodations", "Shopping Centers"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2000,
    description: "Industrial district transport hub serving Musaffah area."
  },
  {
    id: 526,
    name: "City Terminal Abu Dhabi",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["Central Routes", "Government Access", "Tourism"],
    connections: ["Government Transport", "Tourism Shuttles"],
    walkableAmenities: ["Government Buildings", "Cultural Sites", "Hotels", "Museums"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Central Abu Dhabi terminal serving government and tourism areas."
  },
  {
    id: 527,
    name: "Al Shahama Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["Residential Routes", "Community Access", "City Connection"],
    connections: ["Community Transport", "Residential Shuttles"],
    walkableAmenities: ["Al Shahama Community", "Shopping Centers", "Schools"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2000,
    description: "Residential community station serving Al Shahama area."
  },
  {
    id: 528,
    name: "MBZ City Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["New City Routes", "Modern District Access", "Business Routes"],
    connections: ["Business Shuttles", "Modern Transport"],
    walkableAmenities: ["Mohammed Bin Zayed City", "Modern Developments", "Business Centers"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2005,
    description: "Modern city development station serving MBZ City."
  },
  {
    id: 529,
    name: "Murur Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["Traffic Authority Routes", "Government Services", "City Access"],
    connections: ["Government Transport", "Authority Services"],
    walkableAmenities: ["Traffic Authority", "Government Services", "Administrative Centers"],
    nearbyProperties: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1995,
    description: "Government services station serving traffic and administrative authorities."
  },
  {
    id: 530,
    name: "Bani Yas Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["Island Routes", "Tourism Access", "Nature Reserves"],
    connections: ["Island Transport", "Tourism Shuttles"],
    walkableAmenities: ["Bani Yas Island", "Wildlife Reserve", "Hotels", "Nature Activities"],
    nearbyProperties: 15,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2010,
    description: "Island destination station serving Bani Yas wildlife and tourism area."
  },
  {
    id: 531,
    name: "ICAD Bus Station",
    location: "Abu Dhabi",
    type: "bus",
    lines: ["Industrial Routes", "Academic Access", "Technology Zones"],
    connections: ["Industrial Shuttles", "Academic Transport"],
    walkableAmenities: ["Industrial City of Abu Dhabi", "Technology Centers", "Academic Institutions"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2005,
    description: "Industrial and academic zone station serving ICAD development."
  },
  // Sharjah Bus Stations (Complete Network)
  {
    id: 512,
    name: "Al Jubail Bus Station",
    location: "Sharjah",
    type: "bus",
    lines: ["Intercity", "Dubai Connection", "Local Routes"],
    connections: ["Sharjah Metro (Planned)", "City Transport"],
    walkableAmenities: ["Al Jubail Shopping", "Traditional Areas", "Museums"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Major Sharjah transport hub with Dubai and emirates connections."
  },
  {
    id: 513,
    name: "Al Rolla Bus Station",
    location: "Sharjah",
    type: "bus",
    lines: ["City Routes", "Traditional Access", "Heritage Tours"],
    connections: ["Traditional Transport", "Heritage Areas"],
    walkableAmenities: ["Al Rolla Square", "Traditional Souqs", "Heritage Museums"],
    nearbyProperties: 42,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1985,
    description: "Historic Sharjah area transport serving traditional and cultural districts."
  },
  {
    id: 518,
    name: "King Abdul Aziz Street Station",
    location: "Sharjah",
    type: "bus",
    lines: ["City Routes", "Commercial Access", "Business District"],
    connections: ["Commercial Transport", "Business Centers"],
    walkableAmenities: ["King Abdul Aziz Street", "Commercial Buildings", "Business Centers"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Commercial district station serving King Abdul Aziz Street business area."
  },
  {
    id: 519,
    name: "Al Estiqlal Street Station",
    location: "Sharjah",
    type: "bus",
    lines: ["City Routes", "Government Access", "Administrative"],
    connections: ["Government Transport", "Administrative Centers"],
    walkableAmenities: ["Government Buildings", "Administrative Centers", "Public Services"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1988,
    description: "Government and administrative district transport station."
  },
  {
    id: 520,
    name: "King Faisal Street Station",
    location: "Sharjah",
    type: "bus",
    lines: ["City Routes", "Cultural Access", "Heritage Tours"],
    connections: ["Cultural Transport", "Museum Shuttles"],
    walkableAmenities: ["King Faisal Street", "Cultural Centers", "Museums", "Art Galleries"],
    nearbyProperties: 32,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Cultural district station serving arts and heritage areas."
  },
  {
    id: 521,
    name: "1st Industrial Street Station",
    location: "Sharjah",
    type: "bus",
    lines: ["Industrial Routes", "Worker Transport", "Factory Access"],
    connections: ["Industrial Shuttles", "Worker Housing"],
    walkableAmenities: ["Industrial Areas", "Factories", "Worker Accommodations"],
    nearbyProperties: 15,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1992,
    description: "Industrial district station serving factories and worker communities."
  },
  {
    id: 522,
    name: "Al Nahda Park Station",
    location: "Sharjah",
    type: "bus",
    lines: ["Cross-Border", "Dubai Connection", "Recreation Access"],
    connections: ["Dubai Transport", "Park Shuttles"],
    walkableAmenities: ["Al Nahda Park", "Recreation Areas", "Border Shopping"],
    nearbyProperties: 45,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1995,
    description: "Cross-border station serving Al Nahda park and recreation areas."
  },
  {
    id: 523,
    name: "Sahara Centre Station",
    location: "Sharjah",
    type: "bus",
    lines: ["Shopping Routes", "Entertainment Access", "Mall Shuttles"],
    connections: ["Mall Transport", "Entertainment Shuttles"],
    walkableAmenities: ["Sahara Centre", "Shopping", "Entertainment", "Restaurants"],
    nearbyProperties: 38,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2000,
    description: "Shopping and entertainment hub station at Sahara Centre."
  },
  // Ajman Bus Stations (Complete Network)
  {
    id: 514,
    name: "Ajman Al Musalla Bus Station",
    location: "Ajman",
    type: "bus",
    lines: ["Intercity", "Dubai Connection", "Local Routes"],
    connections: ["City Transport", "Beach Access"],
    walkableAmenities: ["Ajman Museum", "Traditional Areas", "Beach Access"],
    nearbyProperties: 28,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1992,
    description: "Main Ajman transport hub with Dubai connections and heritage access."
  },
  {
    id: 515,
    name: "Ajman Municipality Bus Station",
    location: "Ajman",
    type: "bus",
    lines: ["Government Routes", "Administrative Access", "City Routes"],
    connections: ["Government Transport", "Municipal Services"],
    walkableAmenities: ["Ajman Municipality", "Government Buildings", "Public Services"],
    nearbyProperties: 22,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "Government and municipal services transport station."
  },
  {
    id: 524,
    name: "Ajman City Centre Bus Station",
    location: "Ajman",
    type: "bus",
    lines: ["Shopping Routes", "City Access", "Beach Shuttle"],
    connections: ["Shopping Shuttles", "Beach Transport"],
    walkableAmenities: ["Ajman City Centre", "Shopping", "Beach Areas"],
    nearbyProperties: 35,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2005,
    description: "Shopping and entertainment transport hub in Ajman."
  },
  {
    id: 525,
    name: "Jurf Bus Station",
    location: "Ajman",
    type: "bus",
    lines: ["Industrial Routes", "Residential Access", "Worker Transport"],
    connections: ["Industrial Shuttles", "Worker Housing"],
    walkableAmenities: ["Jurf Industrial Area", "Worker Accommodations", "Industrial Facilities"],
    nearbyProperties: 18,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1995,
    description: "Industrial area station serving Jurf industrial district and worker communities."
  },
  // Ras Al Khaimah Bus Stations
  {
    id: 516,
    name: "Al Nakeel Bus Station",
    location: "Ras Al Khaimah",
    type: "bus",
    lines: ["Intercity", "Dubai Connection", "Mountain Routes"],
    connections: ["City Transport", "Adventure Tours"],
    walkableAmenities: ["Traditional Markets", "Adventure Sports", "Mountain Access"],
    nearbyProperties: 22,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1995,
    description: "Northern emirates transport hub with adventure and mountain access."
  },
  {
    id: 517,
    name: "RAK Bus Station",
    location: "Ras Al Khaimah",
    type: "bus",
    lines: ["City Routes", "Beach Access", "Heritage Tours"],
    connections: ["Tourism Transport", "Beach Shuttles"],
    walkableAmenities: ["RAK Museums", "Beach Areas", "Traditional Sites"],
    nearbyProperties: 18,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 1990,
    description: "RAK city transport serving tourism and heritage attractions."
  }
];

// Blue Line (Planned 2029 - Complete 14 Stations)
const blueLIneStations: TransportStation[] = [
  {
    id: 601,
    name: "Creek Interchange Station",
    location: "Dubai Creek",
    type: "metro",
    lines: ["Blue Line (Planned 2029)", "Green Line Interchange"],
    connections: ["Green Line Transfer", "Water Taxi", "Bus Routes"],
    walkableAmenities: ["Dubai Creek", "Creek Island", "Waterfront Dining", "Heritage Areas"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Major interchange station connecting Blue Line with existing Green Line at Dubai Creek."
  },
  {
    id: 602,
    name: "Dubai Festival City",
    location: "Dubai Festival City",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Festival City Shuttle", "Bus Routes"],
    walkableAmenities: ["Dubai Festival City Mall", "Hotels", "Marina", "Golf Course"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Shopping and entertainment destination station at Dubai Festival City."
  },
  {
    id: 603,
    name: "Dubai Creek Harbour",
    location: "Dubai Creek Harbour",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Water Taxi", "Creek Harbour Shuttle"],
    walkableAmenities: ["Creek Island", "Future Developments", "Hotels", "Restaurants"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Future metro station serving the expanding Dubai Creek Harbour mega-development."
  },
  {
    id: 604,
    name: "Ras Al Khor",
    location: "Ras Al Khor",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Industrial Shuttle", "Wildlife Sanctuary Access"],
    walkableAmenities: ["Ras Al Khor Wildlife Sanctuary", "Industrial Areas", "Nature Reserve"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Environmental and industrial area station near the famous wildlife sanctuary."
  },
  {
    id: 605,
    name: "International City 1",
    location: "International City",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["International City Shuttle", "Bus Network"],
    walkableAmenities: ["International City Shopping", "Residential Areas", "Cultural Districts"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Major interchange station serving the diverse International City community."
  },
  {
    id: 606,
    name: "International City 2",
    location: "International City",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["International City Transport", "Residential Shuttles"],
    walkableAmenities: ["International City Districts", "Shopping Centers", "Community Centers"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Secondary station serving International City residential and commercial areas."
  },
  {
    id: 607,
    name: "Dubai Silicon Oasis",
    location: "Dubai Silicon Oasis",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Tech Park Shuttles", "University Transport"],
    walkableAmenities: ["Tech Companies", "Residential Areas", "Shopping Centers", "Schools"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Technology hub station serving Silicon Oasis tech companies and residential community."
  },
  {
    id: 608,
    name: "Academic City",
    location: "Dubai International Academic City",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["University Shuttles", "Student Transport"],
    walkableAmenities: ["Universities", "Student Housing", "Libraries", "Research Centers"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Educational hub station serving multiple international universities and colleges."
  },
  {
    id: 609,
    name: "Centrepoint Interchange Station",
    location: "Al Rashidiya",
    type: "metro",
    lines: ["Blue Line (Planned 2029)", "Red Line Interchange"],
    connections: ["Red Line Transfer", "Bus Network", "Centrepoint Shuttle"],
    walkableAmenities: ["Centrepoint Mall", "Shopping Centers", "Residential Areas"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Major interchange connecting Blue Line with existing Red Line at Centrepoint."
  },
  {
    id: 610,
    name: "Mirdif",
    location: "Mirdif",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Mirdif Shuttle", "Community Transport"],
    walkableAmenities: ["Mirdif City Centre", "Residential Areas", "Community Centers", "Parks"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Family-oriented station serving the Mirdif residential community and shopping center."
  },
  {
    id: 611,
    name: "Al Warqa",
    location: "Al Warqa",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Al Warqa Shuttle", "Residential Transport"],
    walkableAmenities: ["Al Warqa Mall", "Residential Areas", "Community Centers", "Schools"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Residential area station serving Al Warqa community and local amenities."
  },
  {
    id: 612,
    name: "Dubai International City 3",
    location: "International City",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["International City Network", "Dragon Mart Shuttle"],
    walkableAmenities: ["Dragon Mart", "International Districts", "Shopping", "Restaurants"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Third station in International City serving Dragon Mart and cultural districts."
  },
  {
    id: 613,
    name: "Al Rashidiya",
    location: "Al Rashidiya",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Al Rashidiya Transport", "Community Shuttles"],
    walkableAmenities: ["Al Rashidiya Community", "Shopping Centers", "Residential Areas"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Community station serving Al Rashidiya residential and commercial areas."
  },
  {
    id: 614,
    name: "Metro Depot Al Ruwayyah 3",
    location: "Al Ruwayyah",
    type: "metro",
    lines: ["Blue Line (Planned 2029)"],
    connections: ["Depot Services", "Maintenance Facility"],
    walkableAmenities: ["Metro Depot", "Industrial Areas", "Transport Facilities"],
    nearbyProperties: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    openYear: 2029,
    description: "Terminal depot station serving metro maintenance and operational facilities."
  }
];

const MetroTransportLayer = () => {
  const [selectedType, setSelectedType] = useState('metro');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<TransportStation | null>(null);

  const getAllStations = () => {
    return [...redLineStations, ...greenLineStations, ...tramStations, ...ferryTerminals, ...blueLIneStations, ...monorailStations, ...busStations];
  };

  const getStationsByType = (type: string) => {
    switch (type) {
      case 'metro':
        return [...redLineStations, ...greenLineStations, ...blueLIneStations];
      case 'tram':
        return tramStations;
      case 'ferry':
        return ferryTerminals;
      case 'bus':
        return busStations;
      case 'monorail':
        return monorailStations;
      default:
        return getAllStations();
    }
  };

  const filteredStations = getStationsByType(selectedType).filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.lines.some(line => line.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getLineColor = (line: string) => {
    if (line.includes('Red')) return 'bg-red-600';
    if (line.includes('Green')) return 'bg-green-600';
    if (line.includes('Blue')) return 'bg-blue-600';
    if (line.includes('Tram')) return 'bg-blue-500';
    if (line.includes('Ferry')) return 'bg-blue-700';
    if (line.includes('Monorail')) return 'bg-purple-600';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-montserrat font-bold mb-4">Dubai Transport Network</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore Dubai's comprehensive public transport system including metro, tram, bus, ferry, and monorail connections. 
          Find properties with excellent connectivity to Dubai's world-class transport infrastructure.
        </p>
      </motion.div>

      {/* Transport Type Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {transportTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 ${
                selectedType === type.id
                  ? `${type.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{type.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search stations, lines, or locations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Selected Transport Type Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg p-6 border shadow-sm"
      >
        {transportTypes.find(t => t.id === selectedType) && (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              {transportTypes.find(t => t.id === selectedType)?.name}
            </h3>
            <p className="text-gray-600">
              {transportTypes.find(t => t.id === selectedType)?.description}
            </p>
          </div>
        )}
      </motion.div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.map((station, index) => (
          <motion.div
            key={`station-${station.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedStation(station)}>
              <div className="relative">
                <img 
                  src={station.image} 
                  alt={station.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {station.lines.map((line, idx) => (
                    <Badge 
                      key={`${station.id}-line-${idx}`} 
                      className={`${getLineColor(line)} text-white text-xs`}
                    >
                      {line}
                    </Badge>
                  ))}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-xs">
                    {station.openYear > 2025 ? 'Planned' : 'Operational'}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{station.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {station.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Connections</h4>
                    <div className="flex flex-wrap gap-1">
                      {station.connections.slice(0, 2).map((connection, idx) => (
                        <Badge key={`${station.id}-conn-${idx}`} variant="outline" className="text-xs">
                          {connection}
                        </Badge>
                      ))}
                      {station.connections.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{station.connections.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Nearby Amenities</h4>
                    <div className="text-xs text-gray-600">
                      {station.walkableAmenities.slice(0, 3).join(', ')}
                      {station.walkableAmenities.length > 3 && '...'}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Home className="w-4 h-4" />
                  {station.nearbyProperties} properties
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  Since {station.openYear}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Station Detail Modal */}
      {selectedStation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStation(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedStation.image} 
                alt={selectedStation.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedStation(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedStation.name}</h2>
              <p className="text-gray-600 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {selectedStation.location}
              </p>
              
              <p className="text-gray-700 mb-6">{selectedStation.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Transit Lines</h3>
                  <div className="space-y-2">
                    {selectedStation.lines.map((line, idx) => (
                      <Badge key={`modal-line-${idx}`} className={`${getLineColor(line)} text-white`}>
                        {line}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Connections</h3>
                  <div className="space-y-1">
                    {selectedStation.connections.map((connection, idx) => (
                      <div key={`modal-conn-${idx}`} className="text-sm text-gray-600">• {connection}</div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Walkable Amenities</h3>
                  <div className="space-y-1">
                    {selectedStation.walkableAmenities.map((amenity, idx) => (
                      <div key={`modal-amenity-${idx}`} className="text-sm text-gray-600">• {amenity}</div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Property Access</h3>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-4 h-4" />
                      {selectedStation.nearbyProperties} properties within walking distance
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Operational since {selectedStation.openYear}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8"
      >
        <div className="bg-white rounded-lg p-6 text-center border shadow-sm">
          <div className="text-2xl font-bold text-red-600">{redLineStations.length + greenLineStations.length}</div>
          <div className="text-sm text-gray-600">Metro Stations</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{tramStations.length}</div>
          <div className="text-sm text-gray-600">Tram Stations</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border shadow-sm">
          <div className="text-2xl font-bold text-green-600">{busStations.length}</div>
          <div className="text-sm text-gray-600">Bus Stations</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border shadow-sm">
          <div className="text-2xl font-bold text-blue-700">{ferryTerminals.length}</div>
          <div className="text-sm text-gray-600">Ferry Terminals</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border shadow-sm">
          <div className="text-2xl font-bold text-purple-600">{monorailStations.length}</div>
          <div className="text-sm text-gray-600">Monorail Stations</div>
        </div>
      </motion.div>
    </div>
  );
};

export default MetroTransportLayer;