
import React from 'react';

export enum UserRole {
  BUYER = 'Buyer',
  SELLER = 'Seller',
  AGENT = 'Real Estate Agent',
  LENDER = 'Lender',
  INVESTOR = 'Investor'
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
}