import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Loader2, LogOut, Home } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatPrice, formatArea } from "@/lib/utils";
import ContactMessages from "./ContactMessages";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeMainTab, setActiveMainTab] = useState("properties");
  const [activePropertiesTab, setActivePropertiesTab] = useState("pending");
  const [activeContentTab, setActiveContentTab] = useState("blogs");
  const [activeOffPlanTab, setActiveOffPlanTab] = useState("projects");
  const [activeDocumentsTab, setActiveDocumentsTab] = useState("all");
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Fetch all properties
  const { data: properties, isLoading: propertiesLoading } = useQuery({
    queryKey: ["/api/properties"],
    retry: false,
  });

  // Fetch all developers
  const { data: developers, isLoading: developersLoading } = useQuery({
    queryKey: ["/api/developers"],
    retry: false,
  });

  // Calculate properties stats safely
  const getPendingProperties = () => {
    if (!properties) return [];
    return properties.filter((property: any) => property.reviewStatus === "pending");
  };

  const getApprovedProperties = () => {
    if (!properties) return [];
    return properties.filter((property: any) => property.reviewStatus === "approved");
  };

  const getRejectedProperties = () => {
    if (!properties) return [];
    return properties.filter((property: any) => property.reviewStatus === "rejected");
  };

  // Real-time metrics from actual data
  const websiteMetrics = {
    totalListings: properties ? properties.length : 0,
    activeListings: properties ? properties.filter((p: any) => p.status === "active").length : 0,
    pendingApprovals: getPendingProperties().length,
    topSearchAreas: properties 
      ? Array.from(new Set(properties.map((p: any) => p.location)))
        .slice(0, 5)
      : [],
    deviceUsage: {
      mobile: 68,
      desktop: 22,
      tablet: 10,
    },
    totalViews: properties 
      ? properties.reduce((sum: number, p: any) => sum + (p.views || 0), 0) 
      : 0,
    totalInquiries: properties 
      ? properties.reduce((sum: number, p: any) => sum + (p.inquiries || 0), 0) 
      : 0,
    viewsThisWeek: properties 
      ? properties.reduce((sum: number, p: any) => sum + (p.viewsThisWeek || 0), 0) 
      : 0,
    conversionRate: properties && properties.length > 0
      ? `${((properties.reduce((sum: number, p: any) => sum + (p.inquiries || 0), 0) / 
         properties.reduce((sum: number, p: any) => sum + (p.views || 0), 0)) * 100).toFixed(2)}%`
      : "0%",
    avgTimeOnSite: "3m 42s",
    activeUsers: 1257,
  };

  // Mock property performance stats
  const propertyStats = {
    mostViewed: [
      { id: 1, title: "Luxury Villa in Palm Jumeirah", views: 1240 },
      { id: 3, title: "Modern Apartment in Dubai Marina", views: 986 },
      { id: 5, title: "Penthouse in Downtown Dubai", views: 762 },
    ],
    mostSaved: [
      { id: 1, title: "Luxury Villa in Palm Jumeirah", saves: 156 },
      { id: 7, title: "Family Home in Arabian Ranches", saves: 127 },
      { id: 3, title: "Modern Apartment in Dubai Marina", saves: 98 },
    ],
    longestOnMarket: [
      { id: 10, title: "Office Space in Business Bay", days: 124 },
      { id: 12, title: "Retail Space in Mall of Emirates", days: 97 },
      { id: 8, title: "Studio Apartment in Sport City", days: 85 },
    ]
  };

  // Mock content items for CMS
  const contentItems = {
    blogs: [
      { id: 1, title: "Dubai Real Estate Market Trends 2025", date: "2025-04-15", status: "published" },
      { id: 2, title: "Top 10 Family-Friendly Communities in Dubai", date: "2025-04-10", status: "published" },
      { id: 3, title: "Investment Guide: Golden Visa Properties", date: "2025-04-05", status: "draft" },
    ],
    news: [
      { id: 4, title: "New Metro Line to Connect Dubai South", date: "2025-04-18", status: "published" },
      { id: 5, title: "Government Announces New Property Regulations", date: "2025-04-08", status: "published" },
    ],
    areaGuides: [
      { id: 6, title: "Dubai Marina Area Guide", date: "2025-03-25", status: "published" },
      { id: 7, title: "Palm Jumeirah Living Guide", date: "2025-03-15", status: "published" },
      { id: 8, title: "Downtown Dubai: The Heart of the City", date: "2025-03-05", status: "draft" },
    ],
    banners: [
      { id: 9, title: "Premium Listings Banner", placement: "Homepage Hero", active: true },
      { id: 10, title: "Golden Visa Properties", placement: "Property Sidebar", active: true },
      { id: 11, title: "Summer Promotion", placement: "Homepage Footer", active: false },
    ]
  };

  // Mock offplan projects
  const offplanProjects = [
    { 
      id: 1, 
      name: "Emaar Beachfront Residences", 
      developer: "Emaar Properties",
      location: "Dubai Harbour",
      completionDate: "Q4 2025",
      constructionProgress: 65,
      totalUnits: 450,
      availableUnits: 112,
      priceRange: "AED 1.5M - AED 8M"
    },
    { 
      id: 2, 
      name: "Creek Harbour Towers", 
      developer: "Emaar Properties",
      location: "Dubai Creek Harbour",
      completionDate: "Q2 2026",
      constructionProgress: 40,
      totalUnits: 680,
      availableUnits: 284,
      priceRange: "AED 1.2M - AED 6.5M"
    },
    { 
      id: 3, 
      name: "Marina Vista", 
      developer: "DAMAC Properties",
      location: "Dubai Marina",
      completionDate: "Q3 2025",
      constructionProgress: 75,
      totalUnits: 320,
      availableUnits: 86,
      priceRange: "AED 1.8M - AED 7.2M"
    },
  ];

  // Mock documents
  const documents = [
    { id: 1, name: "Sales Contract Template", type: "contract", accessLevel: "admin", uploadedBy: "Admin", uploadDate: "2025-04-20" },
    { id: 2, name: "Emaar Beachfront Brochure", type: "brochure", accessLevel: "all", uploadedBy: "Marketing", uploadDate: "2025-04-15" },
    { id: 3, name: "Title Deed Sample", type: "title deed", accessLevel: "admin", uploadedBy: "Legal", uploadDate: "2025-04-10" },
    { id: 4, name: "Payment Plan Template", type: "payment plan", accessLevel: "all", uploadedBy: "Finance", uploadDate: "2025-04-05" },
  ];

  // Mock notification campaigns
  const notificationCampaigns = [
    { id: 1, name: "New Property Alert", scheduledDate: "2025-05-15", status: "scheduled", recipients: 1250, type: "email" },
    { id: 2, name: "Price Drop Notification", scheduledDate: "2025-05-10", status: "scheduled", recipients: 860, type: "push" },
    { id: 3, name: "Monthly Newsletter", scheduledDate: "2025-05-01", status: "sent", recipients: 2450, type: "email" },
    { id: 4, name: "Open House Invitation", scheduledDate: "2025-04-25", status: "sent", recipients: 520, type: "sms" },
  ];

  // Handle property approval
  const approveMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const res = await apiRequest("PATCH", `/api/properties/${propertyId}/status`, {
        status: "approved"
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Property approved",
        description: "The property has been approved successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Approval failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle property rejection
  const rejectMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const res = await apiRequest("PATCH", `/api/properties/${propertyId}/status`, {
        status: "rejected"
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Property rejected",
        description: "The property has been rejected",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Rejection failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle property deletion
  const deleteMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const res = await apiRequest("DELETE", `/api/properties/${propertyId}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete property");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Property deleted",
        description: "The property has been deleted successfully",
      });
      setIsAlertOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion failed",
        description: error.message,
        variant: "destructive",
      });
      setIsAlertOpen(false);
    },
  });

  const handleApprove = (id: number) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id: number) => {
    rejectMutation.mutate(id);
  };

  const confirmDelete = (id: number) => {
    setPropertyToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    if (propertyToDelete) {
      deleteMutation.mutate(propertyToDelete);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Desert Jewel Realty</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
              {user && (
                <Badge variant="outline" className="ml-2">
                  {user.username}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{websiteMetrics.totalListings}</div>
                <p className="text-sm text-muted-foreground">
                  All properties in system
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{websiteMetrics.activeListings}</div>
                <p className="text-sm text-muted-foreground">
                  Live on the marketplace
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{websiteMetrics.pendingApprovals}</div>
                <p className="text-sm text-muted-foreground">
                  Awaiting review
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{websiteMetrics.totalInquiries}</div>
                <p className="text-sm text-muted-foreground">
                  Conversion: {websiteMetrics.conversionRate}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Views This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{websiteMetrics.viewsThisWeek}</div>
                <p className="text-sm text-muted-foreground">
                  Last 7 days
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Action Needed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {websiteMetrics.pendingApprovals + 3}
                </div>
                <p className="text-sm text-muted-foreground">
                  Tasks requiring attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Area</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-primary">
                  {websiteMetrics.topSearchAreas.length > 0 ? websiteMetrics.topSearchAreas[0] : "No data"}
                </div>
                <p className="text-sm text-muted-foreground">
                  Most viewed location
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-sm">All systems active</div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  3 automation rules running
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Live Notifications Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                      Live Notifications
                    </div>
                  </CardTitle>
                  <Badge variant="outline">Now</Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-[320px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-2 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="bg-blue-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">New Property Inquiry</h4>
                        <span className="text-xs text-muted-foreground">Just now</span>
                      </div>
                      <p className="text-sm text-muted-foreground">John Smith inquired about Luxury Villa in Palm Jumeirah</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-2 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="bg-yellow-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Listing Expiring Soon</h4>
                        <span className="text-xs text-muted-foreground">10 minutes ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Modern Apartment in Dubai Marina expires in 3 days</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Renew</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-2 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="bg-green-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Mortgage Calculator Submission</h4>
                        <span className="text-xs text-muted-foreground">25 minutes ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Sarah Johnson calculated mortgage for Palm Jumeirah property</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-2 border border-gray-200 rounded">
                    <div className="bg-gray-100 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">New Message</h4>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">You received a message from Mike regarding Penthouse property</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">Read</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-3 border-t flex justify-between items-center">
                <Button variant="link" size="sm" className="text-sm text-muted-foreground">Mark all as read</Button>
                <Button variant="link" size="sm" className="text-sm">View All Notifications</Button>
              </div>
            </Card>
            
            {/* Area-wise Demand Heatmap */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Area-wise Demand</CardTitle>
                <CardDescription>Based on views & inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {websiteMetrics.topSearchAreas.map((area, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{area}</span>
                        <span className="text-xs text-muted-foreground">{90 - (index * 15)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${90 - (index * 15)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  View Full Heatmap
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="max-h-[250px] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">New property submitted for review</p>
                      <span className="text-xs text-gray-500">10 mins ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">3-bedroom villa in Palm Jumeirah</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Property approved</p>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Luxury Villa in Palm Jumeirah is now live</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">New inquiry received</p>
                      <span className="text-xs text-gray-500">3 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">For Luxury Villa in Palm Jumeirah</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Draft property saved</p>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Created draft for Studio Apartment in JLT</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Listing removed</p>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Removed Office Space in Business Bay</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="properties" value={activeMainTab} onValueChange={setActiveMainTab} className="mb-8">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="properties">
                Properties
                {getPendingProperties().length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {getPendingProperties().length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages">Contact Messages</TabsTrigger>
              <TabsTrigger value="enhanced">Enhanced Management</TabsTrigger>
              <TabsTrigger value="stats">Property Stats</TabsTrigger>
              <TabsTrigger value="leads">Lead Management</TabsTrigger>
              <TabsTrigger value="developers">Developer Profiles</TabsTrigger>
              <TabsTrigger value="offplan">Off-Plan Projects</TabsTrigger>
              <TabsTrigger value="featured">Featured Developments</TabsTrigger>
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="utilities">Admin Utilities</TabsTrigger>
            </TabsList>

            {/* Dashboard Overview Tab */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Website Analytics</CardTitle>
                    <CardDescription>Performance metrics from the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Analytics chart visualization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                    <CardDescription>User device breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span>Mobile</span>
                          <span className="font-medium">{websiteMetrics.deviceUsage.mobile}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${websiteMetrics.deviceUsage.mobile}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span>Desktop</span>
                          <span className="font-medium">{websiteMetrics.deviceUsage.desktop}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${websiteMetrics.deviceUsage.desktop}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span>Tablet</span>
                          <span className="font-medium">{websiteMetrics.deviceUsage.tablet}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${websiteMetrics.deviceUsage.tablet}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Search Areas</CardTitle>
                    <CardDescription>Most searched locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {websiteMetrics.topSearchAreas.map((area, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0 rounded-full">
                            {index + 1}
                          </Badge>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest platform events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                        <div>
                          <p className="font-medium">New property listing submitted</p>
                          <p className="text-sm text-muted-foreground">3-bedroom villa in Palm Jumeirah</p>
                          <p className="text-xs text-muted-foreground">15 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                        <div>
                          <p className="font-medium">Property inquiry received</p>
                          <p className="text-sm text-muted-foreground">For Luxury Villa in Palm Jumeirah</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>
                        <div>
                          <p className="font-medium">Price changed</p>
                          <p className="text-sm text-muted-foreground">Modern Apartment in Dubai Marina (-5%)</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                        <div>
                          <p className="font-medium">New user registered</p>
                          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Properties Management Tab */}
            <TabsContent value="properties">
              <Tabs defaultValue="pending" value={activePropertiesTab} onValueChange={setActivePropertiesTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="pending">
                    Pending Review
                    {getPendingProperties().length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {getPendingProperties().length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  <TabsTrigger value="draft">
                    Drafts
                    <Badge variant="outline" className="ml-2">3</Badge>
                  </TabsTrigger>
                </TabsList>
            
            {/* Enhanced Property Management Tab */}
            <TabsContent value="enhanced">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </div>
                      <CardTitle>Property Draft Mode</CardTitle>
                    </div>
                    <CardDescription>Save incomplete listings as drafts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">2BR Apartment - JLT</h4>
                          <Badge variant="outline">Draft</Badge>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Last updated:</span>
                          <span>Yesterday, 3:45 PM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: "65%"}}></div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm">Publish</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Villa - Emirates Hills</h4>
                          <Badge variant="outline">Draft</Badge>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Last updated:</span>
                          <span>3 days ago</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: "30%"}}></div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" disabled>Publish</Button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      Create New Draft
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </div>
                      <CardTitle>Auto Image Optimization</CardTitle>
                    </div>
                    <CardDescription>Compress and watermark images on upload</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span className="font-medium">Auto-compression</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span className="font-medium">Watermarking</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span className="font-medium">Image resizing</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span className="font-medium">Bulk image upload</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md mt-4">
                      <h4 className="font-medium mb-2">Statistics</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Storage saved:</span>
                          <span>4.7 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Images processed:</span>
                          <span>1,248</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average compression:</span>
                          <span>62%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                      </div>
                      <CardTitle>SEO Field Assistant</CardTitle>
                    </div>
                    <CardDescription>Auto-generate SEO meta titles/descriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-gray-50 rounded-md mb-4">
                      <h4 className="font-medium">Tips for better SEO</h4>
                      <ul className="text-sm mt-2 space-y-1">
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          <span>Use location keywords in titles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          <span>Include property type & key amenities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          <span>Keep titles under 60 characters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          <span>Use unique descriptions (150-160 chars)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Sample property details</label>
                        <input type="text" className="w-full p-2 border rounded-md mt-1 text-sm" placeholder="Enter property title..." value="3 Bedroom Apartment, Downtown Dubai" />
                      </div>
                      
                      <Button className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        Generate Meta Content
                      </Button>
                      
                      <div>
                        <label className="text-sm font-medium">Generated title</label>
                        <div className="p-2 border rounded-md bg-gray-50 mt-1 text-sm">Luxurious 3 Bedroom Apartment in Downtown Dubai - Near Burj Khalifa</div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Generated description</label>
                        <div className="p-2 border rounded-md bg-gray-50 mt-1 text-sm">
                          Experience urban elegance in this spacious 3 bedroom apartment in Downtown Dubai. Stunning Burj Khalifa views, premium finishes, and access to world-class amenities.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                      <CardTitle>Listing Scheduler</CardTitle>
                    </div>
                    <CardDescription>Set publish/unpublish dates for listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Luxury Villa in Palm Jumeirah</h4>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Published on:</span>
                            <p className="font-medium">May 5, 2025</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expires on:</span>
                            <p className="font-medium">June 5, 2025</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button size="sm" variant="outline">Edit Schedule</Button>
                          <Button size="sm" variant="destructive">Unpublish</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Studio Apartment in Sport City</h4>
                          <Badge variant="outline">Scheduled</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Publishes on:</span>
                            <p className="font-medium">May 12, 2025</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expires on:</span>
                            <p className="font-medium">July 12, 2025</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button size="sm" variant="outline">Edit Schedule</Button>
                          <Button size="sm" variant="destructive">Cancel</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        View Expiring Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-red-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      </div>
                      <CardTitle>Duplicate Checker</CardTitle>
                    </div>
                    <CardDescription>Detects similar property listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Possible Duplicate Detected</h4>
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Alert</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          These properties appear to be duplicates based on location, features, and images:
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Luxury Apartment in Dubai Marina (#1523)</span>
                            <Button size="sm" variant="link" className="h-auto p-0">View</Button>
                          </div>
                          <div className="flex justify-between">
                            <span>2BR Apartment with Marina View (#1524)</span>
                            <Button size="sm" variant="link" className="h-auto p-0">View</Button>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            Ignore
                          </Button>
                          <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                            Remove Duplicate
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium mb-3">Scan for duplicates</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Run a full scan to detect potential duplicate listings across your inventory.
                        </p>
                        <Button className="w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                          Run Duplicate Check
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium mb-2">Auto-check settings</h4>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="auto-check" className="rounded" checked />
                            <label htmlFor="auto-check" className="text-sm">Check for duplicates on upload</label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="notify" className="rounded" checked />
                            <label htmlFor="notify" className="text-sm">Send notifications when found</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

                <TabsContent value="pending">
                  {propertiesLoading ? (
                    <div className="text-center py-10">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      <p className="mt-2">Loading properties...</p>
                    </div>
                  ) : getPendingProperties().length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-medium">No pending listings</h3>
                      <p className="text-gray-600 mt-2">All properties have been reviewed</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {getPendingProperties().map((property: any) => (
                        <PropertyCard 
                          key={property.id} 
                          property={property}
                          onApprove={() => handleApprove(property.id)}
                          onReject={() => handleReject(property.id)}
                          onDelete={() => confirmDelete(property.id)}
                          status="pending"
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="approved">
                  {propertiesLoading ? (
                    <div className="text-center py-10">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      <p className="mt-2">Loading properties...</p>
                    </div>
                  ) : getApprovedProperties().length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-medium">No approved listings</h3>
                      <p className="text-gray-600 mt-2">Approved listings will appear here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {getApprovedProperties().map((property: any) => (
                        <PropertyCard 
                          key={property.id} 
                          property={property}
                          onDelete={() => confirmDelete(property.id)}
                          status="approved"
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="rejected">
                  {propertiesLoading ? (
                    <div className="text-center py-10">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      <p className="mt-2">Loading properties...</p>
                    </div>
                  ) : getRejectedProperties().length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-medium">No rejected listings</h3>
                      <p className="text-gray-600 mt-2">Rejected listings will appear here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {getRejectedProperties().map((property: any) => (
                        <PropertyCard 
                          key={property.id} 
                          property={property}
                          onApprove={() => handleApprove(property.id)}
                          onDelete={() => confirmDelete(property.id)}
                          status="rejected"
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Contact Messages Tab */}
            <TabsContent value="messages">
              <ContactMessages />
            </TabsContent>

            {/* Lead Management Tab */}
            <TabsContent value="leads">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card className="md:col-span-3">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Inbox with Filters</CardTitle>
                        <CardDescription>View and filter leads by property, source, date, and budget</CardDescription>
                      </div>
                      <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Lead
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center">
                        <select className="px-3 py-1 rounded-l-md border">
                          <option>Property</option>
                          <option>Villa in Palm Jumeirah</option>
                          <option>Apartment in Dubai Marina</option>
                          <option>Office in Business Bay</option>
                        </select>
                        <select className="px-3 py-1 border-t border-b">
                          <option>Source</option>
                          <option>Website</option>
                          <option>Phone</option>
                          <option>Referral</option>
                          <option>Social Media</option>
                        </select>
                        <select className="px-3 py-1 border-t border-b">
                          <option>Budget</option>
                          <option>Under 1M AED</option>
                          <option>1M-3M AED</option>
                          <option>3M-5M AED</option>
                          <option>Over 5M AED</option>
                        </select>
                        <select className="px-3 py-1 border-t border-b">
                          <option>Date</option>
                          <option>Today</option>
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Custom</option>
                        </select>
                        <Button variant="outline" className="rounded-l-none rounded-r-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        </Button>
                      </div>
                      <div className="ml-auto">
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          Export
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md">
                      <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 font-medium text-sm border-b">
                        <div className="col-span-3">Contact</div>
                        <div className="col-span-3">Property</div>
                        <div className="col-span-2">Budget</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Actions</div>
                      </div>
                      
                      <div className="divide-y">
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center font-medium text-red-600">JD</div>
                              <div>
                                <p className="font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">Luxury Villa in Palm Jumeirah</p>
                            <p className="text-xs text-muted-foreground">Inquiry date: May 7, 2025</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm">5.2M AED</p>
                          </div>
                          <div className="col-span-2">
                            <Badge className="bg-red-500">New</Badge>
                          </div>
                          <div className="col-span-2 flex gap-1">
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-medium text-blue-600">SJ</div>
                              <div>
                                <p className="font-medium">Sarah Johnson</p>
                                <p className="text-xs text-muted-foreground">s.johnson@example.com</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">Modern Apartment in Dubai Marina</p>
                            <p className="text-xs text-muted-foreground">Inquiry date: May 6, 2025</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm">1.8M AED</p>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Follow-Up</Badge>
                          </div>
                          <div className="col-span-2 flex gap-1">
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-medium text-purple-600">MA</div>
                              <div>
                                <p className="font-medium">Mohammed Ahmed</p>
                                <p className="text-xs text-muted-foreground">m.ahmed@example.com</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">Penthouse in Downtown Dubai</p>
                            <p className="text-xs text-muted-foreground">Inquiry date: May 5, 2025</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm">3.5M AED</p>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Viewed</Badge>
                          </div>
                          <div className="col-span-2 flex gap-1">
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-medium text-green-600">EP</div>
                              <div>
                                <p className="font-medium">Elena Peters</p>
                                <p className="text-xs text-muted-foreground">e.peters@example.com</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">Family Home in Arabian Ranches</p>
                            <p className="text-xs text-muted-foreground">Inquiry date: May 3, 2025</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm">4.2M AED</p>
                          </div>
                          <div className="col-span-2">
                            <Badge className="bg-green-500">Closed</Badge>
                          </div>
                          <div className="col-span-2 flex gap-1">
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing 4 of 24 leads
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" disabled>
                          Previous
                        </Button>
                        <Button size="sm" variant="outline">
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      </div>
                      <CardTitle>Quick Tools</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Quick Reply Templates</h4>
                      <div className="space-y-2">
                        <div className="p-2 border rounded-md flex items-center justify-between">
                          <span className="text-sm">Initial Follow-up</span>
                          <Button size="sm" variant="ghost">Use</Button>
                        </div>
                        <div className="p-2 border rounded-md flex items-center justify-between">
                          <span className="text-sm">Property Details</span>
                          <Button size="sm" variant="ghost">Use</Button>
                        </div>
                        <div className="p-2 border rounded-md flex items-center justify-between">
                          <span className="text-sm">Viewing Invitation</span>
                          <Button size="sm" variant="ghost">Use</Button>
                        </div>
                        <div className="p-2 border rounded-md flex items-center justify-between">
                          <span className="text-sm">Payment Plan Details</span>
                          <Button size="sm" variant="ghost">Use</Button>
                        </div>
                      </div>
                      <Button className="w-full mt-2" variant="outline" size="sm">
                        Manage Templates
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Call/Meeting Tracker</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                          <span className="text-sm">Log New Call</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                          <span className="text-sm">Schedule Meeting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                          <span className="text-sm">Add Task</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                          <span className="text-sm">View Calendar</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Lead Stats</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">New Today</p>
                          <p className="font-bold text-primary text-lg">7</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Follow-ups</p>
                          <p className="font-bold text-primary text-lg">12</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Conversions</p>
                          <p className="font-bold text-primary text-lg">3</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Rate</p>
                          <p className="font-bold text-primary text-lg">12%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Property Stats Tab */}
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Viewed Properties</CardTitle>
                    <CardDescription>Properties with highest views</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {propertyStats.mostViewed.map((prop, index) => (
                        <div key={index} className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{prop.title}</p>
                              <Link href={`/properties/${prop.id}`}>
                                <a className="text-xs text-primary">View Property</a>
                              </Link>
                            </div>
                          </div>
                          <Badge variant="outline">{prop.views} views</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Most Saved Properties</CardTitle>
                    <CardDescription>Properties added to favorites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {propertyStats.mostSaved.map((prop, index) => (
                        <div key={index} className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{prop.title}</p>
                              <Link href={`/properties/${prop.id}`}>
                                <a className="text-xs text-primary">View Property</a>
                              </Link>
                            </div>
                          </div>
                          <Badge variant="outline">{prop.saves} saves</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Longest Time on Market</CardTitle>
                    <CardDescription>Properties listed for the longest time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {propertyStats.longestOnMarket.map((prop, index) => (
                        <div key={index} className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{prop.title}</p>
                              <Link href={`/properties/${prop.id}`}>
                                <a className="text-xs text-primary">View Property</a>
                              </Link>
                            </div>
                          </div>
                          <Badge variant="outline">{prop.days} days</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Overall property performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm mb-1 font-medium">Average Time to Sell</p>
                        <div className="flex items-center justify-between">
                          <div className="bg-gray-100 h-2 flex-1 rounded-full">
                            <div className="bg-primary h-2 w-[45%] rounded-full"></div>
                          </div>
                          <span className="text-sm ml-4">45 days</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm mb-1 font-medium">Average Views per Property</p>
                        <div className="flex items-center justify-between">
                          <div className="bg-gray-100 h-2 flex-1 rounded-full">
                            <div className="bg-primary h-2 w-[68%] rounded-full"></div>
                          </div>
                          <span className="text-sm ml-4">324 views</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm mb-1 font-medium">Click-through Rate</p>
                        <div className="flex items-center justify-between">
                          <div className="bg-gray-100 h-2 flex-1 rounded-full">
                            <div className="bg-primary h-2 w-[28%] rounded-full"></div>
                          </div>
                          <span className="text-sm ml-4">28%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm mb-1 font-medium">Inquiry Conversion</p>
                        <div className="flex items-center justify-between">
                          <div className="bg-gray-100 h-2 flex-1 rounded-full">
                            <div className="bg-primary h-2 w-[12%] rounded-full"></div>
                          </div>
                          <span className="text-sm ml-4">12%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Admin Utilities Tab */}
            <TabsContent value="utilities">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      </div>
                      <CardTitle>Auto Backup Manager</CardTitle>
                    </div>
                    <CardDescription>Daily database & media backup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium">Database backups</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium">Media backups</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium">Settings backups</span>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md mt-4">
                      <h4 className="font-medium mb-2">Recent Backups</h4>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            <span>Database backup</span>
                          </div>
                          <span>Today, 05:00 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            <span>Media backup</span>
                          </div>
                          <span>Today, 03:15 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            <span>Settings backup</span>
                          </div>
                          <span>Today, 03:00 AM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                        View History
                      </Button>
                      
                      <Button size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Backup Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </div>
                      <CardTitle>Quick Content Editor</CardTitle>
                    </div>
                    <CardDescription>Update homepage banners, footer text, disclaimers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Homepage Hero Banner</h4>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center text-sm text-muted-foreground">
                          Banner Preview
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Update</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Footer Disclaimer</h4>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          © 2025 Desert Jewel Realty. All rights reserved. Real Estate Regulatory Authority (RERA) registration...
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Special Promotions Bar</h4>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="h-10 bg-gray-100 mb-2 rounded flex items-center justify-center text-sm text-muted-foreground">
                          Promotion Preview
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        Content Library
                      </Button>
                      <Button size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add New Element
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                      </div>
                      <CardTitle>System Settings</CardTitle>
                    </div>
                    <CardDescription>Manage global system configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Maintenance Mode</p>
                          <p className="text-xs text-muted-foreground">Put site in maintenance mode</p>
                        </div>
                        <div className="flex h-6 items-center">
                          <input type="checkbox" className="h-4 w-4 rounded" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Error Logging</p>
                          <p className="text-xs text-muted-foreground">Log all system errors</p>
                        </div>
                        <div className="flex h-6 items-center">
                          <input type="checkbox" className="h-4 w-4 rounded" checked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Cache System</p>
                          <p className="text-xs text-muted-foreground">Enable page and API caching</p>
                        </div>
                        <div className="flex h-6 items-center">
                          <input type="checkbox" className="h-4 w-4 rounded" checked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Google Analytics</p>
                          <p className="text-xs text-muted-foreground">Enable tracking</p>
                        </div>
                        <div className="flex h-6 items-center">
                          <input type="checkbox" className="h-4 w-4 rounded" checked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md mt-4">
                      <h4 className="font-medium mb-2">System Health</h4>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>All systems operational</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Last system scan: 1 hour ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                        Advanced Settings
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        Reset Defaults
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-100 p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div>
                          <CardTitle>Performance Monitoring</CardTitle>
                          <CardDescription>Server and application health</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <span className="text-sm">23%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "23%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm">45%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Database Queries</span>
                          <span className="text-sm">78/sec</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Avg. Response Time</span>
                          <span className="text-sm">176ms</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "17%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">100%</div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">24/7</div>
                          <div className="text-xs text-muted-foreground">Monitoring</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="bg-red-100 p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        </div>
                        <div>
                          <CardTitle>Export & Reports</CardTitle>
                          <CardDescription>Generate and download reports</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"></path></svg>
                            <div>
                              <p className="font-medium">Property Performance</p>
                              <p className="text-xs text-muted-foreground">Views, inquiries, time-on-site</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Export</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"></path></svg>
                            <div>
                              <p className="font-medium">Top 5 Communities</p>
                              <p className="text-xs text-muted-foreground">Most popular areas with analytics</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Export</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"></path></svg>
                            <div>
                              <p className="font-medium">Funnel Report</p>
                              <p className="text-xs text-muted-foreground">Page views → Inquiries → Site visits</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Export</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"></path></svg>
                            <div>
                              <p className="font-medium">User Activity</p>
                              <p className="text-xs text-muted-foreground">User demographics and behavior</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Export</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">Export Options</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">CSV</Button>
                        <Button size="sm" variant="outline" className="flex-1">Excel</Button>
                        <Button size="sm" variant="outline" className="flex-1">PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Developer Profiles Tab */}
            <TabsContent value="developers">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {developersLoading ? (
                  <div className="col-span-3 text-center py-10">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2">Loading developers...</p>
                  </div>
                ) : developers && developers.length > 0 ? (
                  developers.map((developer: any) => (
                    <Card key={developer.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <img src={developer.logo} alt={developer.name} className="w-12 h-12 object-contain" />
                          <div>
                            <CardTitle>{developer.name}</CardTitle>
                            <CardDescription>Est. {developer.established}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3 mb-3 text-sm text-muted-foreground">{developer.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Projects</p>
                            <p className="font-medium">{developer.projectCount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Properties</p>
                            <p className="font-medium">12</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Off-plan</p>
                            <p className="font-medium">3</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex gap-3">
                        <Button size="sm" variant="outline" asChild className="flex-1">
                          <Link href={`/developers/${developer.id}`}>
                            View
                          </Link>
                        </Button>
                        <Button size="sm" className="flex-1">
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium">No developers found</h3>
                    <p className="text-gray-600 mt-2">Add developers to see them here</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <Button>
                  Add New Developer
                </Button>
              </div>
            </TabsContent>

            {/* Off-Plan Projects Tab */}
            <TabsContent value="featured">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Developments</h2>
                <Button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add New Featured Development
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Development Media</CardTitle>
                    <CardDescription>Upload brochures, videos, and images for featured developments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upload" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="upload">Upload Files</TabsTrigger>
                        <TabsTrigger value="manage">Manage Media</TabsTrigger>
                        <TabsTrigger value="featured">Set Featured</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upload">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="project">Select Development</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a development" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="emaar-beachfront">Emaar Beachfront Residences</SelectItem>
                                <SelectItem value="creek-harbour">Creek Harbour Towers</SelectItem>
                                <SelectItem value="marina-vista">Marina Vista</SelectItem>
                                <SelectItem value="add-new">+ Add New Development</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="border-t pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h3 className="font-medium mb-2">Brochure Upload</h3>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                  <p className="text-sm text-center text-muted-foreground mb-2">Upload PDF brochures</p>
                                  <p className="text-xs text-center text-muted-foreground mb-4">PDF, max 10MB</p>
                                  <Button size="sm" variant="outline">Choose File</Button>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-medium mb-2">Video Upload</h3>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                  <p className="text-sm text-center text-muted-foreground mb-2">Upload video tours</p>
                                  <p className="text-xs text-center text-muted-foreground mb-4">MP4, max 50MB</p>
                                  <Button size="sm" variant="outline">Choose File</Button>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-medium mb-2">Image Upload</h3>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                  <p className="text-sm text-center text-muted-foreground mb-2">Upload photos</p>
                                  <p className="text-xs text-center text-muted-foreground mb-4">JPG, PNG, max 5MB each</p>
                                  <Button size="sm" variant="outline">Choose Files</Button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <Label htmlFor="description">Media Description</Label>
                              <Textarea placeholder="Add a description for these media files..." className="resize-none h-20" />
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                Upload All Files
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="manage">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="filter-project">Filter by Development</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="All Developments" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Developments</SelectItem>
                                <SelectItem value="emaar-beachfront">Emaar Beachfront Residences</SelectItem>
                                <SelectItem value="creek-harbour">Creek Harbour Towers</SelectItem>
                                <SelectItem value="marina-vista">Marina Vista</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="border-t pt-4 space-y-4">
                            <h3 className="font-medium">Emaar Beachfront Residences</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-100 h-32 flex items-center justify-center relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                  <Badge className="absolute top-2 right-2">PDF</Badge>
                                </div>
                                <div className="p-2">
                                  <p className="text-sm font-medium truncate">Beachfront_Brochure.pdf</p>
                                  <p className="text-xs text-muted-foreground">2.3 MB · Uploaded 3 days ago</p>
                                  <div className="flex gap-1 mt-2">
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-100 h-32 flex items-center justify-center relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                  <Badge className="absolute top-2 right-2">MP4</Badge>
                                </div>
                                <div className="p-2">
                                  <p className="text-sm font-medium truncate">Beachfront_Tour.mp4</p>
                                  <p className="text-xs text-muted-foreground">24.7 MB · Uploaded 1 week ago</p>
                                  <div className="flex gap-1 mt-2">
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-100 h-32 flex items-center justify-center relative">
                                  <img src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" alt="Beach view" className="w-full h-full object-cover" />
                                  <Badge className="absolute top-2 right-2">JPG</Badge>
                                </div>
                                <div className="p-2">
                                  <p className="text-sm font-medium truncate">Beach_View_1.jpg</p>
                                  <p className="text-xs text-muted-foreground">1.8 MB · Uploaded 1 week ago</p>
                                  <div className="flex gap-1 mt-2">
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-yellow-500 fill-yellow-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-4 mt-4 border-t">
                              <h3 className="font-medium">Creek Harbour Towers</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="border rounded-md overflow-hidden">
                                  <div className="bg-gray-100 h-32 flex items-center justify-center relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    <Badge className="absolute top-2 right-2">PDF</Badge>
                                  </div>
                                  <div className="p-2">
                                    <p className="text-sm font-medium truncate">Creek_Harbor_Brochure.pdf</p>
                                    <p className="text-xs text-muted-foreground">3.1 MB · Uploaded 5 days ago</p>
                                    <div className="flex gap-1 mt-2">
                                      <Button size="sm" variant="ghost">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                      </Button>
                                      <Button size="sm" variant="ghost">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                      </Button>
                                      <Button size="sm" variant="ghost">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="featured">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="featured-project">Select Development for Featured Section</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a development" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="emaar-beachfront">Emaar Beachfront Residences</SelectItem>
                                <SelectItem value="creek-harbour">Creek Harbour Towers</SelectItem>
                                <SelectItem value="marina-vista">Marina Vista</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h3 className="font-medium mb-4">Selected Featured Media</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="border rounded-md p-4">
                                <div className="bg-gray-100 h-32 flex items-center justify-center mb-2 relative">
                                  <img src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" alt="Beach view" className="w-full h-full object-cover" />
                                  <Badge className="absolute top-2 right-2 bg-yellow-500">Featured</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Beach View</span>
                                  <Button size="sm" variant="destructive">Remove</Button>
                                </div>
                              </div>
                              
                              <div className="border rounded-md p-4">
                                <div className="bg-gray-100 h-32 flex items-center justify-center mb-2 relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                  <Badge className="absolute top-2 right-2 bg-yellow-500">Featured</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Video Tour</span>
                                  <Button size="sm" variant="destructive">Remove</Button>
                                </div>
                              </div>
                              
                              <div className="border rounded-md p-4 bg-gray-50 border-dashed flex flex-col items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                <p className="text-sm text-muted-foreground">Add More</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-8">
                              <Button variant="outline">Preview Homepage</Button>
                              <Button>Save Featured Selection</Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="offplan">
              <Tabs defaultValue="projects" value={activeOffPlanTab} onValueChange={setActiveOffPlanTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="masterplans">Masterplans</TabsTrigger>
                  <TabsTrigger value="payments">Payment Plans</TabsTrigger>
                  <TabsTrigger value="construction">Construction Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="projects">
                  <div className="grid grid-cols-1 gap-4">
                    {offplanProjects.map((project) => (
                      <Card key={project.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{project.name}</CardTitle>
                              <CardDescription>{project.developer} | {project.location}</CardDescription>
                            </div>
                            <Badge>{project.availableUnits} units available</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Units</p>
                              <p className="font-medium">{project.totalUnits}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Completion</p>
                              <p className="font-medium">{project.completionDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Price Range</p>
                              <p className="font-medium">{project.priceRange}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Construction</p>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-primary h-2.5 rounded-full" 
                                    style={{ width: `${project.constructionProgress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{project.constructionProgress}%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex gap-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1">
                            Upload Files
                          </Button>
                          <Button size="sm" variant="secondary" className="flex-1">
                            Track Inquiries
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button>
                      Add New Project
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="masterplans">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="col-span-1 md:col-span-3">
                      <CardHeader>
                        <CardTitle>Upload Masterplan</CardTitle>
                        <CardDescription>Add masterplan files for off-plan projects</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          </div>
                          <p className="text-sm font-medium">Drag and drop files or click to upload</p>
                          <p className="text-xs text-muted-foreground mt-1">Supported formats: PDF, JPG, PNG</p>
                          <Button variant="outline" className="mt-4">Select Files</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Sample Masterplan Cards */}
                    <Card>
                      <div className="relative h-40 bg-gray-100">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          Masterplan Preview
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Emaar Beachfront Masterplan</CardTitle>
                        <CardDescription>Uploaded on Apr 15, 2025</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-0">
                        <Badge variant="outline">PDF</Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-40 bg-gray-100">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          Masterplan Preview
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Dubai Creek Harbour Masterplan</CardTitle>
                        <CardDescription>Uploaded on Apr 10, 2025</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-0">
                        <Badge variant="outline">JPG</Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-40 bg-gray-100">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          Masterplan Preview
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Marina Vista Masterplan</CardTitle>
                        <CardDescription>Uploaded on Apr 5, 2025</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-0">
                        <Badge variant="outline">PDF</Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="payments">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Payment Plans Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Plans</CardTitle>
                        <CardDescription>Manage off-plan payment schedules</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-md">
                          <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium">
                            <div>Project</div>
                            <div>Payment Type</div>
                            <div>Installments</div>
                            <div>Post-Handover</div>
                            <div>Actions</div>
                          </div>
                          {offplanProjects.map((project) => (
                            <div key={project.id} className="grid grid-cols-5 gap-4 p-4 border-b">
                              <div>{project.name}</div>
                              <div>
                                <Badge variant="outline">Installment Plan</Badge>
                              </div>
                              <div>
                                40/60
                              </div>
                              <div>
                                2 years
                              </div>
                              <div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">View</Button>
                                  <Button size="sm" variant="ghost">Edit</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end border-t pt-4">
                        <Button>
                          Add Payment Plan
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="construction">
                  <div className="grid grid-cols-1 gap-6">
                    {offplanProjects.map((project) => (
                      <Card key={project.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{project.name}</CardTitle>
                              <CardDescription>Construction Progress Update</CardDescription>
                            </div>
                            <Badge variant={project.constructionProgress > 50 ? "default" : "outline"}>
                              {project.constructionProgress}% Complete
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                            <div 
                              className="bg-primary h-3 rounded-full" 
                              style={{ width: `${project.constructionProgress}%` }}
                            ></div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Construction Milestones</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                  <span className="text-sm">Foundation Complete</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                  <span className="text-sm">Structure in Progress</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                  <span className="text-sm">Interior Finishing</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                  <span className="text-sm">MEP Works</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                  <span className="text-sm">Handover</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Latest Updates</h4>
                              <div className="space-y-2 text-sm">
                                <p className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Apr 20:</span> 
                                  Structural work on floors 10-15 completed
                                </p>
                                <p className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Apr 15:</span> 
                                  Facade installation started on lower floors
                                </p>
                                <p className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Apr 10:</span> 
                                  MEP rough-in work in progress
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Expected Timeline</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Construction Start:</span>
                                  <span className="font-medium">January 2025</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Current Stage:</span>
                                  <span className="font-medium">Structural Work</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Expected Completion:</span>
                                  <span className="font-medium">{project.completionDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex gap-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            Upload Photos
                          </Button>
                          <Button size="sm" className="flex-1">
                            Update Progress
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Content Management Tab */}
            <TabsContent value="content">
              <Tabs defaultValue="blogs" value={activeContentTab} onValueChange={setActiveContentTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="blogs">Blogs</TabsTrigger>
                  <TabsTrigger value="news">News</TabsTrigger>
                  <TabsTrigger value="guides">Area Guides</TabsTrigger>
                  <TabsTrigger value="banners">Banners</TabsTrigger>
                </TabsList>

                <TabsContent value="blogs">
                  <div className="flex justify-end mb-4">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      New Blog Post
                    </Button>
                  </div>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-5">Title</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-3">Actions</div>
                    </div>
                    {contentItems.blogs.map((blog) => (
                      <div key={blog.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-5">{blog.title}</div>
                        <div className="col-span-2">{blog.date}</div>
                        <div className="col-span-2">
                          <Badge variant={blog.status === "published" ? "default" : "outline"}>
                            {blog.status}
                          </Badge>
                        </div>
                        <div className="col-span-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">Edit</Button>
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="news">
                  <div className="flex justify-end mb-4">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      New News Article
                    </Button>
                  </div>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-5">Title</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-3">Actions</div>
                    </div>
                    {contentItems.news.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-5">{item.title}</div>
                        <div className="col-span-2">{item.date}</div>
                        <div className="col-span-2">
                          <Badge variant={item.status === "published" ? "default" : "outline"}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="col-span-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">Edit</Button>
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="guides">
                  <div className="flex justify-end mb-4">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      New Area Guide
                    </Button>
                  </div>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-5">Title</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-3">Actions</div>
                    </div>
                    {contentItems.areaGuides.map((guide) => (
                      <div key={guide.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-5">{guide.title}</div>
                        <div className="col-span-2">{guide.date}</div>
                        <div className="col-span-2">
                          <Badge variant={guide.status === "published" ? "default" : "outline"}>
                            {guide.status}
                          </Badge>
                        </div>
                        <div className="col-span-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">Edit</Button>
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="banners">
                  <div className="flex justify-end mb-4">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      New Banner
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contentItems.banners.map((banner) => (
                      <Card key={banner.id}>
                        <div className="h-40 bg-gray-100 flex items-center justify-center border-b">
                          <p className="text-muted-foreground">Banner Preview</p>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{banner.title}</CardTitle>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${banner.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-xs">{banner.active ? 'Active' : 'Inactive'}</span>
                            </div>
                          </div>
                          <CardDescription>{banner.placement}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            {banner.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Tabs defaultValue="all" value={activeDocumentsTab} onValueChange={setActiveDocumentsTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Documents</TabsTrigger>
                  <TabsTrigger value="contracts">Contracts</TabsTrigger>
                  <TabsTrigger value="brochures">Brochures</TabsTrigger>
                  <TabsTrigger value="titles">Title Deeds</TabsTrigger>
                </TabsList>

                <div className="flex justify-between mb-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      Search
                    </Button>
                  </div>
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    Upload Document
                  </Button>
                </div>

                <TabsContent value="all">
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-4">Document Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Access Level</div>
                      <div className="col-span-2">Uploaded By</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {documents.map((doc) => (
                      <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-4 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          <span>{doc.name}</span>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                        </div>
                        <div className="col-span-2">
                          <Badge variant={doc.accessLevel === "admin" ? "secondary" : "outline"} className="capitalize">
                            {doc.accessLevel}
                          </Badge>
                        </div>
                        <div className="col-span-2">{doc.uploadedBy}</div>
                        <div className="col-span-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="contracts">
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-4">Document Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Access Level</div>
                      <div className="col-span-2">Uploaded By</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {documents.filter(doc => doc.type === 'contract').map((doc) => (
                      <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-4 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          <span>{doc.name}</span>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                        </div>
                        <div className="col-span-2">
                          <Badge variant={doc.accessLevel === "admin" ? "secondary" : "outline"} className="capitalize">
                            {doc.accessLevel}
                          </Badge>
                        </div>
                        <div className="col-span-2">{doc.uploadedBy}</div>
                        <div className="col-span-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="brochures">
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-4">Document Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Access Level</div>
                      <div className="col-span-2">Uploaded By</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {documents.filter(doc => doc.type === 'brochure').map((doc) => (
                      <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-4 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          <span>{doc.name}</span>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                        </div>
                        <div className="col-span-2">
                          <Badge variant={doc.accessLevel === "admin" ? "secondary" : "outline"} className="capitalize">
                            {doc.accessLevel}
                          </Badge>
                        </div>
                        <div className="col-span-2">{doc.uploadedBy}</div>
                        <div className="col-span-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="titles">
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-4">Document Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Access Level</div>
                      <div className="col-span-2">Uploaded By</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {documents.filter(doc => doc.type === 'title deed').map((doc) => (
                      <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-4 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          <span>{doc.name}</span>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                        </div>
                        <div className="col-span-2">
                          <Badge variant={doc.accessLevel === "admin" ? "secondary" : "outline"} className="capitalize">
                            {doc.accessLevel}
                          </Badge>
                        </div>
                        <div className="col-span-2">{doc.uploadedBy}</div>
                        <div className="col-span-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">View</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Email Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">12</div>
                    <p className="text-sm text-muted-foreground">
                      Last 30 days
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">28</div>
                    <p className="text-sm text-muted-foreground">
                      Last 30 days
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Scheduled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">8</div>
                    <p className="text-sm text-muted-foreground">
                      Upcoming campaigns
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Campaign Management</CardTitle>
                      <CardDescription>Manage scheduled and sent notification campaigns</CardDescription>
                    </div>
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      New Campaign
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-3">Campaign Name</div>
                      <div className="col-span-2">Scheduled Date</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Recipients</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {notificationCampaigns.map((campaign) => (
                      <div key={campaign.id} className="grid grid-cols-12 gap-4 p-4 border-b">
                        <div className="col-span-3">{campaign.name}</div>
                        <div className="col-span-2">{campaign.scheduledDate}</div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="capitalize">{campaign.type}</Badge>
                        </div>
                        <div className="col-span-2">{campaign.recipients}</div>
                        <div className="col-span-1">
                          <Badge 
                            variant={campaign.status === "scheduled" ? "outline" : "default"}
                            className="capitalize"
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" 
                              disabled={campaign.status === "sent"}
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500"
                              disabled={campaign.status === "sent"}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Notification</CardTitle>
                    <CardDescription>Send immediate notifications to users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notification Type</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Email</option>
                          <option>Push Notification</option>
                          <option>SMS</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Recipients</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>All Users</option>
                          <option>Premium Users</option>
                          <option>Property Inquirers</option>
                          <option>Custom Segment</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter notification subject" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]" placeholder="Enter notification message"></textarea>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-end">
                    <Button>Send Now</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Templates</CardTitle>
                    <CardDescription>Manage reusable notification templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Property Price Change</h4>
                            <p className="text-sm text-muted-foreground">Notify users about price updates</p>
                          </div>
                          <Badge>Email</Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Use</Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">New Property Alert</h4>
                            <p className="text-sm text-muted-foreground">New listing matching saved search</p>
                          </div>
                          <Badge>Push</Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Use</Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Monthly Newsletter</h4>
                            <p className="text-sm text-muted-foreground">Monthly market updates and news</p>
                          </div>
                          <Badge>Email</Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Use</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-end">
                    <Button>Add Template</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface PropertyCardProps {
  property: any;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete: () => void;
  status: 'pending' | 'approved' | 'rejected';
}

function PropertyCard({ property, onApprove, onReject, onDelete, status }: PropertyCardProps) {
  let statusBadge;
  
  if (status === 'approved') {
    statusBadge = <Badge className="bg-green-500">Approved</Badge>;
  } else if (status === 'rejected') {
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
      
      {status === 'pending' && (
        <CardFooter className="border-t flex justify-between p-4">
          <Button variant="outline" onClick={onReject}>
            Reject
          </Button>
          <Button onClick={onApprove}>
            Approve
          </Button>
        </CardFooter>
      )}
      
      {status === 'rejected' && onApprove && (
        <CardFooter className="border-t p-4">
          <Button className="w-full" onClick={onApprove}>
            Reconsider & Approve
          </Button>
        </CardFooter>
      )}
      
      {/* Delete Button - always shown for all property statuses */}
      <CardFooter className={`${status === 'pending' || (status === 'rejected' && onApprove) ? '' : 'border-t'} p-4`}>
        <Button 
          variant="destructive" 
          className="w-full flex items-center gap-2"
          onClick={onDelete}
        >
          Delete Property
        </Button>
      </CardFooter>
    </Card>
  );
}