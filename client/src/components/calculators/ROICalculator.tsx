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
import DirhamLogo from '@/components/ui/DirhamLogo';

const ROICalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(1000000);
  const [annualRent, setAnnualRent] = useState<number>(50000);
  const [serviceChargesPerSqft, setServiceChargesPerSqft] = useState<number>(10);
  const [propertySize, setPropertySize] = useState<number>(1000);
  const [vacancyMonths, setVacancyMonths] = useState<number>(1);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(3);
  const [results, setResults] = useState<{
    monthlyRent: number;
    annualRent: number;
    netIncome: number;
    cashOnCashROI: number;
    totalROI: number;
  } | null>(null);

  const calculateROI = () => {
    // Calculate monthly rent from annual rent
    const monthlyRent = annualRent / 12;
    
    // Calculate annual service charges (service charge per sq ft * property size)
    const annualServiceCharges = serviceChargesPerSqft * propertySize;
    
    // Calculate vacancy loss based on months vacant
    const vacancyLoss = (annualRent * vacancyMonths) / 12;
    
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
            <Label htmlFor="propertyPrice">Property Price (<DirhamLogo className="inline" size="sm" />)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Property price info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The total purchase price of the property in <DirhamLogo className="inline" size="xs" />. This includes the property value plus any additional costs like registration fees, broker commission, and other transaction costs.</p>
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
            <DirhamLogo className="inline" size="sm" /> {propertyPrice.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="propertySize">Property Size (Sq Ft)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Property size info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The total area of the property in square feet. This is used to calculate the total annual service charges. You can find this information in the property details or title deed.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="propertySize"
            type="number"
            value={propertySize}
            onChange={(e) => setPropertySize(parseFloat(e.target.value) || 0)}
            className="col-span-3"
          />
          <div className="text-xs text-muted-foreground text-right">
            {propertySize.toLocaleString()} sq ft
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="annualRent">Annual Rent (<DirhamLogo className="inline" size="sm" />)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Annual rent info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The total annual rental income you expect to receive from the property. This should be based on current market rates for similar properties in the area. You can research comparable rental rates on property websites or consult with local real estate agents.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="annualRent"
            type="number"
            value={annualRent}
            onChange={(e) => setAnnualRent(parseFloat(e.target.value) || 0)}
            className="col-span-3"
          />
          <div className="text-xs text-muted-foreground text-right">
            <DirhamLogo className="inline" size="sm" /> {annualRent.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="serviceChargesPerSqft">Service Charges per Sq Ft (<DirhamLogo className="inline" size="sm" />)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Service charges info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Annual service charges per square foot paid to the building management. This includes building maintenance, security, cleaning, and common area upkeep. In Dubai, service charges typically range from 8-15 <DirhamLogo className="inline" size="xs" /> per sq ft annually, though some premium buildings may charge up to 25 <DirhamLogo className="inline" size="xs" /> per sq ft.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="serviceChargesPerSqft"
              defaultValue={[10]}
              min={0}
              max={200}
              step={1}
              value={[serviceChargesPerSqft]}
              onValueChange={(value) => setServiceChargesPerSqft(value[0])}
              className="flex-1"
            />
            <span className="w-20 text-center text-sm"><DirhamLogo className="inline" size="xs" /> {serviceChargesPerSqft}/sq ft</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="vacancyMonths">Vacancy Period (Months)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Vacancy months info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The estimated number of months the property will be vacant each year due to tenant turnover, repairs, or market conditions. In Dubai's stable rental market, properties typically experience 0-3 months of vacancy per year, depending on location and property type.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="vacancyMonths"
              defaultValue={[1]}
              min={0}
              max={12}
              step={1}
              value={[vacancyMonths]}
              onValueChange={(value) => setVacancyMonths(value[0])}
              className="flex-1"
            />
            <span className="w-16 text-center text-sm">{vacancyMonths} month{vacancyMonths !== 1 ? 's' : ''}</span>
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
                  <p className="max-w-xs">The estimated annual increase in property value due to market appreciation, infrastructure development, and economic growth. Dubai's property market has historically shown 3-7% annual appreciation, though this varies by location and market cycles. In exceptional cases, some areas may see higher appreciation rates.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="propertyAppreciation"
              defaultValue={[3]}
              min={0}
              max={100}
              step={1}
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
                <p className="font-medium"><DirhamLogo className="inline" size="sm" /> {Math.round(results.monthlyRent).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Rent</p>
                <p className="font-medium"><DirhamLogo className="inline" size="sm" /> {Math.round(results.annualRent).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Annual Income</p>
                <p className="font-medium"><DirhamLogo className="inline" size="sm" /> {Math.round(results.netIncome).toLocaleString()}</p>
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