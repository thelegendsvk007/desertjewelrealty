import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDeveloperSchema, insertLocationSchema, insertPropertySchema, insertInquirySchema } from "@shared/schema";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAdmin } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // API routes - prefix with /api
  
  // Developer routes
  app.get("/api/developers", async (req: Request, res: Response) => {
    try {
      const developers = await storage.getDevelopers();
      res.json(developers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developers" });
    }
  });

  app.get("/api/developers/featured", async (req: Request, res: Response) => {
    try {
      const featuredDevelopers = await storage.getFeaturedDevelopers();
      res.json(featuredDevelopers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured developers" });
    }
  });

  app.get("/api/developers/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid developer ID" });
      }
      
      const developer = await storage.getDeveloper(id);
      if (!developer) {
        return res.status(404).json({ message: "Developer not found" });
      }
      
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developer" });
    }
  });

  app.post("/api/developers", async (req: Request, res: Response) => {
    try {
      const developerData = insertDeveloperSchema.parse(req.body);
      const newDeveloper = await storage.createDeveloper(developerData);
      res.status(201).json(newDeveloper);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid developer data", errors: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create developer" });
    }
  });

  // Location routes
  app.get("/api/locations", async (req: Request, res: Response) => {
    try {
      const locations = await storage.getLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  app.get("/api/locations/featured", async (req: Request, res: Response) => {
    try {
      const featuredLocations = await storage.getFeaturedLocations();
      res.json(featuredLocations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured locations" });
    }
  });

  app.get("/api/locations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const location = await storage.getLocation(id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });

  app.post("/api/locations", async (req: Request, res: Response) => {
    try {
      const locationData = insertLocationSchema.parse(req.body);
      const newLocation = await storage.createLocation(locationData);
      res.status(201).json(newLocation);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid location data", errors: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create location" });
    }
  });

  // Property routes
  app.get("/api/properties", async (req: Request, res: Response) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/featured", async (req: Request, res: Response) => {
    try {
      const featuredProperties = await storage.getFeaturedProperties();
      res.json(featuredProperties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  app.get("/api/properties/search", async (req: Request, res: Response) => {
    try {
      const { propertyType, locationId, price, beds } = req.query;
      
      const searchQuery: any = {};
      
      if (propertyType) searchQuery.propertyType = propertyType.toString();
      if (locationId) searchQuery.locationId = parseInt(locationId.toString());
      if (price) searchQuery.price = parseInt(price.toString());
      if (beds) searchQuery.beds = parseInt(beds.toString());
      
      const properties = await storage.searchProperties(searchQuery);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to search properties" });
    }
  });

  app.get("/api/properties/byDeveloper/:developerId", async (req: Request, res: Response) => {
    try {
      const developerId = parseInt(req.params.developerId);
      if (isNaN(developerId)) {
        return res.status(400).json({ message: "Invalid developer ID" });
      }
      
      const properties = await storage.getPropertiesByDeveloper(developerId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by developer" });
    }
  });

  app.get("/api/properties/byLocation/:locationId", async (req: Request, res: Response) => {
    try {
      const locationId = parseInt(req.params.locationId);
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const properties = await storage.getPropertiesByLocation(locationId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by location" });
    }
  });

  app.get("/api/properties/byType/:propertyType", async (req: Request, res: Response) => {
    try {
      const { propertyType } = req.params;
      const properties = await storage.getPropertiesByType(propertyType);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by type" });
    }
  });

  app.get("/api/properties/byStatus/:status", async (req: Request, res: Response) => {
    try {
      const { status } = req.params;
      const properties = await storage.getPropertiesByStatus(status);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by status" });
    }
  });

  app.get("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req: Request, res: Response) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const newProperty = await storage.createProperty(propertyData);
      res.status(201).json(newProperty);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });
  
  // Add route for updating property status
  app.patch("/api/properties/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const statusSchema = z.object({
        status: z.string().refine(val => ['approved', 'rejected', 'pending'].includes(val), {
          message: "Status must be one of: approved, rejected, pending"
        })
      });
      
      const { status } = statusSchema.parse(req.body);
      
      const updatedProperty = await storage.updatePropertyStatus(id, status);
      if (!updatedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(updatedProperty);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid status data", errors: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update property status" });
    }
  });

  // Inquiry routes
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const newInquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(newInquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  app.get("/api/inquiries", async (req: Request, res: Response) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.get("/api/inquiries/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid inquiry ID" });
      }
      
      const inquiry = await storage.getInquiry(id);
      if (!inquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiry" });
    }
  });

  app.patch("/api/inquiries/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid inquiry ID" });
      }
      
      const statusSchema = z.object({
        status: z.string().refine(val => ['new', 'contacted', 'closed'].includes(val), {
          message: "Status must be one of: new, contacted, closed"
        })
      });
      
      const { status } = statusSchema.parse(req.body);
      
      const updatedInquiry = await storage.updateInquiryStatus(id, status);
      if (!updatedInquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      
      res.json(updatedInquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid status data", errors: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update inquiry status" });
    }
  });
  
  // Delete a property - Admin only
  app.delete("/api/properties/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const deleted = await storage.deleteProperty(id);
      if (!deleted) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.status(200).json({ 
        success: true, 
        message: `Property with ID ${id} has been deleted successfully` 
      });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
