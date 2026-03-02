import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Users, Shield, DollarSign, Globe, Award, AlertTriangle, FileText, Home, Copyright, Ban, Scale3d, Lock, MessageSquare, RefreshCw, Phone } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-4">
              Legal Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              <span className="text-primary">Terms</span> of Service
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive terms and conditions governing the use of Desert Jewel Realty services 
              and participation in our affiliate program.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  General Terms
                </TabsTrigger>
                <TabsTrigger value="affiliate" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Affiliate Terms
                </TabsTrigger>
              </TabsList>

              {/* General Terms */}
              <TabsContent value="general" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Terms of Service</CardTitle>
                    <CardDescription>
                      Last Updated: 20/06/2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        These Terms of Service ("Terms") govern your access to and use of Desert Jewel Realty's website, products, and services. By using our platform, you agree to be bound by these Terms and the applicable laws of the United Arab Emirates (UAE). If you do not agree with any part of these Terms, you may not use our services.
                      </p>
                    </div>

                    {/* Agreement to Terms */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        1. Agreement to Terms
                      </h3>
                      <p className="text-sm">
                        By accessing and using Desert Jewel Realty's website and services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. You also confirm that you are at least 21 years old or otherwise legally capable of entering into binding contracts under UAE law.
                      </p>
                    </div>

                    {/* Our Services */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-600" />
                        2. Our Services
                      </h3>
                      <p className="text-sm mb-3">Desert Jewel Realty provides the following services:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• Property sales brokerage services</li>
                        <li>• Property listing and marketing for sellers</li>
                        <li>• Property search and matching for buyers</li>
                        <li>• Market analysis and property valuations</li>
                        <li>• Investment consultation and guidance</li>
                        <li>• AI-powered property recommendations</li>
                      </ul>
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mt-3">
                        <p className="text-sm text-amber-800">
                          <strong>Note:</strong> We specialize exclusively in property sales transactions. We do not offer rental, leasing, or property management services.
                        </p>
                      </div>
                    </div>

                    {/* User Responsibilities */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        3. User Responsibilities
                      </h3>
                      
                      <div>
                        <h4 className="font-semibold text-base mb-2">For Property Buyers</h4>
                        <p className="text-sm mb-2">You agree to:</p>
                        <ul className="space-y-1 text-sm pl-4">
                          <li>• Provide accurate and complete information about your requirements</li>
                          <li>• Independently verify property details and conduct due diligence</li>
                          <li>• Confirm financing capability before making offers</li>
                          <li>• Comply with UAE property ownership regulations</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-base mb-2">For Property Sellers</h4>
                        <p className="text-sm mb-2">You agree to:</p>
                        <ul className="space-y-1 text-sm pl-4">
                          <li>• Provide accurate property information and legal documentation</li>
                          <li>• Confirm your legal right to sell the property</li>
                          <li>• Disclose any known property defects or legal issues</li>
                          <li>• Provide reasonable access for viewings and inspections</li>
                          <li>• Honor agreed commission terms upon successful sale</li>
                        </ul>
                      </div>
                    </div>

                    {/* Commission and Fees */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        4. Commission and Fees
                      </h3>
                      <p className="text-sm mb-3">Our commission structure is outlined in our client service agreements. Unless otherwise agreed:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• Seller commission: As specified in the signed listing agreement</li>
                        <li>• Buyer representation: Typically covered through the seller's commission</li>
                        <li>• Additional services (e.g., valuations, custom marketing) may incur extra fees</li>
                        <li>• All applicable fees are subject to UAE VAT in accordance with Federal Tax Authority (FTA) regulations</li>
                      </ul>
                    </div>

                    {/* Property Information Disclaimer */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-orange-600" />
                        5. Property Information Disclaimer
                      </h3>
                      <p className="text-sm mb-3">We aim to provide accurate and up-to-date property information. However:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• We do not guarantee the completeness, accuracy, or suitability of listings</li>
                        <li>• Buyers and sellers are responsible for verifying all property specifications, title status, approvals, and legal compliance</li>
                        <li>• Marketing content is for informational purposes and should not be considered legal or financial advice</li>
                        <li>• We recommend professional inspections and legal review before completing a transaction</li>
                      </ul>
                    </div>

                    {/* Intellectual Property */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Copyright className="w-5 h-5 text-indigo-600" />
                        6. Intellectual Property
                      </h3>
                      <p className="text-sm mb-3">All website content, including property images, descriptions, branding, and proprietary technology (including AI algorithms), is the intellectual property of Desert Jewel Realty or its licensors.</p>
                      <p className="text-sm mb-2">You may not:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• Copy, distribute, or reproduce our content without written consent</li>
                        <li>• Use our images or text for competing services</li>
                        <li>• Modify, reverse-engineer, or derive products from our AI tools or database</li>
                        <li>• Use our trademarks or logos without explicit authorization</li>
                      </ul>
                    </div>

                    {/* Prohibited Activities */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Ban className="w-5 h-5 text-red-600" />
                        7. Prohibited Activities
                      </h3>
                      <p className="text-sm mb-2">You agree not to:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• Provide false, misleading, or deceptive information</li>
                        <li>• Misrepresent your identity or role in a transaction</li>
                        <li>• Attempt to bypass or avoid our agreed commission structures</li>
                        <li>• Use our platform for unlawful or unlicensed real estate transactions</li>
                        <li>• Harass, threaten, or defame our team or other users</li>
                        <li>• Interfere with the technical functioning or security of our website</li>
                        <li>• Violate any applicable UAE real estate laws, RERA regulations, or AML compliance requirements</li>
                      </ul>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        8. Limitation of Liability
                      </h3>
                      <p className="text-sm mb-3">To the extent permitted by UAE law, Desert Jewel Realty shall not be liable for:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• Investment losses or declines in property value</li>
                        <li>• Delays or failures in transactions caused by external parties</li>
                        <li>• Errors or inaccuracy in third-party content or listings</li>
                        <li>• Website downtime, technical glitches, or AI recommendation errors</li>
                        <li>• Decisions made based on our market reports or consultations</li>
                      </ul>
                      <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mt-3">
                        <p className="text-sm text-orange-800">
                          Our maximum liability is limited to the actual fees paid for our services.
                        </p>
                      </div>
                    </div>

                    {/* Dispute Resolution */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Scale3d className="w-5 h-5 text-blue-600" />
                        9. Dispute Resolution
                      </h3>
                      <p className="text-sm mb-3">In the event of any dispute arising under these Terms:</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• The Parties agree to attempt resolution through good faith negotiation</li>
                        <li>• If unresolved, the Parties agree to submit the dispute to mediation</li>
                        <li>• If mediation fails, the matter shall be referred to the courts of Dubai, UAE</li>
                        <li>• These Terms are governed exclusively by UAE law</li>
                        <li>• Proceedings shall be conducted in English or Arabic, as applicable</li>
                      </ul>
                    </div>

                    {/* Data Privacy */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-purple-600" />
                        10. Data Privacy
                      </h3>
                      <p className="text-sm mb-3">We are committed to protecting your personal data in compliance with Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• We collect and process your information lawfully and for specified purposes</li>
                        <li>• We do not sell or misuse user data</li>
                        <li>• We may share your data only with trusted partners (e.g., banks, legal advisors) involved in your property transaction</li>
                        <li>• By using our services, you consent to data collection, storage, and use in accordance with our Privacy Policy</li>
                      </ul>
                    </div>

                    {/* Communication Consent */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        11. Communication Consent
                      </h3>
                      <p className="text-sm">
                        By registering on or using our platform, you consent to receive communications from Desert Jewel Realty by phone, email, SMS, or WhatsApp. These may include marketing updates, transaction updates, and customer support messages. You may opt out of promotional messages at any time.
                      </p>
                    </div>

                    {/* Changes to Terms */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-indigo-600" />
                        12. Changes to These Terms
                      </h3>
                      <p className="text-sm mb-2">We may revise these Terms at any time.</p>
                      <ul className="space-y-2 text-sm pl-4">
                        <li>• Updated versions will be posted on our website with the new "Last Updated" date</li>
                        <li>• Material changes will be communicated via email or on-site notification</li>
                        <li>• Continued use of our platform after changes means you accept the updated Terms</li>
                      </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-600" />
                        13. Contact Information
                      </h3>
                      <p className="text-sm mb-3">For any questions regarding these Terms of Service, contact us:</p>
                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <p><strong>Desert Jewel Realty</strong></p>
                          <p> Dubai, United Arab Emirates</p>
                          <p>📧 Email: info@desertjewelrealty.com</p>
                          <p>📞 Phone: +971 58 953 2210</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Affiliate Terms */}
              <TabsContent value="affiliate" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Affiliate Terms & Conditions</CardTitle>
                    <CardDescription>
                      Last Updated: June 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">Important Notice</h4>
                      <p className="text-amber-800 text-sm">
                        These Affiliate Terms and Conditions govern your participation in the affiliate program of 
                        Desert Jewel Realty FZ-LLC, a company registered in the United Arab Emirates. 
                        By joining the program, you agree to abide by these terms whether you are based in the UAE or internationally.
                      </p>
                    </div>

                    {/* Affiliate Eligibility */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Affiliate Eligibility
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• You must be at least 18 years of age</li>
                        <li>• You may reside in the UAE or any other country, provided your jurisdiction does not prohibit affiliate marketing or partnerships with UAE-based businesses</li>
                        <li>• You may not be an employee, agent, or broker of Desert Jewel Realty</li>
                      </ul>
                    </div>

                    {/* Commission Structure */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Commission Structure
                      </h3>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-800 mb-3">
                          You will earn up to 15% of the net commission that Desert Jewel Realty earns from a successful property sale that originated through your direct referral.
                        </p>
                        <p className="text-xs text-green-700">
                          Commission rate ranges from 1% to 15% depending on your performance level and partnership tier.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Valid Referral Requirements:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• The lead is not already in our client database</li>
                          <li>• The sale is successfully closed and the Company receives its commission</li>
                          <li>• No commissions are paid on unclosed, canceled, or reversed deals</li>
                          <li>• Payments will be made within 30–45 business days after the Company receives payment</li>
                          <li>• Payments may be made via bank transfer, PayPal, or cryptocurrency as mutually agreed</li>
                        </ul>
                      </div>
                    </div>

                    {/* Promotion Guidelines */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Promotion Guidelines
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">UAE-Based Affiliates</h4>
                          <ul className="space-y-1 text-sm text-blue-700">
                            <li>• Must obtain a Media License from UAE authorities (NMC, DED, DMCC) if promoting through paid ads or public media</li>
                            <li>• May promote organically (direct messaging, private referrals, word of mouth) without a license</li>
                          </ul>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-indigo-800 mb-2">International Affiliates</h4>
                          <ul className="space-y-1 text-sm text-indigo-700">
                            <li>• Must comply with local advertising, affiliate, and consumer protection laws</li>
                            <li>• Must not target UAE nationals with misleading content or violate UAE cultural sensitivities</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">General Requirements:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• You must always present Desert Jewel Realty honestly and professionally</li>
                          <li>• You must disclose that you are an affiliate (e.g., #Ad, #Sponsored)</li>
                          <li>• You must not make false claims or misrepresent property details, pricing, ROI, or legal rights</li>
                        </ul>
                      </div>
                    </div>

                    {/* Prohibited Activities */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Prohibited Activities
                      </h3>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-red-800 mb-2">You may not:</p>
                        <ul className="space-y-1 text-sm text-red-700">
                          <li>• Pretend to be an employee or official broker of Desert Jewel Realty</li>
                          <li>• Use the Company's name in Google, Meta, or paid ad keywords without written approval</li>
                          <li>• Send unsolicited spam or mass outreach without consent</li>
                          <li>• Engage in fake, bot-driven, or incentivized traffic</li>
                          <li>• Resell or share lead information</li>
                          <li>• Use hate speech, adult content, gambling, or illegal content in promotional efforts</li>
                          <li>• Operate in any sanctioned country or region</li>
                        </ul>
                      </div>
                    </div>

                    {/* No Dashboard Notice */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        Tracking & Communication
                      </h3>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <ul className="space-y-2 text-sm text-orange-800">
                          <li>• At this time, Desert Jewel Realty does not provide an affiliate dashboard or live tracking system</li>
                          <li>• All leads must be manually tracked and confirmed by Company staff</li>
                          <li>• Affiliates will be informed of sale status once verified</li>
                          <li>• Communication occurs through WhatsApp and Telegram groups</li>
                        </ul>
                      </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        Intellectual Property
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• You may use Company branding, logos, and materials only with permission</li>
                        <li>• You may not modify or alter Desert Jewel Realty's logos, listings, or identity in any way</li>
                        <li>• Unauthorized use of assets may lead to immediate termination</li>
                      </ul>
                    </div>

                    {/* Termination */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        Term and Termination
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• These terms begin when you are approved as an affiliate and continue until terminated</li>
                        <li>• Either party may terminate this relationship with 7 days' written notice</li>
                        <li>• The Company reserves the right to terminate immediately for violations, fraud, or harmful activity</li>
                      </ul>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        Limitation of Liability
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• We are not liable for indirect, incidental, or consequential damages</li>
                        <li>• Our total liability under this program is limited to unpaid commission amounts due</li>
                      </ul>
                    </div>

                    {/* Governing Law */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Governing Law & Changes
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li>• These Terms are governed by the laws of the United Arab Emirates</li>
                          <li>• Disputes shall be handled exclusively by the courts of Dubai, UAE</li>
                          <li>• The Company may update these Terms at any time</li>
                          <li>• You will be notified of material changes, and continued participation implies acceptance</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Acknowledgement</h4>
                      <p className="text-sm text-green-700">
                        By participating in our affiliate program, you confirm that you understand and agree to these Terms & Conditions 
                        and commit to acting ethically, professionally, and legally in all promotional activities.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;