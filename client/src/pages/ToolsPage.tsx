import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, BrainCircuit, Home } from 'lucide-react';

// Import components
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ProgressBar from '@/components/ProgressBar';
import AIPropertyMatchmaker from '@/components/tools/AIPropertyMatchmaker';
import PricePredictionTool from '@/components/tools/PricePredictionTool';

const ToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>Investment Tools | Desert Jewel Realty</title>
        <meta name="description" content="Advanced real estate investment tools to help you make informed decisions" />
      </Helmet>
      
      {/* Navigation and ProgressBar components are already included in App.tsx */}
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary/5 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Real Estate Investment Tools</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Powerful tools to help you make smart property investment decisions in the UAE
              </p>
            </div>
          </div>
        </section>
        
        {/* Tools Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="ai-matchmaker" className="w-full">
              <div className="mb-8 flex justify-center">
                <TabsList className="grid w-full max-w-3xl grid-cols-2">
                  <TabsTrigger value="ai-matchmaker" className="flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>AI Property Matchmaker</span>
                  </TabsTrigger>
                  <TabsTrigger value="price-predictor" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Price Prediction Tool</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="ai-matchmaker">
                <div className="max-w-4xl mx-auto">
                  <AIPropertyMatchmaker />
                </div>
              </TabsContent>
              
              <TabsContent value="price-predictor">
                <div className="max-w-4xl mx-auto">
                  <PricePredictionTool />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Additional Tools Cards */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">More Investment Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Mortgage Calculator
                    </CardTitle>
                    <CardDescription>Calculate monthly payments and affordability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our advanced mortgage calculator helps you estimate monthly payments, 
                      interest costs, and affordability based on current UAE bank rates.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      ROI Calculator
                    </CardTitle>
                    <CardDescription>Evaluate your property's investment potential</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Calculate potential rental yields, capital appreciation, and overall 
                      return on investment for any property in our listings.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Off-Plan vs Ready Comparison
                    </CardTitle>
                    <CardDescription>Compare investment strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Analyze the pros and cons of off-plan vs ready properties, including 
                      potential appreciation, payment plans, and investment timelines.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tools Benefits */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Use Our Investment Tools?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Data-Driven Insights</h3>
                      <p className="text-muted-foreground">
                        Our tools leverage real market data and advanced algorithms to provide accurate 
                        predictions and personalized recommendations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Personalized Recommendations</h3>
                      <p className="text-muted-foreground">
                        Our AI Property Matchmaker analyzes your preferences and investment goals to 
                        find properties that perfectly match your criteria.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Future Value Projections</h3>
                      <p className="text-muted-foreground">
                        Our Price Prediction Tool uses historical trends and location-specific factors 
                        to forecast potential property value appreciation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Risk Assessment</h3>
                      <p className="text-muted-foreground">
                        Our tools help identify potential risks and opportunities in different 
                        property investments, allowing for more informed decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer and BackToTop components are already included in App.tsx */}
    </>
  );
};

export default ToolsPage;