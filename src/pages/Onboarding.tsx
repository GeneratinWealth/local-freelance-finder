
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [selectedType, setSelectedType] = useState<'freelancer' | 'client' | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile) {
      navigate('/');
      return;
    }
  }, [user, profile, navigate]);

  const handleUserTypeSelection = (userType: 'freelancer' | 'client') => {
    setSelectedType(userType);
    navigate(`/profile-creation?type=${userType}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FreelanceHub</h1>
          <p className="text-gray-600">Let's get you started. What describes you best?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedType === 'freelancer' ? 'ring-2 ring-orange-500' : ''
            }`}
            onClick={() => handleUserTypeSelection('freelancer')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">I'm a Freelancer</CardTitle>
              <CardDescription>
                I want to offer my services and connect with clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Create a professional profile</li>
                <li>• Showcase your skills and portfolio</li>
                <li>• Get verified for more trust</li>
                <li>• Receive booking requests</li>
              </ul>
              <Button className="w-full mt-4" onClick={() => handleUserTypeSelection('freelancer')}>
                Continue as Freelancer
              </Button>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedType === 'client' ? 'ring-2 ring-orange-500' : ''
            }`}
            onClick={() => handleUserTypeSelection('client')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">I'm a Client</CardTitle>
              <CardDescription>
                I want to find and hire talented freelancers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Browse verified freelancers</li>
                <li>• Request services easily</li>
                <li>• Secure payment processing</li>
                <li>• Direct messaging with freelancers</li>
              </ul>
              <Button className="w-full mt-4" onClick={() => handleUserTypeSelection('client')}>
                Continue as Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
