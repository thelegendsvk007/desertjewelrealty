import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Property Listings Schema
export const propertyListings = pgTable('property_listings', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  location: text('location').notNull(),
  propertyType: text('property_type').notNull(),
  bedrooms: text('bedrooms'),
  bathrooms: text('bathrooms'),
  area: integer('area'),
  status: text('status').default('pending'), // pending, approved, rejected
  submittedBy: text('submitted_by').notNull(),
  contactName: text('contact_name').notNull(),
  contactPhone: text('contact_phone').notNull(),
  contactEmail: text('contact_email').notNull(),
  images: text('images').array().default([]),
  features: text('features').array().default([]),
  amenities: text('amenities').array().default([]),
  developer: text('developer'),
  handoverYear: text('handover_year'),
  furnishing: text('furnishing'),
  isGoldenVisaEligible: boolean('is_golden_visa_eligible').default(false),
  isMortgageAvailable: boolean('is_mortgage_available').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Users Schema (for authentication)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  email: text('email').unique(),
  role: text('role').default('user'), // user, admin
  createdAt: timestamp('created_at').defaultNow(),
});

// Contact Messages Schema
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('unread'), // unread, read, responded
  createdAt: timestamp('created_at').defaultNow(),
});

// Create insert schemas
export const insertPropertyListingSchema = createInsertSchema(propertyListings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Create types
export type PropertyListing = typeof propertyListings.$inferSelect;
export type InsertPropertyListing = z.infer<typeof insertPropertyListingSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;