// Enhanced analytics service with privacy controls and security improvements

type EventCategory = 
  | 'navigation' 
  | 'interaction' 
  | 'registration' 
  | 'search' 
  | 'verification'
  | 'error'
  | 'security'
  | 'system';

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

interface PrivacySettings {
  analytics_opt_in: boolean;
  performance_tracking: boolean;
  error_reporting: boolean;
  last_updated: string;
}

class AnalyticsService {
  private enabled: boolean = false;
  private privacySettings: PrivacySettings;
  private eventQueue: AnalyticsEvent[] = [];
  private readonly maxQueueSize = 100;
  
  constructor() {
    // Initialize privacy settings with secure defaults
    this.privacySettings = this.loadPrivacySettings();
    this.enabled = this.privacySettings.analytics_opt_in;
    
    // Process any queued events
    this.processQueuedEvents();
  }
  
  private loadPrivacySettings(): PrivacySettings {
    try {
      const stored = localStorage.getItem('privacy_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate the structure
        if (this.isValidPrivacySettings(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load privacy settings:', error);
    }
    
    // Return secure defaults
    return {
      analytics_opt_in: false,
      performance_tracking: false,
      error_reporting: true, // Error reporting enabled by default for debugging
      last_updated: new Date().toISOString()
    };
  }
  
  private isValidPrivacySettings(settings: any): settings is PrivacySettings {
    return (
      typeof settings === 'object' &&
      typeof settings.analytics_opt_in === 'boolean' &&
      typeof settings.performance_tracking === 'boolean' &&
      typeof settings.error_reporting === 'boolean' &&
      typeof settings.last_updated === 'string'
    );
  }
  
  private savePrivacySettings(): void {
    try {
      this.privacySettings.last_updated = new Date().toISOString();
      localStorage.setItem('privacy_settings', JSON.stringify(this.privacySettings));
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    }
  }
  
  public init(analyticsId?: string): void {
    if (!analyticsId) {
      console.warn('Analytics initialization failed: No analytics ID provided');
      return;
    }
    
    if (!this.enabled) {
      console.log('Analytics disabled by user preference');
      return;
    }
    
    try {
      // Initialize analytics provider with privacy-compliant settings
      console.log(`Analytics initialized with ID: ${analyticsId}`);
      
      if (typeof window !== 'undefined') {
        // Add analytics script with enhanced security
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
        script.integrity = ""; // Add SRI hash in production
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', analyticsId, {
          // Privacy-enhanced configuration
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          cookie_expires: 7776000, // 90 days
          send_page_view: false // We'll send manually with enhanced privacy
        });
        
        // Track initialization
        this.trackEvent({
          category: 'system',
          action: 'analytics_initialized',
          nonInteraction: true
        });
      }
    } catch (error) {
      console.error('Analytics initialization error:', error);
      this.trackEvent({
        category: 'error',
        action: 'analytics_init_failed',
        label: error instanceof Error ? error.message : 'unknown_error',
        nonInteraction: true
      });
    }
  }
  
  public trackEvent({category, action, label, value, nonInteraction = false}: AnalyticsEvent): void {
    if (!this.privacySettings.analytics_opt_in) {
      // Queue events for potential future consent
      if (this.eventQueue.length < this.maxQueueSize) {
        this.eventQueue.push({category, action, label, value, nonInteraction});
      }
      return;
    }
    
    // Enhanced event validation
    if (!this.isValidEvent({category, action, label, value, nonInteraction})) {
      console.warn('Invalid analytics event:', {category, action, label, value});
      return;
    }
    
    try {
      console.log(`Tracking event: ${category} - ${action} - ${label || ''} - ${value || 0}`);
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
          non_interaction: nonInteraction,
          // Add timestamp for debugging
          custom_timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Event tracking error:', error);
    }
  }
  
  private isValidEvent(event: AnalyticsEvent): boolean {
    return (
      typeof event.category === 'string' &&
      typeof event.action === 'string' &&
      event.category.length > 0 &&
      event.action.length > 0 &&
      (event.label === undefined || typeof event.label === 'string') &&
      (event.value === undefined || typeof event.value === 'number')
    );
  }
  
  public trackPageView({path, title, referrer}: PageView): void {
    if (!this.privacySettings.analytics_opt_in) return;
    
    // Sanitize path to remove sensitive information
    const sanitizedPath = this.sanitizePath(path);
    
    console.log(`Page view: ${sanitizedPath} - ${title || ''}`);
    
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: sanitizedPath,
          page_title: title,
          page_referrer: referrer,
          // Enhanced privacy settings
          anonymize_ip: true,
          allow_google_signals: false
        });
      }
    } catch (error) {
      console.error('Page view tracking error:', error);
    }
  }
  
  private sanitizePath(path: string): string {
    // Remove query parameters that might contain sensitive data
    const url = new URL(path, window.location.origin);
    return url.pathname;
  }
  
  public trackError(error: Error, context?: string): void {
    if (!this.privacySettings.error_reporting) return;
    
    try {
      this.trackEvent({
        category: 'error',
        action: 'javascript_error',
        label: `${error.name}: ${error.message}${context ? ` - ${context}` : ''}`,
        nonInteraction: true
      });
    } catch (trackingError) {
      console.error('Error tracking failed:', trackingError);
    }
  }
  
  public setUserProperty(property: string, value: string): void {
    if (!this.privacySettings.analytics_opt_in) return;
    
    // Validate and sanitize user properties
    if (!this.isValidUserProperty(property, value)) {
      console.warn('Invalid user property:', property, value);
      return;
    }
    
    console.log(`Setting user property: ${property} = ${value}`);
    
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('set', 'user_properties', {
          [property]: value
        });
      }
    } catch (error) {
      console.error('User property setting error:', error);
    }
  }
  
  private isValidUserProperty(property: string, value: string): boolean {
    return (
      typeof property === 'string' &&
      typeof value === 'string' &&
      property.length > 0 &&
      property.length <= 24 &&
      value.length <= 36 &&
      !/[^a-zA-Z0-9_]/.test(property) // Only alphanumeric and underscore
    );
  }
  
  public updatePrivacySettings(settings: Partial<PrivacySettings>): void {
    try {
      this.privacySettings = { ...this.privacySettings, ...settings };
      this.enabled = this.privacySettings.analytics_opt_in;
      this.savePrivacySettings();
      
      if (this.enabled) {
        this.processQueuedEvents();
      }
      
      console.log('Privacy settings updated:', this.privacySettings);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    }
  }
  
  private processQueuedEvents(): void {
    if (!this.enabled || this.eventQueue.length === 0) return;
    
    try {
      const eventsToProcess = [...this.eventQueue];
      this.eventQueue = [];
      
      eventsToProcess.forEach(event => {
        this.trackEvent(event);
      });
      
      console.log(`Processed ${eventsToProcess.length} queued events`);
    } catch (error) {
      console.error('Failed to process queued events:', error);
    }
  }
  
  public getPrivacySettings(): PrivacySettings {
    return { ...this.privacySettings };
  }
  
  public optIn(): void {
    this.updatePrivacySettings({ analytics_opt_in: true });
    console.log('User opted in to analytics');
  }
  
  public optOut(): void {
    this.updatePrivacySettings({ analytics_opt_in: false });
    
    // Clear any stored analytics data
    try {
      localStorage.removeItem('_ga');
      localStorage.removeItem('_gid');
      // Clear other analytics cookies if needed
    } catch (error) {
      console.error('Failed to clear analytics data:', error);
    }
    
    console.log('User opted out of analytics');
  }
  
  public clearAllData(): void {
    try {
      localStorage.removeItem('privacy_settings');
      localStorage.removeItem('_ga');
      localStorage.removeItem('_gid');
      this.eventQueue = [];
      console.log('All analytics data cleared');
    } catch (error) {
      console.error('Failed to clear analytics data:', error);
    }
  }
}

// Add enhanced window gtag definition for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const analytics = new AnalyticsService();
export default analytics;
