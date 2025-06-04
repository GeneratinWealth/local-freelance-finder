
import type { AnalyticsEvent, PageView } from "@/types/analytics";

export class EventTracker {
  private eventQueue: AnalyticsEvent[] = [];
  private readonly maxQueueSize = 100;
  
  public trackEvent({category, action, label, value, nonInteraction = false}: AnalyticsEvent, isEnabled: boolean): void {
    if (!isEnabled) {
      if (this.eventQueue.length < this.maxQueueSize) {
        this.eventQueue.push({category, action, label, value, nonInteraction});
      }
      return;
    }
    
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
  
  public trackPageView({path, title, referrer}: PageView, isEnabled: boolean): void {
    if (!isEnabled) return;
    
    const sanitizedPath = this.sanitizePath(path);
    
    console.log(`Page view: ${sanitizedPath} - ${title || ''}`);
    
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: sanitizedPath,
          page_title: title,
          page_referrer: referrer,
          anonymize_ip: true,
          allow_google_signals: false
        });
      }
    } catch (error) {
      console.error('Page view tracking error:', error);
    }
  }
  
  private sanitizePath(path: string): string {
    const url = new URL(path, window.location.origin);
    return url.pathname;
  }
  
  public trackError(error: Error, context: string | undefined, isEnabled: boolean): void {
    if (!isEnabled) return;
    
    try {
      this.trackEvent({
        category: 'error',
        action: 'javascript_error',
        label: `${error.name}: ${error.message}${context ? ` - ${context}` : ''}`,
        nonInteraction: true
      }, isEnabled);
    } catch (trackingError) {
      console.error('Error tracking failed:', trackingError);
    }
  }
  
  public setUserProperty(property: string, value: string, isEnabled: boolean): void {
    if (!isEnabled) return;
    
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
      !/[^a-zA-Z0-9_]/.test(property)
    );
  }
  
  public processQueuedEvents(isEnabled: boolean): void {
    if (!isEnabled || this.eventQueue.length === 0) return;
    
    try {
      const eventsToProcess = [...this.eventQueue];
      this.eventQueue = [];
      
      eventsToProcess.forEach(event => {
        this.trackEvent(event, isEnabled);
      });
      
      console.log(`Processed ${eventsToProcess.length} queued events`);
    } catch (error) {
      console.error('Failed to process queued events:', error);
    }
  }
  
  public clearQueue(): void {
    this.eventQueue = [];
  }
}
