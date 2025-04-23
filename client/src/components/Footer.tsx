import { Link } from 'wouter';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
            <img src="/src/assets/desert-jewel-logo.svg" alt="Desert Jewel Realty Logo" className="h-16 mb-6" />
            <p className="text-gray-400 mb-6">
              Dubai's premier luxury real estate brokerage, connecting dreams to reality across the UAE.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <i className="fab fa-twitter"></i>
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
            <h3 className="font-montserrat font-semibold text-lg mb-6">Areas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties?location=1">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Dubai Marina</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?location=2">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Palm Jumeirah</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?location=3">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Downtown Dubai</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?location=4">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Business Bay</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?location=5">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Jumeirah</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?location=6">
                  <a className="text-gray-400 hover:text-primary transition-colors duration-200">Arabian Ranches</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                <span className="text-gray-400">Dubai Marina, Al Marsa Street, Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-primary mr-3"></i>
                <a href="tel:+97143889900" className="text-gray-400 hover:text-primary transition-colors duration-200">+971 4 388 9900</a>
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
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Cookies Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
