
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';

type Booking = {
  id: string;
  service_description: string;
  booking_date: string;
  booking_time: string;
  status: string;
  client_id: string;
  created_at: string;
  client_profile: {
    full_name: string;
    email: string;
    location: string;
  };
};

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
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

    if (profile.user_type !== 'freelancer') {
      toast({
        title: "Access Denied",
        description: "Only freelancers can view booking confirmations",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchBookings();
  }, [user, profile, navigate]);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          client_profile:profiles!bookings_client_id_fkey(full_name, email, location)
        `)
        .eq('freelancer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error loading bookings",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'accepted' | 'declined') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) {
        toast({
          title: "Error updating booking",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: `Booking ${status}`,
        description: status === 'accepted' ? 
          "The client will be notified and redirected to payment" :
          "The client will be notified of the decline",
      });

      // Refresh bookings
      fetchBookings();

      // If accepted, simulate redirect to Stripe (in real app, this would create a payment link)
      if (status === 'accepted') {
        toast({
          title: "Payment link generated",
          description: "Client will receive payment instructions",
        });
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "outline" as const, text: "Pending", color: "text-yellow-600" },
      accepted: { variant: "secondary" as const, text: "Accepted", color: "text-green-600" },
      declined: { variant: "destructive" as const, text: "Declined", color: "text-red-600" },
    };
    
    return variants[status as keyof typeof variants] || variants.pending;
  };

  if (!user || !profile || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Requests</h1>
          <p className="text-gray-600">Manage your incoming booking requests</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No booking requests yet.</p>
            <p className="text-gray-400 mt-2">Clients will see your requests here once they book your services.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusInfo = getStatusBadge(booking.status);
              return (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User size={20} />
                          {booking.client_profile.full_name}
                        </CardTitle>
                        <CardDescription>
                          {booking.client_profile.location} • {booking.client_profile.email}
                        </CardDescription>
                      </div>
                      <Badge {...statusInfo}>
                        {statusInfo.text}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Service Description</h4>
                        <p className="text-gray-600">{booking.service_description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="font-medium">Date:</span>
                          <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-gray-400" size={16} />
                          <span className="font-medium">Time:</span>
                          <span>{booking.booking_time}</span>
                        </div>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={() => updateBookingStatus(booking.id, 'accepted')}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Accept Booking
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'declined')}
                            className="flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Decline
                          </Button>
                        </div>
                      )}

                      {booking.status === 'accepted' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-700 font-medium">✓ Booking Accepted</p>
                          <p className="text-green-600 text-sm">Payment link has been sent to the client.</p>
                        </div>
                      )}

                      {booking.status === 'declined' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-700 font-medium">✗ Booking Declined</p>
                          <p className="text-red-600 text-sm">The client has been notified.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;
