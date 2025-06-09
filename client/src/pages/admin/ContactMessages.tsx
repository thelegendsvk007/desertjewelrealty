import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Clock, CheckCircle, MessageSquare } from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  createdAt: string;
}

const ContactMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch contact messages
  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages'],
    queryFn: async () => {
      const response = await fetch('/api/contact-messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return response.json();
    },
  });

  // Update message status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-messages'] });
      toast({
        title: "Status Updated",
        description: "Message status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update message status.",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive">Unread</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'responded':
        return <Badge variant="default">Responded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <p className="text-gray-600">
          Manage and respond to customer inquiries ({unreadCount} unread)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                All Messages ({messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No messages yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow 
                        key={message.id}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          message.status === 'unread' ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{message.name}</p>
                            <p className="text-sm text-gray-500">{message.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{getStatusBadge(message.status)}</TableCell>
                        <TableCell>
                          {format(new Date(message.createdAt), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={message.status}
                            onValueChange={(status) => 
                              updateStatus.mutate({ id: message.id, status })
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unread">Unread</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="responded">Responded</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-4">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Message Details
                  {getStatusBadge(selectedMessage.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">From</h4>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Email</h4>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Phone</h4>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a 
                      href={`tel:${selectedMessage.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Subject</h4>
                  <p>{selectedMessage.subject}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Message</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Received</h4>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">
                      {format(new Date(selectedMessage.createdAt), 'PPpp')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                  >
                    Reply via Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`tel:${selectedMessage.phone}`)}
                  >
                    Call Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMessages;