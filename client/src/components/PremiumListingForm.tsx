import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { localStorageService } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/types';

// Form validation schema
const propertyFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  address: z.string().min(5, { message: 'Address is required' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters long' }),
  price: z.number().min(1, { message: 'Price is required' }),
  beds: z.number().min(0, { message: 'Number of bedrooms is required' }),
  baths: z.number().min(0, { message: 'Number of bathrooms is required' }),
  area: z.number().min(1, { message: 'Area size is required' }),
  propertyType: z.string().min(1, { message: 'Property type is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  contactName: z.string().min(3, { message: 'Contact name is required' }),
  contactEmail: z.string().email({ message: 'Valid email is required' }),
  contactPhone: z.string().min(10, { message: 'Valid phone number is required' }),
  listingType: z.enum(['agent', 'private'], { 
    required_error: 'Please select if you are an agent or private seller' 
  }),
  images: z.any().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PremiumListingFormProps {
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonClass?: string;
  title?: string;
}

const PremiumListingForm = ({ 
  buttonVariant = 'default', 
  buttonSize = 'default',
  buttonClass = '',
  title = 'Submit Premium Listing'
}: PremiumListingFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const { toast } = useToast();


  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      address: '',
      description: '',
      price: undefined,
      beds: undefined,
      baths: undefined,
      area: undefined,
      propertyType: '',
      status: 'For Sale',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      listingType: 'private',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const files = e.target.files;
    if (!files) return;
    
    const newFiles = Array.from(files);
    const newImages = [...selectedImages, ...newFiles];
    setSelectedImages(newImages);
    
    // Create preview URLs for the new images
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    const newPreviewUrls = [...imagePreviewUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);

    try {
      // Convert images to URLs for storage
      const imageUrls = selectedImages.length > 0 
        ? selectedImages.map(file => URL.createObjectURL(file))
        : ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"];

      // Save to local storage
      const propertyListing = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        location: data.address,
        propertyType: data.propertyType,
        bedrooms: Number(data.beds),
        bathrooms: Number(data.baths),
        area: Number(data.area),
        images: imageUrls,
        premium: data.listingType === 'agent',
        exclusive: false,
        newLaunch: false,
        features: [],
        submittedBy: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone
      };
      
      localStorageService.savePropertyListing(propertyListing);

      toast({
        title: 'Success!',
        description: 'Your property listing has been submitted and will be reviewed for approval.',
      });

      // Reset form and close dialog
      form.reset();
      setSelectedImages([]);
      setImagePreviewUrls([]);
      setIsOpen(false);
      
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was a problem submitting your listing. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant}
          size={buttonSize}
          className={`${buttonClass}`}
        >
          <i className="fas fa-star mr-2"></i> {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat">Submit Premium Property Listing</DialogTitle>
          <DialogDescription>
            List your property with premium visibility. Fill in the details below to get started.
            All premium listings are reviewed by our team before going live.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Luxury Apartment in Dubai Marina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type*</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Apartment">Apartment</SelectItem>
                          <SelectItem value="Villa">Villa</SelectItem>
                          <SelectItem value="Penthouse">Penthouse</SelectItem>
                          <SelectItem value="Townhouse">Townhouse</SelectItem>
                          <SelectItem value="Office">Office Space</SelectItem>
                          <SelectItem value="Retail">Retail Space</SelectItem>
                          <SelectItem value="Land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="Address with community and city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (AED)*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Property price" 
                        {...field}
                        onChange={e => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status*</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="For Sale">For Sale</SelectItem>
                          <SelectItem value="For Rent">For Rent</SelectItem>
                          <SelectItem value="Off-Plan">Off-Plan</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (sq.ft)*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Property area" 
                        {...field}
                        onChange={e => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Number of bedrooms" 
                        {...field}
                        onChange={e => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Number of bathrooms" 
                        {...field}
                        onChange={e => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of your property" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Property Images</h3>
              <div className="mb-4">
                <Label htmlFor="images">Upload Images (max 10)*</Label>
                <div className="mt-2">
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full"
                    disabled={selectedImages.length >= 10}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add up to 10 high-quality images. First image will be used as the primary display.
                  </p>
                </div>
              </div>

              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative border rounded-md overflow-hidden h-24">
                      <img 
                        src={url} 
                        alt={`Preview ${index}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center text-red-500 shadow"
                        onClick={() => removeImage(index)}
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-primary text-white text-xs px-1 py-0.5 rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="listingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>You are a*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agent">Real Estate Agent</SelectItem>
                            <SelectItem value="private">Private Seller</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="Your contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Submitting...
                  </span>
                ) : (
                  <span>Submit Premium Listing</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumListingForm;