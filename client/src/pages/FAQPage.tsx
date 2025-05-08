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
                            <li>Consider currency exchange rates and transfer options</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Additional Steps Would Be Here */}
                      
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Golden Visa Explainer Tab */}
              <TabsContent value="goldenvisa" className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Golden Visa Eligibility Checker</CardTitle>
                    <CardDescription>Check if your property investment qualifies for UAE Golden Visa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Property Investment Route</h3>
                        <p className="mb-4">Enter the property value to check if it qualifies for the Golden Visa:</p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                          <div className="flex-1">
                            <Label htmlFor="propertyValue">Property Value (AED)</Label>
                            <Input
                              id="propertyValue"
                              type="text"
                              placeholder="e.g. 2,000,000"
                              value={propertyValue}
                              onChange={(e) => setPropertyValue(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={checkGoldenVisaEligibility}>Check Eligibility</Button>
                          </div>
                        </div>
                        
                        {isGoldenVisaEligible !== null && (
                          <div className={`p-4 rounded-md mt-4 ${isGoldenVisaEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            {isGoldenVisaEligible ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <p className="text-green-700 font-medium">Eligible for Golden Visa</p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <p className="text-red-700 font-medium">Not eligible for Golden Visa</p>
                              </div>
                            )}
                            
                            <div className="mt-3 text-sm">
                              {isGoldenVisaEligible ? (
                                <p>Your property investment of AED {propertyValue} meets the minimum threshold of AED 2 million for Golden Visa eligibility.</p>
                              ) : (
                                <p>Your property investment of AED {propertyValue} does not meet the minimum threshold of AED 2 million for Golden Visa eligibility.</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Golden Visa Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-primary/5 text-primary">Benefit</Badge>
                              <h4 className="font-medium">Long-term Residency</h4>
                            </div>
                            <p className="text-muted-foreground">10-year renewable residency visa without the need for a sponsor</p>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-primary/5 text-primary">Benefit</Badge>
                              <h4 className="font-medium">Family Sponsorship</h4>
                            </div>
                            <p className="text-muted-foreground">Ability to sponsor spouse, children, and parents</p>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-primary/5 text-primary">Benefit</Badge>
                              <h4 className="font-medium">No UAE Presence Requirement</h4>
                            </div>
                            <p className="text-muted-foreground">No minimum stay requirement to maintain visa status</p>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-primary/5 text-primary">Benefit</Badge>
                              <h4 className="font-medium">Business Flexibility</h4>
                            </div>
                            <p className="text-muted-foreground">100% business ownership in mainland UAE</p>
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
                    <CardDescription>Key legal information for property buyers in UAE</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="legal-1">
                        <AccordionTrigger>What legal documents are required for a property purchase?</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc ml-5 space-y-2">
                            <li><strong>Memorandum of Understanding (MOU)</strong>: Initial agreement between buyer and seller.</li>
                            <li><strong>No Objection Certificate (NOC)</strong>: From the developer, confirming no objection to the sale.</li>
                            <li><strong>Sale & Purchase Agreement (SPA)</strong>: The primary contract for the property transaction.</li>
                            <li><strong>Title Deed</strong>: The official ownership document registered with the Dubai Land Department.</li>
                            <li><strong>Oqood (for off-plan)</strong>: Registration of off-plan properties.</li>
                          </ul>
                          <p className="mt-2">All contracts should be carefully reviewed, preferably with legal assistance, before signing.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-2">
                        <AccordionTrigger>What are the inheritance laws for non-Muslim property owners?</AccordionTrigger>
                        <AccordionContent>
                          <p>As of UAE Federal Decree Law No. 35 of 2020:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>Non-Muslims can now choose to have their UAE assets distributed according to the laws of their home country.</li>
                            <li>Property owners can register a will at the DIFC Wills Service Centre or have it notarized at the Dubai Courts.</li>
                            <li>Without a registered will, the UAE's Sharia inheritance laws may apply by default, which may not align with your wishes.</li>
                          </ul>
                          <p className="mt-2 font-medium">Recommendation: Always have a properly registered will to ensure your property is inherited according to your wishes.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-3">
                        <AccordionTrigger>What protection do off-plan property buyers have?</AccordionTrigger>
                        <AccordionContent>
                          <p>The UAE has introduced several protections for off-plan property buyers:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li><strong>Escrow Accounts</strong>: Developers must deposit buyer payments in an escrow account, which is released based on construction milestones.</li>
                            <li><strong>RERA Registration</strong>: All off-plan projects must be registered with the Real Estate Regulatory Agency (RERA).</li>
                            <li><strong>Oqood Registration</strong>: Off-plan sales contracts must be registered with the Dubai Land Department.</li>
                            <li><strong>Law No. 19 of 2017</strong>: Provides for refunds in case of developer fraud or project cancellation.</li>
                          </ul>
                          <p className="mt-2">Buyers should always verify that a project is RERA-approved and that the developer has a good track record.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-4">
                        <AccordionTrigger>Can I dispute service charges as a property owner?</AccordionTrigger>
                        <AccordionContent>
                          <p>Yes, property owners can dispute service charges through established legal channels:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>First approach the Owners Association Board with your concerns.</li>
                            <li>If unresolved, file a complaint with the Real Estate Regulatory Agency (RERA).</li>
                            <li>RERA provides a dispute resolution service specifically for service charge issues.</li>
                            <li>If still unresolved, cases can be escalated to the Dubai Land Department's Rental Disputes Center.</li>
                          </ul>
                          <p className="mt-2">Note: Service charges must be approved by RERA annually, and this approval should be documented and shared with property owners.</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="legal-5">
                        <AccordionTrigger>What are the legal implications of defaulting on a mortgage?</AccordionTrigger>
                        <AccordionContent>
                          <p>Defaulting on a UAE mortgage can have serious legal consequences:</p>
                          <ul className="list-disc ml-5 space-y-2 mt-2">
                            <li>Banks typically issue a notice of default after 30-90 days of missed payments.</li>
                            <li>The bank can start foreclosure proceedings through the Dubai Courts.</li>
                            <li>The property can be auctioned off to recover the outstanding debt.</li>
                            <li>If the auction proceeds don't cover the debt, you remain liable for the shortfall.</li>
                            <li>Default can result in travel bans and legal cases if you leave the UAE without settling.</li>
                          </ul>
                          <p className="mt-2 font-medium">If you face financial difficulties, communicate with your lender early to explore restructuring options before default.</p>
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
    </>
  );
};

export default FAQPage;