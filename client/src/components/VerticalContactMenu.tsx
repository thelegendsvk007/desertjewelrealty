import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, Phone, X, Instagram, Send, BrainCircuit } from 'lucide-react';
import RealEstateChatbot from './RealEstateChatbot';

interface VerticalContactMenuProps {
  className?: string;
}

const VerticalContactMenu: React.FC<VerticalContactMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // Contact options in the order shown in the screenshot
  const contactOptions = [
    {
      name: 'Call',
      icon: <Phone className="w-6 h-6" />,
      color: 'bg-green-500',
      link: 'tel:+97112345678' // Replace with actual phone number
    },
    {
      name: 'Telegram',
      icon: <Send className="w-6 h-6" />,
      color: 'bg-blue-500',
      link: 'https://t.me/desertjewelrealty' // Replace with actual Telegram username
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-teal-600',
      link: 'https://wa.me/971123456789' // Replace with actual WhatsApp number
    },
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-purple-500',
      link: 'mailto:info@desertjewelrealty.com' // Replace with actual email
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-pink-500',
      link: 'https://instagram.com/desertjewelrealty' // Replace with actual Instagram page
    },
    {
      name: 'Chatbot',
      icon: <BrainCircuit className="w-6 h-6" />,
      color: 'bg-yellow-500',
      onClick: () => {
        setIsChatbotOpen(true);
        setIsOpen(false);
      }
    }
  ];
  
  // Additional option for closing the menu
  const closeOption = {
    name: 'Close',
    icon: <X className="w-6 h-6" />,
    color: 'bg-yellow-600',
    onClick: () => setIsOpen(false)
  };
  
  return (
    <div className={`fixed z-50 ${className}`}>
      {/* AI Chatbot Component */}
      {isChatbotOpen && (
        <RealEstateChatbot 
          isInitiallyOpen={true} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      )}
      
      {/* Contact Button */}
      {!isChatbotOpen && (
        <div className="fixed right-4 bottom-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="flex flex-col space-y-3 absolute bottom-16 right-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {contactOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    {option.link ? (
                      <a
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${option.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200`}
                        aria-label={option.name}
                      >
                        {option.icon}
                      </a>
                    ) : (
                      <button
                        onClick={option.onClick}
                        className={`${option.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200`}
                        aria-label={option.name}
                      >
                        {option.icon}
                      </button>
                    )}
                    
                    {/* Label that appears on hover */}
                    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow-md text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {option.name}
                    </div>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: contactOptions.length * 0.05 }}
                  className="group relative"
                >
                  <button
                    onClick={closeOption.onClick}
                    className={`${closeOption.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200`}
                    aria-label={closeOption.name}
                  >
                    {closeOption.icon}
                  </button>
                  
                  {/* Label that appears on hover */}
                  <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow-md text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {closeOption.name}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main trigger button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-teal-500 hover:bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Send className="w-6 h-6 -rotate-45" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default VerticalContactMenu;