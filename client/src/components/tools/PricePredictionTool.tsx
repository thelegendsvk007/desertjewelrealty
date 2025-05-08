import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, ArrowRight, Calendar, LineChart } from 'lucide-react';

// Define schema for the form
const formSchema = z.object({
  propertyType: z.string().min(1, { message: "Property type is required" }),
  bedrooms: z.string().min(1, { message: "Number of bedrooms is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  currentValue: z.string().min(1, { message: "Current value is required" }),
  yearBuilt: z.string().min(1, { message: "Year built is required" }),
  sqFt: z.string().min(1, { message: "Square footage is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PricePredictionToolProps {
  className?: string;
}

const PricePredictionTool: React.FC<PricePredictionToolProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<{ year: number, value: number }[] | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      bedrooms: "",
      location: "",
      currentValue: "",
      yearBuilt: "",
      sqFt: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Parse current value from string to number, removing any non-numeric characters
      const currentValue = parseFloat(data.currentValue.replace(/[^0-9.]/g, ''));
      
      // Simulate prediction calculation based on location and property type
      let growthRate = 0.05; // Default 5% annual growth
      
      // Adjust growth rate based on location (premium locations have higher growth)
      if (data.location === "palm-jumeirah" || data.location === "downtown-dubai") {
        growthRate = 0.08; // 8% for premium locations
      } else if (data.location === "dubai-marina" || data.location === "emirates-hills") {
        growthRate = 0.07; // 7% for luxury areas
      } else if (data.location === "dubailand" || data.location === "international-city") {
        growthRate = 0.04; // 4% for budget areas
      }
      
      // Adjust growth rate based on property type
      if (data.propertyType === "villa" || data.propertyType === "penthouse") {
        growthRate += 0.01; // Add 1% for luxury property types
      } else if (data.propertyType === "studio") {
        growthRate -= 0.01; // Subtract 1% for studios
      }
      
      // Generate predictions for years 1, 3, and 5
      const predictions = [
        { year: 1, value: currentValue * Math.pow(1 + growthRate, 1) },
        { year: 3, value: currentValue * Math.pow(1 + growthRate, 3) },
        { year: 5, value: currentValue * Math.pow(1 + growthRate, 5) },
      ];
      
      setPredictions(predictions);
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    form.reset();
    setPredictions(null);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" /> 
          Price Prediction Tool
        </CardTitle>
        <CardDescription>
          Predict the future value of a property in 1, 3, and 5 years
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!predictions ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <FormLabel>Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                          <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                          <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                          <SelectItem value="business-bay">Business Bay</SelectItem>
                          <SelectItem value="jumeirah-lake-towers">JLT</SelectItem>
                          <SelectItem value="emirates-hills">Emirates Hills</SelectItem>
                          <SelectItem value="arabian-ranches">Arabian Ranches</SelectItem>
                          <SelectItem value="dubai-hills">Dubai Hills</SelectItem>
                          <SelectItem value="motor-city">Motor City</SelectItem>
                          <SelectItem value="dubailand">Dubailand</SelectItem>
                          <SelectItem value="international-city">International City</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currentValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Value (AED)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 2,000,000" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Built</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 25 }, (_, i) => 2025 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sqFt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size (sq.ft)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 1,500" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <LineChart className="mr-2 h-4 w-4" />
                      Generate Prediction
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">Property Value Forecast</h3>
              <p className="text-sm text-muted-foreground">Based on market trends and property characteristics</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">1 Year Projection</h4>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated value in 2026</p>
                    <p className="text-2xl font-bold text-primary">{predictions[0].value.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      +{((predictions[0].value / predictions[0].value * 100) - 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">3 Year Projection</h4>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated value in 2028</p>
                    <p className="text-2xl font-bold text-primary">{predictions[1].value.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      +{((predictions[1].value / predictions[0].value * 100) - 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">5 Year Projection</h4>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated value in 2030</p>
                    <p className="text-2xl font-bold text-primary">{predictions[2].value.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      +{((predictions[2].value / predictions[0].value * 100) - 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={resetForm}
              >
                Calculate Another Property
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground pt-2">
              <p className="text-center">
                Note: This prediction is based on historical market trends and current property factors.
                Actual future values may vary based on economic conditions, regulatory changes, and other unforeseen factors.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricePredictionTool;