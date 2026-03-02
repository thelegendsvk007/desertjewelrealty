import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { Eye, Check, X, Trash2, MessageCircle } from 'lucide-react';

interface PropertyListing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  area: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  images: string[];
  features: string[];
  amenities: string[];
  developer: string;
  handoverYear: string;
  furnishing: string;
  isGoldenVisaEligible: boolean;
  isMortgageAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard = () => {
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: propertyListings = [], isLoading, isError } = useQuery({
    queryKey: ['/api/property-listings'],
    queryFn: async () => {
      const response = await fetch('/api/property-listings');
      if (!response.ok) throw new Error('Failed to fetch listings');
      return response.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest('PATCH', `/api/property-listings/${id}`, { status });
    },
    onSuccess: () => {
      toast({
        title: 'Status Updated',
        description: 'Property listing status has been updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/property-listings'] });
    },
    onError: () => {
      toast({
        title: 'Update Failed',
        description: 'Failed to update listing status.',
        variant: 'destructive',
      });
    },
  });

  const deleteListingMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/property-listings/${id}`);
    },
    onSuccess: () => {
      toast({
        title: 'Listing Deleted',
        description: 'Property listing has been deleted.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/property-listings'] });
    },
    onError: () => {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete listing.',
        variant: 'destructive',
      });
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
      default:
        return 'secondary';
    }
  };

  const handleViewDetails = (listing: PropertyListing) => {
    setSelectedListing(listing);
  };

  const handleContactViaWhatsApp = (listing: PropertyListing) => {
    const whatsappNumber = '+97589532210';
    const message = `📋 Property Listing Details - ID: ${listing.id}

🏠 Property Information:
• Title: ${listing.title}
• Price: AED ${listing.price.toLocaleString()}
• Location: ${listing.location}
• Type: ${listing.propertyType}
• Bedrooms: ${listing.bedrooms || 'Not specified'}
• Bathrooms: ${listing.bathrooms || 'Not specified'}
• Area: ${listing.area ? listing.area + ' sq ft' : 'Not specified'}

👤 Contact Information:
• Name: ${listing.contactName}
• Phone: ${listing.contactPhone}
• Email: ${listing.contactEmail}

📝 Description:
${listing.description || 'No description provided'}

${listing.features.length > 0 ? `🎯 Features: ${listing.features.join(', ')}` : ''}
${listing.amenities.length > 0 ? `🏖️ Amenities: ${listing.amenities.join(', ')}` : ''}
${listing.developer ? `🏗️ Developer: ${listing.developer}` : ''}
${listing.handoverYear ? `📅 Handover: ${listing.handoverYear}` : ''}
${listing.furnishing ? `🛋️ Furnishing: ${listing.furnishing}` : ''}
${listing.isGoldenVisaEligible ? '✅ Golden Visa Eligible' : ''}
${listing.isMortgageAvailable ? '🏦 Mortgage Available' : ''}

📅 Submitted: ${new Date(listing.createdAt).toLocaleDateString()}
🔄 Status: ${listing.status.toUpperCase()}

This listing was submitted through our website and requires review.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const pendingListings = propertyListings.filter((listing: PropertyListing) => listing.status === 'pending');
  const approvedListings = propertyListings.filter((listing: PropertyListing) => listing.status === 'approved');
  const rejectedListings = propertyListings.filter((listing: PropertyListing) => listing.status === 'rejected');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pt-16"
    >
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage property listings and submissions from users
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{propertyListings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingListings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedListings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedListings.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Property Listings Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingListings.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedListings.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedListings.length})</TabsTrigger>
            <TabsTrigger value="all">All ({propertyListings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <PropertyListingsTable 
              listings={pendingListings}
              onViewDetails={handleViewDetails}
              onUpdateStatus={updateStatusMutation.mutate}
              onDelete={deleteListingMutation.mutate}
              onContactWhatsApp={handleContactViaWhatsApp}
              isUpdating={updateStatusMutation.isPending}
              isDeleting={deleteListingMutation.isPending}
            />
          </TabsContent>

          <TabsContent value="approved">
            <PropertyListingsTable 
              listings={approvedListings}
              onViewDetails={handleViewDetails}
              onUpdateStatus={updateStatusMutation.mutate}
              onDelete={deleteListingMutation.mutate}
              onContactWhatsApp={handleContactViaWhatsApp}
              isUpdating={updateStatusMutation.isPending}
              isDeleting={deleteListingMutation.isPending}
            />
          </TabsContent>

          <TabsContent value="rejected">
            <PropertyListingsTable 
              listings={rejectedListings}
              onViewDetails={handleViewDetails}
              onUpdateStatus={updateStatusMutation.mutate}
              onDelete={deleteListingMutation.mutate}
              onContactWhatsApp={handleContactViaWhatsApp}
              isUpdating={updateStatusMutation.isPending}
              isDeleting={deleteListingMutation.isPending}
            />
          </TabsContent>

          <TabsContent value="all">
            <PropertyListingsTable 
              listings={propertyListings}
              onViewDetails={handleViewDetails}
              onUpdateStatus={updateStatusMutation.mutate}
              onDelete={deleteListingMutation.mutate}
              onContactWhatsApp={handleContactViaWhatsApp}
              isUpdating={updateStatusMutation.isPending}
              isDeleting={deleteListingMutation.isPending}
            />
          </TabsContent>
        </Tabs>

        {/* Property Details Modal */}
        {selectedListing && (
          <PropertyDetailsModal 
            listing={selectedListing}
            onClose={() => setSelectedListing(null)}
            onUpdateStatus={updateStatusMutation.mutate}
            onContactWhatsApp={() => handleContactViaWhatsApp(selectedListing)}
          />
        )}
      </div>
    </motion.div>
  );
};

interface PropertyListingsTableProps {
  listings: PropertyListing[];
  onViewDetails: (listing: PropertyListing) => void;
  onUpdateStatus: (data: { id: number; status: string }) => void;
  onDelete: (id: number) => void;
  onContactWhatsApp: (listing: PropertyListing) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const PropertyListingsTable = ({ 
  listings, 
  onViewDetails, 
  onUpdateStatus, 
  onDelete, 
  onContactWhatsApp,
  isUpdating, 
  isDeleting 
}: PropertyListingsTableProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
      default:
        return 'secondary';
    }
  };

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No listings found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Listings</CardTitle>
        <CardDescription>
          Review and manage submitted property listings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{formatPrice(listing.price)}</TableCell>
                <TableCell>{listing.location}</TableCell>
                <TableCell>{listing.propertyType}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(listing.status)}>
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>{listing.contactName}</TableCell>
                <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(listing)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onContactWhatsApp(listing)}
                      className="bg-green-50 hover:bg-green-100 text-green-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    {listing.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateStatus({ id: listing.id, status: 'approved' })}
                          disabled={isUpdating}
                          className="bg-green-50 hover:bg-green-100 text-green-600"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateStatus({ id: listing.id, status: 'rejected' })}
                          disabled={isUpdating}
                          className="bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(listing.id)}
                      disabled={isDeleting}
                      className="bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface PropertyDetailsModalProps {
  listing: PropertyListing;
  onClose: () => void;
  onUpdateStatus: (data: { id: number; status: string }) => void;
  onContactWhatsApp: () => void;
}

const PropertyDetailsModal = ({ listing, onClose, onUpdateStatus, onContactWhatsApp }: PropertyDetailsModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">{listing.title}</h2>
          <p className="text-gray-600 mt-1">Property ID: {listing.id}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Property Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Price:</span> {formatPrice(listing.price)}</p>
                <p><span className="font-medium">Location:</span> {listing.location}</p>
                <p><span className="font-medium">Type:</span> {listing.propertyType}</p>
                <p><span className="font-medium">Bedrooms:</span> {listing.bedrooms || 'Not specified'}</p>
                <p><span className="font-medium">Bathrooms:</span> {listing.bathrooms || 'Not specified'}</p>
                <p><span className="font-medium">Area:</span> {listing.area ? `${listing.area} sq ft` : 'Not specified'}</p>
                {listing.developer && <p><span className="font-medium">Developer:</span> {listing.developer}</p>}
                {listing.handoverYear && <p><span className="font-medium">Handover:</span> {listing.handoverYear}</p>}
                {listing.furnishing && <p><span className="font-medium">Furnishing:</span> {listing.furnishing}</p>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {listing.contactName}</p>
                <p><span className="font-medium">Phone:</span> {listing.contactPhone}</p>
                <p><span className="font-medium">Email:</span> {listing.contactEmail}</p>
                <p><span className="font-medium">Submitted:</span> {new Date(listing.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> 
                  <Badge variant={listing.status === 'approved' ? 'default' : listing.status === 'rejected' ? 'destructive' : 'secondary'} className="ml-2">
                    {listing.status}
                  </Badge>
                </p>
              </div>
            </div>
          </div>

          {listing.description && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{listing.description}</p>
            </div>
          )}

          {listing.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature, index) => (
                  <Badge key={index} variant="outline">{feature}</Badge>
                ))}
              </div>
            </div>
          )}

          {listing.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline">{amenity}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-6 border-t">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
            <Button onClick={onContactWhatsApp} className="bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact via WhatsApp
            </Button>
            {listing.status === 'pending' && (
              <>
                <Button
                  onClick={() => onUpdateStatus({ id: listing.id, status: 'approved' })}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => onUpdateStatus({ id: listing.id, status: 'rejected' })}
                  variant="destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;