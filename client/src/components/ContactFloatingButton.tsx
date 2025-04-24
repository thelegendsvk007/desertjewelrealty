import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  X,
  Instagram,
  Send
} from 'lucide-react';

const ContactFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-green-500',
      link: 'https://wa.me/971123456789', // Replace with actual WhatsApp number
      labelColor: 'text-green-500',
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      color: 'bg-blue-500',
      link: 'https://t.me/desertjewelrealty', // Replace with actual Telegram username
      labelColor: 'text-blue-500',
    },
    {
      name: 'Chat with Us',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-teal-600',
      onClick: () => {
        // Implement chatbot open logic
        console.log('Open chatbot');
      },
      labelColor: 'text-teal-600',
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-purple-500',
      link: 'mailto:info@desertjewelrealty.com', // Replace with actual email
      labelColor: 'text-purple-500',
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-pink-500',
      link: 'https://instagram.com/desertjewelrealty', // Replace with actual Instagram page
      labelColor: 'text-pink-500',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-16 right-0 mb-2"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-4 w-64">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-teal-800">Contact Us</h3>
                <button 
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {contactOptions.map((option, index) => (
                  <motion.div 
                    key={option.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    {option.link ? (
                      <a 
                        href={option.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div className={`${option.color} p-2 rounded-full text-white mr-3`}>
                          {option.icon}
                        </div>
                        <span className={`${option.labelColor} font-medium group-hover:font-semibold transition-all duration-150`}>
                          {option.name}
                        </span>
                      </a>
                    ) : (
                      <button
                        onClick={option.onClick}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 w-full text-left"
                      >
                        <div className={`${option.color} p-2 rounded-full text-white mr-3`}>
                          {option.icon}
                        </div>
                        <span className={`${option.labelColor} font-medium group-hover:font-semibold transition-all duration-150`}>
                          {option.name}
                        </span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        onClick={toggleMenu}
        className={`${isOpen ? 'bg-[#D4AF37]' : 'bg-teal-600 border-2 border-[#D4AF37]'} text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: isOpen ? 
            "0 10px 15px -3px rgba(212, 175, 55, 0.2), 0 4px 6px -2px rgba(212, 175, 55, 0.1)" : 
            ["0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", 
             "0 10px 15px -3px rgba(0, 128, 128, 0.3), 0 4px 6px -2px rgba(0, 128, 128, 0.2)",
             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"]
        }}
        transition={{
          boxShadow: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
        aria-label="Contact options"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <motion.div 
              className="absolute top-0 right-0 w-full h-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <MessageCircle className="w-6 h-6 text-white/50" />
            </motion.div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ContactFloatingButton;