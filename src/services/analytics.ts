
// Simple analytics service that can be integrated with various providers

type EventCategory = 
  | 'navigation' 
  | 'interaction' 
  | 'registration' 
  | 'search' 
  | 'verification'
  | 'error';

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

interface PageView {
  path: string;
  title?: string;
  referrer?: string;
}

class AnalyticsService {
  private enabled: boolean = false;
  
  constructor() {
    // Check if analytics should be enabled
    try {
      this.enabled = localStorage.getItem('analytics_opt_in') === 'true';
    } catch (e) {
      this.enabled = false;
    }
  }
  
  public init(analyticsId?: string): void {
    if (!analyticsId) {
      console.warn('Analytics initialization failed: No analytics ID provided');
      return;
    }
    
    // This is where you would initialize your analytics provider
    // For example, Google Analytics, Matomo, etc.
    console.log(`Analytics initialized with ID: ${analyticsId}`);
    
    // Example initialization code:
    if (typeof window !== 'undefined') {
      // Add analytics script to the page
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', analyticsId);
    }
  }
  
  public trackEvent({category, action, label, value, nonInteraction = false}: AnalyticsEvent): void {
    if (!this.enabled) return;
    
    console.log(`Tracking event: ${category} - ${action} - ${label || ''} - ${value || 0}`);
    
    // Example tracking code:
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        non_interaction: nonInteraction
      });
    }
  }
  
  public trackPageView({path, title, referrer}: PageView): void {
    if (!this.enabled) return;
    
    console.log(`Page view: ${path} - ${title || ''}`);
    
    // Example tracking code:
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title,
        page_referrer: referrer
      });
    }
  }
  
  public setUserProperty(property: string, value: string): void {
    if (!this.enabled) return;
    
    console.log(`Setting user property: ${property} = ${value}`);
    
    // Example code:
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', {
        [property]: value
      });
    }
  }
  
  public optIn(): void {
    try {
      localStorage.setItem('analytics_opt_in', 'true');
      this.enabled = true;
      console.log('User opted in to analytics');
    } catch (e) {
      console.error('Failed to opt in to analytics', e);
    }
  }
  
  public optOut(): void {
    try {
      localStorage.setItem('analytics_opt_in', 'false');
      this.enabled = false;
      console.log('User opted out of analytics');
    } catch (e) {
      console.error('Failed to opt out of analytics', e);
    }
  }
}

// Add window gtag definition for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const analytics = new AnalyticsService();
export default analytics;
