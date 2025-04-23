import { Link } from 'wouter';
import { motion } from 'framer-motion';

const ContactFloatingButton = () => {
  return (
    <div className="fixed right-6 bottom-6 z-40 md:hidden">
      <Link href="/contact">
        <motion.a 
          className="bg-primary hover:bg-teal-dark text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-phone-alt text-lg"></i>
        </motion.a>
      </Link>
    </div>
  );
};

export default ContactFloatingButton;
