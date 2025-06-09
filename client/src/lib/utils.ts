import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "AED") {
  return `${currency} ${price.toLocaleString()}`;
}

export function formatArea(area: number) {
  return `${area.toLocaleString()} sqft`;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getPropertyTypeBadgeColor(propertyType: string) {
  switch (propertyType.toLowerCase()) {
    case "apartment":
      return "bg-blue-500";
    case "villa":
      return "bg-green-500";
    case "penthouse":
      return "bg-purple-500";
    case "townhouse":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusBadgeColor(status: string) {
  switch (status.toLowerCase()) {
    case "ready":
      return "bg-green-500";
    case "off-plan":
      return "bg-amber-500";
    case "under construction":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
}

export function parsePropertyImages(images: string | string[] | undefined): string[] {
  if (!images) return [];
  if (Array.isArray(images)) {
    return images;
  }
  try {
    return JSON.parse(images);
  } catch (error) {
    console.error("Failed to parse property images:", error);
    return [];
  }
}

export function parsePropertyFeatures(features: string | string[] | null | undefined): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  
  try {
    return JSON.parse(features);
  } catch (error) {
    console.error("Failed to parse property features:", error);
    return [];
  }
}

export function getImagePlaceholder() {
  return "https://via.placeholder.com/600x400?text=No+Image";
}

export function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function isValidPhone(phone: string) {
  const re = /^\+?[0-9\s-()]{7,}$/;
  return re.test(phone);
}
