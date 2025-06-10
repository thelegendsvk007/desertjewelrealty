import { pgTable, text, integer, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Properties table
export const properties = pgTable('properties', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 15, scale: 2 }).notNull(),
  propertyType: text('property_type').notNull(),
  category: text('category').notNull().default('residential'),
  beds: integer('beds'),
  baths: integer('baths'),
  area: decimal('area', { precision: 10, scale: 2 }),
  city: text('city').notNull(),
  locationId: integer('location_id'),
  developerId: integer('developer_id'),
  status: text('status').notNull().default('Ready to Move'),
  images: text('images').array(),
  features: text('features').array(),
  amenities: text('amenities').array(),
  premium: boolean('premium').default(false),
  exclusive: boolean('exclusive').default(false),
  newLaunch: boolean('new_launch').default(false),
  isGoldenVisaEligible: boolean('is_golden_visa_eligible').default(false),
  isMortgageAvailable: boolean('is_mortgage_available').default(false),
  completionYear: integer('completion_year'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Insert schema for properties
export const insertPropertySchema = createInsertSchema(properties, {
  price: z.string().or(z.number()),
  area: z.string().or(z.number()).optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Locations table
export const locations = pgTable('locations', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  city: text('city').notNull(),
  emirate: text('emirate').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
  createdAt: true,
});

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

// Developers table
export const developers = pgTable('developers', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  description: text('description'),
  logo: text('logo'),
  website: text('website'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertDeveloperSchema = createInsertSchema(developers).omit({
  id: true,
  createdAt: true,
});

export type InsertDeveloper = z.infer<typeof insertDeveloperSchema>;
export type Developer = typeof developers.$inferSelect;