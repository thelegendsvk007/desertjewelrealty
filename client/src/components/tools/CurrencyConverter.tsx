import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowRight } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;  // Exchange rate against AED
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>("AED");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Currency data with fixed rates relative to AED
  // Note: In a production app, these would be fetched from an API
  const currencies: Currency[] = [
    { code: "AED", name: "UAE Dirham", symbol: "AED", rate: 1 },
    { code: "USD", name: "US Dollar", symbol: "$", rate: 0.272 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 0.252 },
    { code: "GBP", name: "British Pound", symbol: "£", rate: 0.216 },
    { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 22.76 },
    { code: "PKR", name: "Pakistani Rupee", symbol: "₨", rate: 75.86 },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 1.97 },
    { code: "RUB", name: "Russian Ruble", symbol: "₽", rate: 25.21 },
  ];

  // Get currency by code
  const getCurrency = (code: string): Currency => {
    return currencies.find(c => c.code === code) || currencies[0];
  };
  
  // Convert currency
  const convertCurrency = () => {
    if (!amount) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const numAmount = parseFloat(amount.replace(/,/g, ''));
      if (isNaN(numAmount)) {
        setConvertedAmount(null);
        setIsLoading(false);
        return;
      }
      
      const fromRate = getCurrency(fromCurrency).rate;
      const toRate = getCurrency(toCurrency).rate;
      
      // Convert to AED first (if not already AED), then to target currency
      const valueInAED = fromCurrency === "AED" ? numAmount : numAmount / fromRate;
      const result = toCurrency === "AED" ? valueInAED : valueInAED * toRate;
      
      setConvertedAmount(result);
      setIsLoading(false);
    }, 500);
  };
  
  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  // Auto-convert when currency selection changes
  useEffect(() => {
    if (amount) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency]);
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between AED and other major currencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2">
                <Label htmlFor="fromCurrency">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger id="fromCurrency" className="mt-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={swapCurrencies}
                  className="mb-1"
                >
                  <ArrowRight className="rotate-90 md:rotate-0" />
                </Button>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="toCurrency">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger id="toCurrency" className="mt-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Button 
              onClick={convertCurrency} 
              disabled={!amount || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                'Convert'
              )}
            </Button>
          </div>
          
          {convertedAmount !== null && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="text-lg font-medium">
                    {formatNumber(parseFloat(amount.replace(/,/g, '')))} {getCurrency(fromCurrency).symbol}
                  </p>
                </div>
                
                <ArrowRight className="h-5 w-5 mx-2 text-muted-foreground" />
                
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="text-lg font-medium">
                    {formatNumber(convertedAmount)} {getCurrency(toCurrency).symbol}
                  </p>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Exchange Rate: 1 {getCurrency(fromCurrency).code} = {formatNumber(getCurrency(toCurrency).rate / getCurrency(fromCurrency).rate)} {getCurrency(toCurrency).code}</p>
                <p className="mt-1">Last updated: May 8, 2025</p>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-4">
            <p>
              Disclaimer: The exchange rates displayed are for informational purposes only and may not reflect actual market rates. 
              Rates are updated periodically and should not be relied upon for financial transactions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;