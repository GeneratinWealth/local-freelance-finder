
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
        
        <ClientRegistrationForm />
      </div>
    </div>
  );
};

export default BecomeClient;
