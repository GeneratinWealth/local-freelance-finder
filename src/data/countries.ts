
export interface Country {
  name: string;
  code: string;
  flag: string;
  phoneCode: string;
  continent: string;
}

export const countries: Country[] = [
  // Africa
  { name: "Egypt", code: "EG", flag: "🇪🇬", phoneCode: "+20", continent: "Africa" },
  { name: "Kenya", code: "KE", flag: "🇰🇪", phoneCode: "+254", continent: "Africa" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", phoneCode: "+234", continent: "Africa" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", phoneCode: "+27", continent: "Africa" },
  { name: "Ghana", code: "GH", flag: "🇬🇭", phoneCode: "+233", continent: "Africa" },
  { name: "Morocco", code: "MA", flag: "🇲🇦", phoneCode: "+212", continent: "Africa" },
  
  // Asia
  { name: "China", code: "CN", flag: "🇨🇳", phoneCode: "+86", continent: "Asia" },
  { name: "India", code: "IN", flag: "🇮🇳", phoneCode: "+91", continent: "Asia" },
  { name: "Japan", code: "JP", flag: "🇯🇵", phoneCode: "+81", continent: "Asia" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", phoneCode: "+82", continent: "Asia" },
  { name: "Thailand", code: "TH", flag: "🇹🇭", phoneCode: "+66", continent: "Asia" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", phoneCode: "+971", continent: "Asia" },
  { name: "Philippines", code: "PH", flag: "🇵🇭", phoneCode: "+63", continent: "Asia" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", phoneCode: "+84", continent: "Asia" },
  { name: "Israel", code: "IL", flag: "🇮🇱", phoneCode: "+972", continent: "Asia" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", phoneCode: "+62", continent: "Asia" },
  
  // Europe
  { name: "France", code: "FR", flag: "🇫🇷", phoneCode: "+33", continent: "Europe" },
  { name: "Germany", code: "DE", flag: "🇩🇪", phoneCode: "+49", continent: "Europe" },
  { name: "Italy", code: "IT", flag: "🇮🇹", phoneCode: "+39", continent: "Europe" },
  { name: "Spain", code: "ES", flag: "🇪🇸", phoneCode: "+34", continent: "Europe" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", phoneCode: "+44", continent: "Europe" },
  { name: "Poland", code: "PL", flag: "🇵🇱", phoneCode: "+48", continent: "Europe" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", phoneCode: "+31", continent: "Europe" },
  { name: "Sweden", code: "SE", flag: "🇸🇪", phoneCode: "+46", continent: "Europe" },
  
  // North America
  { name: "Canada", code: "CA", flag: "🇨🇦", phoneCode: "+1", continent: "North America" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", phoneCode: "+52", continent: "North America" },
  { name: "United States", code: "US", flag: "🇺🇸", phoneCode: "+1", continent: "North America" },
  
  // Oceania
  { name: "Australia", code: "AU", flag: "🇦🇺", phoneCode: "+61", continent: "Oceania" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", phoneCode: "+64", continent: "Oceania" },
  
  // South America
  { name: "Argentina", code: "AR", flag: "🇦🇷", phoneCode: "+54", continent: "South America" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", phoneCode: "+55", continent: "South America" },
  { name: "Chile", code: "CL", flag: "🇨🇱", phoneCode: "+56", continent: "South America" },
  { name: "Colombia", code: "CO", flag: "🇨🇴", phoneCode: "+57", continent: "South America" },
  { name: "Peru", code: "PE", flag: "🇵🇪", phoneCode: "+51", continent: "South America" }
];
