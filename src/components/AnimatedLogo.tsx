
import React, { useState } from "react";
import { Hammer } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const AnimatedLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getHelp = () => {
    toast({
      title: "AI Assistant",
      description: "How can I help you find the perfect freelancer today?",
    });
  };

  return (
    <div className="fixed bottom-6 right-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className={`h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 via-orange-400 to-blue-500 border-0 shadow-lg hover:shadow-xl transition-all ${
              isAnimating ? "animate-bounce" : ""
            }`}
            onClick={handleClick}
          >
            <Hammer className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-gradient-to-b from-purple-50 to-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              AI Assistant
            </SheetTitle>
          </SheetHeader>
          
          <div className="py-6">
            <p className="text-gray-600 mb-4">
              Welcome to Freelancer! I can help you with:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-600 rounded-full p-1 mr-2">✓</span>
                <span>Finding the right freelancer for your project</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-600 rounded-full p-1 mr-2">✓</span>
                <span>Negotiating rates and terms</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-2">✓</span>
                <span>Understanding our policies</span>
              </li>
            </ul>
            
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-purple-500 via-orange-400 to-blue-500 text-white border-0 hover:opacity-90"
              onClick={getHelp}
            >
              Ask for Help
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
