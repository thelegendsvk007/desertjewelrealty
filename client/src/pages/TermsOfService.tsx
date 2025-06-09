import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using Desert Jewel Realty's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations of the United Arab Emirates. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Our Services</h2>
              <p>Desert Jewel Realty provides the following services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Property sales brokerage services</li>
                <li>Property listing and marketing for sellers</li>
                <li>Property search and matching for buyers</li>
                <li>Market analysis and property valuations</li>
                <li>Investment consultation and guidance</li>
                <li>AI-powered property recommendations</li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> We specialize exclusively in property sales transactions. We do not provide rental or leasing services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <h3 className="text-xl font-medium mb-2">For Property Buyers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information about your requirements</li>
                <li>Verify all property details independently</li>
                <li>Conduct due diligence before making purchase decisions</li>
                <li>Ensure you have adequate financing before making offers</li>
                <li>Comply with UAE property ownership regulations</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-4">For Property Sellers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate property information and documentation</li>
                <li>Ensure you have legal right to sell the property</li>
                <li>Disclose any known property defects or issues</li>
                <li>Allow reasonable access for property viewings</li>
                <li>Honor agreed commission terms upon successful sale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Commission and Fees</h2>
              <p>
                Our commission structure is clearly outlined in our service agreements. Standard rates apply as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Seller commission: As agreed in listing contract</li>
                <li>Buyer representation: Typically covered by seller's commission</li>
                <li>Additional services may incur separate fees</li>
                <li>All fees are subject to UAE VAT where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Property Information Accuracy</h2>
              <p>
                While we strive to provide accurate property information, we cannot guarantee the completeness or accuracy of all details. Users are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verifying property specifications and features</li>
                <li>Conducting independent property inspections</li>
                <li>Confirming legal ownership and clear title</li>
                <li>Checking compliance with building regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p>
                All content on our website, including property photos, descriptions, and marketing materials, is protected by intellectual property rights. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reproduce or distribute our content without permission</li>
                <li>Use our property images for competing services</li>
                <li>Copy our proprietary AI matching algorithms</li>
                <li>Create derivative works from our content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Prohibited Activities</h2>
              <p>Users are prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing false or misleading information</li>
                <li>Attempting to circumvent our commission structure</li>
                <li>Using our services for illegal property transactions</li>
                <li>Harassing or threatening other users or our staff</li>
                <li>Interfering with our website's functionality</li>
                <li>Violating UAE real estate laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p>
                Desert Jewel Realty's liability is limited to the extent permitted by UAE law. We are not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Investment losses or property value fluctuations</li>
                <li>Delays in property transactions due to external factors</li>
                <li>Actions of third-party service providers</li>
                <li>Technical issues with our website or AI systems</li>
                <li>Decisions made based on market analysis or recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
              <p>
                Any disputes arising from these terms or our services shall be resolved through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Good faith negotiation between parties</li>
                <li>Mediation if direct negotiation fails</li>
                <li>UAE courts if mediation is unsuccessful</li>
                <li>Applicable UAE laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Regulatory Compliance</h2>
              <p>
                Desert Jewel Realty operates under UAE real estate regulations and:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintains required RERA licensing</li>
                <li>Complies with Dubai Land Department regulations</li>
                <li>Follows anti-money laundering requirements</li>
                <li>Adheres to consumer protection laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Desert Jewel Realty</strong></p>
                <p>21C Street - Dubai Naif, Dubai, UAE</p>
                <p>Email: legal@desertjewelrealty.com</p>
                <p>Phone: +971 58 953 2210</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;