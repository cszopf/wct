
import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Clock, 
  FileText, 
  Zap, 
  Smartphone, 
  Layers,
  Camera,
  Share2,
  Palette,
  Target,
  BarChart3,
  Database,
  Cpu,
  CreditCard
} from 'lucide-react';
import { UserRole } from './types';

export const ROLE_CONTENT = {
  [UserRole.BUYER]: {
    headline: "The World's Best Buyer Experience.",
    subheadline: "Built on the fastest data in the industry. Track every milestone of your purchase with our proprietary closing engine.",
    primaryCTA: "Track My Closing",
    link: "https://rea-buyer.vercel.app/",
    experienceLabel: "Buyer Dashboard",
    valueProps: [
      { title: "Proprietary Tech", description: "Our custom-built infrastructure clears title faster than traditional agencies.", icon: <Cpu className="w-6 h-6" /> },
      { title: "Fastest Data", description: "Direct integrations with source data for instant updates and transparency.", icon: <Database className="w-6 h-6" /> },
      { title: "WCT Smart One™", description: "Total home protection that starts the second you close.", icon: <Smartphone className="w-6 h-6" /> }
    ]
  },
  [UserRole.SELLER]: {
    headline: "Radical Transparency for Sellers.",
    subheadline: "Proprietary tech that clears your title ahead of schedule. Real-time net sheets and proactive lien resolution powered by WCT Smart.",
    primaryCTA: "Prepare for Closing",
    link: "https://rea-seller.vercel.app/",
    experienceLabel: "Seller Dashboard",
    valueProps: [
      { title: "Instant Net Clarity", description: "Know exactly what you'll walk away with, updated in real-time.", icon: <BarChart3 className="w-6 h-6" /> },
      { title: "Proactive Clearance", description: "Our tech identifies and resolves title issues before they hit the schedule.", icon: <Search className="w-6 h-6" /> },
      { title: "Seamless Handover", description: "Automated communication with all parties via our Smart platform.", icon: <Zap className="w-6 h-6" /> }
    ]
  },
  [UserRole.AGENT]: {
    headline: "Your Unfair Advantage in Ohio Real Estate.",
    subheadline: "We built the industry's most advanced Agent Access system. See every deal, win more listings, and close faster with our proprietary tech stack.",
    primaryCTA: "Access Agent Experience",
    link: "https://rea-buyer.vercel.app/", 
    experienceLabel: "Agent Access Panel",
    valueProps: [
      { title: "Agent Access Panel", description: "Real-time visibility into every file with the industry's fastest data sync.", icon: <Layers className="w-6 h-6" /> },
      { title: "Proprietary Marketing", description: "Exclusive media packages designed to help you win the listing presentation.", icon: <Camera className="w-6 h-6" /> },
      { title: "Clear-to-Close Engine", description: "Our tech stack clears deals up to 40% faster than traditional title.", icon: <Zap className="w-6 h-6" /> }
    ]
  },
  [UserRole.LENDER]: {
    headline: "Institutional Precision. Unmatched Speed.",
    subheadline: "Powered by the best data sets and proprietary title search technology. Secure, integrated, and built for high-performance teams.",
    primaryCTA: "Submit New Order",
    link: "https://rea-buyer.vercel.app/",
    experienceLabel: "Lender Portal",
    valueProps: [
      { title: "Data Integrity", description: "Bank-grade security and source-verified data for total compliance.", icon: <Database className="w-6 h-6" /> },
      { title: "Real-time API", description: "Our proprietary systems plug directly into your LOS for frictionless data transfer.", icon: <Cpu className="w-6 h-6" /> },
      { title: "Secure Wiring", description: "Multivariate authentication for every dollar moved through our escrow.", icon: <ShieldCheck className="w-6 h-6" /> }
    ]
  },
  [UserRole.INVESTOR]: {
    headline: "Velocity and Visibility at Scale.",
    subheadline: "Proprietary portfolio dashboard built on the fastest data. High-volume title processing for the modern asset manager.",
    primaryCTA: "Portfolio Dashboard",
    link: "https://rea-seller.vercel.app/",
    experienceLabel: "Investor Dashboard",
    valueProps: [
      { title: "Batch Processing", description: "Move 10 or 100 files with the same level of speed and precision.", icon: <Layers className="w-6 h-6" /> },
      { title: "Aggressive Clearance", description: "Proprietary search tech built for complex distressed properties.", icon: <Search className="w-6 h-6" /> },
      { title: "Asset Protection", description: "Active monitoring of your entire property portfolio via Smart One.", icon: <Smartphone className="w-6 h-6" /> }
    ]
  }
};

export const ALACARTE_OPTIONS = [
  { title: "Open House Flyers", description: "Double Sided, Stipple, 8.5x11 Paper" },
  { title: "Home Features Flyers", description: "Single Sided, Stipple, 8.5x11 Paper" },
  { title: "New Listing Door Hanger Design", description: "Custom professional branding" },
  { title: "Open House Door Hanger Design", description: "High-impact street marketing" },
  { title: "New Listing Postcards Design", description: "Strategic neighborhood targeting" },
  { title: "Just Sold Postcard Design", description: "Celebrate your recent victory" },
  { title: "25 Listing Brochures", description: "4 Pages, 1 Stipple Sheet" },
  { title: "Dusk Photo Edits", description: "Professional twilight transformation" },
  { title: "Community Photos", description: "Showcase the neighborhood lifestyle" },
  { title: "3D Matterport Tour", description: "Fully immersive digital walkthrough" },
  { title: "3D Zillow Tour", description: "Optimize your Zillow ranking" },
  { title: "Content Creation Broker Open (CCBO)", description: "Event-based content marketing" },
  { title: "Virtual Staging", description: "Per-room digital furniture placement" },
  { title: "Walk Thru Video", description: "Vertical format / No Drone / Unedited" },
  { title: "Edited Walk Thru", description: "Horizontal / Edited / Includes Drone" },
  { title: "Talking Video With Agent", description: "Vertical format personal branding" },
  { title: "Highly Edited Video", description: "Vertical / Disappearing Agent effect" },
  { title: "CCBO Added Agents", description: "Collaboration support for events" },
  { title: "Platinum Booklets", description: "Premium physical marketing (5 Minimum)" },
  { title: "Seller Guides", description: "Branded guides for your client prep" }
];

export const MARKETING_PILLARS = [
  {
    title: "Listing Media Power",
    description: "Professional photography, drone, MLS video, and luxury listing presentation support to win more sellers.",
    icon: <Camera />,
    features: ["4K Drone Footage", "Matterport 3D Tours", "Listing Presentation Kits"]
  },
  {
    title: "Social Amplification",
    description: "Done-for-you Instagram Reels, TikTok content, and Facebook promotion to keep your brand top of mind.",
    icon: <Share2 />,
    features: ["Content Reels", "Daily Post Packages", "Ad Management"]
  },
  {
    title: "Design Studio",
    description: "Custom brochures, property flyers, and premium open house sign-in sheets that make you look elite.",
    icon: <Palette />,
    features: ["Custom Brochures", "Branded Open House Kits", "Listing Flyers"]
  },
  {
    title: "Listing Intelligence",
    description: "AI-powered property snapshots and net-to-seller tools that give you an edge in listing conversations.",
    icon: <Target />,
    features: ["Property AI Snapshots", "Seller Net Sheets", "Market Heat Maps"]
  }
];

export const MARKETING_PACKAGES = [
  { name: "Silver", price: "Entry Level", description: "Essential listing photography and flyers.", features: ["Photography", "Flyer Template", "Net Sheet"], color: "bg-slate-100" },
  { name: "Gold", price: "Strategic Choice", description: "Photography + Social Media amplification.", features: ["Photography", "Social Reel", "Brochure Design", "Drone Stills"], color: "bg-blue-50" },
  { name: "Platinum", price: "Most Popular", description: "Complete media and marketing takeover.", features: ["All Gold Features", "Matterport 3D", "Premium Video", "Social Ad Boost"], color: "bg-slate-900", dark: true, popular: true }
];

export const REVIEWS = [
  { id: '1', author: "Sarah Jenkins", rating: 5, text: "The Smart dashboard made tracking my closing so easy. WCT is truly in the future.", date: "2 days ago" },
  { id: '2', author: "Marcus Thompson", rating: 5, text: "As a Realtor, WCT helps me win listings. Their photography and marketing packages are game changers.", date: "1 week ago" },
  { id: '3', author: "David Miller", rating: 5, text: "Secure, professional, and surprisingly fast. They aren't just a title company; they are business partners.", date: "3 weeks ago" },
  { id: '4', author: "Robert Wilson", rating: 5, text: "The communication from WCT is unparalleled. Their proprietary tech platform actually works and kept me informed every step of the way.", date: "1 month ago" }
];

export const TOOLS = [
  { title: "Order Title", icon: <FileText className="w-6 h-6" />, color: "bg-blue-50 text-blue-600" },
  { title: "Earnest Money", icon: <CreditCard className="w-6 h-6" />, color: "bg-green-50 text-green-600" },
  { title: "Fraud Tracker", icon: <ShieldCheck className="w-6 h-6" />, color: "bg-red-50 text-red-600" },
  { title: "Schedule Closing", icon: <Clock className="w-6 h-6" />, color: "bg-purple-50 text-purple-600" },
  { title: "Marketing Studio", icon: <Camera className="w-6 h-6" />, color: "bg-amber-50 text-amber-600" },
  { title: "Smart Login", icon: <Smartphone className="w-6 h-6" />, color: "bg-slate-50 text-slate-600" }
];
