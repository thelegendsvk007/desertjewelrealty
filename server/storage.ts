import { 
  Developer, 
  InsertDeveloper, 
  Location, 
  InsertLocation, 
  Property, 
  InsertProperty, 
  Inquiry, 
  InsertInquiry,
  developers,
  locations,
  properties,
  inquiries
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Developer operations
  getDevelopers(): Promise<Developer[]>;
  getDeveloper(id: number): Promise<Developer | undefined>;
  createDeveloper(developer: InsertDeveloper): Promise<Developer>;
  getFeaturedDevelopers(): Promise<Developer[]>;

  // Location operations
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  getFeaturedLocations(): Promise<Location[]>;

  // Property operations
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updatePropertyStatus(id: number, status: string): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>; // New method to delete a property
  getFeaturedProperties(): Promise<Property[]>;
  getPropertiesByDeveloper(developerId: number): Promise<Property[]>;
  getPropertiesByLocation(locationId: number): Promise<Property[]>;
  getPropertiesByType(propertyType: string): Promise<Property[]>;
  getPropertiesByStatus(status: string): Promise<Property[]>;
  searchProperties(query: Partial<Property>): Promise<Property[]>;

  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private developers: Map<number, Developer>;
  private locations: Map<number, Location>;
  private properties: Map<number, Property>;
  private inquiries: Map<number, Inquiry>;
  
  private developerId: number;
  private locationId: number;
  private propertyId: number;
  private inquiryId: number;

  constructor() {
    this.developers = new Map();
    this.locations = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    
    this.developerId = 1;
    this.locationId = 1;
    this.propertyId = 1;
    this.inquiryId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed developers
    const emaar: InsertDeveloper = {
      name: "Emaar Properties",
      logo: "https://logowik.com/content/uploads/images/emaar-properties4133.jpg",
      description: "Emaar Properties is one of the UAE's most valuable and admired real estate development companies.",
      projectCount: 42,
      established: 1997,
      website: "https://www.emaar.com",
      contactEmail: "info@emaar.com",
      contactPhone: "+971 4 366 1688",
      featured: true
    };
    
    const damac: InsertDeveloper = {
      name: "Damac Properties",
      logo: "https://logowik.com/content/uploads/images/damac-properties8251.jpg",
      description: "DAMAC Properties has been at the forefront of the Middle East's luxury real estate market since 2002.",
      projectCount: 35,
      established: 2002,
      website: "https://www.damacproperties.com",
      contactEmail: "info@damacproperties.com",
      contactPhone: "+971 4 373 1000",
      featured: true
    };
    
    const nakheel: InsertDeveloper = {
      name: "Nakheel",
      logo: "https://logowik.com/content/uploads/images/nakheel9523.jpg",
      description: "Nakheel is one of the world's leading developers and a major contributor to Dubai's iconic skyline.",
      projectCount: 25,
      established: 2000,
      website: "https://www.nakheel.com",
      contactEmail: "info@nakheel.com",
      contactPhone: "+971 4 390 3333",
      featured: true
    };
    
    const aldar: InsertDeveloper = {
      name: "Aldar Properties",
      logo: "https://logowik.com/content/uploads/images/aldar-properties6278.jpg",
      description: "Aldar Properties is Abu Dhabi's leading property development, management and investment company.",
      projectCount: 30,
      established: 2005,
      website: "https://www.aldar.com",
      contactEmail: "info@aldar.com",
      contactPhone: "+971 2 810 5555",
      featured: true
    };
    
    const deyaar: InsertDeveloper = {
      name: "Deyaar Development",
      logo: "https://logowik.com/content/uploads/images/deyaar4217.jpg",
      description: "Deyaar Development is one of Dubai's leading property developers and real estate service providers.",
      projectCount: 18,
      established: 2002,
      website: "https://www.deyaar.ae",
      contactEmail: "info@deyaar.ae",
      contactPhone: "+971 4 819 8888",
      featured: true
    };
    
    const meraas: InsertDeveloper = {
      name: "Meraas",
      logo: "https://logowik.com/content/uploads/images/meraas1751.jpg",
      description: "Meraas is a Dubai-based holding company with operations in multiple sectors including real estate.",
      projectCount: 22,
      established: 2007,
      website: "https://www.meraas.com",
      contactEmail: "info@meraas.ae",
      contactPhone: "+971 4 317 3999",
      featured: true
    };
    
    const sobha: InsertDeveloper = {
      name: "Sobha Realty",
      logo: "https://logowik.com/content/uploads/images/sobha-realty5812.jpg",
      description: "Sobha Realty is a multinational real estate developer specializing in luxury developments.",
      projectCount: 15,
      established: 1976,
      website: "https://www.sobharealty.com",
      contactEmail: "info@sobharealty.com",
      contactPhone: "+971 4 407 9999",
      featured: true
    };
    
    const selectGroup: InsertDeveloper = {
      name: "Select Group",
      logo: "https://logowik.com/content/uploads/images/select-group7198.jpg",
      description: "Select Group is one of the largest private real estate developers in the UAE.",
      projectCount: 20,
      established: 2002,
      website: "https://www.select-group.ae",
      contactEmail: "info@select-group.ae",
      contactPhone: "+971 4 368 8036",
      featured: true
    };
    
    this.createDeveloper(emaar);
    this.createDeveloper(damac);
    this.createDeveloper(nakheel);
    this.createDeveloper(aldar);
    this.createDeveloper(deyaar);
    this.createDeveloper(meraas);
    this.createDeveloper(sobha);
    this.createDeveloper(selectGroup);
    
    // Seed locations
    const dubaiMarina: InsertLocation = {
      name: "Dubai Marina",
      city: "Dubai",
      description: "An affluent residential neighborhood known for The Beach and Dubai Marina Mall.",
      propertyCount: 52,
      featured: true
    };
    
    const palmJumeirah: InsertLocation = {
      name: "Palm Jumeirah",
      city: "Dubai",
      description: "A man-made island known for beautiful beaches, luxury resorts and iconic buildings.",
      propertyCount: 24,
      featured: true
    };
    
    const downtownDubai: InsertLocation = {
      name: "Downtown Dubai",
      city: "Dubai",
      description: "Home to Burj Khalifa, Dubai Mall and many other iconic landmarks.",
      propertyCount: 38,
      featured: true
    };
    
    const maritimeCity: InsertLocation = {
      name: "Dubai Maritime City",
      city: "Dubai",
      description: "A waterfront development offering modern residential and commercial spaces with stunning marina views.",
      propertyCount: 15,
      featured: true
    };
    
    const loc1 = this.createLocation(dubaiMarina);
    const loc2 = this.createLocation(palmJumeirah);
    const loc3 = this.createLocation(downtownDubai);
    const loc4 = this.createLocation(maritimeCity);
    
    // Seed properties
    const property1: InsertProperty = {
      title: "Luxury Villa in Palm Jumeirah",
      description: "A stunning villa with beautiful sea views and private beach access.",
      propertyType: "Villa",
      status: "Ready",
      price: 15500000,
      beds: 5,
      baths: 6,
      area: 7500,
      locationId: 1,
      developerId: 1, // Emaar
      address: "Frond K, Palm Jumeirah, Dubai",
      images: JSON.stringify(["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]),
      features: JSON.stringify(["Private Pool", "Garden", "Smart Home System", "Private Beach Access"]),
      latitude: 25.1123,
      longitude: 55.1391,
      featured: true,
      premium: true,
      exclusive: false,
      newLaunch: false
    };
    
    const property2: InsertProperty = {
      title: "Exclusive Penthouse in Dubai Marina",
      description: "A luxurious penthouse with stunning views of Dubai Marina and the Arabian Gulf.",
      propertyType: "Penthouse",
      status: "Ready",
      price: 12800000,
      beds: 4,
      baths: 4.5,
      area: 5200,
      locationId: 2,
      developerId: 2, // Damac
      address: "Dubai Marina, Dubai",
      images: JSON.stringify(["https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]),
      features: JSON.stringify(["Private Terrace", "Jacuzzi", "Private Elevator", "Floor-to-ceiling Windows"]),
      latitude: 25.0750,
      longitude: 55.1399,
      featured: true,
      premium: false,
      exclusive: true,
      newLaunch: false
    };
    
    const property3: InsertProperty = {
      title: "Modern Apartment in Downtown Dubai",
      description: "A stylish apartment in the heart of Downtown Dubai with views of Burj Khalifa.",
      propertyType: "Apartment",
      status: "Off-Plan",
      price: 3200000,
      beds: 2,
      baths: 2.5,
      area: 1450,
      locationId: 3,
      developerId: 3, // Nakheel
      address: "Downtown, Dubai",
      images: JSON.stringify(["https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]),
      features: JSON.stringify(["Gym", "Swimming Pool", "Children's Play Area", "BBQ Area"]),
      latitude: 25.1972,
      longitude: 55.2744,
      featured: true,
      premium: false,
      exclusive: false,
      newLaunch: true
    };
    
    // Chelsea Residences properties
    const chelseaResidences1BR: InsertProperty = {
      title: "Chelsea Residences - 1 Bedroom",
      description: "Elegant 1-bedroom apartment in the prestigious Chelsea Residences with modern amenities and waterfront views.",
      propertyType: "Apartment",
      status: "Off-Plan",
      price: 2170000,
      beds: 1,
      baths: 1,
      area: 750,
      locationId: 4, // Maritime City
      developerId: 2, // Damac Properties
      address: "Chelsea Residences, Maritime City, Dubai",
      images: JSON.stringify(["/assets/properties/Chelsea-1BR.png"]),
      features: JSON.stringify(["Marina Views", "Gym", "Swimming Pool", "Concierge", "24/7 Security"]),
      latitude: 25.0657,
      longitude: 55.1408,
      featured: true,
      premium: false,
      exclusive: false,
      newLaunch: true
    };
    
    const chelseaResidences2BR: InsertProperty = {
      title: "Chelsea Residences - 2 Bedroom",
      description: "Spacious 2-bedroom apartment in Chelsea Residences featuring premium finishes and panoramic marina views.",
      propertyType: "Apartment",
      status: "Off-Plan",
      price: 3130000,
      beds: 2,
      baths: 2,
      area: 1200,
      locationId: 4, // Maritime City
      developerId: 2, // Damac Properties
      address: "Chelsea Residences, Maritime City, Dubai",
      images: JSON.stringify(["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]),
      features: JSON.stringify(["Marina Views", "Gym", "Swimming Pool", "Balcony", "Concierge", "24/7 Security"]),
      latitude: 25.0658,
      longitude: 55.1409,
      featured: true,
      premium: false,
      exclusive: false,
      newLaunch: true
    };
    
    const chelseaResidences3BR: InsertProperty = {
      title: "Chelsea Residences - 3 Bedroom",
      description: "Luxurious 3-bedroom apartment in Chelsea Residences with stunning views and world-class amenities.",
      propertyType: "Apartment",
      status: "Off-Plan",
      price: 4940000,
      beds: 3,
      baths: 3,
      area: 1800,
      locationId: 4, // Maritime City
      developerId: 2, // Damac Properties
      address: "Chelsea Residences, Maritime City, Dubai",
      images: JSON.stringify(["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]),
      features: JSON.stringify(["Marina Views", "Gym", "Swimming Pool", "Private Balcony", "Maid's Room", "Concierge", "24/7 Security"]),
      latitude: 25.0659,
      longitude: 55.1410,
      featured: true,
      premium: true,
      exclusive: false,
      newLaunch: true
    };
    
    this.createProperty(property1);
    this.createProperty(property2);
    this.createProperty(property3);
    this.createProperty(chelseaResidences1BR);
    this.createProperty(chelseaResidences2BR);
    this.createProperty(chelseaResidences3BR);
  }

  // Developer methods
  async getDevelopers(): Promise<Developer[]> {
    return Array.from(this.developers.values());
  }

  async getDeveloper(id: number): Promise<Developer | undefined> {
    return this.developers.get(id);
  }

  async createDeveloper(developer: InsertDeveloper): Promise<Developer> {
    const id = this.developerId++;
    const newDeveloper: Developer = { ...developer, id };
    this.developers.set(id, newDeveloper);
    return newDeveloper;
  }

  async getFeaturedDevelopers(): Promise<Developer[]> {
    return Array.from(this.developers.values()).filter(dev => dev.featured);
  }

  // Location methods
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const id = this.locationId++;
    const newLocation: Location = { ...location, id };
    this.locations.set(id, newLocation);
    return newLocation;
  }

  async getFeaturedLocations(): Promise<Location[]> {
    return Array.from(this.locations.values()).filter(loc => loc.featured);
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyId++;
    const now = new Date();
    const newProperty: Property = { 
      ...property, 
      id, 
      createdAt: now,
      reviewStatus: 'pending' // Add default review status for new properties
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }
  
  async updatePropertyStatus(id: number, status: string): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) {
      return undefined;
    }
    
    const updatedProperty: Property = {
      ...property,
      reviewStatus: status,
      updatedAt: new Date()
    };
    
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    const exists = this.properties.has(id);
    if (exists) {
      this.properties.delete(id);
      return true;
    }
    return false;
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(prop => prop.featured);
  }

  async getPropertiesByDeveloper(developerId: number): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(prop => prop.developerId === developerId);
  }

  async getPropertiesByLocation(locationId: number): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(prop => prop.locationId === locationId);
  }

  async getPropertiesByType(propertyType: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(prop => prop.propertyType === propertyType);
  }

  async getPropertiesByStatus(status: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(prop => prop.status === status);
  }

  async searchProperties(query: Partial<Property>): Promise<Property[]> {
    let filteredProperties = Array.from(this.properties.values());
    
    if (query.propertyType) {
      filteredProperties = filteredProperties.filter(prop => prop.propertyType === query.propertyType);
    }
    
    if (query.locationId) {
      filteredProperties = filteredProperties.filter(prop => prop.locationId === query.locationId);
    }
    
    if (query.price) {
      // Assuming the price is the maximum price
      filteredProperties = filteredProperties.filter(prop => prop.price <= query.price);
    }
    
    if (query.beds) {
      filteredProperties = filteredProperties.filter(prop => prop.beds === query.beds);
    }
    
    return filteredProperties;
  }

  // Inquiry methods
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const now = new Date();
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      status: "new",
      createdAt: now
    };
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.get(id);
    if (!inquiry) return undefined;
    
    const updatedInquiry: Inquiry = {
      ...inquiry,
      status
    };
    
    this.inquiries.set(id, updatedInquiry);
    return updatedInquiry;
  }
}

export const storage = new MemStorage();
