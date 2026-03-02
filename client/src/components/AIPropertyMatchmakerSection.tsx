import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, X, MessageSquare, MapPin, Bed, Bath, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { propertiesData } from '@/data/properties';
import { developersData } from '@/data/developersData';
import { locationsData } from '@/data/locations';
import { formatBedrooms } from '@/lib/utils';

const AIPropertyMatchmakerSection = () => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  
  // Get first 5 properties for demo
  const demoProperties = propertiesData.slice(0, 5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPropertyIndex((prev) => (prev + 1) % demoProperties.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [demoProperties.length]);
  
  const currentProperty = demoProperties[currentPropertyIndex];
  const developer = developersData.find(d => d.id === currentProperty.developerId);
  const location = locationsData.find(l => l.id === currentProperty.locationId);
  
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-3xl font-bold mb-4">
            AI Property Matchmaker
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect property match with our innovative Tinder-style property finder. 
            Swipe through Dubai's finest properties and find your dream home in minutes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Swipe Right to Like</h3>
                  <p className="text-gray-600">Express interest in properties that catch your eye</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Swipe Left to Pass</h3>
                  <p className="text-gray-600">Skip properties that don't match your preferences</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant WhatsApp Inquiry</h3>
                  <p className="text-gray-600">Send all your selected properties directly to our agents</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/investment-tools">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Start Finding Your Dream Property
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual Demo with Real Property Data */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                key={currentPropertyIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-80 shadow-xl border-2 border-teal-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{currentProperty.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {location?.name || 'Dubai'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-teal-400 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      {currentProperty.images && currentProperty.images.length > 0 ? (
                        <img 
                          src={currentProperty.images[0]} 
                          alt={currentProperty.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white font-semibold flex items-center gap-2">
                          <Home className="w-6 h-6" />
                          Property Image
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">
                          AED {currentProperty.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Bed className="w-3 h-3" />
                            {formatBedrooms(currentProperty.beds)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-3 h-3" />
                            {currentProperty.baths}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-2">
                        {developer?.name || 'Premium Developer'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Swipe indicators */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <X className="w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <CheckCircle className="w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIPropertyMatchmakerSection;