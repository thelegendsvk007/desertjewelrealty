import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityDeepDives from '@/components/CommunityDeepDives';
import MetroTransportLayer from '@/components/MetroTransportLayer';

const LocationInsights = () => {
  const [selectedTab, setSelectedTab] = useState('communities');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-montserrat font-semibold mb-2">Location Insights</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover detailed insights about neighborhoods and transport connectivity across Dubai and the UAE.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-10">
          <Tabs 
            value={selectedTab} 
            onValueChange={setSelectedTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="communities">
                <i className="fas fa-city mr-2"></i> Community Insights
              </TabsTrigger>
              <TabsTrigger value="transport">
                <i className="fas fa-train mr-2"></i> Transport Access
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="mb-16">
          {selectedTab === 'communities' ? (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-montserrat font-semibold mb-2">Community Deep Dives</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore detailed community profiles including lifestyle features, demographics, 
                  walkability scores, and planned infrastructure developments.
                </p>
              </div>
              <CommunityDeepDives />
            </div>
          ) : (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-montserrat font-semibold mb-2">Metro & Transport Accessibility</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover properties with excellent connectivity to Dubai's public transport network including 
                  Metro, Tram, Ferry, and Bus stations.
                </p>
              </div>
              <MetroTransportLayer />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LocationInsights;