
import type { PrivacySettings } from "@/types/analytics";

export class PrivacyManager {
  private privacySettings: PrivacySettings;
  
  constructor() {
    this.privacySettings = this.loadPrivacySettings();
  }
  
  private loadPrivacySettings(): PrivacySettings {
    try {
      const stored = localStorage.getItem('privacy_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (this.isValidPrivacySettings(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load privacy settings:', error);
    }
    
    return {
      analytics_opt_in: false,
      performance_tracking: false,
      error_reporting: true,
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
  
  public getSettings(): PrivacySettings {
    return { ...this.privacySettings };
  }
  
  public updateSettings(settings: Partial<PrivacySettings>): void {
    try {
      this.privacySettings = { ...this.privacySettings, ...settings };
      this.savePrivacySettings();
      console.log('Privacy settings updated:', this.privacySettings);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    }
  }
  
  public optIn(): void {
    this.updateSettings({ analytics_opt_in: true });
    console.log('User opted in to analytics');
  }
  
  public optOut(): void {
    this.updateSettings({ analytics_opt_in: false });
    
    try {
      localStorage.removeItem('_ga');
      localStorage.removeItem('_gid');
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
      console.log('All analytics data cleared');
    } catch (error) {
      console.error('Failed to clear analytics data:', error);
    }
  }
  
  public isAnalyticsEnabled(): boolean {
    return this.privacySettings.analytics_opt_in;
  }
  
  public isErrorReportingEnabled(): boolean {
    return this.privacySettings.error_reporting;
  }
}
