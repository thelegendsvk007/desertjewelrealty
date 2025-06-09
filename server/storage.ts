import { propertyListings, users, contactMessages, type PropertyListing, type InsertPropertyListing, type User, type InsertUser, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Property Listings
  getPropertyListings(): Promise<PropertyListing[]>;
  getPropertyListing(id: number): Promise<PropertyListing | undefined>;
  createPropertyListing(listing: InsertPropertyListing): Promise<PropertyListing>;
  updatePropertyListing(id: number, updates: Partial<PropertyListing>): Promise<PropertyListing>;
  deletePropertyListing(id: number): Promise<void>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  updateContactMessageStatus(id: number, status: string): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getPropertyListings(): Promise<PropertyListing[]> {
    const listings = await db.select().from(propertyListings).orderBy(propertyListings.createdAt);
    return listings;
  }

  async getPropertyListing(id: number): Promise<PropertyListing | undefined> {
    const [listing] = await db.select().from(propertyListings).where(eq(propertyListings.id, id));
    return listing || undefined;
  }

  async createPropertyListing(listing: InsertPropertyListing): Promise<PropertyListing> {
    const [created] = await db
      .insert(propertyListings)
      .values(listing)
      .returning();
    return created;
  }

  async updatePropertyListing(id: number, updates: Partial<PropertyListing>): Promise<PropertyListing> {
    const [updated] = await db
      .update(propertyListings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(propertyListings.id, id))
      .returning();
    return updated;
  }

  async deletePropertyListing(id: number): Promise<void> {
    await db.delete(propertyListings).where(eq(propertyListings.id, id));
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const messages = await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
    return messages;
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }

  async updateContactMessageStatus(id: number, status: string): Promise<ContactMessage> {
    const [updated] = await db
      .update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();