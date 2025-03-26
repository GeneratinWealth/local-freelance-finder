
import { CurrencyCode } from "@/components/CurrencySelector";

// Mock exchange rates relative to USD
const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 151.5,
  INR: 83.5,
};

// Parse a salary string like "$45-60/hr" into min and max values
export const parseSalary = (salaryString: string): { min: number; max: number; rate: string } => {
  // Default values
  let min = 0;
  let max = 0;
  let rate = "/hr";
  
  // Extract numbers from string using regex
  const matches = salaryString.match(/(\d+)-(\d+)\/(\w+)/);
  
  if (matches && matches.length >= 4) {
    min = parseInt(matches[1], 10);
    max = parseInt(matches[2], 10);
    rate = `/${matches[3]}`;
  }
  
  return { min, max, rate };
};

// Convert salary to another currency
export const convertSalary = (
  salaryString: string, 
  fromCurrency: CurrencyCode = "USD", 
  toCurrency: CurrencyCode
): string => {
  const { min, max, rate } = parseSalary(salaryString);
  
  // Convert values
  const convertedMin = (min / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  const convertedMax = (max / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  
  // Get symbol for target currency
  const symbol = getCurrencySymbol(toCurrency);
  
  // Format the salary range
  return `${symbol}${Math.round(convertedMin)}-${Math.round(convertedMax)}${rate}`;
};

// Get currency symbol
export const getCurrencySymbol = (currencyCode: CurrencyCode): string => {
  switch (currencyCode) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "JPY": return "¥";
    case "INR": return "₹";
    default: return "$";
  }
};
