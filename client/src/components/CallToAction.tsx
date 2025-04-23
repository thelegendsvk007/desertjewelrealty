import { Link } from 'wouter';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="bg-primary py-20 px-4 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-10">
        <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M500 0L600 100V400H0L500 0Z" fill="white"/>
        </svg>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
            Ready to Find Your Dream Property in UAE?
          </h2>
          <p className="text-white/90 text-lg mb-10">
            Let Desert Jewel Realty guide you through your real estate journey. Our expert consultants are ready to help you discover exceptional properties tailored to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-montserrat font-medium transition-colors duration-200 inline-flex items-center justify-center shadow-md">
                <i className="fas fa-phone-alt mr-2"></i> Schedule a Consultation
              </a>
            </Link>
            <Link href="/contact">
              <a className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-montserrat font-medium transition-colors duration-200 inline-flex items-center justify-center">
                <i className="fas fa-envelope mr-2"></i> Contact Us
              </a>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
