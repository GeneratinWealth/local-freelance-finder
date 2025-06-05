
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Search, MapPin, Star, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type FreelancerProfile = {
  id: string;
  full_name: string;
  location: string;
  bio: string;
  services_offered: string[];
  profile_picture_url: string;
  is_verified: boolean;
};

const BrowseFreelancers = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState<FreelancerProfile[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!profile) {
      navigate('/onboarding');
      return;
    }

    if (profile.user_type !== 'client') {
      toast({
        title: "Access Denied",
        description: "Only clients can browse freelancers",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchFreelancers();
  }, [user, profile, navigate]);

  const fetchFreelancers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'freelancer')
        .eq('is_verified', true);

      if (error) {
        toast({
          title: "Error loading freelancers",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setFreelancers(data || []);
      setFilteredFreelancers(data || []);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = freelancers;

    if (locationFilter) {
      filtered = filtered.filter(freelancer =>
        freelancer.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (serviceFilter) {
      filtered = filtered.filter(freelancer =>
        freelancer.services_offered.some(service =>
          service.toLowerCase().includes(serviceFilter.toLowerCase())
        )
      );
    }

    setFilteredFreelancers(filtered);
  }, [freelancers, locationFilter, serviceFilter]);

  const handleRequestBooking = (freelancerId: string) => {
    navigate(`/request-booking?freelancer=${freelancerId}`);
  };

  if (!user || !profile) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading freelancers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Verified Freelancers</h1>
          <p className="text-gray-600">Find the perfect freelancer for your project</p>
        </div>

        <div className="mb-8 grid md:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Filter by service..."
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredFreelancers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No verified freelancers found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <img
                      src={freelancer.profile_picture_url || '/placeholder.svg'}
                      alt={freelancer.full_name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                    {freelancer.is_verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {freelancer.full_name}
                    {freelancer.is_verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Verified
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-center gap-1">
                    <MapPin size={16} />
                    {freelancer.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{freelancer.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {freelancer.services_offered.slice(0, 3).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {freelancer.services_offered.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{freelancer.services_offered.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleRequestBooking(freelancer.id)}
                  >
                    Request Booking
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseFreelancers;
