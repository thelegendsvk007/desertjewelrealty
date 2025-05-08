import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Clock, MapPin, Compass, FileText, Scale, Calculator, User, Search } from "lucide-react";

// Import components
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ProgressBar from '@/components/ProgressBar';

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("indian");
  const [propertyValue, setPropertyValue] = useState("");
  const [isGoldenVisaEligible, setIsGoldenVisaEligible] = useState<boolean | null>(null);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would filter FAQs based on the search query
    console.log("Searching for:", searchQuery);
  };
  
  // Check Golden Visa eligibility
  const checkGoldenVisaEligibility = () => {
    const value = parseFloat(propertyValue.replace(/[^0-9.]/g, ''));
    setIsGoldenVisaEligible(value >= 2000000); // 2 million AED threshold
  };
  
  return (
    <>
      <Helmet>
        <title>FAQ | Desert Jewel Realty</title>
        <meta name="description" content="Frequently asked questions about real estate in UAE" />
      </Helmet>
      
      {/* Navigation and ProgressBar components are already included in App.tsx */}
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary/5 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">Everything you need to know about UAE real estate</p>
              
              <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pr-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="sm"
                  variant="ghost" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Main FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="w-full max-w-4xl flex flex-wrap">
                  <TabsTrigger value="general">General FAQ</TabsTrigger>
                  <TabsTrigger value="landmarks">Time to Landmarks</TabsTrigger>
                  <TabsTrigger value="expatbuyer">Expat Buyer Flow</TabsTrigger>
                  <TabsTrigger value="goldenvisa">Golden Visa Explainer</TabsTrigger>
                  <TabsTrigger value="legal">Legal FAQ Engine</TabsTrigger>
                </TabsList>
              </div>
              
              {/* General FAQ Tab */}
              <TabsContent value="general" className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Questions</CardTitle>
                    <CardDescription>Frequently asked questions about buying property in UAE</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How does the real estate buying process work in UAE?</AccordionTrigger>
                        <AccordionContent>
                          <p>The buying process in the UAE typically involves:</p>
                          <ol className="list-decimal ml-5 space-y-2 mt-2">
                            <li>Identifying the property you wish to purchase</li>
                            <li>Making an offer and signing a memorandum of understanding (MOU)</li>
                            <li>Paying a deposit (typically 10%)</li>
                            <li>Conducting due diligence on the property</li>
                            <li>Getting mortgage pre-approval (if financing)</li>
                            <li>Signing the sales & purchase agreement (SPA)</li>
                            <li>Registering the property with the Dubai Land Department</li>
                            <li>Transferring the title deed to the buyer's name</li>
                          </ol>
                          <p className="mt-2">The entire process usually takes 30-60 days to complete.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>What fees are involved when buying property in UAE?</AccordionTrigger>
                        <AccordionContent>
                          <p>When purchasing property in the UAE, you should be prepared for these fees:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>Dubai Land Department transfer fee: 4% of property value</li>
                            <li>Real estate agency commission: 2% (typically)</li>
                            <li>Property registration trustee fee: AED 2,000-4,000</li>
                            <li>Mortgage registration fee (if applicable): 0.25% of loan amount</li>
                            <li>Valuation fee (if applicable): AED 2,500-3,500</li>
                            <li>NOC (No Objection Certificate) from developer: AED 500-5,000</li>
                          </ul>
                          <p className="mt-2">In total, buyers should budget 7-8% of the property value for fees and expenses.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can foreigners buy property in UAE?</AccordionTrigger>
                        <AccordionContent>
                          <p>Yes, foreigners (non-UAE nationals) can buy property in designated freehold areas in Dubai and other emirates.</p>
                          
                          <p className="mt-2">In Dubai, foreigners can buy property with full ownership rights in designated freehold areas such as:</p>
                          <ul className="list-disc ml-5 space-y-1 mt-1">
                            <li>Dubai Marina</li>
                            <li>Palm Jumeirah</li>
                            <li>Downtown Dubai</li>
                            <li>Arabian Ranches</li>
                            <li>Emirates Hills</li>
                            <li>Jumeirah Lake Towers (JLT)</li>
                            <li>And many other designated areas</li>
                          </ul>
                          
                          <p className="mt-2">For areas outside these designated zones, ownership may be restricted to UAE and GCC nationals.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>What financing options are available for property buyers?</AccordionTrigger>
                        <AccordionContent>
                          <p>Several financing options are available in the UAE:</p>
                          
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>
                              <strong>Mortgages from UAE banks:</strong> Available to residents and non-residents, with loan-to-value ratios up to 80% for residents and 65% for non-residents.
                            </li>
                            <li>
                              <strong>Developer payment plans:</strong> Many developers offer payment plans for off-plan properties, often extending beyond handover.
                            </li>
                            <li>
                              <strong>International financing:</strong> Some buyers arrange financing in their home countries, especially for investment properties.
                            </li>
                          </ul>
                          
                          <p className="mt-2">Interest rates and terms vary based on residency status, property type, and market conditions. Use our Mortgage Calculator tool to explore your options.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5">
                        <AccordionTrigger>What are the ongoing costs of owning property in UAE?</AccordionTrigger>
                        <AccordionContent>
                          <p>Ongoing costs to consider when owning property in the UAE include:</p>
                          
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>
                              <strong>Service charges:</strong> Typically range from AED 10-85 per sq ft annually, depending on the building's amenities and location.
                            </li>
                            <li>
                              <strong>DEWA (utilities):</strong> Monthly costs for water and electricity.
                            </li>
                            <li>
                              <strong>Cooling charges:</strong> District cooling or AC maintenance costs.
                            </li>
                            <li>
                              <strong>Building maintenance:</strong> For standalone properties.
                            </li>
                            <li>
                              <strong>Home insurance:</strong> Recommended for all property owners.
                            </li>
                            <li>
                              <strong>Property management fees:</strong> If using a property manager for rentals (typically 5-8% of annual rent).
                            </li>
                          </ul>
                          
                          <p className="mt-2">For investment properties, these costs should be factored into your rental yield calculations.</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Time to Landmarks Tab */}
              <TabsContent value="landmarks" className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Time to Landmarks</CardTitle>
                    <CardDescription>Driving time to major Dubai landmarks from popular areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Dubai Marina</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Airport</p>
                              <p className="font-medium">25-35 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Burj Khalifa/Dubai Mall</p>
                              <p className="font-medium">15-20 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Palm Jumeirah</p>
                              <p className="font-medium">5-10 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Al Maktoum Airport</p>
                              <p className="font-medium">25-30 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Global Village</p>
                              <p className="font-medium">20-25 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">JBR Beach</p>
                              <p className="font-medium">5 minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Downtown Dubai</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Airport</p>
                              <p className="font-medium">15 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Marina</p>
                              <p className="font-medium">15-20 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Palm Jumeirah</p>
                              <p className="font-medium">15-20 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">DIFC</p>
                              <p className="font-medium">5 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Creek</p>
                              <p className="font-medium">10-15 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Opera</p>
                              <p className="font-medium">2 minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Palm Jumeirah</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Airport</p>
                              <p className="font-medium">30-40 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dubai Marina</p>
                              <p className="font-medium">5-10 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Burj Khalifa/Dubai Mall</p>
                              <p className="font-medium">15-20 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Mall of the Emirates</p>
                              <p className="font-medium">10-15 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Atlantis Aquaventure</p>
                              <p className="font-medium">10-15 minutes</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg border">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Emirates Golf Club</p>
                              <p className="font-medium">10 minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Expat Buyer Flow Tab */}
              <TabsContent value="expatbuyer" className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Expat Buyer Flow</CardTitle>
                    <CardDescription>Step-by-step guide for expatriates buying property in UAE</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <Label htmlFor="nationality">Select your nationality</Label>
                      <Select value={selectedNationality} onValueChange={setSelectedNationality}>
                        <SelectTrigger id="nationality" className="w-full sm:w-[240px] mt-1">
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indian">Indian</SelectItem>
                          <SelectItem value="british">British</SelectItem>
                          <SelectItem value="russian">Russian</SelectItem>
                          <SelectItem value="pakistani">Pakistani</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="european">European (EU)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="relative pl-6 border-l-2 border-primary/30">
                      {/* Step 1 */}
                      <div className="mb-8 relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          1
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Initial Research & Budget Planning</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>Research UAE property market trends and areas</li>
                            <li>Determine your budget including all fees and expenses</li>
                            <li>Understand tax implications in your home country</li>
                            {selectedNationality === "indian" && (
                              <li className="text-primary font-medium">
                                Wire funds through the Liberalized Remittance Scheme (LRS) which allows up to $250,000 annually
                              </li>
                            )}
                            {selectedNationality === "british" && (
                              <li className="text-primary font-medium">
                                Consider UK tax implications under the Non-Resident Landlord Scheme
                              </li>
                            )}
                            {selectedNationality === "russian" && (
                              <li className="text-primary font-medium">
                                Ensure funds come from a verified source to simplify banking procedures
                              </li>
                            )}
                            {selectedNationality === "pakistani" && (
                              <li className="text-primary font-medium">
                                Obtain prior permission from the State Bank of Pakistan for fund transfers
                              </li>
                            )}
                            <li>Consider currency exchange rates and transfer options</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="mb-8 relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          2
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Documentation Preparation</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>Valid passport with at least 6 months validity</li>
                            <li>Emirates ID (for residents) or entry stamp (for tourists)</li>
                            {selectedNationality === "indian" && (
                              <li className="text-primary font-medium">
                                PAN card and Form 15CA/CB for tax clearance on remittances
                              </li>
                            )}
                            {selectedNationality === "chinese" && (
                              <li className="text-primary font-medium">
                                Chinese ID card and documentation from SAFE (State Administration of Foreign Exchange)
                              </li>
                            )}
                            <li>Proof of address in home country</li>
                            <li>Bank statements (typically last 6 months)</li>
                            <li>Source of funds documentation</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Step 3 */}
                      <div className="mb-8 relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          3
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Financing Considerations</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>Decide between cash purchase or mortgage</li>
                            <li>For mortgages: UAE banks typically offer up to 60-75% LTV for non-residents</li>
                            {selectedNationality === "british" && (
                              <li className="text-primary font-medium">
                                British expats may access preferential rates from international banks with UAE presence
                              </li>
                            )}
                            {selectedNationality === "indian" && (
                              <li className="text-primary font-medium">
                                Indian buyers often benefit from relationships with UAE banks that have Indian operations
                              </li>
                            )}
                            <li>Compare interest rates and terms across multiple lenders</li>
                            <li>Prepare for 25-40% down payment (including fees)</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Step 4 */}
                      <div className="mb-8 relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          4
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Property Selection & Offer</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>View properties with a registered real estate agent</li>
                            <li>Conduct due diligence on developer/seller and property</li>
                            <li>Make an offer and negotiate terms</li>
                            <li>Sign Memorandum of Understanding (MOU)</li>
                            <li>Pay 10% deposit (typically held in escrow)</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Step 5 */}
                      <div className="mb-8 relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          5
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Sales & Purchase Agreement</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>Review SPA with legal professional</li>
                            {selectedNationality === "russian" || selectedNationality === "chinese" && (
                              <li className="text-primary font-medium">
                                Consider having the SPA translated to your native language
                              </li>
                            )}
                            <li>Sign the SPA with the seller</li>
                            <li>Pay remaining down payment if financing, or full amount if cash purchase</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Step 6 */}
                      <div className="mb-8 relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          6
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Property Registration</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>Obtain No Objection Certificate (NOC) from developer</li>
                            <li>Complete property registration at Dubai Land Department (DLD)</li>
                            <li>Pay registration fee (4% of property value)</li>
                            <li>Pay real estate agent commission (typically 2%)</li>
                            <li>Receive title deed (ownership certificate)</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Step 7 */}
                      <div className="relative">
                        <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-white">
                          7
                        </div>
                        <h3 className="text-lg font-semibold mt-2 mb-3 pl-6">Post-Purchase Considerations</h3>
                        <div className="pl-6">
                          <ul className="list-disc space-y-2 ml-5">
                            <li>Set up utilities accounts (DEWA, internet, etc.)</li>
                            <li>Arrange property management if not personally residing</li>
                            <li>Understand tax obligations in home country</li>
                            {selectedNationality === "indian" && (
                              <li className="text-primary font-medium">
                                Report foreign assets in Schedule FA of Income Tax Return
                              </li>
                            )}
                            {selectedNationality === "british" && (
                              <li className="text-primary font-medium">
                                Register for the Non-Resident Landlord Scheme with HMRC
                              </li>
                            )}
                            {selectedNationality === "european" && (
                              <li className="text-primary font-medium">
                                Declare rental income and property assets according to your specific EU country requirements
                              </li>
                            )}
                            <li>Consider creating a will under DIFC Wills Service Centre</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Golden Visa Explainer Tab */}
              <TabsContent value="goldenvisa" className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Golden Visa Explainer & Calculator</CardTitle>
                    <CardDescription>Understand the UAE Golden Visa program and check your eligibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">What is the Golden Visa?</h3>
                        <p className="mb-4">The UAE Golden Visa is a long-term residence visa that allows foreigners to live, work, and study in the UAE without the need for a national sponsor and with 100% ownership of their business on the UAE's mainland.</p>
                        
                        <h4 className="font-medium text-lg mt-6 mb-3">Property Investment Pathway</h4>
                        <ul className="list-disc ml-5 space-y-2">
                          <li>Invest at least AED 2 million in real estate to qualify</li>
                          <li>Property can be ready or off-plan from approved developers</li>
                          <li>Property mortgage is permitted under certain conditions</li>
                          <li>Visa valid for 10 years with automatic renewal</li>
                          <li>Can sponsor family members including spouse and children</li>
                          <li>No requirement to stay in UAE for minimum periods</li>
                        </ul>
                        
                        <h4 className="font-medium text-lg mt-6 mb-3">Benefits</h4>
                        <ul className="list-disc ml-5 space-y-2">
                          <li>Long-term stability without visa renewal hassles</li>
                          <li>No need for a national sponsor or employer</li>
                          <li>Ability to stay outside UAE for more than 6 months</li>
                          <li>100% business ownership on the UAE mainland</li>
                          <li>Sponsor family members and domestic workers</li>
                          <li>No income tax on global earnings</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Golden Visa Eligibility Calculator</h3>
                        <div className="p-6 rounded-lg border bg-gray-50">
                          <p className="mb-4 text-sm">Check if your property investment qualifies you for the UAE Golden Visa.</p>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="property-value">Property Value (AED)</Label>
                              <Input 
                                id="property-value" 
                                className="mt-1" 
                                placeholder="e.g. 2,000,000" 
                                value={propertyValue} 
                                onChange={(e) => setPropertyValue(e.target.value)}
                              />
                            </div>
                            
                            <Button onClick={checkGoldenVisaEligibility} className="w-full">Check Eligibility</Button>
                            
                            {isGoldenVisaEligible !== null && (
                              <div className={`mt-4 p-4 rounded-md ${isGoldenVisaEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                {isGoldenVisaEligible ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                      <p className="font-semibold text-green-800">Congratulations! Your investment qualifies for the Golden Visa.</p>
                                      <p className="text-sm text-green-700 mt-1">Properties valued at AED 2 million or more are eligible.</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </div>
                                    <div>
                                      <p className="font-semibold text-red-800">Your investment does not qualify for the Golden Visa.</p>
                                      <p className="text-sm text-red-700 mt-1">Minimum investment required is AED 2 million.</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-6">
                            <h4 className="font-medium mb-2">Other Golden Visa Categories</h4>
                            <ul className="text-sm space-y-2">
                              <li>• Exceptional talent in various fields</li>
                              <li>• Entrepreneurs and business owners</li>
                              <li>• Scientists and researchers</li>
                              <li>• Outstanding students and graduates</li>
                              <li>• Humanitarian pioneers</li>
                              <li>• Frontline heroes and medical professionals</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Legal FAQ Engine Tab */}
              <TabsContent value="legal" className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Legal FAQ Engine</CardTitle>
                    <CardDescription>Country-specific legal questions about buying property in UAE</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="legal-1">
                        <AccordionTrigger>Can a Pakistani citizen buy property in Dubai Marina?</AccordionTrigger>
                        <AccordionContent>
                          <p>Yes, Pakistani citizens can buy property in Dubai Marina and other freehold areas in Dubai.</p>
                          <p className="mt-2">Dubai Marina is a designated freehold area where foreigners, including Pakistani citizens, can purchase property with full ownership rights. There are no restrictions based on Pakistani nationality for property purchases in Dubai's freehold zones.</p>
                          <p className="mt-2">However, Pakistani buyers should be aware of:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>The need for approval from the State Bank of Pakistan for transferring funds above certain limits</li>
                            <li>Compliance with Pakistan's foreign exchange regulations</li>
                            <li>Tax implications in Pakistan for foreign property ownership</li>
                          </ul>
                          <p className="mt-2">It's advisable to consult with financial advisors in both Pakistan and the UAE to ensure compliance with all regulations.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-2">
                        <AccordionTrigger>Are there restrictions for Chinese citizens buying property in Dubai?</AccordionTrigger>
                        <AccordionContent>
                          <p>Chinese citizens can purchase property in Dubai's freehold areas without restrictions from the UAE side. However, there are considerations regarding China's own regulations:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>China has currency controls limiting overseas money transfers to $50,000 per person annually</li>
                            <li>Special approval may be required from SAFE (State Administration of Foreign Exchange) for larger transfers</li>
                            <li>Chinese citizens should consider structuring their purchases through proper channels to comply with both UAE and Chinese regulations</li>
                          </ul>
                          <p className="mt-2">Many Dubai developers have Chinese-speaking staff and documentation available in Chinese to facilitate the buying process.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-3">
                        <AccordionTrigger>What are the inheritance laws for property owned by foreigners in UAE?</AccordionTrigger>
                        <AccordionContent>
                          <p>Inheritance of property owned by foreigners in the UAE can be complex due to the interplay between Sharia law and the laws of the deceased's home country:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>By default, UAE Sharia law applies to real estate located in the UAE, regardless of the owner's nationality or religion</li>
                            <li>Under Sharia law, assets are distributed according to predetermined shares among defined heirs</li>
                            <li>Non-Muslim expatriates can register a will at the DIFC Wills Service Centre to ensure their assets are distributed according to their wishes</li>
                            <li>The UAE now also recognizes foreign wills in some circumstances</li>
                          </ul>
                          <p className="mt-2">It's strongly recommended that foreign property owners in the UAE create a properly registered will to avoid complications for their heirs and ensure their assets are distributed according to their wishes.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-4">
                        <AccordionTrigger>Can Indian residents use home loan proceeds to buy property in Dubai?</AccordionTrigger>
                        <AccordionContent>
                          <p>Indian residents face restrictions when using home loan proceeds from India to purchase property in Dubai:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>As per Reserve Bank of India (RBI) regulations, loans taken in India cannot be used to purchase property abroad</li>
                            <li>Indian banks do not provide loans for purchasing property outside India</li>
                            <li>Indians can use the Liberalized Remittance Scheme (LRS) to transfer up to $250,000 per person per financial year</li>
                            <li>Family members can combine their LRS limits to purchase higher-value properties</li>
                            <li>UAE banks offer mortgage options to Indian nationals, both resident and non-resident</li>
                          </ul>
                          <p className="mt-2">Indian buyers should consider UAE mortgages or structured payment plans offered by developers as alternatives to Indian financing.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-5">
                        <AccordionTrigger>What are the tax implications for UK citizens owning property in Dubai?</AccordionTrigger>
                        <AccordionContent>
                          <p>UK citizens owning property in Dubai should be aware of these tax considerations:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>There is no property tax, income tax, or capital gains tax in the UAE</li>
                            <li>UK residents are subject to UK tax on worldwide income, including rental income from Dubai properties</li>
                            <li>Non-resident British nationals may still be liable for UK tax on rental income through the Non-Resident Landlord Scheme</li>
                            <li>Capital gains on property sales may be taxable in the UK depending on residency status</li>
                            <li>UK inheritance tax may apply to Dubai properties owned by UK domiciled individuals</li>
                          </ul>
                          <p className="mt-2">The UK-UAE Double Taxation Agreement prevents double taxation on the same income. It's advisable to consult with a UK tax advisor familiar with international property investments.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-6">
                        <AccordionTrigger>Can Russian citizens purchase property in Dubai given current international sanctions?</AccordionTrigger>
                        <AccordionContent>
                          <p>Russian citizens can still purchase property in Dubai, but there are important considerations due to international sanctions:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>The UAE has not implemented the same sanctions against Russia as Western countries</li>
                            <li>However, UAE banks and real estate companies must comply with international financial regulations</li>
                            <li>Russian buyers not under specific sanctions can purchase property in Dubai's freehold areas</li>
                            <li>Enhanced due diligence may be conducted on fund sources from Russian nationals</li>
                            <li>Banking transactions may face additional scrutiny and potential delays</li>
                            <li>Some developers may offer alternative payment mechanisms to accommodate Russian buyers</li>
                          </ul>
                          <p className="mt-2">Russian buyers should work with legal and financial advisors who understand both UAE real estate laws and the current international financial landscape to structure their purchases appropriately.</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      {/* Footer and BackToTop components are already included in App.tsx */}
    </>
  );
};

export default FAQPage;