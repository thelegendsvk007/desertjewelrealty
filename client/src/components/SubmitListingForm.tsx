import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { MessageCircle, Send } from 'lucide-react';

interface SubmitListingFormProps {
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonClass?: string;
}

const SubmitListingForm = ({ buttonVariant = 'default', buttonClass = '' }: SubmitListingFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    features: [] as string[],
    amenities: [] as string[],
    isGoldenVisaEligible: false,
    isMortgageAvailable: false,
    developer: '',
    handoverYear: '',
    furnishing: '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitListingMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/property-listings', {
      ...data,
      price: parseInt(data.price) || 0,
      area: parseInt(data.area) || 0,
      submittedBy: 'user',
      status: 'pending'
    }),
    onSuccess: () => {
      toast({
        title: 'Listing Submitted',
        description: 'Your property listing has been submitted for review.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/property-listings'] });
      setIsOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: 'Submission Failed',
        description: 'Failed to submit your listing. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      features: [],
      amenities: [],
      isGoldenVisaEligible: false,
      isMortgageAvailable: false,
      developer: '',
      handoverYear: '',
      furnishing: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.location || !formData.contactName || !formData.contactPhone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    submitListingMutation.mutate(formData);
  };

  const handleWhatsAppSubmit = () => {
    const whatsappNumber = '+97589532210';
    const message = `🏠 New Property Listing Submission

📝 Property Details:
• Title: ${formData.title}
• Price: AED ${formData.price ? Number(formData.price).toLocaleString() : 'Not specified'}
• Location: ${formData.location}
• Type: ${formData.propertyType}
• Bedrooms: ${formData.bedrooms || 'Not specified'}
• Bathrooms: ${formData.bathrooms || 'Not specified'}
• Area: ${formData.area ? formData.area + ' sq ft' : 'Not specified'}

📞 Contact Information:
• Name: ${formData.contactName}
• Phone: ${formData.contactPhone}
• Email: ${formData.contactEmail}

📄 Description:
${formData.description || 'No description provided'}

${formData.features.length > 0 ? `🎯 Features: ${formData.features.join(', ')}` : ''}
${formData.amenities.length > 0 ? `🏖️ Amenities: ${formData.amenities.join(', ')}` : ''}
${formData.developer ? `🏗️ Developer: ${formData.developer}` : ''}
${formData.handoverYear ? `📅 Handover: ${formData.handoverYear}` : ''}
${formData.furnishing ? `🛋️ Furnishing: ${formData.furnishing}` : ''}
${formData.isGoldenVisaEligible ? '✅ Golden Visa Eligible' : ''}
${formData.isMortgageAvailable ? '🏦 Mortgage Available' : ''}

Please list this property for me. Thank you!`;

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Also submit to database
    handleSubmit(new Event('submit') as any);
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const featuresOptions = [
    'Balcony', 'Built-in Wardrobes', 'Central A/C', 'Kitchen Appliances',
    'Maid\'s Room', 'Study Room', 'Storage Room', 'Walk-in Closet'
  ];

  const amenitiesOptions = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Children\'s Play Area',
    'BBQ Area', 'Garden', 'Concierge', 'Spa', 'Tennis Court'
  ];

  if (!isOpen) {
    return (
      <Button 
        variant={buttonVariant as any}
        className={buttonClass}
        onClick={() => setIsOpen(true)}
      >
        Submit Your Listing
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-montserrat font-bold">Submit Your Property Listing</h2>
          <p className="text-gray-600 mt-1">Fill in the details below to list your property</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Property Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter property title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price (AED) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price in AED"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location *</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Property Type</label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bedrooms</label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Beds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bathrooms</label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, bathrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Baths" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  placeholder="Enter area in sq ft"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name *</label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <Input
                  value={formData.contactPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  placeholder="+971 XX XXX XXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your property..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Developer</label>
                <Input
                  value={formData.developer}
                  onChange={(e) => setFormData(prev => ({ ...prev, developer: e.target.value }))}
                  placeholder="Developer name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Handover Year</label>
                  <Select
                    value={formData.handoverYear}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, handoverYear: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028+">2028+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Furnishing</label>
                  <Select
                    value={formData.furnishing}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, furnishing: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Furnishing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {featuresOptions.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  />
                  <label htmlFor={`feature-${feature}`} className="text-sm">{feature}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <label htmlFor={`amenity-${amenity}`} className="text-sm">{amenity}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="golden-visa"
                checked={formData.isGoldenVisaEligible}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isGoldenVisaEligible: checked as boolean }))}
              />
              <label htmlFor="golden-visa" className="text-sm">Golden Visa Eligible</label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mortgage"
                checked={formData.isMortgageAvailable}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isMortgageAvailable: checked as boolean }))}
              />
              <label htmlFor="mortgage" className="text-sm">Mortgage Available</label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="sm:w-auto"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={submitListingMutation.isPending}
              className="sm:w-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              {submitListingMutation.isPending ? 'Submitting...' : 'Submit Listing'}
            </Button>
            
            <Button
              type="button"
              onClick={handleWhatsAppSubmit}
              disabled={submitListingMutation.isPending}
              className="sm:w-auto bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Submit on WhatsApp
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SubmitListingForm;