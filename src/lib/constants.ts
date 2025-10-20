// Application constants and configuration

export const APP_CONFIG = {
  name: 'Y Realty Team',
  domain: 'theYteam.co',
  tagline: 'Premium Property Management Nationwide',
  contact: {
    email: 'info@theYteam.co',
    phone: '(555) 123-4567',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  FAQ: '/faq',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  BLOG_ADMIN: '/blog-admin',
  TOOLS: '/tools',
  VACANCIES: '/vacancies',
  APPOINTMENT: '/appointment',
  CONTACT: '/contact',
  ADMIN_LOGIN: '/admin-login',
  ADMIN_DASHBOARD: '/admin-dashboard',
} as const;

export const CALCULATOR_DEFAULTS = {
  PROPERTY_VALUE: 300000,
  DOWN_PAYMENT_PERCENT: 20,
  INTEREST_RATE: 4.5,
  LOAN_TERM: 30,
  MONTHLY_RENT: 2200,
  PROPERTY_TAX: 3000,
  INSURANCE: 1200,
  VACANCY_RATE: 5,
  MANAGEMENT_FEE: 8,
  ANNUAL_APPRECIATION: 3,
  HOLDING_PERIOD: 5,
} as const;

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

export const API_ENDPOINTS = {
  AI_CHAT: '/functions/v1/ai-chat',
  APPOINTMENT_NOTIFICATION: '/functions/v1/appointment-notification',
  CONTACT_NOTIFICATION: '/functions/v1/contact-notification',
} as const;

export const PROPERTY_TYPES = [
  'Single Family Home',
  'Multi-Family Property',
  'Condominium',
  'Townhouse',
  'Commercial Property',
  'Vacation Rental',
  'Other',
] as const;

export const CALL_TYPES = [
  'Property Management Consultation',
  'Investment Analysis',
  'Tenant Relations Support',
  'Maintenance Coordination',
  'General Inquiry',
] as const;