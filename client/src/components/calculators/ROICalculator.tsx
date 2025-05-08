import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

const ROICalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(1000000);
  const [rentalYield, setRentalYield] = useState<number>(5);
  const [serviceCharges, setServiceCharges] = useState<number>(10);
  const [vacancyRate, setVacancyRate] = useState<number>(5);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(3);
  const [results, setResults] = useState<{
    monthlyRent: number;
    annualRent: number;
    netIncome: number;
    cashOnCashROI: number;
    totalROI: number;
  } | null>(null);

  const calculateROI = () => {
    // Calculate monthly rent based on rental yield
    const annualRent = (propertyPrice * rentalYield) / 100;
    const monthlyRent = annualRent / 12;
    
    // Calculate annual service charges
    const annualServiceCharges = (propertyPrice * serviceCharges) / 100;
    
    // Calculate vacancy loss
    const vacancyLoss = (annualRent * vacancyRate) / 100;
    
    // Calculate net annual income
    const netIncome = annualRent - annualServiceCharges - vacancyLoss;
    
    // Cash on cash ROI (assuming no mortgage for simplicity)
    const cashOnCashROI = (netIncome / propertyPrice) * 100;
    
    // Total ROI including property appreciation
    const totalROI = cashOnCashROI + propertyAppreciation;
    
    setResults({
      monthlyRent,
      annualRent,
      netIncome,
      cashOnCashROI,
      totalROI
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">ROI Calculator</CardTitle>
        <CardDescription>
          Calculate your potential return on investment for UAE properties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="propertyPrice">Property Price (AED)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Property price info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The purchase price of the property in AED.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="propertyPrice"
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(parseFloat(e.target.value) || 0)}
            className="col-span-3"
          />
          <div className="text-xs text-muted-foreground text-right">
            AED {propertyPrice.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="rentalYield">Annual Rental Yield (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Rental yield info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The percentage of the property value you can expect to receive in rent annually.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="rentalYield"
              defaultValue={[5]}
              min={1}
              max={15}
              step={0.1}
              value={[rentalYield]}
              onValueChange={(value) => setRentalYield(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{rentalYield}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="serviceCharges">Service Charges (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Service charges info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Annual maintenance and service charges as a percentage of property value.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="serviceCharges"
              defaultValue={[10]}
              min={0}
              max={20}
              step={0.5}
              value={[serviceCharges]}
              onValueChange={(value) => setServiceCharges(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{serviceCharges}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Vacancy rate info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Estimated percentage of time the property will be vacant each year.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="vacancyRate"
              defaultValue={[5]}
              min={0}
              max={30}
              step={1}
              value={[vacancyRate]}
              onValueChange={(value) => setVacancyRate(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{vacancyRate}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="propertyAppreciation">Property Appreciation (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Property appreciation info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Estimated annual increase in property value.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="propertyAppreciation"
              defaultValue={[3]}
              min={0}
              max={10}
              step={0.5}
              value={[propertyAppreciation]}
              onValueChange={(value) => setPropertyAppreciation(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{propertyAppreciation}%</span>
          </div>
        </div>

        <Button onClick={calculateROI} className="w-full">Calculate ROI</Button>

        {results && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">AED {Math.round(results.monthlyRent).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Rent</p>
                <p className="font-medium">AED {Math.round(results.annualRent).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Annual Income</p>
                <p className="font-medium">AED {Math.round(results.netIncome).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cash on Cash ROI</p>
                <p className="font-medium">{results.cashOnCashROI.toFixed(2)}%</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Total ROI (including appreciation)</p>
                <p className="font-semibold text-lg text-primary">{results.totalROI.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This calculator provides estimates only. Actual returns may vary based on market conditions, 
          property management, and other factors. Consult with a financial advisor before making investment decisions.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ROICalculator;