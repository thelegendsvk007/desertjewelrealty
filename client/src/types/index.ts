export interface Developer {
  id: number;
  name: string;
  logo: string;
  projectCount: string | number;
  description: string;
  overviewParagraphs?: string[];
  established?: number;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  featured?: boolean;
  keyProjects?: string[];
  uniqueSellingPoints?: string[];
  marketPosition?: string;
}

export interface NearbyAttraction {
  name: string;
  distance: string;
  category: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  status: string;
  address: string;
  beds: number | string;
  baths: number;
  area: number;
  images: string[];
  features?: string[];
  latitude?: number;
  longitude?: number;
  locationId: number;
  developerId: number;
  featured?: boolean;
  premium?: boolean;
  exclusive?: boolean;
  newLaunch?: boolean;
  comingSoon?: boolean;
  soldOut?: boolean;
  fastSelling?: boolean;
  reviewStatus?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  listingType?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  completionYear?: number;
  completionQuarter?: string;
  nearbyAttractions?: NearbyAttraction[];
}

export interface Location {
  id: number;
  name: string;
  city: string;
  description?: string;
  featured?: boolean;
  propertyCount?: number;
}