
export { AnalyticsService } from "./analyticsService";
export { PrivacyManager } from "./privacyManager";
export { EventTracker } from "./eventTracker";
export * from "@/types/analytics";

// Create and export the singleton instance
import { AnalyticsService } from "./analyticsService";
export const analytics = new AnalyticsService();
export default analytics;
