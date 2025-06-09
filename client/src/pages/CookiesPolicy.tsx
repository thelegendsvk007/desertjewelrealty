import { motion } from 'framer-motion';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Cookies Policy</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit Desert Jewel Realty's website. They help us provide you with a better browsing experience and enable certain features of our property search and listing services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your property search preferences and criteria</li>
                <li>Keep you logged in to your account</li>
                <li>Analyze website usage to improve our services</li>
                <li>Provide personalized property recommendations</li>
                <li>Remember your language and currency preferences</li>
                <li>Track property inquiries and saved listings</li>
                <li>Enhance our AI property matching capabilities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
              <p>
                These cookies are necessary for our website to function properly. They enable basic features like page navigation, secure areas access, and form submissions for property inquiries.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-4">Analytics Cookies</h3>
              <p>
                We use analytics cookies to understand how visitors interact with our website, which properties are most viewed, and which search filters are most popular. This helps us improve our services.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-4">Functional Cookies</h3>
              <p>
                These cookies remember your preferences and choices, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Preferred property types and locations</li>
                <li>Budget ranges and search criteria</li>
                <li>Language and currency settings</li>
                <li>Map view preferences</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-4">Marketing Cookies</h3>
              <p>
                These cookies help us show you relevant property advertisements and track the effectiveness of our marketing campaigns. They may be set by our advertising partners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
              <p>
                We may use third-party services that set their own cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                <li><strong>Google Maps:</strong> To display property locations and interactive maps</li>
                <li><strong>Social Media Platforms:</strong> For social sharing features</li>
                <li><strong>Payment Processors:</strong> For secure transaction processing</li>
                <li><strong>Property Portals:</strong> For cross-platform listing integration</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-medium mb-2">Browser Settings</h3>
              <p>
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Block all cookies (may affect website functionality)</li>
                <li>Delete existing cookies</li>
                <li>Set preferences for specific websites</li>
                <li>Receive notifications when cookies are set</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-4">Our Cookie Preferences</h3>
              <p>
                We provide a cookie preference center where you can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accept or reject non-essential cookies</li>
                <li>Customize your preferences by category</li>
                <li>Change your settings at any time</li>
                <li>View details about each cookie type</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookie Retention</h2>
              <p>Different cookies have different retention periods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Stored for a specific period (usually 1-12 months)</li>
                <li><strong>Property Search Preferences:</strong> Retained for up to 2 years</li>
                <li><strong>Analytics Data:</strong> Retained for up to 26 months</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Impact of Disabling Cookies</h2>
              <p>
                If you disable cookies, some features may not work properly:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Saved property searches and preferences will be lost</li>
                <li>You may need to re-enter information repeatedly</li>
                <li>Personalized property recommendations may not be available</li>
                <li>Some interactive features may not function</li>
                <li>Property inquiry forms may not work correctly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 18. We do not knowingly collect personal information from children through cookies or any other means. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Updates to This Policy</h2>
              <p>
                We may update this Cookies Policy to reflect changes in our practices or applicable laws. We will notify you of significant changes by posting a notice on our website or updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p>
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Desert Jewel Realty</strong></p>
                <p>21C Street - Dubai Naif, Dubai, UAE</p>
                <p>Email: privacy@desertjewelrealty.com</p>
                <p>Phone: +971 58 953 2210</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Legal Basis</h2>
              <p>
                Our use of cookies is based on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Legitimate Interest:</strong> For essential website functionality and security</li>
                <li><strong>Consent:</strong> For marketing and analytics cookies</li>
                <li><strong>Contract Performance:</strong> For processing property transactions</li>
                <li><strong>Legal Obligation:</strong> For compliance with UAE regulations</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPolicy;