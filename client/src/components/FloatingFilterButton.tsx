import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { featureCategories } from '@/data/featuresData';

interface SearchParams {
  propertyType: string;
  locationId: string;
  city: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  beds: string;
  status: string;
  bedrooms: string;
  bathrooms: string;
  minArea: number;
  maxArea: number;
  landmark: string;
  developer: string;
  handoverYear: string;
  furnishing: string;
  features: string[];
  amenities: string[];
  isGoldenVisaEligible: boolean;
  isMortgageAvailable: boolean;
  search: string;
}

interface FloatingFilterButtonProps {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  handleSearch: () => void;
  clearFilters: () => void;
}

const FloatingFilterButton: React.FC<FloatingFilterButtonProps> = ({
  searchParams,
  setSearchParams,
  handleSearch,
  clearFilters
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      {/* Floating Filter Button - Only visible on mobile on Properties page */}
      <div className="fixed bottom-4 right-20 z-30 lg:hidden">
        <motion.button
          onClick={() => setShowMobileFilters(true)}
          className="bg-primary text-white w-12 h-12 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open property filters"
        >
          <Filter className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Filter Header - Sticky */}
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Filter Properties</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Mobile Filter Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                <div className="space-y-6">
                  {/* Category Toggle */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          searchParams.category === 'residential'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setSearchParams({...searchParams, category: 'residential'})}
                      >
                        Residential
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          searchParams.category === 'commercial'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setSearchParams({...searchParams, category: 'commercial'})}
                      >
                        Commercial
                      </button>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Property Type</label>
                    <Select 
                      value={searchParams.propertyType}
                      onValueChange={(value) => setSearchParams({...searchParams, propertyType: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-types">All Types</SelectItem>
                        {searchParams.category === 'residential' ? (
                          <>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                            <SelectItem value="showroom">Showroom</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="clinic">Clinic</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Emirate/City */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Emirate</label>
                    <Select 
                      value={searchParams.city}
                      onValueChange={(value) => setSearchParams({...searchParams, city: value, locationId: ''})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select emirate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-emirates">All Emirates</SelectItem>
                        <SelectItem value="Dubai">Dubai</SelectItem>
                        <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="Sharjah">Sharjah</SelectItem>
                        <SelectItem value="Ajman">Ajman</SelectItem>
                        <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                        <SelectItem value="Fujairah">Fujairah</SelectItem>
                        <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: AED {searchParams.minPrice.toLocaleString()} - AED {searchParams.maxPrice.toLocaleString()}
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-500">Min Price</label>
                        <Slider
                          value={[searchParams.minPrice]}
                          onValueChange={(value) => setSearchParams({...searchParams, minPrice: value[0]})}
                          max={500000000}
                          step={5000000}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Max Price</label>
                        <Slider
                          value={[searchParams.maxPrice]}
                          onValueChange={(value) => setSearchParams({...searchParams, maxPrice: value[0]})}
                          max={500000000}
                          step={5000000}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                    <Select 
                      value={searchParams.beds}
                      onValueChange={(value) => setSearchParams({...searchParams, beds: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any-beds">Any</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Status */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Property Status</label>
                    <Select 
                      value={searchParams.status}
                      onValueChange={(value) => setSearchParams({...searchParams, status: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any-status">Any Status</SelectItem>
                        <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                        <SelectItem value="Off-Plan">Off-Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Features & Amenities by Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Features & Amenities</label>
                    <Accordion type="multiple" className="w-full">
                      {featureCategories.map((category, categoryIndex) => (
                        <AccordionItem key={categoryIndex} value={`mobile-category-${categoryIndex}`}>
                          <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                            {category.name} ({category.items.filter(item => searchParams.features.includes(item)).length})
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                              {category.items.map((feature, featureIndex) => {
                                const featureId = `mobile-feature-${categoryIndex}-${featureIndex}`;
                                return (
                                  <div key={featureId} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={featureId}
                                      checked={searchParams.features.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        const newFeatures = checked 
                                          ? [...searchParams.features, feature]
                                          : searchParams.features.filter(f => f !== feature);
                                        setSearchParams({...searchParams, features: newFeatures});
                                      }}
                                    />
                                    <label htmlFor={featureId} className="text-sm cursor-pointer">{feature}</label>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* Special Options */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Special Options</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="floating-goldenvisa"
                          checked={searchParams.isGoldenVisaEligible}
                          onCheckedChange={(checked) => setSearchParams({...searchParams, isGoldenVisaEligible: !!checked})}
                        />
                        <label htmlFor="floating-goldenvisa" className="text-sm">Golden Visa Eligible</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="floating-mortgage"
                          checked={searchParams.isMortgageAvailable}
                          onCheckedChange={(checked) => setSearchParams({...searchParams, isMortgageAvailable: !!checked})}
                        />
                        <label htmlFor="floating-mortgage" className="text-sm">Mortgage Available</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Footer - Sticky */}
              <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                  onClick={() => {
                    handleSearch();
                    setShowMobileFilters(false);
                  }}
                >
                  Apply Filters
                </Button>
                <Button 
                  variant="outline"
                  className="w-full py-3"
                  onClick={() => {
                    clearFilters();
                    setShowMobileFilters(false);
                  }}
                >
                  Clear All Filters
                </Button>
                <Button
                  variant="ghost"
                  className="w-full py-2 text-gray-500"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={16} className="mr-2" />
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingFilterButton;