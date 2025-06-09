import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageCircle } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice, formatArea } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import GoldenVisaIndicator from '@/components/GoldenVisaIndicator';
import LeafletMap from '@/components/LeafletMap';
import { ImageGallery } from '@/components/ImageGallery';
import { Property } from '@/types';
import { getPropertyById, propertiesData } from '@/data/properties';
import { getDeveloperById } from '@/data/developersData';
import { getLocationById, locationsData } from '@/data/locations';

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
import { z } from "zod";

// Form validation schema
const inquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Phone number must be at least 7 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const PropertyDetail = () => {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  // Get property from frontend data
  const property = getPropertyById(parseInt(id || '0'));
  const developer = property ? getDeveloperById(property.developerId) : null;
  const location = property ? getLocationById(property.locationId) : null;
  
  const propertyImages = property?.images || [];

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  // Form handling
  const form = useForm<z.infer<typeof inquiryFormSchema>>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof inquiryFormSchema>) => {
    // Send inquiry via WhatsApp
    const message = `Hello, I'm interested in ${property?.title} at ${property?.address}. 

Name: ${values.name}
Email: ${values.email}
Phone: ${values.phone}
Message: ${values.message}

Property Details:
- Price: ${formatPrice(property?.price || 0)}
- Bedrooms: ${property?.beds || 'N/A'}
- Bathrooms: ${property?.baths || 'N/A'}
- Area: ${formatArea(property?.area || 0)}`;

    const whatsappUrl = `https://wa.me/971589532210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Your inquiry will be sent via WhatsApp to our agent.",
    });
    
    form.reset();
  };

  const handleCallAgent = () => {
    window.open('tel:+971589532210', '_self');
  };

  const handleShareProperty = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Link Copied",
        description: "Property URL has been copied to your clipboard.",
      });
    }).catch(() => {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Link Copied",
        description: "Property URL has been copied to your clipboard.",
      });
    });
  };

  if (!property) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist.</p>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const similarProperties = propertiesData
    .filter(p => {
      if (p.id === property.id) return false;
      
      // Match bedrooms (exact match or within ±1 bedroom)
      const bedroomMatch = Math.abs((p.beds || 0) - (property.beds || 0)) <= 1;
      
      // Match price range (within ±30% of the property price)
      const priceRange = property.price * 0.3;
      const priceMatch = Math.abs(p.price - property.price) <= priceRange;
      
      return bedroomMatch && priceMatch;
    })
    .slice(0, 3);

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/properties">
          <Button variant="ghost" className="mb-4">
            ← Back to Properties
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-8">
            <div className="relative">
              {propertyImages.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative h-[500px] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openGallery(currentImageIndex)}
                >
                  <img
                    src={propertyImages[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {propertyImages.length}
                  </div>

                  {/* Navigation arrows */}
                  {propertyImages.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === 0 ? propertyImages.length - 1 : prev - 1
                          );
                        }}
                      >
                        ←
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === propertyImages.length - 1 ? 0 : prev + 1
                          );
                        }}
                      >
                        →
                      </Button>
                    </>
                  )}
                </motion.div>
              ) : (
                <div className="h-[500px] bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}

              {/* Thumbnail strip */}
              {propertyImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {propertyImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details Tabs */}
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="investment">Investment Guide</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Property Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-[#D4AF37]">{property.beds || 'N/A'}</div>
                      <div className="text-sm text-primary">Bedrooms</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-[#D4AF37]">{property.baths || 'N/A'}</div>
                      <div className="text-sm text-primary">Bathrooms</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-[#D4AF37]">{formatArea(property.area || 0)}</div>
                      <div className="text-sm text-primary">Area</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-[#D4AF37]">{property.propertyType}</div>
                      <div className="text-sm text-primary">Type</div>
                    </div>
                    {property.completionYear && (
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-[#D4AF37]">
                          {property.completionQuarter ? `${property.completionQuarter} ` : ''}{property.completionYear}
                        </div>
                        <div className="text-sm text-primary">Completion</div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                  {property.features && property.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No features listed for this property.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Location Details</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-muted-foreground">{property.address}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Area Information</h4>
                      {location ? (
                        <div className="space-y-2">
                          <p className="text-muted-foreground font-medium">{location.name}, {location.city}</p>
                          {location.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                              {location.description}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Location information not available</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Property Location</h4>
                      {property.latitude && property.longitude ? (
                        <div className="h-[400px] rounded-lg overflow-hidden relative border">
                          <LeafletMap
                            center={[property.latitude, property.longitude]}
                            zoom={15}
                            markers={[{
                              position: [property.latitude, property.longitude],
                              popup: property.title
                            }]}
                            style={{ position: 'relative', zIndex: 1 }}
                          />
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Map location not available for this property.</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="investment" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Investment Potential</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Rental Yield Estimate</h4>
                        <p className="text-2xl font-bold text-primary">6-8% annually</p>
                        <p className="text-sm text-muted-foreground">Based on current market conditions</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Capital Appreciation</h4>
                        <p className="text-2xl font-bold text-primary">5-12% yearly</p>
                        <p className="text-sm text-muted-foreground">Historical average in this area</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Investment Highlights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Prime location with excellent connectivity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>High rental demand in the area</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Strong developer reputation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Golden Visa eligible investment</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Payment Plan Options</h4>
                      <div className="bg-gradient-to-r from-primary/10 to-primary/20 border border-primary/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <p className="text-primary font-semibold animate-pulse">Payment plan is available</p>
                        </div>
                        <p className="text-xs text-primary/80 mt-1">Contact our agent for detailed payment structure</p>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          onClick={handleCallAgent}
                          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                        >
                          <Phone className="h-4 w-4" />
                          Call Agent
                        </Button>
                        <Button 
                          onClick={() => {
                            const message = `Hello, I'm interested in the payment plan for ${property.title} at ${property.address}. Could you please provide more details?`;
                            const whatsappUrl = `https://wa.me/971589532210?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          variant="outline" 
                          className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Price and Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{property.title}</h1>
                  {property.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>
                
                <div className="text-3xl font-bold text-[#D4AF37] mb-6">
                  {formatPrice(property.price)}
                </div>

                {/* Property badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline">{property.status}</Badge>
                  {property.premium && <Badge variant="default">Premium</Badge>}
                  {property.exclusive && <Badge variant="secondary">Exclusive</Badge>}
                  {property.newLaunch && <Badge variant="destructive">New Launch</Badge>}
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold">{property.beds || 'N/A'}</div>
                    <div className="text-xs text-primary">Beds</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{property.baths || 'N/A'}</div>
                    <div className="text-xs text-primary">Baths</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{formatArea(property.area || 0)}</div>
                    <div className="text-xs text-primary">Area</div>
                  </div>
                </div>

                {/* Developer info */}
                {developer && (
                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Developer</h4>
                    <Link href={`/developers/${developer.id}`} className="flex items-center gap-3 hover:opacity-75 transition-opacity">
                      <img 
                        src={developer.logo} 
                        alt={developer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{developer.name}</span>
                    </Link>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Request Information
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Request Information</DialogTitle>
                        <DialogDescription>
                          Get more details about {property.title}
                        </DialogDescription>
                      </DialogHeader>
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
                                  <Input placeholder="your.email@example.com" {...field} />
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
                                  <Input placeholder="+971 50 123 4567" {...field} />
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
                                    placeholder="I'm interested in this property..."
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit" className="w-full">Send Inquiry</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full" size="lg" onClick={handleCallAgent}>
                    Call Agent
                  </Button>
                  
                  <Button variant="ghost" className="w-full" size="lg" onClick={handleShareProperty}>
                    Share Property
                  </Button>
                </div>

                <GoldenVisaIndicator price={property.price} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Carousel Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Similar Properties</h2>
          <p className="text-muted-foreground">Properties with similar bedroom count and price range</p>
        </div>
        
        <div className="relative group">
          {/* Left Arrow */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              const container = document.getElementById('similar-properties-carousel');
              if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
          >
            ←
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              const container = document.getElementById('similar-properties-carousel');
              if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
          >
            →
          </button>

          {/* Scrollable Container */}
          <div
            id="similar-properties-carousel"
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {propertiesData
              .filter(p => {
                if (p.id === property.id) return false;
                const bedroomMatch = Math.abs((p.beds || 0) - (property.beds || 0)) <= 1;
                const priceRange = property.price * 0.3;
                const priceMatch = Math.abs(p.price - property.price) <= priceRange;
                return bedroomMatch && priceMatch;
              })
              .slice(0, 12)
              .map((similarProperty) => (
                <Link key={similarProperty.id} href={`/properties/${similarProperty.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-[280px] h-[380px] flex-shrink-0 flex flex-col"
                  >
                    <div className="h-[200px] overflow-hidden">
                      <img
                        src={Array.isArray(similarProperty.images) ? similarProperty.images[0] : similarProperty.images || '/placeholder-property.jpg'}
                        alt={similarProperty.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm line-clamp-1">{similarProperty.title}</h3>
                        <p className="text-xl font-bold text-[#D4AF37] mb-1">{formatPrice(similarProperty.price)}</p>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{similarProperty.address}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-primary">
                        <div className="text-center">
                          <span className="font-medium">{similarProperty.beds || 0}</span>
                          <div>beds</div>
                        </div>
                        <div className="text-center">
                          <span className="font-medium">{similarProperty.baths || 0}</span>
                          <div>baths</div>
                        </div>
                        <div className="text-center">
                          <span className="font-medium">{similarProperty.area ? Math.round(similarProperty.area).toLocaleString() : '0'}</span>
                          <div>sqft</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={propertyImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryInitialIndex}
      />
    </div>
  );
};

export default PropertyDetail;