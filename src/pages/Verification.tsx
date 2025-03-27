
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Shield, 
  BadgeCheck, 
  Fingerprint,
  User,
  Briefcase,
  MapPin,
  MessageSquare,
  Star
} from "lucide-react";

const Verification = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              Verification Process
            </h1>
            
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-semibold mb-6">How Verification Works</h2>
                <p className="text-gray-700 mb-4">
                  Our verification system ensures safety, trust, and professionalism on our platform. 
                  Both freelancers and clients can get verified to build trust and secure better opportunities.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-500" />
                      For Freelancers
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Verification helps you stand out from the competition, gain client trust, and secure more projects at better rates.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-orange-500" />
                      For Clients
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Verification helps build trust with freelancers, ensures safer interactions, and leads to better working relationships.
                    </p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6">Verification Levels for Freelancers</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-400 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <h3 className="text-xl font-medium">Basic Verification</h3>
                    </div>
                    <p className="text-gray-700 mt-2">
                      All freelancers must complete basic verification to join our platform.
                    </p>
                    <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                      <li>Email verification</li>
                      <li>Phone number verification</li>
                      <li>Accept terms of service and code of conduct</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-green-400 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-green-500" />
                      <h3 className="text-xl font-medium">Verified Status</h3>
                    </div>
                    <p className="text-gray-700 mt-2">
                      Verified freelancers have proven their identity and contact information.
                    </p>
                    <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                      <li>Government-issued ID verification</li>
                      <li>Address verification</li>
                      <li>Professional profile review</li>
                      <li>Video call with verification team</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-purple-400 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-5 w-5 text-purple-500" />
                      <h3 className="text-xl font-medium">Premium Verification</h3>
                    </div>
                    <p className="text-gray-700 mt-2">
                      Our highest level of verification for professionals who want maximum trust.
                    </p>
                    <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                      <li>Background check</li>
                      <li>Fingerprint verification</li>
                      <li>Professional credential verification</li>
                      <li>Skill assessment and certification</li>
                      <li>Client references check</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6">Client Verification Process</h2>
                <p className="text-gray-700 mb-4">
                  Clients can also get verified to build trust with freelancers and secure better talent.
                </p>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-400 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <h3 className="text-xl font-medium">Basic Client Verification</h3>
                    </div>
                    <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                      <li>Email verification</li>
                      <li>Phone number verification</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-green-400 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-green-500" />
                      <h3 className="text-xl font-medium">Verified Client Status</h3>
                    </div>
                    <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                      <li>ID verification</li>
                      <li>Address verification</li>
                      <li>Payment method verification</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6">How to Get Verified</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <p className="text-gray-700">
                    To get verified on our platform, follow these steps:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-4 text-gray-700">
                    <li>
                      <strong>Create an account</strong> - Sign up as either a freelancer or client
                    </li>
                    <li>
                      <strong>Complete your profile</strong> - Add your information, skills, and portfolio
                    </li>
                    <li>
                      <strong>Begin verification</strong> - Navigate to Settings &gt; Verification
                    </li>
                    <li>
                      <strong>Provide required documentation</strong> - Follow the instructions for your desired verification level
                    </li>
                    <li>
                      <strong>Wait for review</strong> - Our team will verify your information (typically 1-3 business days)
                    </li>
                    <li>
                      <strong>Get verified!</strong> - Once approved, your profile will display your verification badge
                    </li>
                  </ol>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={() => navigate("/become-client")} 
                      className="bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 hover:from-purple-700 hover:via-orange-600 hover:to-blue-700"
                    >
                      Get Started Now
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
