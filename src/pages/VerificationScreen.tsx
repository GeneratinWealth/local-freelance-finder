
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Upload, FileText, Shield, CheckCircle, Clock, X } from 'lucide-react';

const verificationSchema = z.object({
  residence_address: z.string().min(10, 'Please provide your complete address'),
  billing_address: z.string().min(10, 'Please provide your billing address'),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

type VerificationDocument = {
  id: string;
  status: string;
  government_id_url: string;
  residence_address: string;
  billing_address: string;
  supporting_documents_url: string[];
  submitted_at: string;
  reviewed_at: string;
};

const VerificationScreen = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingVerification, setExistingVerification] = useState<VerificationDocument | null>(null);
  const [governmentId, setGovernmentId] = useState<File | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      residence_address: '',
      billing_address: '',
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

    if (profile.user_type !== 'freelancer') {
      toast({
        title: "Access Denied",
        description: "Only freelancers can access verification",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchExistingVerification();
  }, [user, profile, navigate]);

  const fetchExistingVerification = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('verification_documents')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        toast({
          title: "Error loading verification",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setExistingVerification(data);
        form.setValue('residence_address', data.residence_address || '');
        form.setValue('billing_address', data.billing_address || '');
      }
    } catch (error) {
      console.error('Error fetching verification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
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
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const onSubmit = async (data: VerificationFormData) => {
    if (!user) return;

    if (!governmentId) {
      toast({
        title: "Government ID required",
        description: "Please upload your government ID",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload government ID
      const governmentIdUrl = await uploadFile(governmentId, 'documents');
      if (!governmentIdUrl) {
        setIsSubmitting(false);
        return;
      }

      // Upload supporting documents
      const supportingDocUrls: string[] = [];
      for (const doc of supportingDocs) {
        const url = await uploadFile(doc, 'documents');
        if (url) {
          supportingDocUrls.push(url);
        }
      }

      const verificationData = {
        user_id: user.id,
        government_id_url: governmentIdUrl,
        residence_address: data.residence_address,
        billing_address: data.billing_address,
        supporting_documents_url: supportingDocUrls,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      };

      const { error } = existingVerification
        ? await supabase
            .from('verification_documents')
            .update(verificationData)
            .eq('id', existingVerification.id)
        : await supabase
            .from('verification_documents')
            .insert([verificationData]);

      if (error) {
        toast({
          title: "Verification submission failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Verification submitted!",
        description: "Your documents have been submitted for review. You'll be notified once approved.",
      });

      fetchExistingVerification();
    } catch (error) {
      console.error('Verification submission error:', error);
      toast({
        title: "Verification submission failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGovernmentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGovernmentId(file);
    }
  };

  const handleSupportingDocsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSupportingDocs(files);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { icon: Clock, variant: "outline" as const, text: "Under Review", color: "text-yellow-600" },
      approved: { icon: CheckCircle, variant: "secondary" as const, text: "Approved", color: "text-green-600" },
      rejected: { icon: X, variant: "destructive" as const, text: "Rejected", color: "text-red-600" },
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
      <div className="container max-w-2xl mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Freelancer Verification</h1>
          <p className="text-gray-600">Get verified to build trust with clients and access premium features</p>
        </div>

        {existingVerification && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Verification Status
                <Badge {...getStatusBadge(existingVerification.status)}>
                  {React.createElement(getStatusBadge(existingVerification.status).icon, { size: 16, className: "mr-1" })}
                  {getStatusBadge(existingVerification.status).text}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Submitted:</strong> {new Date(existingVerification.submitted_at).toLocaleDateString()}</p>
                {existingVerification.reviewed_at && (
                  <p><strong>Reviewed:</strong> {new Date(existingVerification.reviewed_at).toLocaleDateString()}</p>
                )}
                {existingVerification.status === 'pending' && (
                  <p className="text-yellow-600">Your verification is under review. We'll notify you once it's processed.</p>
                )}
                {existingVerification.status === 'approved' && (
                  <p className="text-green-600">Congratulations! You're now a verified freelancer.</p>
                )}
                {existingVerification.status === 'rejected' && (
                  <p className="text-red-600">Your verification was rejected. Please resubmit with correct documents.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Verification Documents</CardTitle>
            <CardDescription>
              Upload the required documents to get verified as a freelancer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="government_id">Government Issued ID *</Label>
                <div className="mt-2">
                  {governmentId ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileText className="text-green-600" size={20} />
                      <span className="text-green-700">{governmentId.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setGovernmentId(null)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <Label htmlFor="government_id_file" className="cursor-pointer text-orange-600 hover:text-orange-500">
                          Upload Government ID
                        </Label>
                        <input
                          id="government_id_file"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleGovernmentIdChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Driver's License, Passport, or National ID</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="residence_address">Residence Address *</Label>
                <Textarea
                  id="residence_address"
                  {...form.register('residence_address')}
                  placeholder="Enter your complete residential address..."
                  rows={3}
                />
                {form.formState.errors.residence_address && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.residence_address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_address">Billing Address *</Label>
                <Textarea
                  id="billing_address"
                  {...form.register('billing_address')}
                  placeholder="Enter your billing address..."
                  rows={3}
                />
                {form.formState.errors.billing_address && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.billing_address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="supporting_docs">Supporting Documents (Optional)</Label>
                <div className="mt-2">
                  {supportingDocs.length > 0 ? (
                    <div className="space-y-2">
                      {supportingDocs.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <FileText className="text-blue-600" size={20} />
                          <span className="text-blue-700">{doc.name}</span>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSupportingDocs([])}
                      >
                        Clear Files
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <Label htmlFor="supporting_docs_files" className="cursor-pointer text-orange-600 hover:text-orange-500">
                          Upload Supporting Documents
                        </Label>
                        <input
                          id="supporting_docs_files"
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          onChange={handleSupportingDocsChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Utility bills, bank statements, certificates (optional)</p>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || (existingVerification?.status === 'pending')}
              >
                {isSubmitting ? 'Submitting...' : 
                 existingVerification ? 'Update Verification' : 'Submit for Verification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationScreen;
