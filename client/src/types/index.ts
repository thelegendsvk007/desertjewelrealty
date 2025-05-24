

export interface Developer {
    id: number | string;
    name: string;
    logo: string;
    projectCount: string | number;
    description?: string;
    established?: number | string;
    website?: string;
    contactEmail?: string;
    contactPhone?: string;
    featured?: boolean;
    [key: string]: any;
  }
  
  export interface Property {
    id: number | string;
    images: string | string[];
    title: string;
    address: string;
    price: number;
    status: string;
    beds: number;
    baths: number;
    area: number;
    premium?: boolean;
    exclusive?: boolean;
    newLaunch?: boolean;
    propertyType?: string;
    [key: string]: any;
  }
  
  export interface Development {
    id: number | string;
    name: string;
    developer: string;
    description: string;
    price: string;
    completion: string;
    units: string;
    brochure: string;
    video: string;
  }

export { default as SobhaAquamontBrochure } from '../assets/brochures/Sobha_Aquamont_Downtown_UAQ.pdf?url';
export { default as SobhaAquamontVideo } from '../assets/videos/sobha-aquamont-tour.mp4?url';
export { default as SiniyaIslandBrochure } from '../assets/brochures/Siniya_Island_Beach_Residences.pdf?url';
export { default as SiniyaIslandVideo } from '../assets/videos/siniya-island-tour.mp4?url';