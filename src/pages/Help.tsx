
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, HelpCircle, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Help = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Here we would typically send the message to an API
    toast({
      title: "Question Submitted",
      description: "We've received your question and will respond shortly.",
    });
    
    setQuestion("");
  };
  
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    
    // Here we would typically send the message to an API
    const emailBody = encodeURIComponent(message);
    const mailtoLink = `mailto:salvationc05@gmail.com?subject=Help Request&body=${emailBody}`;
    window.open(mailtoLink);
    
    toast({
      title: "Email Prepared",
      description: "Your email client has been opened with your message.",
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
              Help Center
            </h1>
            
            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
                <TabsTrigger value="contact">Contact Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Learn how to use our platform effectively</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">How do I sign up as a freelancer?</h3>
                        <p className="text-sm text-gray-600">To sign up as a freelancer, navigate to our homepage and click on "Become a Freelancer" button. Follow the registration process and complete your profile.</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">How do I get verified?</h3>
                        <p className="text-sm text-gray-600">Visit the Verification page to learn about our verification process. You can achieve different verification levels depending on the documents you provide.</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">How do payment protections work?</h3>
                        <p className="text-sm text-gray-600">All payments on our platform are protected. Clients make payments that are held in escrow until the work is completed satisfactorily.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <form onSubmit={handleSendQuestion} className="mt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-purple-500 mr-2" />
                      <h3 className="font-medium">Ask a question</h3>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question here..." 
                        className="flex-1"
                      />
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 text-white hover:opacity-90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                      Need more help? Send us a message and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSendEmail} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea 
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                          placeholder="Describe your issue in detail..."
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 text-white hover:opacity-90"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
