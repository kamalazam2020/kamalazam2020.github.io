export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  bgImage: string;
  link?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string; // Dynamic partition name (e.g. 'Commercial Ads', 'Documentaries', 'Podcasts', 'Photography & Stills', 'Fashion', etc.)
  client: string;
  year: string;
  mediaType?: 'video' | 'image' | 'gallery';
  duration?: string;
  thumbnail: string;
  videoUrl?: string;
  imageUrl?: string;
  galleryImages?: string[];
  description: string;
  featured?: boolean;
}


export interface StudioItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  features: string[];
  dimensions: string;
  image: string;
}

export interface MediaServicePackage {
  id: string;
  name: string;
  category: 'Video Production' | 'Editorial & Stills' | 'Post-Production & VFX' | 'Audio & Vodcasts' | 'Digital & Social';
  tagline: string;
  badge?: string;
  pricing: string;
  ratePeriod?: string;
  turnaround: string;
  deliverables: string[];
  specs: string;
  image: string;
  popular?: boolean;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Cameras' | 'Lenses' | 'Lighting' | 'Audio & Grip' | string;
  specs: string;
  image: string;
  pricing?: string;
  deliverables?: string[];
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  industry?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}
