
/**
 * Security utilities for input sanitization and validation
 */

// HTML entities for XSS prevention
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char)
    .slice(0, 1000); // Limit length to prevent DoS
};

/**
 * Validates email format more strictly
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validates phone number format
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{5,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Checks for potentially malicious patterns in input
 */
export const containsMaliciousPatterns = (input: string): boolean => {
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(input));
};

/**
 * Rate limiting helper for forms
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

/**
 * Content Security Policy helper
 */
export const generateCSPNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Secure random string generator
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Environment variable validator
 */
export const validateEnvironmentVariables = (): void => {
  const requiredVars = ['NODE_ENV'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
  }
};

/**
 * Secure localStorage wrapper
 */
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const sanitizedValue = sanitizeInput(value);
      localStorage.setItem(sanitizedKey, sanitizedValue);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const sanitizedKey = sanitizeInput(key);
      return localStorage.getItem(sanitizedKey);
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }
};
