
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const BecomeClientButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      onClick={() => navigate("/become-client")}
      className="bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 hover:from-purple-700 hover:via-orange-600 hover:to-blue-700"
    >
      <UserPlus className="mr-2 h-4 w-4" />
      Become a Client
    </Button>
  );
};

export default BecomeClientButton;
