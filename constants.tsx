
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
  CreditCard,
  Eye,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from './types';

export const ROLE_CONTENT = {
  [UserRole.BUYER]: {
    headline: "The World's Best Buyer Experience.",
    subheadline: "Your ownership rights deserve serious protection.\n\nWith our team of experienced professionals and clear communication, we guide you to closing with confidence and certainty.\n\nA smoother process.\nStronger protection.",
    primaryCTA: "Launch Dashboard",
    badgeText: "Safe, trusted and transparent",
    link: "https://buyers.worldclasstitle.com",
    experienceLabel: "Buyer Dashboard",
    valueProps: [
      { title: "Confidence", description: "Guide you to closing with confidence and certainty.", icon: <ShieldCheck className="w-6 h-6" /> },
      { title: "Communication", description: "Clear communication throughout the process.", icon: <Share2 className="w-6 h-6" /> },
      { title: "Protection", description: "Your ownership rights deserve serious protection.", icon: <ShieldAlert className="w-6 h-6" /> }
    ]
  },
  [UserRole.SELLER]: {
    headline: "Radical Transparency for Sellers.",
    subheadline: "When you sell, timing and clarity matter.\n\nSmart Spaces supports early review of title conditions so potential issues can be addressed before they delay your closing. Our team works proactively with your agent to keep your transaction moving.\n\nYour equity is protected with discipline and care.",
    primaryCTA: "Launch Dashboard",
    badgeText: "Your business means the world to us",
    link: "https://sellers.worldclasstitle.com",
    experienceLabel: "Seller Dashboard",
    valueProps: [
      { title: "Early Review", description: "Smart Spaces supports early review of title conditions.", icon: <Search className="w-6 h-6" /> },
      { title: "Proactive Team", description: "Our team works proactively to keep your transaction moving.", icon: <Zap className="w-6 h-6" /> },
      { title: "Equity Protection", description: "Your equity is protected with discipline and care.", icon: <ShieldCheck className="w-6 h-6" /> }
    ]
  },
  [UserRole.AGENT]: {
    headline: "Your Unfair Advantage in Ohio Real Estate.",
    subheadline: "World Class Title is built for agents who expect more from their title partner.\n\nPowered by Smart Spaces, our proprietary AI driven title intelligence platform, we identify potential issues earlier and reduce closing friction. Elevated by World Class Marketing, we help you compete at a higher level.",
    primaryCTA: "Launch Dashboard",
    badgeText: "Often imitated, never duplicated",
    link: "https://buyers.worldclasstitle.com", 
    experienceLabel: "Agent Access Panel",
    valueProps: [
      { title: "AI Intelligence", description: "Powered by Smart Spaces, our proprietary AI title intelligence platform.", icon: <Cpu className="w-6 h-6" /> },
      { title: "Frictionless", description: "Identify potential issues earlier and reduce closing friction.", icon: <Zap className="w-6 h-6" /> },
      { title: "Elite Branding", description: "Elevated by World Class Marketing to help you compete.", icon: <Camera className="w-6 h-6" /> }
    ]
  },
  [UserRole.LENDER]: {
    headline: "Institutional Precision. Unmatched Speed.",
    subheadline: "Lenders need reliability, speed, and precision.\n\nPowered by Smart Spaces, we enhance visibility into title conditions and support efficient issue resolution throughout the transaction lifecycle.",
    primaryCTA: "Launch Dashboard",
    badgeText: "Fastest Data + Proprietary Tech",
    link: "https://buyers.worldclasstitle.com",
    experienceLabel: "Lender Portal",
    valueProps: [
      { title: "Reliability", description: "Lenders need reliability, speed, and precision.", icon: <ShieldCheck className="w-6 h-6" /> },
      { title: "Visibility", description: "Enhance visibility into title conditions with Smart Spaces.", icon: <Eye className="w-6 h-6" /> },
      { title: "Resolution", description: "Efficient issue resolution throughout the transaction lifecycle.", icon: <Clock className="w-6 h-6" /> }
    ]
  },
  [UserRole.INVESTOR]: {
    headline: "Velocity and Visibility at Scale.",
    subheadline: "Investors move on timing and margin.\n\nSmart Spaces supports faster analysis and earlier identification of potential encumbrances, helping reduce risk across acquisitions and dispositions.",
    primaryCTA: "Launch Dashboard",
    badgeText: "Fastest Data + Proprietary Tech",
    link: "https://sellers.worldclasstitle.com",
    experienceLabel: "Investor Dashboard",
    valueProps: [
      { title: "Timing & Margin", description: "Optimized for investors who move on timing and margin.", icon: <BarChart3 className="w-6 h-6" /> },
      { title: "Risk Mitigation", description: "Earlier identification of potential encumbrances to reduce risk.", icon: <ShieldAlert className="w-6 h-6" /> },
      { title: "Faster Analysis", description: "Smart Spaces supports faster analysis of complex property data.", icon: <Zap className="w-6 h-6" /> }
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
  { title: "Zillow 3D Home Tour", description: "Fully immersive digital walkthrough" },
  { title: "Zillow 3D Home Tour", description: "Optimize your Zillow ranking" },
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
    title: "LISTING MEDIA POWER",
    description: "Professional photography, drone, MLS ready video, and premium listing presentation assets designed to help you win more sellers.",
    icon: <Camera />,
    features: ["4K Drone Footage", "MLS Ready Video Walkthrough", "Premium Video"]
  },
  {
    title: "SOCIAL AMPLIFICATION",
    description: "Done for you social post packages for Instagram and Facebook to keep your brand top of mind.",
    icon: <Share2 />,
    features: ["Instagram Post and Story Package", "Facebook Post Package", "Highlight Covers and Captions"]
  },
  {
    title: "DESIGN STUDIO",
    description: "Custom brochures, property flyers, and premium open house materials that make you look elite.",
    icon: <Palette />,
    features: ["Custom Brochures", "Branded Open House Kit", "Listing Flyers"]
  },
  {
    title: "LISTING INTELLIGENCE",
    description: "AI powered property snapshots and seller net sheets that give you an edge in listing conversations.",
    icon: <Target />,
    features: ["Property Snapshot", "Seller Net Sheet", "Market Heat Map"]
  }
];

export const MARKETING_PACKAGES = [
  { 
    name: "Silver", 
    price: "Entry Level", 
    description: "Essential listing brochures and social packages.", 
    features: ["Brochure Design", "Social Post Package", "Open House Flyer Kit"], 
    color: "bg-slate-100" 
  },
  { 
    name: "Gold", 
    price: "Strategic Choice", 
    description: "Photography + Social Media amplification.", 
    features: ["Photography", "Social Post and Story Package", "Brochure Design", "Drone Stills"], 
    color: "bg-blue-50" 
  },
  { 
    name: "Platinum", 
    price: "Most Popular", 
    description: "Complete media and marketing takeover. A premium coffee table style listing book designed to elevate the presentation and help your seller feel proud of the marketing.", 
    features: ["All Gold Features", "Premium Video", "MLS Ready Video Walkthrough", "2D Floor Plan", "Dusk Exterior Feature Shot", "Platinum Showcase Book"], 
    color: "bg-slate-900", 
    dark: true, 
    popular: true 
  }
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
