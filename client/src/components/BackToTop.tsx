import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed right-6 bottom-20 z-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button 
            className="bg-white hover:bg-gray-100 text-foreground p-3 rounded-full shadow-lg"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-arrow-up"></i>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
