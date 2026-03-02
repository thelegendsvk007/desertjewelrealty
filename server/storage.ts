import { db } from './db';
import { properties, locations, developers } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { Property, Location, Developer } from '@shared/schema';

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  
  // Locations
  getLocations(): Promise<Location[]>;
  
  // Developers
  getDevelopers(): Promise<Developer[]>;
}

export class DbStorage implements IStorage {
  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    const result = await db.select().from(properties).where(eq(properties.id, id));
    return result[0];
  }

  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  async getDevelopers(): Promise<Developer[]> {
    return await db.select().from(developers);
  }
}

export class MemStorage implements IStorage {
  private properties: Property[] = [];
  private locations: Location[] = [];
  private developers: Developer[] = [];

  async getProperties(): Promise<Property[]> {
    return this.properties;
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.find(p => p.id === id);
  }

  async getLocations(): Promise<Location[]> {
    return this.locations;
  }

  async getDevelopers(): Promise<Developer[]> {
    return this.developers;
  }
}

// Use in-memory storage for now
export const storage = new MemStorage();