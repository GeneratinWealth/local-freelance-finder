
import type { AnalyticsEvent, PageView, PrivacySettings } from "@/types/analytics";
import { PrivacyManager } from "./privacyManager";
import { EventTracker } from "./eventTracker";

export class AnalyticsService {
  private privacyManager: PrivacyManager;
  private eventTracker: EventTracker;
  
  constructor() {
    this.privacyManager = new PrivacyManager();
    this.eventTracker = new EventTracker();
    
    this.eventTracker.processQueuedEvents(this.privacyManager.isAnalyticsEnabled());
  }
  
  public init(analyticsId?: string): void {
    if (!analyticsId) {
      console.warn('Analytics initialization failed: No analytics ID provided');
      return;
    }
    
    if (!this.privacyManager.isAnalyticsEnabled()) {
      console.log('Analytics disabled by user preference');
      return;
    }
    
    try {
      console.log(`Analytics initialized with ID: ${analyticsId}`);
      
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
        script.integrity = "";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', analyticsId, {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          cookie_expires: 7776000,
          send_page_view: false
        });
        
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
  
  public trackEvent(event: AnalyticsEvent): void {
    this.eventTracker.trackEvent(event, this.privacyManager.isAnalyticsEnabled());
  }
  
  public trackPageView(pageView: PageView): void {
    this.eventTracker.trackPageView(pageView, this.privacyManager.isAnalyticsEnabled());
  }
  
  public trackError(error: Error, context?: string): void {
    this.eventTracker.trackError(error, context, this.privacyManager.isErrorReportingEnabled());
  }
  
  public setUserProperty(property: string, value: string): void {
    this.eventTracker.setUserProperty(property, value, this.privacyManager.isAnalyticsEnabled());
  }
  
  public updatePrivacySettings(settings: Partial<PrivacySettings>): void {
    this.privacyManager.updateSettings(settings);
    
    if (this.privacyManager.isAnalyticsEnabled()) {
      this.eventTracker.processQueuedEvents(true);
    }
  }
  
  public getPrivacySettings(): PrivacySettings {
    return this.privacyManager.getSettings();
  }
  
  public optIn(): void {
    this.privacyManager.optIn();
    this.eventTracker.processQueuedEvents(true);
  }
  
  public optOut(): void {
    this.privacyManager.optOut();
    this.eventTracker.clearQueue();
  }
  
  public clearAllData(): void {
    this.privacyManager.clearAllData();
    this.eventTracker.clearQueue();
  }
}
