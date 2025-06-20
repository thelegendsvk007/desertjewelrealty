import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { localStorageService } from '@/lib/localStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LeafletMap from '@/components/LeafletMap';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Phone number must be at least 7 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Form handling
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: ""
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Save to local storage
      localStorageService.saveContactMessage({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message
      });
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. Our team will get back to you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 animated-bg"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Contact Us" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 text-shadow-lg">Contact Us</h1>
            <p className="text-lg text-white mb-0 text-shadow-md font-medium">
              Get in touch with our team of real estate experts
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Property Inquiry">Property Inquiry</SelectItem>
                              <SelectItem value="Investment Consultation">Investment Consultation</SelectItem>
                              <SelectItem value="Property Valuation">Property Valuation</SelectItem>
                              <SelectItem value="Selling Property">Selling Property</SelectItem>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            rows={6}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-teal-dark text-white w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                We'll get back to you within 24 hours
              </p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h3 className="text-xl font-montserrat font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Office Address</h4>
                    <p className="text-gray-600">Dubai, UAE</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <i className="fas fa-phone-alt text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Phone Number</h4>
                    <p className="text-gray-600">
                      <a href="tel:+971589532210" className="hover:text-primary transition-colors duration-200">
                        +971 58 953 2210
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Email Address</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@desertjewelrealty.com" className="hover:text-primary transition-colors duration-200">
                        info@desertjewelrealty.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <i className="fas fa-clock text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Business Hours</h4>
                    <p className="text-gray-600">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Friday - Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-montserrat font-medium mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/share/1Bn4dATDGZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-[#3b5998] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://t.me/desertjewelrealtychat" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                    <i className="fab fa-telegram-plane"></i>
                  </a>
                  <a href="https://wa.me/971589532210" target="_blank" rel="noopener noreferrer" className="bg-[#25d366] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/desert-jewel-realty/" target="_blank" rel="noopener noreferrer" className="bg-[#0e76a8] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.instagram.com/desertjewelrealty/profilecard/?igsh=MXNhenlldHZtYWJhcA==" target="_blank" rel="noopener noreferrer" className="bg-[#c32aa3] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://x.com/desertjewel_?s=21" target="_blank" rel="noopener noreferrer" className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-primary text-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-montserrat font-semibold mb-4">Need Immediate Assistance?</h3>
              <p className="mb-6">
                Our dedicated team is available 24/7 for urgent inquiries and premium property viewings.
              </p>
              <a 
                href="tel:+971589532210" 
                className="bg-white text-primary hover:bg-secondary hover:text-white px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center w-full justify-center"
              >
                <i className="fas fa-phone-alt mr-2"></i> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-[#D4AF37] text-teal-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-montserrat font-semibold mb-6">Our Location</h2>
          <p className="text-teal-700 mb-6">
            Visit our luxurious office at Dubai. Our elite team of real estate consultants are ready to assist you in finding your dream property or investment opportunity across the UAE.
          </p>
          <div className="rounded-xl overflow-hidden h-[400px]">
            <LeafletMap 
              center={[25.209805, 55.273272]} 
              zoom={15}
              markers={[
                {
                  position: [25.209805, 55.273272],
                  popup: "Desert Jewel Realty - Dubai Office"
                }
              ]}
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-montserrat font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-montserrat font-medium mb-2">What services does Desert Jewel Realty offer?</h3>
                <p className="text-gray-600">
                  We offer comprehensive real estate services including property sales and leasing, investment consultation, property management, market analysis, and personalized property searches.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-montserrat font-medium mb-2">How can I schedule a property viewing?</h3>
                <p className="text-gray-600">
                  You can schedule a property viewing by contacting us through our website, email, or phone. Our team will arrange a convenient time for you to visit the property of your interest.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-montserrat font-medium mb-2">Do you work with international clients?</h3>
                <p className="text-gray-600">
                  Yes, we have extensive experience working with international clients. We can assist with all aspects of your property purchase, including legal requirements and financing options for foreign investors.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-montserrat font-medium mb-2">What areas in Dubai do you specialize in?</h3>
                <p className="text-gray-600">
                  We specialize in premium locations throughout Dubai, including Dubai Marina, Palm Jumeirah, Downtown Dubai, Business Bay, and other exclusive communities. Our expertise extends across the entire UAE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
