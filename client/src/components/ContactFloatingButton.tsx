import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  X,
  Instagram,
  Send,
  Facebook,
  BrainCircuit
} from 'lucide-react';
import RealEstateChatbot from './RealEstateChatbot';

const ContactFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (isOpen) setIsOpen(false);
  };

  // Contact options in the order shown in the screenshot
  const contactOptions = [
    {
      name: 'Call Us',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-green-500',
      link: 'tel:+971589532210',
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      color: 'bg-blue-500',
      link: 'https://t.me/desertjewelrealtychat',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-teal-600',
      link: 'https://wa.me/971599532210',
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-purple-500',
      link: 'mailto:info@desertjewelrealty.com', // Replace with actual email
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-pink-500',
      link: 'https://instagram.com/desertjewelrealty', // Replace with actual Instagram page
    },
    {
      name: 'AI Chatbot',
      icon: <BrainCircuit className="w-5 h-5" />,
      color: 'bg-amber-500',
      onClick: toggleChatbot,
    },
    {
      name: 'Close',
      icon: <X className="w-5 h-5" />,
      color: 'bg-yellow-500',
      onClick: () => setIsOpen(false),
    },
  ];

  return (
    <>
      {/* AI Chatbot Component */}
      {isChatbotOpen && <RealEstateChatbot isInitiallyOpen={true} onClose={() => setIsChatbotOpen(false)} />}
      
      {/* Contact options menu */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col-reverse items-end">
        <AnimatePresence>
          {isOpen && !isChatbotOpen && (
            <>
              {contactOptions.map((option, index) => (
                <motion.div 
                  key={option.name}
                  initial={{ opacity: 0, x: 80, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{ 
                    duration: 0.2,
                    delay: index * 0.05,
                  }}
                  className="mb-3"
                >
                  {option.link ? (
                    <a 
                      href={option.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={option.name}
                      title={option.name}
                      className="block"
                    >
                      <div className={`${option.color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200`}>
                        {option.icon}
                      </div>
                    </a>
                  ) : (
                    <button
                      onClick={option.onClick}
                      aria-label={option.name}
                      title={option.name}
                      className={`${option.color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200`}
                    >
                      {option.icon}
                    </button>
                  )}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main floating button - only hide when chatbot is open */}
        {!isChatbotOpen && (
          <motion.button
            onClick={toggleMenu}
            className="bg-teal-600 border-2 border-white text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close contact options" : "Open contact options"}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Send className="w-6 h-6 -rotate-45" />
            )}
          </motion.button>
        )}
      </div>
    </>
  );
};

export default ContactFloatingButton;