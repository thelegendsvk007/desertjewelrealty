import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, MapPin, Bed, Bath, Maximize, Building2, Phone, MessageCircle, RotateCcw, User, CheckCircle, Eye, Send, Home } from 'lucide-react';
import { propertiesData } from '@/data/properties';
import { locationsData } from '@/data/locations';
import { developersData } from '@/data/developersData';
import { formatPrice, formatArea, parsePropertyImages, formatBedrooms } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Define schema for user registration
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  whatsapp: z.string().min(10, {
    message: "Please enter a valid WhatsApp number.",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

// Property with additional data for display
interface PropertyWithDetails {
  id: number;
  title: string;
  price: number;
  beds?: number | string;
  baths?: number;
  area?: number;
  propertyType: string;
  address: string;
  status: string;
  images: string[];
  locationId: number;
  developerId: number;
  features?: string[];
  locationName?: string;
  developerName?: string;
}

// Prepare properties with additional details for display
const preparePropertiesForDisplay = (): PropertyWithDetails[] => {
  return propertiesData.map(property => {
    const location = locationsData.find(loc => loc.id === property.locationId);
    const developer = developersData.find(dev => dev.id === property.developerId);
    
    return {
      ...property,
      locationName: location?.name || 'Unknown Location',
      developerName: developer?.name || 'Unknown Developer',
      images: parsePropertyImages(property.images)
    };
  });
};

interface AIPropertyMatchmakerProps {
  className?: string;
}

const AIPropertyMatchmaker: React.FC<AIPropertyMatchmakerProps> = ({ className }) => {
  const [userRegistered, setUserRegistered] = useState(false);
  const [userData, setUserData] = useState<UserFormValues | null>(null);
  const [properties, setProperties] = useState<PropertyWithDetails[]>([]);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState<PropertyWithDetails[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLikedProperties, setShowLikedProperties] = useState(false);
  const [showAllPropertiesComplete, setShowAllPropertiesComplete] = useState(false);
  
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
    },
  });

  useEffect(() => {
    const allProperties = preparePropertiesForDisplay();
    // Shuffle properties for random order
    const shuffledProperties = allProperties.sort(() => Math.random() - 0.5);
    setProperties(shuffledProperties);
  }, []);

  const currentProperty = properties[currentPropertyIndex];
  const hasMoreProperties = currentPropertyIndex < properties.length - 1;

  const onUserRegistration = (data: UserFormValues) => {
    setUserData(data);
    setUserRegistered(true);
    setShowRegistration(false);
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (isAnimating || !currentProperty) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    // If user likes the property, add to liked list (don't send individual WhatsApp messages)
    if (direction === 'right') {
      const newLikedProperties = [...likedProperties, currentProperty];
      setLikedProperties(newLikedProperties);
    }
    
    // Wait for animation
    setTimeout(() => {
      const nextIndex = currentPropertyIndex + 1;
      setCurrentPropertyIndex(nextIndex);
      setSwipeDirection(null);
      setIsAnimating(false);
      
      // Check if all properties are complete
      if (nextIndex >= properties.length) {
        setShowAllPropertiesComplete(true);
      }
    }, 300);
  };

  const sendAllLikedPropertiesToWhatsApp = (properties: PropertyWithDetails[], user: UserFormValues) => {
    if (properties.length === 0) return;
    
    let message = `🏠 PROPERTY INQUIRY FROM ${user.name}

👤 Client: ${user.name}
📱 WhatsApp: ${user.whatsapp}

INTERESTED PROPERTIES (${properties.length} total):

`;

    properties.forEach((property, index) => {
      const bedsDisplay = formatBedrooms(property.beds);
      const bedLabel = bedsDisplay === 'Studio' ? 'Studio' : `${bedsDisplay} bed${bedsDisplay !== 1 ? 's' : ''}`;
      message += `${index + 1}. ${property.title}
💰 ${formatPrice(property.price)}
🛏️ ${bedLabel} • 🛁 ${property.baths} bath${property.baths !== 1 ? 's' : ''}
🏢 Developer: ${property.developerName}
📍 ${property.address}

`;
    });

    message += `Please contact ${user.name} at ${user.whatsapp} to discuss these properties.`;

    // Send to your WhatsApp (replace with your number)
    const whatsappUrl = `https://wa.me/971589532210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetSession = () => {
    setCurrentPropertyIndex(0);
    setLikedProperties([]);
    setUserRegistered(false);
    setUserData(null);
    setShowLikedProperties(false);
    setShowAllPropertiesComplete(false);
    userForm.reset();
    // Reshuffle properties
    const allProperties = preparePropertiesForDisplay();
    const shuffledProperties = allProperties.sort(() => Math.random() - 0.5);
    setProperties(shuffledProperties);
  };

  const shuffleProperties = () => {
    // Only shuffle and reset position, keep user session and liked properties
    setCurrentPropertyIndex(0);
    setShowLikedProperties(false);
    setShowAllPropertiesComplete(false);
    // Reshuffle properties
    const allProperties = preparePropertiesForDisplay();
    const shuffledProperties = allProperties.sort(() => Math.random() - 0.5);
    setProperties(shuffledProperties);
  };

  const continueSwiping = () => {
    setShowLikedProperties(false);
    setShowAllPropertiesComplete(false);
  };

  // Registration dialog content
  const renderRegistrationDialog = () => (
    <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Property Matchmaker</DialogTitle>
          <DialogDescription>
            Please provide your details to start finding your perfect property match
          </DialogDescription>
        </DialogHeader>
        <Form {...userForm}>
          <form onSubmit={userForm.handleSubmit(onUserRegistration)} className="space-y-4">
            <FormField
              control={userForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userForm.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+971 50 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Start Matching
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  // Property card for swiping
  const renderPropertyCard = (property: PropertyWithDetails, index: number) => {
    const images = property.images || [];
    const primaryImage = images[0] || 'https://via.placeholder.com/600x400?text=No+Image';
    
    return (
      <motion.div
        key={property.id}
        className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer select-none"
        initial={{ scale: index === 0 ? 1 : 0.95, opacity: index === 0 ? 1 : 0.8 }}
        animate={{ 
          scale: index === 0 ? 1 : 0.95, 
          opacity: index === 0 ? 1 : 0.8,
          x: swipeDirection === 'left' && index === 0 ? -300 : 
             swipeDirection === 'right' && index === 0 ? 300 : 0,
          rotate: swipeDirection === 'left' && index === 0 ? -30 : 
                  swipeDirection === 'right' && index === 0 ? 30 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ zIndex: properties.length - index }}
      >
        {/* Property Image */}
        <div className="relative h-3/5">
          <img 
            src={primaryImage} 
            alt={property.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('AI Matchmaker image failed to load:', primaryImage);
              e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />
          
          {/* Image overlay with quick info */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge variant="secondary" className="bg-black/50 text-white border-none">
              {property.status}
            </Badge>
            <div className="text-right">
              <div className="text-white text-2xl font-bold drop-shadow-lg">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>
          
          {/* Swipe indicators */}
          <AnimatePresence>
            {swipeDirection === 'left' && index === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
              >
                <div className="bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold transform rotate-12">
                  PASS
                </div>
              </motion.div>
            )}
            {swipeDirection === 'right' && index === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
              >
                <div className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-bold transform -rotate-12">
                  INTERESTED
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Property Details */}
        <div className="p-6 h-2/5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 line-clamp-1">{property.title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
              <MapPin className="inline w-4 h-4 mr-1" />
              {property.address}
            </p>
            
            {/* Property specs */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{formatBedrooms(property.beds)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{property.baths || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{formatArea(property.area || 0)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{property.propertyType}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm">{property.locationName}</span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Developer: {property.developerName}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Show registration prompt if user hasn't registered
  if (!userRegistered) {
    return (
      <Card className={className}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🏠 Property Matchmaker</CardTitle>
          <CardDescription>
            Swipe through properties like Tinder - find your perfect match!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-6">
            <div className="text-6xl">🏠</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How it works:</h3>
              <div className="text-left space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm">Register with your name and WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Swipe right for interested properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Swipe left to pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Send inquiry for all interested properties</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowRegistration(true)} size="lg" className="w-full max-w-xs">
              Start Matching Properties
            </Button>
          </div>
        </CardContent>
        {renderRegistrationDialog()}
      </Card>
    );
  }

  // Show liked properties view
  if (showLikedProperties) {
    return (
      <Card className={className}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <Button onClick={() => setShowLikedProperties(false)} variant="ghost" size="sm">
              ← Back to Swiping
            </Button>
            <div>
              <CardTitle className="text-xl">Interested Properties</CardTitle>
              <CardDescription>{likedProperties.length} properties selected</CardDescription>
            </div>
            <div></div>
          </div>
        </CardHeader>
        <CardContent>
          {likedProperties.length === 0 ? (
            <div className="text-center py-8">
              <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No properties selected yet</p>
              <Button onClick={() => setShowLikedProperties(false)} className="mt-4">
                Continue Swiping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {likedProperties.map((property, index) => (
                  <div key={property.id} className="flex gap-4 p-4 border rounded-lg">
                    <img 
                      src={property.images[0] || '/api/placeholder/100/100'} 
                      alt={property.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{property.title}</h4>
                      <p className="text-lg font-bold text-primary">{formatPrice(property.price)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatBedrooms(property.beds)}{formatBedrooms(property.beds) === 'Studio' ? '' : ' bed'} • {property.baths} bath • {property.developerName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{property.address}</p>
                    </div>
                    <Button 
                      onClick={() => setLikedProperties(prev => prev.filter(p => p.id !== property.id))}
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t">
                <Button 
                  onClick={() => sendAllLikedPropertiesToWhatsApp(likedProperties, userData!)}
                  className="w-full"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry for All Properties
                </Button>
                <Button 
                  onClick={() => setShowLikedProperties(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Continue Swiping
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show completion message when no more properties
  if (showAllPropertiesComplete || (!hasMoreProperties && currentPropertyIndex > 0)) {
    return (
      <Card className={className}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🎉 All Done!</CardTitle>
          <CardDescription>
            You've swiped through all available properties
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">✨</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Thank you, {userData?.name}!</h3>
            <p className="text-muted-foreground mb-4">
              You selected {likedProperties.length} propert{likedProperties.length !== 1 ? 'ies' : 'y'} of interest
            </p>
            {likedProperties.length > 0 && (
              <p className="text-sm text-muted-foreground mb-4">
                Ready to send your inquiry for all selected properties?
              </p>
            )}
          </div>
          <div className="space-y-3">
            {likedProperties.length > 0 && (
              <Button 
                onClick={() => sendAllLikedPropertiesToWhatsApp(likedProperties, userData!)}
                className="w-full"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Inquiry Now
              </Button>
            )}
            <Button onClick={() => setShowLikedProperties(true)} variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Selected Properties ({likedProperties.length})
            </Button>
            <Button onClick={resetSession} variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Link href="/properties">
              <Button variant="ghost" className="w-full">
                View All Properties
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main swiping interface
  return (
    <Card className={className}>
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Hi {userData?.name}! 👋</CardTitle>
            <CardDescription>
              {currentPropertyIndex + 1} of {properties.length} • {likedProperties.length} liked
            </CardDescription>
          </div>
          <Button onClick={shuffleProperties} variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Property Cards Stack */}
        <div className="relative mx-auto max-w-sm h-[600px] mb-6">
          {properties.slice(currentPropertyIndex, currentPropertyIndex + 3).map((property, index) => 
            renderPropertyCard(property, index)
          )}
          
          {/* Empty state when no current property */}
          {!currentProperty && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-2">🏠</div>
                <p>Loading properties...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        {currentProperty && (
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <Button
                onClick={() => handleSwipe('left')}
                variant="outline"
                size="lg"
                className="h-16 w-16 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50"
                disabled={isAnimating}
              >
                <X className="w-8 h-8 text-gray-500 hover:text-red-500" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Pass</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => setShowLikedProperties(true)}
                variant="outline"
                size="lg"
                className="h-16 w-16 rounded-full border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 relative"
                disabled={isAnimating}
              >
                <Eye className="w-8 h-8 text-gray-500 hover:text-blue-500" />
                {likedProperties.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {likedProperties.length}
                  </span>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">View Selected</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => handleSwipe('right')}
                variant="outline"
                size="lg"
                className="h-16 w-16 rounded-full border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
                disabled={isAnimating}
              >
                <CheckCircle className="w-8 h-8 text-gray-500 hover:text-green-500" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Interested</p>
            </div>
          </div>
        )}
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentPropertyIndex) / properties.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {Math.round(((currentPropertyIndex) / properties.length) * 100)}% complete
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPropertyMatchmaker;
