import { motion } from 'framer-motion';
import { Link } from 'wouter';

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 animated-bg"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="About Desert Jewel Realty" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-darker/40 to-dark-darker/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">About Desert Jewel Realty</h1>
            <p className="text-lg text-white/80 mb-0">
              Dubai's premier luxury real estate brokerage, connecting dreams to reality across the UAE
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-montserrat font-semibold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Desert Jewel Realty was founded in 2025 with a vision to transform the luxury real estate landscape in the UAE. What began as a boutique agency is quickly becoming one of Dubai's most trusted names in premium property.
            </p>
            <p className="text-gray-600 mb-4">
              With 5 years of experience in the UAE real estate market, we've cultivated strong relationships with the region's top developers, giving our clients exclusive access to the most coveted properties and off-market opportunities.
            </p>
            <p className="text-gray-600">
              Our reputation has been built on a foundation of integrity, personalized service, and an unwavering commitment to exceeding our clients' expectations. From first-time homebuyers to seasoned investors, we guide each client through their unique real estate journey with expertise and dedication.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1236&q=80" 
              alt="Desert Jewel Realty Office" 
              className="rounded-xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 w-48">
              <p className="text-center font-montserrat font-semibold text-primary">
                Established 2025
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-montserrat font-semibold mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              At Desert Jewel Realty, our values define who we are and guide how we serve our clients every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-md"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-gem text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-4 text-center">Excellence</h3>
              <p className="text-gray-600 text-center">
                We strive for excellence in everything we do, from the properties we represent to the service we provide.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-md"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-handshake text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-4 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">
                We conduct our business with the highest level of integrity, transparency, and ethical standards.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-md"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-users text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-4 text-center">Client-Centric</h3>
              <p className="text-gray-600 text-center">
                Your goals are our priority. We tailor our approach to meet your unique needs and exceed your expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-montserrat font-semibold mb-4">Meet Our Leadership Team</h2>
          <p className="text-gray-600">
            Our team of experienced professionals is dedicated to providing exceptional service and expert guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80" 
                alt="Founder" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-montserrat font-semibold mb-1">Safiyan Khan</h3>
              <p className="text-primary mb-4">Founder</p>
              <p className="text-gray-600 mb-4">
                With over 25 years in the UAE, Safiyan brings extensive market knowledge and a deep understanding of local real estate dynamics.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80" 
                alt="Partner" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-montserrat font-semibold mb-1">Jiten Thakker</h3>
              <p className="text-primary mb-4">Sales Executive</p>
              <p className="text-gray-600 mb-4">
                Jiten brings valuable connections to the Indian market, helping expand our international client base and investment opportunities.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
{/* Stats section removed as requested */}
      
      {/* Testimonials Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-montserrat font-semibold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600">
            Don't just take our word for it — hear directly from our valued clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 relative">
            <div className="text-secondary text-6xl font-playfair absolute top-4 right-6 opacity-20">"</div>
            <p className="text-gray-600 mb-6 relative z-10">
              Desert Jewel Realty went above and beyond to help me find my dream home in Dubai Marina. Their knowledge of the market is exceptional, and their personalized service made the entire process seamless.
            </p>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">JM</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-montserrat font-medium">James Mitchell</h4>
                <p className="text-sm text-gray-500">Dubai Marina Homeowner</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 relative">
            <div className="text-secondary text-6xl font-playfair absolute top-4 right-6 opacity-20">"</div>
            <p className="text-gray-600 mb-6 relative z-10">
              As an international investor, I needed a trustworthy partner in the UAE. Desert Jewel Realty provided invaluable insights and guided me through every step of my investment journey. The returns have exceeded my expectations.
            </p>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">SR</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-montserrat font-medium">Sarah Reynolds</h4>
                <p className="text-sm text-gray-500">International Investor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary py-16 px-4 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 0L600 100V400H0L500 0Z" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-montserrat font-bold text-white mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Whether you're buying, selling, or investing, our team of experts is here to help you achieve your real estate goals.
            </p>
            
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-montserrat font-medium transition-colors duration-200 inline-flex items-center justify-center shadow-md">
                <i className="fas fa-handshake mr-2"></i> Work With Us
              </a>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
