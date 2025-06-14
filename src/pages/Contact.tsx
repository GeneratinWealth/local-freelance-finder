
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { sanitizeInput, containsMaliciousPatterns, RateLimiter } from "@/utils/securityUtils";
import { analytics } from "@/services/analytics";

// Rate limiter for contact form submissions
const contactRateLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 attempts per 10 minutes

const Contact = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Basic input validation and sanitization
    if (value.length > 1000) {
      toast({
        title: "Input Too Long",
        description: "Please keep your input under 1000 characters.",
        variant: "destructive",
      });
      return;
    }
    
    // Check for malicious patterns
    if (containsMaliciousPatterns(value)) {
      console.warn("Potentially malicious input detected:", name);
      toast({
        title: "Invalid Input",
        description: "Please remove any script tags or special characters.",
        variant: "destructive",
      });
      return;
    }
    
    setFormState(prev => ({ ...prev, [name]: sanitizeInput(value) }));
  };
  
  const validateForm = (): boolean => {
    if (!formState.name.trim() || formState.name.length < 2) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (at least 2 characters).",
        variant: "destructive",
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formState.subject.trim() || formState.subject.length < 3) {
      toast({
        title: "Invalid Subject",
        description: "Please enter a subject (at least 3 characters).",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formState.message.trim() || formState.message.length < 10) {
      toast({
        title: "Invalid Message",
        description: "Please enter a message (at least 10 characters).",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Rate limiting check
    const userIdentifier = formState.email;
    if (!contactRateLimiter.isAllowed(userIdentifier)) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before submitting another message.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Sanitize all form data
      const sanitizedData = {
        name: sanitizeInput(formState.name),
        email: sanitizeInput(formState.email),
        subject: sanitizeInput(formState.subject),
        message: sanitizeInput(formState.message),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };
      
      console.log("Contact form submission:", sanitizedData);
      
      // Track contact attempt
      analytics.trackEvent({
        category: 'interaction',
        action: 'contact_form_submit',
        label: 'contact_page'
      });
      
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond to your inquiry within 24 hours.",
      });
      
      // Clear form data securely
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Track successful submission
      analytics.trackEvent({
        category: 'interaction',
        action: 'contact_form_success',
        label: 'contact_page'
      });
      
    } catch (error) {
      console.error("Contact form error:", error);
      
      analytics.trackEvent({
        category: 'error',
        action: 'contact_form_failure',
        label: error instanceof Error ? error.message : 'unknown_error'
      });
      
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-6">
                  Have questions or need assistance? We're here to help. Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email Us</h3>
                      <p className="text-gray-600">support@freelancer.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Call Us</h3>
                      <p className="text-gray-600">+1 (800) 555-1234</p>
                      <p className="text-gray-500 text-sm">Monday-Friday, 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Office</h3>
                      <p className="text-gray-600">
                        123 Freelancer Ave.<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required 
                      maxLength={100}
                      autoComplete="name"
                      className="w-full" 
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formState.email}
                      onChange={handleChange}
                      required 
                      maxLength={254}
                      autoComplete="email"
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required 
                      maxLength={200}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <Textarea 
                      id="message" 
                      name="message"
                      rows={5} 
                      value={formState.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formState.message.length}/1000 characters
                    </p>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-orange-400 to-blue-500 text-white hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
