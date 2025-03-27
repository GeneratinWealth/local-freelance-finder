
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond to your inquiry shortly.",
    });
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required 
                      className="w-full" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formState.email}
                      onChange={handleChange}
                      required 
                      className="w-full" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required 
                      className="w-full" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5} 
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-orange-400 to-blue-500 text-white hover:opacity-90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
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
