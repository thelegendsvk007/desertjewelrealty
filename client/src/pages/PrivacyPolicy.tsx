import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Desert Jewel Realty ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our property sales and listing services in the United Arab Emirates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Property preferences and search criteria</li>
                <li>Financial information for property transactions</li>
                <li>Property ownership details if you're selling</li>
                <li>Communication history and inquiries</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Website usage patterns and preferences</li>
                <li>Property search history and viewed listings</li>
                <li>Device information and location data (with permission)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate property sales and purchase transactions</li>
                <li>Match you with suitable properties based on your criteria</li>
                <li>Provide market analysis and property valuations</li>
                <li>Communicate about property opportunities and market updates</li>
                <li>Process property listings for sellers</li>
                <li>Improve our AI property matching services</li>
                <li>Comply with UAE real estate regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Property developers and sellers (with your consent)</li>
                <li>Licensed real estate professionals in our network</li>
                <li>Financial institutions for mortgage pre-approvals</li>
                <li>Legal professionals for transaction processing</li>
                <li>Government authorities as required by UAE law</li>
                <li>Service providers who assist in our operations</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze website usage. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. International Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries outside the UAE. We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p>
                For any privacy-related questions or requests, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Desert Jewel Realty</strong></p>
                <p>21C Street - Dubai Naif, Dubai, UAE</p>
                <p>Email: privacy@desertjewelrealty.com</p>
                <p>Phone: +971 58 953 2210</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;