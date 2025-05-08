import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Developer Schema
export const developers = pgTable("developers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  description: text("description").notNull(),
  projectCount: integer("project_count").notNull(),
  established: integer("established"),
  website: text("website"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  featured: boolean("featured").default(false),
});

export const insertDeveloperSchema = createInsertSchema(developers).omit({
  id: true
});

// Location Schema
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  description: text("description"),
  propertyCount: integer("property_count").default(0),
  featured: boolean("featured").default(false),
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true
});

// Property Schema
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  propertyType: text("property_type").notNull(), // apartment, villa, penthouse, etc.
  status: text("status").notNull(), // ready, off-plan, etc.
  price: integer("price").notNull(),
  beds: integer("beds"),
  baths: integer("baths"),
  area: integer("area"), // in sq ft
  locationId: integer("location_id").notNull(),
  developerId: integer("developer_id").notNull(),
  address: text("address").notNull(),
  images: jsonb("images").notNull(),
  features: jsonb("features"), // array of features
  latitude: real("latitude"),
  longitude: real("longitude"),
  featured: boolean("featured").default(false),
  premium: boolean("premium").default(false),
  exclusive: boolean("exclusive").default(false),
  newLaunch: boolean("new_launch").default(false),
  reviewStatus: text("review_status").default("pending"), // pending, approved, rejected
  contactName: text("contact_name"), // Name of the submitter
  contactEmail: text("contact_email"), // Email of the submitter
  contactPhone: text("contact_phone"), // Phone of the submitter
  listingType: text("listing_type"), // agent, private
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true
});

// Inquiry Schema
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  propertyId: integer("property_id"),
  status: text("status").default("new").notNull(), // new, contacted, closed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  status: true
});

// Export types
export type Developer = typeof developers.$inferSelect;
export type InsertDeveloper = z.infer<typeof insertDeveloperSchema>;

export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
