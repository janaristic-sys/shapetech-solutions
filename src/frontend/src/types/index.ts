export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryUrl: string;
  ctaSecondaryUrl: string;
}

export interface AboutContent {
  title: string;
  body: string;
  mission: string;
  vision: string;
  yearsInBusiness: number;
  projectsDelivered: number;
  clientsSatisfied: number;
}

export interface Client {
  id: bigint;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: bigint;
}

export interface Industry {
  id: bigint;
  title: string;
  description: string;
  iconName: string;
  slug: string;
  sortOrder: bigint;
  highlights?: string[];
  featured?: boolean;
}

export interface Shape {
  id: bigint;
  title: string;
  description: string;
  iconName: string;
  slug: string;
  sortOrder: bigint;
}

export interface Solution {
  id: bigint;
  title: string;
  description: string;
  iconName: string;
  slug: string;
  sortOrder: bigint;
}

export interface Testimonial {
  id: bigint;
  authorName: string;
  authorTitle: string;
  company: string;
  quote: string;
  avatarUrl: string;
  sortOrder: bigint;
}

export interface PortfolioItem {
  id: bigint;
  title: string;
  description: string;
  imageUrl: string;
  clientName: string;
  tags: string[];
  launchDate: string;
  sortOrder: bigint;
}

export interface FaqItem {
  id: bigint;
  question: string;
  answer: string;
  sortOrder: bigint;
}

export interface TeamMember {
  id: bigint;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl: string;
  sortOrder: bigint;
}

export interface Partner {
  id: bigint;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  sortOrder: bigint;
}

export interface BlogPost {
  id: bigint;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string;
  tags: string[];
  published: boolean;
}

export interface ContactSubmission {
  id: bigint;
  name: string;
  email: string;
  company: string;
  message: string;
  submittedAt: bigint;
}
