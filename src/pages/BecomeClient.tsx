
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import ClientRegistrationForm from "@/components/ClientRegistrationForm";

const BecomeClient = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container max-w-2xl mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
        
        <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <div className="flex gap-2">
            <BadgeCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Get Verified</h3>
              <p className="text-sm text-blue-700">
                Learn about our verification process to build trust with freelancers.
                <Button 
                  variant="link" 
                  onClick={() => navigate("/verification")}
                  className="p-0 h-auto text-blue-600 font-medium"
                >
                  Learn more
                </Button>
              </p>
            </div>
          </div>
        </div>
        
        <ClientRegistrationForm />
      </div>
    </div>
  );
};

export default BecomeClient;
