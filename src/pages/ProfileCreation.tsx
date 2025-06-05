
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, X } from 'lucide-react';

const services = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Content Writing', 'Digital Marketing', 'Data Analysis', 'Translation',
  'Video Editing', 'Photography', 'Accounting', 'Virtual Assistant'
];

const freelancerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  services_offered: z.array(z.string()).min(1, 'Select at least one service'),
});

const clientSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
});

type FreelancerFormData = z.infer<typeof freelancerSchema>;
type ClientFormData = z.infer<typeof clientSchema>;

const ProfileCreation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') as 'freelancer' | 'client';
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  const freelancerForm = useForm<FreelancerFormData>({
    resolver: zodResolver(freelancerSchema),
    defaultValues: {
      full_name: '',
      location: '',
      bio: '',
      services_offered: [],
    },
  });

  const clientForm = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      full_name: '',
      location: '',
    },
  });

  const form = userType === 'freelancer' ? freelancerForm : clientForm;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!userType || !['freelancer', 'client'].includes(userType)) {
      navigate('/onboarding');
      return;
    }
  }, [user, userType, navigate]);

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(fileName, file);

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      return null;
    }

    const { data } = supabase.storage
      .from('profiles')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const onSubmit = async (data: FreelancerFormData | ClientFormData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      let profile_picture_url = null;

      if (profilePicture) {
        profile_picture_url = await handleImageUpload(profilePicture);
        if (!profile_picture_url) {
          setIsLoading(false);
          return;
        }
      } else if (userType === 'freelancer') {
        toast({
          title: "Profile picture required",
          description: "Freelancers must upload a profile picture",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const profileData = {
        id: user.id,
        email: user.email!,
        full_name: data.full_name,
        location: data.location,
        user_type: userType,
        profile_picture_url,
        ...(userType === 'freelancer' ? {
          bio: (data as FreelancerFormData).bio,
          services_offered: (data as FreelancerFormData).services_offered,
        } : {}),
      };

      const { error } = await supabase
        .from('profiles')
        .insert([profileData]);

      if (error) {
        toast({
          title: "Profile creation failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      await refreshProfile();
      
      toast({
        title: "Profile created successfully!",
        description: "Welcome to FreelanceHub",
      });

      navigate('/');
    } catch (error) {
      console.error('Profile creation error:', error);
      toast({
        title: "Profile creation failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setProfilePictureUrl(url);
    }
  };

  const removeImage = () => {
    setProfilePicture(null);
    setProfilePictureUrl('');
  };

  if (!user || !userType) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Your {userType === 'freelancer' ? 'Freelancer' : 'Client'} Profile</CardTitle>
            <CardDescription>
              {userType === 'freelancer' 
                ? 'Set up your professional profile to start receiving bookings'
                : 'Complete your profile to start browsing freelancers'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  {...form.register('full_name')}
                  placeholder="Enter your full name"
                />
                {form.formState.errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.full_name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...form.register('location')}
                  placeholder="City, Country"
                />
                {form.formState.errors.location && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.message}</p>
                )}
              </div>

              <div>
                <Label>Profile Picture {userType === 'freelancer' && <span className="text-red-500">*</span>}</Label>
                {profilePictureUrl ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={profilePictureUrl}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-4 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Label htmlFor="profile-picture" className="cursor-pointer text-orange-600 hover:text-orange-500">
                        Upload a photo
                      </Label>
                      <input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>

              {userType === 'freelancer' && (
                <>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      {...freelancerForm.register('bio')}
                      placeholder="Tell clients about yourself and your experience..."
                      rows={4}
                    />
                    {freelancerForm.formState.errors.bio && (
                      <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.bio.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Services Offered</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {services.map((service) => (
                        <label key={service} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                          <input
                            type="checkbox"
                            value={service}
                            {...freelancerForm.register('services_offered')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                    {freelancerForm.formState.errors.services_offered && (
                      <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.services_offered.message}</p>
                    )}
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Profile...' : 'Create Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreation;
