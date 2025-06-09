export interface Developer {
  id: number;
  name: string;
  logo: string;
  description: string;
  projectCount: string | number;
  keyProjects?: string[];
  uniqueSellingPoints?: string[];
  marketPosition?: string;
  established?: number;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  featured?: boolean;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  beds?: number;
  baths?: number;
  area?: number;
  address: string;
  status: string;
  featured?: boolean;
  developerId: number;
  locationId: number;
  images?: string[];
  features?: string[];
  latitude?: number;
  longitude?: number;
  premium?: boolean;
  exclusive?: boolean;
  newLaunch?: boolean;
  soldOut?: boolean;
  fastSelling?: boolean;
  comingSoon?: boolean;
  amenities?: string[];
  completionDate?: string;
  completionYear?: number;
  completionQuarter?: string;
  paymentPlan?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  reviewStatus?: string;
}

export interface Location {
  id: number;
  name: string;
  description?: string;
  featured?: boolean;
  city: string;
  propertyCount?: number;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  propertyId?: number;
  createdAt?: Date;
}