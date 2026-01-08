
import React from 'react';

// For PropertyCard and FeaturedProperties
export interface PropertyFeature {
  icon: React.ElementType;
  label: string;
}

export interface Property {
  id: number | string;
  status: string;
  image: string;
  title: string;
  price: string;
  location: string;
  features: PropertyFeature[];
}

// For PortfolioPage and ListingCard
export interface PortfolioProperty {
  id: number | string;
  image: string;
  location: string;
  title: string;
  price: string;
  rooms: string;
  baths: string;
  area: string;
  listingId: string;
}

// For ListingDetailPage and its components
export interface ListingSpec {
  label: string;
  value: string;
  icon: React.ElementType;
}

export interface ListingDetail {
  id: number | string;
  tags: { text: string; type: string }[];
  title: string;
  location: string;
  listingId: string;
  lastUpdated: string;
  gallery: {
    main: string;
    thumbnails: string[];
  };
  description: {
    paragraphs: string[];
    features: string[];
  };
  price: string;
  specs: ListingSpec[];
  agent: {
    name: string;
    title: string;
    avatar: string;
    rating: number;
  };
  mapLocationImage: string;
}

// For ProjectsPage and ProjectDetailPage and their components
export type ProjectTagStyle = 'primary' | 'secondary' | 'green' | 'blue' | 'purple' | 'yellow';

export interface ProjectTag {
  text: string;
  style: ProjectTagStyle;
}

export interface ProjectDetailItem {
  label: string;
  value: string;
  icon: React.ElementType;
}

export interface Project {
  id: number | string;
  image: string;
  tags: ProjectTag[];
  location: string;
  title: string;
  price: string;
  details: ProjectDetailItem[];
}

export interface ProjectGallery {
  main: string;
  thumbnails: string[];
  totalCount: number;
}

export interface ProjectInvestmentHighlight {
    icon: React.ElementType;
    title: string;
    description: string;
}

export interface ProjectDetail {
    id: number | string;
    title: string;
    location: string;
    tags: ProjectTag[];
    gallery: ProjectGallery;
    description: string[];
    investmentHighlights: ProjectInvestmentHighlight[];
    amenities: string[];
    summary: {
      price: string;
      discount?: string;
      items: ProjectDetailItem[];
    };
}

// For AboutPage TeamSection
export interface TeamMember {
  name: string;
  title: string;
  image: string;
}