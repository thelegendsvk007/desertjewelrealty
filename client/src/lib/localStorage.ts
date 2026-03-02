// Frontend-only local storage service for contact messages and property listings
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied';
  propertyId?: number;
  propertyTitle?: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  premium: boolean;
  exclusive: boolean;
  newLaunch: boolean;
  features: string[];
  submittedAt: string;
  submittedBy: string;
  contactEmail: string;
  contactPhone: string;
}

class LocalStorageService {
  private contactMessagesKey = 'djr_contact_messages';
  private propertyListingsKey = 'djr_property_listings';
  private statsKey = 'djr_admin_stats';

  // Contact Messages
  saveContactMessage(message: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>): ContactMessage {
    const messages = this.getContactMessages();
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    messages.unshift(newMessage);
    localStorage.setItem(this.contactMessagesKey, JSON.stringify(messages));
    this.updateStats();
    return newMessage;
  }

  getContactMessages(): ContactMessage[] {
    const stored = localStorage.getItem(this.contactMessagesKey);
    return stored ? JSON.parse(stored) : [];
  }

  updateMessageStatus(id: string, status: ContactMessage['status']): void {
    const messages = this.getContactMessages();
    const messageIndex = messages.findIndex(msg => msg.id === id);
    if (messageIndex !== -1) {
      messages[messageIndex].status = status;
      localStorage.setItem(this.contactMessagesKey, JSON.stringify(messages));
    }
  }

  deleteContactMessage(id: string): void {
    const messages = this.getContactMessages();
    const filtered = messages.filter(msg => msg.id !== id);
    localStorage.setItem(this.contactMessagesKey, JSON.stringify(filtered));
    this.updateStats();
  }

  // Property Listings
  savePropertyListing(listing: Omit<PropertyListing, 'id' | 'submittedAt' | 'status'>): PropertyListing {
    const listings = this.getPropertyListings();
    const newListing: PropertyListing = {
      ...listing,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    listings.unshift(newListing);
    localStorage.setItem(this.propertyListingsKey, JSON.stringify(listings));
    this.updateStats();
    return newListing;
  }

  getPropertyListings(): PropertyListing[] {
    const stored = localStorage.getItem(this.propertyListingsKey);
    return stored ? JSON.parse(stored) : [];
  }

  updatePropertyStatus(id: string, status: PropertyListing['status']): void {
    const listings = this.getPropertyListings();
    const listingIndex = listings.findIndex(listing => listing.id === id);
    if (listingIndex !== -1) {
      listings[listingIndex].status = status;
      localStorage.setItem(this.propertyListingsKey, JSON.stringify(listings));
      this.updateStats();
    }
  }

  deletePropertyListing(id: string): void {
    const listings = this.getPropertyListings();
    const filtered = listings.filter(listing => listing.id !== id);
    localStorage.setItem(this.propertyListingsKey, JSON.stringify(filtered));
    this.updateStats();
  }

  // Statistics
  getAdminStats() {
    const messages = this.getContactMessages();
    const listings = this.getPropertyListings();
    const today = new Date().toDateString();
    const thisWeek = this.getThisWeekDates();

    const stats = {
      totalMessages: messages.length,
      newMessages: messages.filter(msg => msg.status === 'new').length,
      totalListings: listings.length,
      pendingListings: listings.filter(listing => listing.status === 'pending').length,
      approvedListings: listings.filter(listing => listing.status === 'approved').length,
      todayMessages: messages.filter(msg => 
        new Date(msg.timestamp).toDateString() === today
      ).length,
      weeklyMessages: messages.filter(msg => 
        thisWeek.includes(new Date(msg.timestamp).toDateString())
      ).length,
      recentMessages: messages.slice(0, 5),
      recentListings: listings.slice(0, 5)
    };

    localStorage.setItem(this.statsKey, JSON.stringify(stats));
    return stats;
  }

  private updateStats(): void {
    this.getAdminStats(); // This will update and store the stats
  }

  private getThisWeekDates(): string[] {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toDateString());
    }
    return dates;
  }

  // Clear all data (for testing purposes)
  clearAllData(): void {
    localStorage.removeItem(this.contactMessagesKey);
    localStorage.removeItem(this.propertyListingsKey);
    localStorage.removeItem(this.statsKey);
  }
}

export const localStorageService = new LocalStorageService();