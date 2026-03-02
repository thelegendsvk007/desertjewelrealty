import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const tenantFAQs = [
  {
    question: "What are my rights as a tenant in Dubai?",
    answer: "Tenants in Dubai have several rights including the right to a legally binding tenancy contract, peaceful enjoyment of the property, proper maintenance services, and protection against arbitrary eviction or unreasonable rent increases. Rent increases are regulated by the Real Estate Regulatory Agency (RERA) rent index."
  },
  {
    question: "How much notice does a landlord need to give for non-renewal?",
    answer: "According to Dubai law, a landlord must provide 90 days' written notice before the expiration of the tenancy contract if they do not wish to renew the lease or want to change the terms of the contract."
  },
  {
    question: "Can a landlord increase the rent during the tenancy contract?",
    answer: "No, the rent cannot be increased during the term of the tenancy contract. Rent increases can only be implemented at renewal and must follow the RERA rent calculator guidelines."
  }
];

const landlordFAQs = [
  {
    question: "What documentation is required to legally rent my property?",
    answer: "Landlords must ensure they have a Title Deed for the property, a copy of their Emirates ID or passport, a typed tenancy contract registered with Ejari, and a No Objection Certificate (NOC) from the developer if required."
  },
  {
    question: "What are my rights if a tenant doesn't pay rent?",
    answer: "If a tenant fails to pay rent, landlords can file a case with the Rental Disputes Center (RDC). The process typically involves sending a legal notice through a notary public, followed by filing a case if payment is not received within 30 days."
  },
  {
    question: "Can I evict a tenant before the contract ends?",
    answer: "Eviction before the end of a tenancy contract can only occur under specific legal grounds, such as non-payment of rent, illegal use of the property, or if the landlord wishes to sell the property (with 12 months' notice)."
  }
];

const foreignInvestorFAQs = [
  {
    question: "Can foreigners own property in the UAE?",
    answer: "Yes, foreigners can own property in the UAE in designated freehold areas. In Dubai, there are numerous freehold areas where non-UAE nationals can buy property with full ownership rights. In Abu Dhabi, foreigners can own property in investment zones."
  },
  {
    question: "What is the difference between freehold and leasehold ownership?",
    answer: "Freehold ownership grants the owner full rights to the property and the land it stands on without any time limitation. Leasehold ownership provides rights to occupy the property for a fixed period (typically 99 years) but not ownership of the land."
  },
  {
    question: "Are there any restrictions on selling property as a foreign owner?",
    answer: "There are generally no restrictions on foreign owners selling their properties. However, capital gains tax may apply, and service charges must be fully paid before transferring ownership. The selling process requires various approvals and documentation from relevant authorities."
  }
];

const RealEstateLawGuide = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-montserrat font-semibold mb-2">Real Estate Law Guide</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Essential legal information for tenants, landlords, and foreign investors in the UAE real estate market.
          </p>
        </div>
        
        <Tabs defaultValue="tenants" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="tenants" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <i className="fas fa-home mr-2"></i> For Tenants
              </TabsTrigger>
              <TabsTrigger value="landlords" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <i className="fas fa-key mr-2"></i> For Landlords
              </TabsTrigger>
              <TabsTrigger value="investors" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <i className="fas fa-globe mr-2"></i> For Foreign Investors
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tenants">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Rights & Responsibilities</CardTitle>
                  <CardDescription>
                    Understanding your legal rights and obligations as a tenant in the UAE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Key Tenant Protections in UAE Law</h3>
                    <p className="text-gray-600 mb-4">
                      The UAE has specific laws that protect tenants from unfair practices. These include rent cap regulations, 
                      eviction protection, and maintenance requirements. All rental agreements must be registered with the relevant 
                      authorities (Ejari in Dubai, Tawtheeq in Abu Dhabi).
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {tenantFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`tenant-item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="landlords">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Landlord Rights & Obligations</CardTitle>
                  <CardDescription>
                    Legal framework for property owners and landlords in the UAE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Landlord Legal Framework</h3>
                    <p className="text-gray-600 mb-4">
                      Landlords in the UAE have specific rights regarding their properties but must also comply with 
                      legal obligations. These include maintaining the property, respecting tenant rights, and following 
                      proper procedures for rent increases, evictions, and contract terminations.
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {landlordFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`landlord-item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="investors">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Foreign Investor Guidelines</CardTitle>
                  <CardDescription>
                    Essential legal information for international property investors in the UAE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Foreign Ownership Laws</h3>
                    <p className="text-gray-600 mb-4">
                      The UAE has opened its real estate market to foreign investors with specific regulations in place. 
                      Foreigners can own property in designated areas with freehold or leasehold rights. Different emirates 
                      have varying rules regarding foreign ownership, with Dubai offering the most liberal policies.
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {foreignInvestorFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`investor-item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RealEstateLawGuide;