
// Re-export everything from the refactored analytics module
export { analytics as default, analytics } from "./analytics/index";
export type { AnalyticsEvent, PageView, PrivacySettings, EventCategory } from "@/types/analytics";
