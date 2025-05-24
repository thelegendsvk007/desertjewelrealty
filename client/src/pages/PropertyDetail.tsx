import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice, formatArea, parsePropertyImages, parsePropertyFeatures } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import GoldenVisaIndicator from '@/components/GoldenVisaIndicator';
import LeafletMap from '@/components/LeafletMap';
import { Property } from '@shared/schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from '@/lib/queryClient';

// Extend schema for form validation
const inquiryFormSchema = insertInquirySchema.extend({
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Phone number must be at least 7 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const PropertyDetail = () => {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Fetch property details
  const { data: property, isLoading, isError } = useQuery({
    queryKey: [`/api/properties/${id}`],
  });

  // Fetch location details
  const { data: location } = useQuery({
    queryKey: [`/api/locations/${property?.locationId}`],
    enabled: !!property?.locationId
  });

  // Fetch developer details
  const { data: developer } = useQuery({
    queryKey: [`/api/developers/${property?.developerId}`],
    enabled: !!property?.developerId
  });

  // Form handling
  const form = useForm<z.infer<typeof inquiryFormSchema>>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyId: parseInt(id)
    },
  });
  
  // Set property ID in form when it changes
  useEffect(() => {
    form.setValue('propertyId', parseInt(id));
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof inquiryFormSchema>) => {
    try {
      await apiRequest('POST', '/api/inquiries', values);
      
      toast({
        title: "Inquiry Submitted",
        description: "We've received your inquiry and will contact you soon!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your inquiry. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-8">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
          
          {/* Details Section */}
          <div className="lg:col-span-4">
            <Skeleton className="h-20 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-10 w-full mb-6" />
            <Skeleton className="h-40 w-full mb-8" />
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-8 w-full mb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="mb-8">The property you're looking for doesn't exist or has been removed.</p>
        <Link href="/properties">
          <a className="bg-primary hover:bg-teal-dark text-white px-6 py-2 rounded-md transition-colors duration-200">
            Back to Properties
          </a>
        </Link>
      </div>
    );
  }

  const images = parsePropertyImages(property.images);
  const features = parsePropertyFeatures(property.features);

  // Handle image navigation
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 animated-bg"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/">
                  <a className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary">
                    <i className="fas fa-home mr-2"></i>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                  <Link href="/properties">
                    <a className="text-sm font-medium text-gray-500 hover:text-primary">Properties</a>
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                    {property.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Gallery Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Main Image */}
              <div className="relative h-[500px]">
                {images.length > 0 ? (
                  <img 
                    src={images[currentImageIndex]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
                
                {/* Navigation Controls */}
                {images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
                      onClick={goToPrevImage}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
                      onClick={goToNextImage}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
                )}
                
                {/* Label indicators */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {property.premium && (
                    <Badge variant="premium">Premium</Badge>
                  )}
                  {property.exclusive && (
                    <Badge variant="exclusive">Exclusive</Badge>
                  )}
                  {property.newLaunch && (
                    <Badge variant="new">New Launch</Badge>
                  )}
                </div>
                
                {/* Status badge */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-white/90 text-foreground px-4 py-1 rounded-full font-medium">
                    {property.status}
                  </span>
                  <GoldenVisaIndicator price={property.price} className="bg-white/90" />
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex overflow-x-auto p-2 gap-2">
                  {images.map((image, index) => (
                    <div 
                      key={index}
                      className={`flex-none w-20 h-20 cursor-pointer rounded-md overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Property Details Tabs */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="developer">Developer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <h3 className="text-xl font-montserrat font-semibold">About This Property</h3>
                  <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">{property.propertyType}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{property.status}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-medium">{property.beds}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-medium">{property.baths}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{formatArea(property.area)}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Price per sqft</p>
                      <p className="font-medium">{formatPrice(Math.round(property.price / property.area))}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{location?.name || 'Loading...'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Developer</p>
                      <p className="font-medium">{developer?.name || 'Loading...'}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features">
                  <h3 className="text-xl font-montserrat font-semibold mb-6">Key Features</h3>
                  {features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center py-2">
                          <i className="fas fa-check-circle text-primary mr-3"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No features specified for this property.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="location">
                  <h3 className="text-xl font-montserrat font-semibold mb-6">Location</h3>
                  <div className="rounded-lg overflow-hidden h-[400px] bg-gray-100">
                    {property.latitude && property.longitude ? (
                      <LeafletMap 
                        center={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                        zoom={15}
                        markers={[
                          {
                            position: [parseFloat(property.latitude), parseFloat(property.longitude)],
                            popup: property.title
                          }
                        ]}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Map location not available</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-montserrat font-medium mb-3">Address</h4>
                    <p className="text-gray-600">{property.address}</p>
                    
                    {location && (
                      <div className="mt-4">
                        <h4 className="font-montserrat font-medium mb-2">About {location.name}</h4>
                        <p className="text-gray-600">{location.description}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="developer">
                  {developer ? (
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src={developer.logo}
                          alt={developer.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <h3 className="text-xl font-montserrat font-semibold">{developer.name}</h3>
                          <p className="text-gray-500">Established {developer.established}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{developer.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Projects Developed</p>
                          <p className="font-medium">{developer.projectCount}+</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Website</p>
                          <a 
                            href={developer.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Contact Email</p>
                          <a 
                            href={`mailto:${developer.contactEmail}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {developer.contactEmail}
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Link href={`/developers/${developer.id}`}>
                          <a className="inline-flex items-center text-primary hover:text-teal-dark font-medium">
                            View all properties by {developer.name} <i className="fas fa-arrow-right ml-2"></i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Developer information not available</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar - Contact and Details */}
          <div className="lg:col-span-4">
            {/* Price and Quick Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="mb-4">
                <h1 className="text-2xl font-montserrat font-semibold mb-1">{property.title}</h1>
                <p className="text-gray-500 flex items-center">
                  <i className="fas fa-map-marker-alt text-primary mr-2"></i> {property.address}
                </p>
              </div>
              
              <div className="text-3xl font-bold text-secondary mb-6">
                {formatPrice(property.price)}
              </div>
              
              <div className="flex flex-wrap gap-8 mb-6">
                <div className="flex items-center">
                  <i className="fas fa-bed text-primary mr-2 text-lg"></i>
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-medium">{property.beds}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-bath text-primary mr-2 text-lg"></i>
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-medium">{property.baths}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-ruler-combined text-primary mr-2 text-lg"></i>
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-medium">{formatArea(property.area)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-teal-dark text-white">
                      <i className="fas fa-envelope mr-2"></i> Request Information
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Request Information</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="I'm interested in this property and would like more information..." 
                                    rows={4}
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full">Submit Inquiry</Button>
                        </form>
                      </Form>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white">
                      <i className="fas fa-phone-alt mr-2"></i> Call Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Contact Our Agent</DialogTitle>
                      <DialogDescription>
                        Our agent is ready to assist you with this property.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center py-4">
                      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <i className="fas fa-user text-primary text-2xl"></i>
                      </div>
                      <p className="font-medium text-lg">Sales Agent</p>
                      <p className="text-primary text-xl font-semibold mt-2">+971 58 953 2210</p>
                    </div>
                    <DialogFooter>
                      <a 
                        href="tel:+971589532210" 
                        className="bg-primary text-white w-full py-2 rounded-md text-center font-medium"
                      >
                        Call Now
                      </a>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button className="w-full bg-white border border-gray-200 text-foreground hover:bg-gray-100">
                  <i className="far fa-heart mr-2"></i> Save Property
                </Button>
              </div>
            </div>
            
            {/* Share and Print */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-montserrat font-medium mb-4">Share this Property</h3>
              <div className="flex space-x-3">
                <a href="#" className="bg-[#3b5998] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-[#1da1f2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-[#25d366] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="bg-[#0e76a8] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="bg-[#ff4500] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
              <div className="mt-4">
                <button className="flex items-center text-gray-600 hover:text-primary">
                  <i className="fas fa-print mr-2"></i> Print Property Details
                </button>
              </div>
            </div>
            
            {/* Similar Properties Suggestion */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-montserrat font-medium mb-6">You May Also Like</h3>
              <div className="space-y-4">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
                      <div className="flex-grow">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2 mb-1" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">Similar properties will appear here.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;
