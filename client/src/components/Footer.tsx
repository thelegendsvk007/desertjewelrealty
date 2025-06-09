import { Link } from 'wouter';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import logopng from '../assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    // Submit subscription (would connect to API in real implementation)
    toast({
      title: "Subscription successful",
      description: "Thank you for subscribing to our newsletter!",
      variant: "default"
    });
    
    setEmail('');
  };

  return (
    <footer className="bg-dark-darker text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src= {logopng} alt="Desert Jewel Realty Logo" className="h-16 mb-6" />
            <p className="text-gray-400 mb-6">
              Dubai's premier luxury real estate brokerage, connecting dreams to reality across the UAE.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1Bn4dATDGZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/desertjewelrealty/profilecard/?igsh=MXNhenlldHZtYWJhcA==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/desert-jewel-realty/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://x.com/desertjewel_?s=21" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 24 24" style={{verticalAlign: 'baseline'}}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://t.me/desertjewelrealtychat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-telegram-plane"></i>
              </a>
              <a href="https://wa.me/971589532210" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Properties</a>
                </Link>
              </li>
              <li>
                <Link href="/developers">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Developers</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Career</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">UAE Emirates</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties?city=dubai">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Dubai</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=abudhabi">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Abu Dhabi</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=sharjah">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Sharjah</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=ajman">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Ajman</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=rasalkhaimah">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Ras Al Khaimah</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=fujairah">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Fujairah</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=ummalquwain">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Umm Al Quwain</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                <span className="text-gray-400">Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-primary mr-3"></i>
                <a href="tel:+971589532210" className="text-gray-400 hover:text-primary transition-colors duration-200">+971 58 953 2210</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-primary mr-3"></i>
                <a href="mailto:info@desertjewelrealty.com" className="text-gray-400 hover:text-primary transition-colors duration-200">info@desertjewelrealty.com</a>
              </li>
            </ul>
            
            <div className="mt-8">
              <h3 className="font-montserrat font-semibold text-lg mb-4">Subscribe to our Newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-dark-light text-white placeholder-gray-500 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-teal-dark text-white px-4 py-2 rounded-r-md transition-colors duration-200"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:text-left md:flex md:justify-between md:items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Desert Jewel Realty. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-500">
              <li>
                <Link href="/privacy-policy">
                  <a className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <a className="hover:text-primary transition-colors duration-200">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy">
                  <a className="hover:text-primary transition-colors duration-200">Cookies Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
