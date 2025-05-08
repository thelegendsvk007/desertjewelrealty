import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatArea } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/types';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminReview = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all properties
  const { data: properties, isLoading } = useQuery({
    queryKey: ['/api/properties'],
  });

  // Define mutation for deleting property
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: number) => {
      setIsDeleting(true);
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Refetch properties after deletion
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/properties/featured'] });
      
      toast({
        title: 'Success',
        description: 'Property has been deleted successfully',
      });
      
      setPropertyToDelete(null);
      setIsDeleting(false);
    },
    onError: (error) => {
      console.error('Error deleting property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete property',
      });
      setIsDeleting(false);
    },
  });

  const handleDeleteProperty = (id: number) => {
    setPropertyToDelete(id);
  };

  const confirmDeleteProperty = () => {
    if (propertyToDelete) {
      deletePropertyMutation.mutate(propertyToDelete);
    }
  };

  // Define mutation for updating property status
  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, action }: { id: number | string, action: 'approve' | 'reject' }) => {
      const response = await fetch(`/api/properties/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: action === 'approve' ? 'approved' : 'rejected',
          // Additional status update information
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Admin' // In a real app, this would be the admin user's ID or name
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update property status');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Refetch properties after update
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({
        title: 'Success',
        description: 'Property status updated successfully',
      });
    },
    onError: (error) => {
      console.error('Error updating property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update property status',
      });
    },
  });

  // Filter properties based on active tab
  const getPendingProperties = () => {
    if (!properties) return [];
    return properties.filter((property: any) => 
      property.reviewStatus === 'pending' || !property.reviewStatus);
  };

  const getApprovedProperties = () => {
    if (!properties) return [];
    return properties.filter((property: any) => property.reviewStatus === 'approved');
  };

  const getRejectedProperties = () => {
    if (!properties) return [];
    return properties.filter((property: any) => property.reviewStatus === 'rejected');
  };

  const handleApprove = (id: number | string) => {
    updatePropertyMutation.mutate({ id, action: 'approve' });
  };

  const handleReject = (id: number | string) => {
    updatePropertyMutation.mutate({ id, action: 'reject' });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Property Listings Review</h1>
        <p className="text-gray-600 mt-2">
          Review and manage property submissions from agents and private sellers
        </p>
      </div>
      
      {/* Property Deletion Confirmation Dialog */}
      <AlertDialog open={!!propertyToDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this property?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property listing
              from our servers and remove it from all property listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPropertyToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProperty}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Property"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">
            Pending Review <Badge variant="outline" className="ml-2">{getPendingProperties().length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved <Badge variant="outline" className="ml-2">{getApprovedProperties().length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected <Badge variant="outline" className="ml-2">{getRejectedProperties().length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {isLoading ? (
            <div className="text-center py-10">Loading properties...</div>
          ) : getPendingProperties().length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium">No pending listings</h3>
              <p className="text-gray-600 mt-2">All property submissions have been reviewed</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getPendingProperties().map((property: any) => (
                <PropertyReviewCard 
                  key={property.id} 
                  property={property}
                  onApprove={() => handleApprove(property.id)}
                  onReject={() => handleReject(property.id)}
                  onDelete={handleDeleteProperty}
                  isPending={true}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {isLoading ? (
            <div className="text-center py-10">Loading properties...</div>
          ) : getApprovedProperties().length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium">No approved listings</h3>
              <p className="text-gray-600 mt-2">Approved listings will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getApprovedProperties().map((property: any) => (
                <PropertyReviewCard 
                  key={property.id} 
                  property={property}
                  onDelete={handleDeleteProperty}
                  isPending={false}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {isLoading ? (
            <div className="text-center py-10">Loading properties...</div>
          ) : getRejectedProperties().length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium">No rejected listings</h3>
              <p className="text-gray-600 mt-2">Rejected listings will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getRejectedProperties().map((property: any) => (
                <PropertyReviewCard 
                  key={property.id} 
                  property={property}
                  onApprove={() => handleApprove(property.id)}
                  onDelete={handleDeleteProperty}
                  isPending={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PropertyReviewCardProps {
  property: any;
  onApprove?: () => void;
  onReject?: () => void;
  isPending: boolean;
  onDelete?: (id: number) => void;
}

const PropertyReviewCard = ({ property, onApprove, onReject, isPending, onDelete }: PropertyReviewCardProps) => {
  let statusBadge;
  
  if (property.reviewStatus === 'approved') {
    statusBadge = <Badge className="bg-green-500">Approved</Badge>;
  } else if (property.reviewStatus === 'rejected') {
    statusBadge = <Badge className="bg-red-500">Rejected</Badge>;
  } else {
    statusBadge = <Badge className="bg-yellow-500">Pending</Badge>;
  }

  // Handle image display
  const images = typeof property.images === 'string' 
    ? JSON.parse(property.images) 
    : Array.isArray(property.images) 
      ? property.images 
      : [];
  
  const featuredImage = images.length > 0 ? images[0] : '';

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img 
          src={featuredImage} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          {statusBadge}
        </div>
        {property.premium && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-primary text-white">Premium</Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription>{property.address}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-xl">{formatPrice(property.price)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-500">Type</p>
            <p className="font-medium">{property.propertyType}</p>
          </div>
          <div>
            <p className="text-gray-500">Bedrooms</p>
            <p className="font-medium">{property.beds}</p>
          </div>
          <div>
            <p className="text-gray-500">Area</p>
            <p className="font-medium">{formatArea(property.area)}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Description</p>
          <p className="line-clamp-2">{property.description}</p>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{property.status}</Badge>
            <Badge variant="outline">
              {property.listingType === 'agent' ? 'Agent' : 'Private Seller'}
            </Badge>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-gray-500 text-sm">Contact Information</p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium">{property.contactName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{property.contactEmail}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      {isPending && (
        <CardFooter className="border-t flex justify-between p-4">
          <Button variant="outline" onClick={onReject}>
            Reject
          </Button>
          <Button onClick={onApprove}>
            Approve
          </Button>
        </CardFooter>
      )}
      
      {property.reviewStatus === 'rejected' && onApprove && (
        <CardFooter className="border-t p-4">
          <Button className="w-full" onClick={onApprove}>
            Reconsider & Approve
          </Button>
        </CardFooter>
      )}
      
      {/* Delete Button - always shown for all property statuses */}
      <CardFooter className={`${isPending || (property.reviewStatus === 'rejected' && onApprove) ? '' : 'border-t'} p-4`}>
        <Button 
          variant="destructive" 
          className="w-full flex items-center gap-2"
          onClick={() => onDelete && onDelete(property.id)}
        >
          <i className="fas fa-trash-alt"></i>
          Delete Property
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminReview;