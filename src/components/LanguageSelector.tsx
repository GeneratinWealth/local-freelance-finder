
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Language set to ${language.name}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 border-purple-200 hover:border-purple-300 flex items-center gap-2">
          <Globe className="h-4 w-4 text-purple-500" />
          <span>{selectedLanguage.flag}</span>
          <span className="hidden sm:inline">{selectedLanguage.name}</span>
          <ChevronDown className="h-4 w-4 text-purple-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleLanguageChange(language)}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
