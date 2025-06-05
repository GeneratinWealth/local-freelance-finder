
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import VerificationBadge from '@/components/VerificationBadge';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && !profile) {
      navigate('/onboarding');
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Landing page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect <span className="text-orange-600">Freelancer</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with verified freelancers or offer your services to clients worldwide. 
              Secure, trusted, and easy to use.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/auth')}>
                Browse Freelancers
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Verified Freelancers</CardTitle>
                <CardDescription>
                  All freelancers go through our verification process to ensure quality and trust
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Direct Communication</CardTitle>
                <CardDescription>
                  Chat directly with freelancers and clients to discuss your projects
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Safe and secure payment processing with Stripe integration
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.full_name}!
            </h1>
            <VerificationBadge isVerified={profile?.is_verified || false} />
          </div>
          <p className="text-gray-600">
            {profile?.user_type === 'freelancer' 
              ? 'Manage your bookings and grow your freelance business'
              : 'Find and hire talented freelancers for your projects'
            }
          </p>
        </div>

        {profile?.user_type === 'freelancer' ? (
          // Freelancer Dashboard
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/booking-confirmation')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  Booking Requests
                </CardTitle>
                <CardDescription>
                  View and manage your incoming booking requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between">
                  View Bookings
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/messages')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Messages
                </CardTitle>
                <CardDescription>
                  Communicate with your clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between">
                  Open Messages
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>

            {!profile.is_verified && (
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200" onClick={() => navigate('/verification')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-600" />
                    Get Verified
                  </CardTitle>
                  <CardDescription>
                    Complete verification to build trust with clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full justify-between">
                    Start Verification
                    <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            )}

            {profile.is_verified && (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    Verified Freelancer
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    You're a verified freelancer! Clients can now trust your profile.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        ) : (
          // Client Dashboard
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/browse-freelancers')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-orange-600" />
                  Browse Freelancers
                </CardTitle>
                <CardDescription>
                  Find verified freelancers for your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full justify-between">
                  Start Browsing
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/messages')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Messages
                </CardTitle>
                <CardDescription>
                  Chat with freelancers about your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between">
                  Open Messages
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  Your Projects
                </CardTitle>
                <CardDescription>
                  Track your ongoing and completed projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between">
                  View Projects
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Stats Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <p className="text-gray-600">Verified Freelancers</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <p className="text-gray-600">Projects Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
