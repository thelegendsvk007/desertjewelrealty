import { Request, Response, Router } from 'express';
import { storage } from './storage';
import { insertPropertyListingSchema, insertContactMessageSchema } from '@shared/schema';
import { fromZodError } from 'zod-validation-error';

const router = Router();

// Get all property listings
router.get('/property-listings', async (req: Request, res: Response) => {
  try {
    const listings = await storage.getPropertyListings();
    res.json(listings);
  } catch (error) {
    console.error('Error fetching property listings:', error);
    res.status(500).json({ error: 'Failed to fetch property listings' });
  }
});

// Get single property listing
router.get('/property-listings/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const listing = await storage.getPropertyListing(id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Property listing not found' });
    }
    
    res.json(listing);
  } catch (error) {
    console.error('Error fetching property listing:', error);
    res.status(500).json({ error: 'Failed to fetch property listing' });
  }
});

// Create new property listing
router.post('/property-listings', async (req: Request, res: Response) => {
  try {
    const validation = insertPropertyListingSchema.safeParse(req.body);
    
    if (!validation.success) {
      const validationError = fromZodError(validation.error);
      return res.status(400).json({ error: validationError.toString() });
    }
    
    const listing = await storage.createPropertyListing(validation.data);
    res.status(201).json(listing);
  } catch (error) {
    console.error('Error creating property listing:', error);
    res.status(500).json({ error: 'Failed to create property listing' });
  }
});

// Update property listing status (for admin)
router.patch('/property-listings/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const listing = await storage.updatePropertyListing(id, { status });
    res.json(listing);
  } catch (error) {
    console.error('Error updating property listing:', error);
    res.status(500).json({ error: 'Failed to update property listing' });
  }
});

// Delete property listing
router.delete('/property-listings/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deletePropertyListing(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting property listing:', error);
    res.status(500).json({ error: 'Failed to delete property listing' });
  }
});

// Get all contact messages (for admin)
router.get('/contact-messages', async (req: Request, res: Response) => {
  try {
    const messages = await storage.getContactMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

// Create new contact message
router.post('/contact-messages', async (req: Request, res: Response) => {
  try {
    const validation = insertContactMessageSchema.safeParse(req.body);
    
    if (!validation.success) {
      const validationError = fromZodError(validation.error);
      return res.status(400).json({ error: validationError.toString() });
    }
    
    const message = await storage.createContactMessage(validation.data);
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ error: 'Failed to create contact message' });
  }
});

// Update contact message status
router.patch('/contact-messages/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!['unread', 'read', 'responded'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const message = await storage.updateContactMessageStatus(id, status);
    res.json(message);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(500).json({ error: 'Failed to update contact message' });
  }
});

export default router;