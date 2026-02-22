
import { UserRole } from './types';

/**
 * Portals are split by role:
 * buyer, agent, lender -> buyers portal
 * seller, investor -> sellers portal
 */
export const getPortalDestination = (role: UserRole | string): string => {
  const normalizedRole = (role || '').toLowerCase();
  
  switch (normalizedRole) {
    case 'buyer':
    case 'real estate agent':
    case 'agent':
    case 'lender':
      return 'https://buyers.worldclasstitle.com';
    case 'seller':
    case 'investor':
      return 'https://sellers.worldclasstitle.com';
    default:
      return 'https://buyers.worldclasstitle.com';
  }
};
