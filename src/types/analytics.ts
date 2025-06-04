
export type EventCategory = 
  | 'navigation' 
  | 'interaction' 
  | 'registration' 
  | 'search' 
  | 'verification'
  | 'error'
  | 'security'
  | 'system';

export interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

export interface PageView {
  path: string;
  title?: string;
  referrer?: string;
}

export interface PrivacySettings {
  analytics_opt_in: boolean;
  performance_tracking: boolean;
  error_reporting: boolean;
  last_updated: string;
}

// Add enhanced window gtag definition for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
