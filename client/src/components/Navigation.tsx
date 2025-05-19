import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import logopng from '../assets/logo.png'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-md"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img 
                src='{logopng}'
                alt="Desert Jewel Realty Logo" 
                className="h-14 w-auto"
              />
            </div>
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className={cn(
                "font-montserrat font-medium transition-colors duration-200 cursor-pointer",
                location === '/' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Home
              </span>
            </Link>
            
            <div className="dropdown relative group">
              <div className={cn(
                "font-montserrat font-medium transition-colors duration-200 flex items-center cursor-pointer",
                location.startsWith('/properties') ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Properties <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </div>
              <div className="absolute left-0 top-full pt-2 w-48 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <div className="py-1">
                    <Link href="/properties?type=apartment">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Apartments
                      </div>
                    </Link>
                    <Link href="/properties?type=villa">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Villas
                      </div>
                    </Link>
                    <Link href="/properties?type=penthouse">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Penthouses
                      </div>
                    </Link>
                    <Link href="/properties?type=off-plan">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Off-Plan
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dropdown relative group">
              <div className={cn(
                "font-montserrat font-medium transition-colors duration-200 flex items-center cursor-pointer",
                location.startsWith('/developers') ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Developers <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </div>
              <div className="absolute left-0 top-full pt-2 w-48 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <div className="py-1">
                    <Link href="/developers/1">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Emaar
                      </div>
                    </Link>
                    <Link href="/developers/2">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Damac
                      </div>
                    </Link>
                    <Link href="/developers/3">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Nakheel
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dropdown relative group">
              <div className={cn(
                "font-montserrat font-medium transition-colors duration-200 flex items-center cursor-pointer",
                location.startsWith('/tools') ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Tools <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </div>
              <div className="absolute left-0 top-full pt-2 w-48 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <div className="py-1">
                    <Link href="/investment-tools">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        AI Property Matchmaker
                      </div>
                    </Link>
                    <Link href="/investment-tools?tab=price-predictor">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Price Prediction Tool
                      </div>
                    </Link>
                    <Link href="/tools?tab=roi">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        ROI Calculator
                      </div>
                    </Link>
                    <Link href="/tools?tab=mortgage">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Mortgage Calculator
                      </div>
                    </Link>
                    <Link href="/tools?tab=comparison">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Off-Plan vs Ready
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/location-insights">
              <span className={cn(
                "font-montserrat font-medium transition-colors duration-200 cursor-pointer",
                location === '/location-insights' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Location Insights
              </span>
            </Link>
            
            <Link href="/about">
              <span className={cn(
                "font-montserrat font-medium transition-colors duration-200 cursor-pointer",
                location === '/about' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                About Us
              </span>
            </Link>
            
            <div className="dropdown relative group">
              <div className={cn(
                "font-montserrat font-medium transition-colors duration-200 flex items-center cursor-pointer",
                location === '/contact' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Contact <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </div>
              <div className="absolute left-0 top-full pt-2 w-48 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <div className="py-1">
                    <Link href="/contact">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        Contact Us
                      </div>
                    </Link>
                    <Link href="/faq">
                      <div className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white cursor-pointer">
                        FAQ
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact">
              <span className="bg-primary hover:bg-teal-dark text-white px-6 py-2 rounded-full font-montserrat font-medium transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer inline-block">
                Request a Call
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-md p-2 text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              <Link href="/">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/properties">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Properties
                </span>
              </Link>
              <Link href="/developers">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Developers
                </span>
              </Link>
              <Link href="/tools">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Tools
                </span>
              </Link>
              <Link href="/investment-tools">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Investment Tools
                </span>
              </Link>
              <Link href="/location-insights">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Location Insights
                </span>
              </Link>
              <Link href="/about">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  About Us
                </span>
              </Link>
              <Link href="/contact">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  Contact
                </span>
              </Link>
              <Link href="/faq">
                <span className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer">
                  FAQ
                </span>
              </Link>
              <Link href="/contact">
                <span className="block w-full mt-3 bg-primary text-white px-4 py-2 rounded-full font-medium text-center cursor-pointer">
                  Request a Call
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;