import React, { useState } from 'react';
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
import { Slider } from "@/components/ui/slider";
import { Calculator, Building, MapPin, Info } from 'lucide-react';

interface Area {
  id: string;
  name: string;
  avgRate: number;
  rateRange: [number, number]; // min and max rates
  buildings: Building[];
}

interface Building {
  id: string;
  name: string;
  rate: number;
  amenities: string[];
}

const ServiceChargeEstimator = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedBuilding, setSelectedBuilding] = useState<string>("");
  const [propertySize, setPropertySize] = useState<string>("");
  const [estimatedCharge, setEstimatedCharge] = useState<number | null>(null);
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  
  // Areas and buildings data with service charge rates
  // Note: These are representative values; actual rates vary by building
  const areas: Area[] = [
    {
      id: "dubai-marina",
      name: "Dubai Marina",
      avgRate: 18.5,
      rateRange: [12, 25],
      buildings: [
        { id: "marina-towers", name: "Marina Towers", rate: 17.5, amenities: ["Pool", "Gym", "Sauna", "24/7 Security"] },
        { id: "marina-promenade", name: "Marina Promenade", rate: 19.8, amenities: ["Pool", "Gym", "Tennis Court", "24/7 Security"] },
        { id: "marina-heights", name: "Marina Heights", rate: 15.2, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "silverene", name: "Silverene", rate: 20.1, amenities: ["Pool", "Gym", "Kids' Play Area", "24/7 Security"] },
      ]
    },
    {
      id: "downtown-dubai",
      name: "Downtown Dubai",
      avgRate: 22.7,
      rateRange: [16, 30],
      buildings: [
        { id: "burj-views", name: "Burj Views", rate: 22.5, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "boulevard-central", name: "Boulevard Central", rate: 24.8, amenities: ["Pool", "Gym", "Jacuzzi", "24/7 Security"] },
        { id: "south-ridge", name: "South Ridge", rate: 19.6, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "standpoint", name: "Standpoint", rate: 23.9, amenities: ["Pool", "Gym", "Sauna", "24/7 Security"] },
      ]
    },
    {
      id: "palm-jumeirah",
      name: "Palm Jumeirah",
      avgRate: 25.3,
      rateRange: [18, 35],
      buildings: [
        { id: "shoreline", name: "Shoreline Apartments", rate: 21.5, amenities: ["Beach Access", "Pool", "Gym", "24/7 Security"] },
        { id: "tiara", name: "Tiara Residences", rate: 28.7, amenities: ["Beach Access", "Pool", "Gym", "Sauna", "24/7 Security"] },
        { id: "oceana", name: "Oceana Residences", rate: 27.2, amenities: ["Beach Access", "Pool", "Gym", "Kids' Play Area", "24/7 Security"] },
        { id: "azure", name: "Azure Residences", rate: 23.8, amenities: ["Beach Access", "Pool", "Gym", "24/7 Security"] },
      ]
    },
    {
      id: "jlt",
      name: "Jumeirah Lake Towers",
      avgRate: 15.8,
      rateRange: [10, 22],
      buildings: [
        { id: "lake-city", name: "Lake City Tower", rate: 14.2, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "cluster-d", name: "Indigo Tower", rate: 16.5, amenities: ["Pool", "Gym", "Sauna", "24/7 Security"] },
        { id: "goldcrest", name: "Goldcrest Views", rate: 18.3, amenities: ["Pool", "Gym", "Kids' Play Area", "24/7 Security"] },
        { id: "lake-view", name: "Lake View Tower", rate: 14.8, amenities: ["Pool", "Gym", "24/7 Security"] },
      ]
    },
    {
      id: "jvc",
      name: "Jumeirah Village Circle",
      avgRate: 12.4,
      rateRange: [8, 18],
      buildings: [
        { id: "diamond-views", name: "Diamond Views", rate: 13.5, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "belgravia", name: "Belgravia", rate: 14.2, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "pantheon", name: "Pantheon Boulevard", rate: 11.8, amenities: ["Pool", "Gym", "24/7 Security"] },
        { id: "sobha", name: "Sobha Daffodil", rate: 16.5, amenities: ["Pool", "Gym", "Kids' Play Area", "24/7 Security"] },
      ]
    }
  ];
  
  // Get buildings for selected area
  const getBuildings = (): Building[] => {
    const area = areas.find(a => a.id === selectedArea);
    return area ? area.buildings : [];
  };
  
  // Get average rate for selected area
  const getAreaRate = (): number => {
    const area = areas.find(a => a.id === selectedArea);
    return area ? area.avgRate : 0;
  };
  
  // Get building rate for selected building
  const getBuildingRate = (): number => {
    const area = areas.find(a => a.id === selectedArea);
    if (!area) return 0;
    
    const building = area.buildings.find(b => b.id === selectedBuilding);
    return building ? building.rate : 0;
  };
  
  // Get building amenities
  const getBuildingAmenities = (): string[] => {
    const area = areas.find(a => a.id === selectedArea);
    if (!area) return [];
    
    const building = area.buildings.find(b => b.id === selectedBuilding);
    return building ? building.amenities : [];
  };
  
  // Calculate estimated service charge
  const calculateServiceCharge = () => {
    if (!propertySize) return;
    
    const size = parseFloat(propertySize.replace(/,/g, ''));
    if (isNaN(size)) {
      setEstimatedCharge(null);
      return;
    }
    
    let rate = 0;
    
    if (selectedBuilding) {
      rate = getBuildingRate();
    } else if (selectedArea) {
      rate = getAreaRate();
    } else {
      // Dubai average if nothing selected
      rate = 16.5; 
    }
    
    setCurrentRate(rate);
    setEstimatedCharge(size * rate);
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    });
  };
  
  // Handle area change
  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
    setSelectedBuilding("");
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Service Charge Estimator
        </CardTitle>
        <CardDescription>Estimate annual service charges for properties in Dubai</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="area">Area</Label>
              <Select value={selectedArea} onValueChange={handleAreaChange}>
                <SelectTrigger id="area" className="mt-1">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name} (Avg. {area.avgRate} AED/sq.ft)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="building">Building (Optional)</Label>
              <Select 
                value={selectedBuilding} 
                onValueChange={setSelectedBuilding}
                disabled={!selectedArea}
              >
                <SelectTrigger id="building" className="mt-1">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  {getBuildings().map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name} ({building.rate} AED/sq.ft)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="property-size">Property Size (Square Feet)</Label>
            <Input
              id="property-size"
              placeholder="e.g. 1,000"
              value={propertySize}
              onChange={(e) => setPropertySize(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <Button onClick={calculateServiceCharge} disabled={!propertySize}>
            Calculate Service Charge
          </Button>
          
          {estimatedCharge !== null && (
            <div className="mt-6 p-6 border rounded-lg bg-muted/50">
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2">Estimated Annual Service Charge</h3>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(estimatedCharge)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {currentRate} AED per square foot
                </p>
              </div>
              
              {selectedBuilding && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Info className="h-4 w-4" /> Included Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getBuildingAmenities().map((amenity, index) => (
                      <div 
                        key={index} 
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Monthly Payment</p>
                  <p className="text-lg">{formatCurrency(estimatedCharge / 12)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Quarterly Payment</p>
                  <p className="text-lg">{formatCurrency(estimatedCharge / 4)}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-4">
            <p>
              Disclaimer: Service charge estimates are based on average rates and may vary. 
              Actual service charges are determined by the building management or Owners Association 
              and are subject to change. Always verify with the building management for accurate figures.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChargeEstimator;