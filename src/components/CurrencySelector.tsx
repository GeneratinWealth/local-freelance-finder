
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  BadgeEuro,
  BadgePoundSterling,
  BadgeJapaneseYen,
  BadgeIndianRupee,
  Currency,
} from "lucide-react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "INR" | "ZAR";

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  name: string;
  icon: React.ElementType;
}

export const currencies: CurrencyOption[] = [
  { code: "USD", symbol: "$", name: "US Dollar", icon: BadgeDollarSign },
  { code: "EUR", symbol: "€", name: "Euro", icon: BadgeEuro },
  { code: "GBP", symbol: "£", name: "British Pound", icon: BadgePoundSterling },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", icon: BadgeJapaneseYen },
  { code: "INR", symbol: "₹", name: "Indian Rupee", icon: BadgeIndianRupee },
  { code: "ZAR", symbol: "R", name: "South African Rand", icon: Currency },
];

interface CurrencySelectorProps {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const currentCurrency = currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  const CurrencyIcon = currentCurrency.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 gap-1 px-3">
          <CurrencyIcon className="h-4 w-4" />
          <span>{currentCurrency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {currencies.map((currency) => {
          const Icon = currency.icon;
          return (
            <DropdownMenuItem
              key={currency.code}
              onClick={() => onCurrencyChange(currency.code)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span>{currency.name}</span>
              <span className="ml-1 text-muted-foreground">({currency.symbol})</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
