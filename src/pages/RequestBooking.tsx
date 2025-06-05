
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Calendar, Clock, Shield } from 'lucide-react';

const bookingSchema = z.object({
  service_description: z.string().min(10, 'Please describe the service you need'),
  booking_date: z.string().min(1, 'Please select a date'),
  booking_time: z.string().min(1, 'Please select a time'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

type FreelancerProfile = {
  id: string;
  full_name: string;
  location: string;
  bio: string;
  services_offered: string[];
  profile_picture_url: string;
  is_verified: boolean;
};

const RequestBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const freelancerId = searchParams.get('freelancer');
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [freelancer, setFreelancer] = useState<FreelancerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service_description: '',
      booking_date: '',
      booking_time: '',
    },
  });

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
        description: "Only clients can request bookings",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (!freelancerId) {
      navigate('/browse-freelancers');
      return;
    }

    fetchFreelancer();
  }, [user, profile, freelancerId, navigate]);

  const fetchFreelancer = async () => {
    if (!freelancerId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', freelancerId)
        .eq('user_type', 'freelancer')
        .single();

      if (error) {
        toast({
          title: "Freelancer not found",
          description: error.message,
          variant: "destructive",
        });
        navigate('/browse-freelancers');
        return;
      }

      setFreelancer(data);
    } catch (error) {
      console.error('Error fetching freelancer:', error);
      navigate('/browse-freelancers');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!user || !freelancer) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          client_id: user.id,
          freelancer_id: freelancer.id,
          service_description: data.service_description,
          booking_date: data.booking_date,
          booking_time: data.booking_time,
          status: 'pending',
        }]);

      if (error) {
        toast({
          title: "Booking request failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Booking request sent!",
        description: "The freelancer will be notified and can accept or decline your request.",
      });

      navigate('/messages');
    } catch (error) {
      console.error('Booking creation error:', error);
      toast({
        title: "Booking request failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !profile || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!freelancer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/browse-freelancers')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <img
                  src={freelancer.profile_picture_url || '/placeholder.svg'}
                  alt={freelancer.full_name}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
                {freelancer.is_verified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <Shield className="h-5 w-5 text-white" />
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
              <CardDescription>{freelancer.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-gray-600">{freelancer.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.services_offered.map((service) => (
                      <Badge key={service} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request a Booking</CardTitle>
              <CardDescription>
                Describe your project and preferred schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="service_description">Service Description</Label>
                  <Textarea
                    id="service_description"
                    {...form.register('service_description')}
                    placeholder="Describe what you need help with..."
                    rows={4}
                  />
                  {form.formState.errors.service_description && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.service_description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking_date" className="flex items-center gap-2">
                      <Calendar size={16} />
                      Preferred Date
                    </Label>
                    <Input
                      id="booking_date"
                      type="date"
                      {...form.register('booking_date')}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {form.formState.errors.booking_date && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.booking_date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="booking_time" className="flex items-center gap-2">
                      <Clock size={16} />
                      Preferred Time
                    </Label>
                    <Input
                      id="booking_time"
                      type="time"
                      {...form.register('booking_time')}
                    />
                    {form.formState.errors.booking_time && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.booking_time.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Request...' : 'Send Booking Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestBooking;
