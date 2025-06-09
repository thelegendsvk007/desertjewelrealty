import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Home, MapPin, Battery, ThumbsUp, BadgeCheck, Trees, Building } from 'lucide-react';
import { propertiesData } from '@/data/properties';
import { locationsData } from '@/data/locations';
import { formatPrice, formatArea, parsePropertyImages } from '@/lib/utils';

// Define schema for the form
const formSchema = z.object({
  budget: z.string(),
  propertyType: z.string(),
  bedrooms: z.string(),
  location: z.string(),
  lifestyle: z.array(z.string()).min(1, {
    message: "Please select at least one lifestyle preference",
  }),
  investmentGoal: z.string(),
  amenities: z.array(z.string()).min(0),
});

type FormValues = z.infer<typeof formSchema>;

// Function to generate AI recommendations based on user preferences
const generateRecommendations = (preferences: FormValues) => {
  const { budget, propertyType, bedrooms, location, lifestyle, investmentGoal, amenities } = preferences;
  
  // Filter properties based on preferences
  let matchedProperties = propertiesData.filter(property => {
    // Budget filter
    const maxBudget = budget ? parseInt(budget) : Infinity;
    if (property.price > maxBudget) return false;
    
    // Property type filter
    if (propertyType && property.propertyType.toLowerCase() !== propertyType.toLowerCase()) return false;
    
    // Bedrooms filter
    if (bedrooms && bedrooms !== 'any') {
      const propertyBeds = property.beds || 0;
      if (bedrooms === 'studio' && propertyBeds !== 0) return false;
      if (bedrooms !== 'studio' && propertyBeds !== parseInt(bedrooms)) return false;
    }
    
    // Location filter using actual location data
    if (location && location !== 'no-preference') {
      const locationData = locationsData.find(loc => loc.id === property.locationId);
      const locationSlug = location.replace(/-/g, ' ');
      if (!locationData?.name.toLowerCase().includes(locationSlug.toLowerCase())) return false;
    }
    
    return true;
  });
  
  // Sort by relevance and add match scores
  const scoredProperties = matchedProperties.map(property => {
    let score = 70; // Base score
    
    // Boost score for premium properties
    if (property.premium) score += 10;
    if (property.exclusive) score += 8;
    if (property.newLaunch) score += 5;
    
    // Lifestyle preferences scoring
    if (lifestyle.includes('luxury') && property.premium) score += 15;
    if (lifestyle.includes('family') && (property.beds || 0) >= 3) score += 10;
    if (lifestyle.includes('investment') && (property.propertyType === 'Apartment' || property.status === 'Off-Plan')) score += 12;
    if (lifestyle.includes('beachfront') && property.locationId === 2) score += 20; // Palm Jumeirah
    
    // Investment goal scoring
    if (investmentGoal === 'rental-income' && property.propertyType === 'Apartment') score += 10;
    if (investmentGoal === 'capital-appreciation' && property.status === 'Off-Plan') score += 15;
    if (investmentGoal === 'golden-visa' && property.price >= 2000000) score += 12;
    
    // Cap score at 98%
    score = Math.min(score, 98);
    
    return {
      ...property,
      matchScore: score
    };
  });
  
  // Sort by match score and return top 3
  return scoredProperties
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
};

// Mock recommended properties based on user preferences - kept for fallback
const mockRecommendations = [
  {
    id: 101,
    title: "Luxury Waterfront Apartment",
    description: "Stunning waterfront apartment with panoramic sea views",
    price: 3200000,
    location: "Dubai Marina",
    bedrooms: 2,
    bathrooms: 2.5,
    area: 1450,
    type: "Apartment",
    status: "active",
    features: ["Sea View", "Balcony", "Gym", "Pool", "Parking"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"],
    developerId: 1,
    agentContact: "+971 50 123 4567",
    yearBuilt: 2019,
    furnished: true,
    parkingSpaces: 1,
    views: 245,
    inquiries: 15,
    viewsThisWeek: 38,
    reviewStatus: "approved",
    paymentPlan: "60% on handover, 40% post-handover over 2 years",
    matchScore: 96,
  },
  {
    id: 102,
    title: "Family Villa with Garden",
    description: "Spacious family villa with private garden and swimming pool",
    price: 5500000,
    location: "Arabian Ranches",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 3200,
    type: "Villa",
    status: "active",
    features: ["Private Pool", "Garden", "Maid's Room", "Study", "BBQ Area"],
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"],
    developerId: 3,
    agentContact: "+971 55 987 6543",
    yearBuilt: 2018,
    furnished: false,
    parkingSpaces: 2,
    views: 189,
    inquiries: 8,
    viewsThisWeek: 25,
    reviewStatus: "approved",
    paymentPlan: "Full payment",
    matchScore: 88,
  },
  {
    id: 103,
    title: "Modern Studio in Business Bay",
    description: "Compact studio apartment with Burj Khalifa views",
    price: 950000,
    location: "Business Bay",
    bedrooms: 0,
    bathrooms: 1,
    area: 550,
    type: "Studio",
    status: "active",
    features: ["Burj Khalifa View", "Gym", "Concierge", "Parking"],
    images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"],
    developerId: 1,
    agentContact: "+971 52 456 7890",
    yearBuilt: 2021,
    furnished: true,
    parkingSpaces: 1,
    views: 312,
    inquiries: 24,
    viewsThisWeek: 42,
    reviewStatus: "approved",
    paymentPlan: "Full payment",
    matchScore: 81,
  }
];

interface AIPropertyMatchmakerProps {
  className?: string;
}

const AIPropertyMatchmaker: React.FC<AIPropertyMatchmakerProps> = ({ className }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [matchingProgress, setMatchingProgress] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: "",
      propertyType: "",
      bedrooms: "",
      location: "",
      lifestyle: [],
      investmentGoal: "",
      amenities: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate AI processing with progress updates
    for (let i = 0; i <= 100; i += 10) {
      setMatchingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    
    // Generate real property recommendations
    setTimeout(() => {
      const realRecommendations = generateRecommendations(data);
      setRecommendations(realRecommendations);
      setIsLoading(false);
      setStep(3);
    }, 1000);
  };

  const resetForm = () => {
    form.reset();
    setRecommendations(null);
    setStep(1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep1 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget (AED)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="500000-1000000">500,000 - 1,000,000</SelectItem>
                  <SelectItem value="1000000-2000000">1,000,000 - 2,000,000</SelectItem>
                  <SelectItem value="2000000-5000000">2,000,000 - 5,000,000</SelectItem>
                  <SelectItem value="5000000-10000000">5,000,000 - 10,000,000</SelectItem>
                  <SelectItem value="10000000+">10,000,000+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of bedrooms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5+">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationsData.map((location) => (
                    <SelectItem key={location.id} value={location.name.toLowerCase().replace(/\s+/g, '-')}>
                      {location.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="no-preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-end mt-6">
        <Button type="button" onClick={nextStep}>Continue</Button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="lifestyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lifestyle Preferences</FormLabel>
              <FormDescription>Select all that apply to you</FormDescription>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  type="button"
                  variant={field.value.includes("family") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("family")
                      ? field.value.filter(item => item !== "family")
                      : [...field.value, "family"];
                    field.onChange(newValue);
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Family-friendly
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("waterfront") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("waterfront")
                      ? field.value.filter(item => item !== "waterfront")
                      : [...field.value, "waterfront"];
                    field.onChange(newValue);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Waterfront Living
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("urban") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("urban")
                      ? field.value.filter(item => item !== "urban")
                      : [...field.value, "urban"];
                    field.onChange(newValue);
                  }}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Urban Lifestyle
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("quiet") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("quiet")
                      ? field.value.filter(item => item !== "quiet")
                      : [...field.value, "quiet"];
                    field.onChange(newValue);
                  }}
                >
                  <Trees className="mr-2 h-4 w-4" />
                  Quiet & Peaceful
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="investmentGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Investment Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="primary-residence">Primary Residence</SelectItem>
                  <SelectItem value="vacation-home">Vacation Home</SelectItem>
                  <SelectItem value="rental-income">Rental Income</SelectItem>
                  <SelectItem value="capital-appreciation">Capital Appreciation</SelectItem>
                  <SelectItem value="golden-visa">Golden Visa Qualification</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Must-Have Amenities</FormLabel>
              <FormDescription>Select amenities important to you</FormDescription>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                <Button
                  type="button"
                  variant={field.value.includes("pool") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("pool")
                      ? field.value.filter(item => item !== "pool")
                      : [...field.value, "pool"];
                    field.onChange(newValue);
                  }}
                >
                  Swimming Pool
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("gym") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("gym")
                      ? field.value.filter(item => item !== "gym")
                      : [...field.value, "gym"];
                    field.onChange(newValue);
                  }}
                >
                  Gym
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("parking") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("parking")
                      ? field.value.filter(item => item !== "parking")
                      : [...field.value, "parking"];
                    field.onChange(newValue);
                  }}
                >
                  Parking
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("security") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("security")
                      ? field.value.filter(item => item !== "security")
                      : [...field.value, "security"];
                    field.onChange(newValue);
                  }}
                >
                  24/7 Security
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("balcony") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("balcony")
                      ? field.value.filter(item => item !== "balcony")
                      : [...field.value, "balcony"];
                    field.onChange(newValue);
                  }}
                >
                  Balcony/Terrace
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("playground") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("playground")
                      ? field.value.filter(item => item !== "playground")
                      : [...field.value, "playground"];
                    field.onChange(newValue);
                  }}
                >
                  Kids Playground
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("maid-room") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("maid-room")
                      ? field.value.filter(item => item !== "maid-room")
                      : [...field.value, "maid-room"];
                    field.onChange(newValue);
                  }}
                >
                  Maid's Room
                </Button>
                
                <Button
                  type="button"
                  variant={field.value.includes("sea-view") ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValue = field.value.includes("sea-view")
                      ? field.value.filter(item => item !== "sea-view")
                      : [...field.value, "sea-view"];
                    field.onChange(newValue);
                  }}
                >
                  Sea View
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding matches...
            </>
          ) : (
            "Find My Perfect Property"
          )}
        </Button>
      </div>
    </>
  );

  const renderProcessing = () => (
    <div className="py-10 text-center">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${matchingProgress}%` }}></div>
      </div>
      
      <h3 className="text-lg font-medium mb-2">AI Property Matching in Progress</h3>
      <p className="text-muted-foreground mb-6">Our AI is analyzing thousands of properties to find your perfect match...</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left">
        <div className="flex items-start gap-2">
          <div className="min-w-[24px] mt-1">
            <ThumbsUp className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm">Analyzing your preferences</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="min-w-[24px] mt-1">
            <Battery className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm">Calculating investment potential</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="min-w-[24px] mt-1">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm">Evaluating location factors</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="min-w-[24px] mt-1">
            <BadgeCheck className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm">Finding the best matches</p>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <>
      <div className="text-center mb-6">
        <h3 className="text-xl font-medium mb-2">Your Personalized Property Matches</h3>
        <p className="text-muted-foreground">Based on your preferences, our AI recommends these properties</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations?.map((property) => {
          const images = parsePropertyImages(property.images);
          const featuredImage = images.length > 0 ? images[0] : '';
          const locationData = locationsData.find(loc => loc.id === property.locationId);
          
          return (
            <Card key={property.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <img 
                  src={featuredImage} 
                  alt={property.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {property.premium && (
                    <Badge variant="premium">Premium</Badge>
                  )}
                  {property.exclusive && (
                    <Badge variant="exclusive">Exclusive</Badge>
                  )}
                  {property.newLaunch && (
                    <Badge variant="new">New Launch</Badge>
                  )}
                  {property.soldOut && (
                    <Badge variant="soldOut">Sold Out</Badge>
                  )}
                  {property.fastSelling && (
                    <Badge variant="fastSelling">Fast Selling</Badge>
                  )}
                </div>
                <div className="absolute top-2 right-2 bg-primary text-white text-sm font-bold px-2 py-1 rounded-md">
                  {property.matchScore}% Match
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <CardDescription className="line-clamp-1">{locationData?.name || property.address}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">{formatPrice(property.price)}</span>
                  <span className="text-sm text-muted-foreground">{property.propertyType}</span>
                </div>
                <div className="flex gap-4 text-sm mb-3">
                  <span>{property.beds} {property.beds === 0 ? "Studio" : property.beds === 1 ? "Bed" : "Beds"}</span>
                  <span>{property.baths} {property.baths === 1 ? "Bath" : "Baths"}</span>
                  <span>{formatArea(property.area)}</span>
                </div>
                <p className="text-sm line-clamp-2 text-muted-foreground">{property.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/properties/${property.id}`}>
                  <Button className="w-full">View Property</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={resetForm}>Start New Search</Button>
        <Button>Contact Agent About These Properties</Button>
      </div>
    </>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>AI Property Matchmaker</CardTitle>
        <CardDescription>Find your perfect property match using our AI-powered tool</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {isLoading && renderProcessing()}
            {step === 3 && renderResults()}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AIPropertyMatchmaker;