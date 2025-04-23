import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
            <a className="flex items-center">
              <img 
                src="/src/assets/logo.svg" 
                alt="Desert Jewel Realty Logo" 
                className="h-12 w-auto"
              />
            </a>
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={cn(
                "font-montserrat font-medium transition-colors duration-200",
                location === '/' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Home
              </a>
            </Link>
            
            <div className="dropdown relative group">
              <Link href="/properties">
                <a className={cn(
                  "font-montserrat font-medium transition-colors duration-200 flex items-center",
                  location.startsWith('/properties') ? "text-primary" : "text-foreground hover:text-primary"
                )}>
                  Properties <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
              </Link>
              <div className="dropdown-menu hidden absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                <Link href="/properties?type=apartment">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Apartments
                  </a>
                </Link>
                <Link href="/properties?type=villa">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Villas
                  </a>
                </Link>
                <Link href="/properties?type=penthouse">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Penthouses
                  </a>
                </Link>
                <Link href="/properties?type=off-plan">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Off-Plan
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="dropdown relative group">
              <Link href="/developers">
                <a className={cn(
                  "font-montserrat font-medium transition-colors duration-200 flex items-center",
                  location.startsWith('/developers') ? "text-primary" : "text-foreground hover:text-primary"
                )}>
                  Developers <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </a>
              </Link>
              <div className="dropdown-menu hidden absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                <Link href="/developers/1">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Emaar
                  </a>
                </Link>
                <Link href="/developers/2">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Damac
                  </a>
                </Link>
                <Link href="/developers/3">
                  <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                    Nakheel
                  </a>
                </Link>
              </div>
            </div>
            
            <Link href="/about">
              <a className={cn(
                "font-montserrat font-medium transition-colors duration-200",
                location === '/about' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                About Us
              </a>
            </Link>
            
            <Link href="/contact">
              <a className={cn(
                "font-montserrat font-medium transition-colors duration-200",
                location === '/contact' ? "text-primary" : "text-foreground hover:text-primary"
              )}>
                Contact
              </a>
            </Link>
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact">
              <a className="bg-primary hover:bg-teal-dark text-white px-6 py-2 rounded-full font-montserrat font-medium transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Request a Call
              </a>
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
                <a className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md">
                  Home
                </a>
              </Link>
              <Link href="/properties">
                <a className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md">
                  Properties
                </a>
              </Link>
              <Link href="/developers">
                <a className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md">
                  Developers
                </a>
              </Link>
              <Link href="/about">
                <a className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md">
                  About Us
                </a>
              </Link>
              <Link href="/contact">
                <a className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md">
                  Contact
                </a>
              </Link>
              <Link href="/contact">
                <a className="w-full mt-3 bg-primary text-white px-4 py-2 rounded-full font-medium text-center">
                  Request a Call
                </a>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
