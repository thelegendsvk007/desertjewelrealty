import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROICalculator from '@/components/calculators/ROICalculator';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import OffPlanVsReadyComparison from '@/components/calculators/OffPlanVsReadyComparison';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('roi');
  const [location] = useLocation();
  
  // Parse query parameters to set the active tab
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab && ['roi', 'mortgage', 'comparison'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-montserrat font-bold mb-4">Investment Tools</h1>
        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Make informed decisions with our comprehensive suite of real estate investment tools designed specifically for the UAE market.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
          <TabsTrigger value="mortgage">Mortgage Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Off-Plan vs Ready</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roi" className="mt-6">
          <ROICalculator />
        </TabsContent>
        
        <TabsContent value="mortgage" className="mt-6">
          <MortgageCalculator />
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6">
          <OffPlanVsReadyComparison />
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-montserrat font-semibold mb-4">Need Expert Advice?</h2>
        <p className="mb-6">
          Our team of experienced real estate professionals is ready to guide you through your investment journey in the UAE.
          Whether you're looking for off-plan properties, ready homes, or exploring Golden Visa opportunities, we're here to help.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/contact"
            className="bg-primary hover:bg-teal-dark text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
          >
            Contact an Advisor
          </a>
          <a
            href="/properties"
            className="bg-white border border-gray-200 hover:bg-gray-100 text-foreground font-medium px-6 py-3 rounded-md transition-colors duration-200"
          >
            Browse Properties
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tools;