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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// UAE Banks with typical mortgage rates
const uaeBanks = [
  { id: 'emiratesnbd', name: 'Emirates NBD', rate: 4.49, maxLTV: 80, maxTenure: 25 },
  { id: 'adcb', name: 'ADCB', rate: 4.25, maxLTV: 80, maxTenure: 25 },
  { id: 'mashreq', name: 'Mashreq Bank', rate: 4.75, maxLTV: 80, maxTenure: 25 },
  { id: 'fab', name: 'First Abu Dhabi Bank (FAB)', rate: 4.35, maxLTV: 80, maxTenure: 25 },
  { id: 'dib', name: 'Dubai Islamic Bank', rate: 4.60, maxLTV: 80, maxTenure: 25 },
  { id: 'aubk', name: 'Abudhabi Islamic Bank', rate: 4.40, maxLTV: 75, maxTenure: 25 },
  { id: 'comm', name: 'Commercial Bank of Dubai', rate: 4.85, maxLTV: 75, maxTenure: 20 },
  { id: 'enbd_islamic', name: 'Emirates NBD Islamic', rate: 4.55, maxLTV: 80, maxTenure: 25 },
];

interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  downPayment: number;
  bank: typeof uaeBanks[0];
}

const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [tenure, setTenure] = useState<number>(25);
  const [selectedBankId, setSelectedBankId] = useState<string>(uaeBanks[0].id);
  const [interestRate, setInterestRate] = useState<number>(uaeBanks[0].rate);
  const [results, setResults] = useState<MortgageResult | null>(null);

  // Update interest rate when bank changes
  const handleBankChange = (bankId: string) => {
    setSelectedBankId(bankId);
    const selectedBank = uaeBanks.find(bank => bank.id === bankId);
    if (selectedBank) {
      setInterestRate(selectedBank.rate);
      
      // Adjust tenure if needed based on bank max
      if (tenure > selectedBank.maxTenure) {
        setTenure(selectedBank.maxTenure);
      }
      
      // Adjust down payment if needed based on bank LTV
      const minDownPayment = 100 - selectedBank.maxLTV;
      if (downPaymentPercent < minDownPayment) {
        setDownPaymentPercent(minDownPayment);
      }
    }
  };

  const calculateMortgage = () => {
    const selectedBank = uaeBanks.find(bank => bank.id === selectedBankId)!;
    
    // Calculate loan amount
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Total number of payments
    const payments = tenure * 12;
    
    // Monthly payment formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments) / (Math.pow(1 + monthlyRate, payments) - 1);
    
    // Total payment over the loan period
    const totalPayment = monthlyPayment * payments;
    
    // Total interest paid
    const totalInterest = totalPayment - loanAmount;
    
    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount,
      downPayment,
      bank: selectedBank
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">UAE Mortgage Calculator</CardTitle>
        <CardDescription>
          Calculate your mortgage payments with rates from major UAE banks
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
            <Label htmlFor="bank">Select Bank</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Bank info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Different banks offer different interest rates and loan terms.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={selectedBankId} onValueChange={handleBankChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent>
              {uaeBanks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name} ({bank.rate}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="downPayment">Down Payment (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Down payment info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">UAE mortgage regulations require a minimum down payment of 20-25% depending on the property value.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="downPayment"
              min={20}
              max={80}
              step={1}
              value={[downPaymentPercent]}
              onValueChange={(value) => setDownPaymentPercent(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{downPaymentPercent}%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Down Payment: AED {Math.round((propertyPrice * downPaymentPercent) / 100).toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Interest rate info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The annual interest rate for your mortgage loan.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="interestRate"
              min={2}
              max={8}
              step={0.05}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{interestRate.toFixed(2)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tenure">Loan Tenure (Years)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Loan tenure info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The duration of your mortgage loan in years.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-4">
            <Slider
              id="tenure"
              min={5}
              max={25}
              step={1}
              value={[tenure]}
              onValueChange={(value) => setTenure(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-center">{tenure} yrs</span>
          </div>
        </div>

        <Button onClick={calculateMortgage} className="w-full">Calculate Mortgage</Button>

        {results && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Mortgage Details - {results.bank.name}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="font-medium">AED {Math.round(results.loanAmount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Down Payment</p>
                <p className="font-medium">AED {Math.round(results.downPayment).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="font-medium">AED {Math.round(results.monthlyPayment).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="font-medium">AED {Math.round(results.totalInterest).toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Total Amount Payable</p>
                <p className="font-semibold text-lg text-primary">AED {Math.round(results.totalPayment).toLocaleString()}</p>
              </div>
            </div>
            
            <h4 className="font-medium mb-2">Bank Terms</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rate Type</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Max LTV</TableHead>
                  <TableHead>Max Tenure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Fixed</TableCell>
                  <TableCell>{results.bank.rate}%</TableCell>
                  <TableCell>{results.bank.maxLTV}%</TableCell>
                  <TableCell>{results.bank.maxTenure} years</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Interest rates are representative and updated as of May 2025. Actual rates may vary based on your 
          credit profile, loan amount, and property specifics. Please contact the bank directly for the most accurate and current rates.
        </p>
      </CardFooter>
    </Card>
  );
};

export default MortgageCalculator;