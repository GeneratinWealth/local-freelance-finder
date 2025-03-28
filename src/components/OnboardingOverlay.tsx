
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Step {
  title: string;
  description: string;
  target: string;
}

export const OnboardingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  const steps: Step[] = [
    {
      title: "Welcome to Freelancer!",
      description: "Connect with skilled professionals around the world. Let's take a quick tour.",
      target: "body",
    },
    {
      title: "Browse Categories",
      description: "Find freelancers by their professional category to match your needs.",
      target: ".category-section",
    },
    {
      title: "Verified Professionals",
      description: "Look for verification badges to ensure you're working with trusted freelancers.",
      target: ".job-card",
    },
    {
      title: "Get AI Help",
      description: "Use our AI assistant to improve your profile and get better matches.",
      target: ".ai-suggestion-button",
    },
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenOnboarding") === "true";
    if (!hasSeenTour) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
  };

  if (!isVisible || hasSeenOnboarding) {
    return null;
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-scale-in">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2" 
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              {currentStepData.title}
            </h3>
          </div>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 w-6 rounded-full ${index === currentStep ? 'bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600' : 'bg-gray-200'}`} 
              />
            ))}
          </div>
          
          <Button onClick={handleNext}>
            {currentStep < steps.length - 1 ? "Next" : "Got it!"}
          </Button>
        </div>
      </div>
    </div>
  );
};
