
import React from "react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerHeader,
  DrawerTitle,
  DrawerFooter 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings, Info, Phone, HelpCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import CurrencySelector, { CurrencyCode } from "@/components/CurrencySelector";
import LanguageSelector from "@/components/LanguageSelector";

interface DrawerMenuProps {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ 
  selectedCurrency, 
  onCurrencyChange 
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 border-purple-200 hover:border-purple-300"
        >
          <Settings className="h-4 w-4 text-purple-500" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gradient-to-b from-white to-purple-50">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
            Freelancer Settings
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="p-4 space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Currency
            </label>
            <div className="bg-white rounded-md p-2 shadow-sm">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Navigation</h3>
            <div className="space-y-1">
              <Link 
                to="/policies" 
                className="flex items-center p-2 rounded-md hover:bg-purple-100 transition-colors"
              >
                <Info className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Policies & Terms</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center p-2 rounded-md hover:bg-purple-100 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Contact Us</span>
              </Link>
              <Link 
                to="/help" 
                className="flex items-center p-2 rounded-md hover:bg-purple-100 transition-colors"
              >
                <HelpCircle className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Help Center</span>
              </Link>
            </div>
          </div>
        </div>
        
        <DrawerFooter className="border-t border-purple-100 pt-4">
          <div className="w-full flex justify-end">
            <LanguageSelector />
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
