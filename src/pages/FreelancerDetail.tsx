
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  MessageSquare, 
  Calendar, 
  Star,
  ArrowLeft,
  CheckCircle,
  DollarSign
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import VerificationBadge, { VerificationLevel } from "@/components/VerificationBadge";
import { toast } from "@/hooks/use-toast";
import LocationMap from "@/components/LocationMap";
import FreelancerTimeline from "@/components/FreelancerTimeline";

// Mock data - in a real app, this would come from an API
const mockFreelancers = [
  {
    id: "1",
    title: "Professional Plumber Needed",
    name: "John Smith",
    company: "HomeServices Co.",
    location: "Brooklyn, NY, USA",
    distance: "2.5 miles",
    salary: "$45-60/hr",
    rate: "$50/hr",
    type: "Contract",
    postedTime: "2h ago",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop",
    category: "Plumbing",
    status: "available" as const,
    rating: 4.8,
    reviews: 32,
    verification: "premium" as VerificationLevel,
    description: "Professional plumber with over 10 years of experience in residential and commercial plumbing. Specialized in pipe installation, repair, and maintenance.",
    estimatedArrival: "30 minutes",
  },
  {
    id: "2",
    title: "House Cleaning Professional",
    name: "Maria Garcia",
    company: "CleanPro Inc.",
    location: "Manhattan, NY, USA",
    distance: "3.2 miles",
    salary: "$30-40/hr",
    rate: "$35/hr",
    type: "Part-time",
    postedTime: "5h ago",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
    category: "Cleaning",
    status: "busy" as const,
    rating: 4.6,
    reviews: 48,
    verification: "verified" as VerificationLevel,
    description: "Experienced house cleaner with attention to detail. Provides thorough cleaning services for apartments, houses, and offices. Uses eco-friendly cleaning products.",
    currentJobEndsAt: "in 2 hours",
  },
  {
    id: "3",
    title: "Experienced Hair Stylist",
    name: "Amy Chen",
    company: "Style Studio",
    location: "Queens, NY",
    distance: "5.7 miles",
    salary: "$50-70/hr",
    rate: "$60/hr",
    type: "Full-time",
    postedTime: "1d ago",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
    category: "Hair Styling",
    status: "offline" as const,
    rating: 4.9,
    reviews: 76,
    description: "Creative hair stylist with 8+ years of experience. Specializing in modern cuts, coloring, and styling. Trained in the latest techniques and trends."
  },
  {
    id: "4",
    title: "Babysitter for Weekends",
    name: "Emily Johnson",
    company: "Family Care",
    location: "Bronx, NY",
    distance: "4.1 miles",
    salary: "$25-35/hr",
    rate: "$30/hr",
    type: "Part-time",
    postedTime: "6h ago",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?w=200&h=200&fit=crop",
    category: "Baby Sitting",
    status: "available" as const,
    rating: 4.7,
    reviews: 24,
    description: "Loving and responsible babysitter with experience working with children of all ages. Certified in CPR and first aid. Available for weekends and evenings."
  },
  {
    id: "5",
    title: "Handyman for Home Repairs",
    name: "David Martinez",
    company: "Urban Fixers",
    location: "Jersey City, NJ",
    distance: "6.3 miles",
    salary: "$40-55/hr",
    rate: "$45/hr",
    type: "Contract",
    postedTime: "12h ago",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd63bc041?w=200&h=200&fit=crop",
    category: "Handy Work",
    status: "busy" as const,
    rating: 4.5,
    reviews: 52,
    description: "Skilled handyman offering a wide range of home repair services. Experience in carpentry, painting, minor electrical and plumbing work, and furniture assembly."
  },
];

const FreelancerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offerAmount, setOfferAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Find the freelancer by ID
  const freelancer = mockFreelancers.find(f => f.id === id);
  
  if (!freelancer) {
    return (
      <div className="container max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Freelancer not found</h2>
        <Button onClick={() => navigate("/")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to listings
        </Button>
      </div>
    );
  }

  const handleNegotiate = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    toast({
      title: "Offer Sent!",
      description: `Your offer of ${offerAmount || freelancer.rate} has been sent to ${freelancer.name}. They will respond shortly.`,
    });
    navigate("/");
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
          Back to listings
        </Button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative flex-shrink-0">
                <img 
                  src={freelancer.image} 
                  alt={freelancer.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2">
                  <StatusBadge status={freelancer.status} />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
                    <p className="text-gray-600">{freelancer.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{freelancer.rating}</span>
                    <span className="text-gray-500">({freelancer.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    {freelancer.category}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {freelancer.rate}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                    {freelancer.type}
                  </span>
                  {freelancer.verification && (
                    <VerificationBadge level={freelancer.verification} />
                  )}
                </div>
                
                <p className="mt-4 text-gray-700">{freelancer.description}</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationMap 
                address={freelancer.location} 
                distance={freelancer.distance} 
              />
              
              <FreelancerTimeline 
                status={freelancer.status} 
                estimatedArrival={freelancer.estimatedArrival} 
                currentJobEndsAt={freelancer.currentJobEndsAt} 
              />
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Make an Offer</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Offer (per hour)
                  </label>
                  <Input 
                    id="rate" 
                    type="text" 
                    placeholder={freelancer.rate}
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    className="w-full sm:w-1/3"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optional)
                  </label>
                  <textarea 
                    id="message"
                    rows={3}
                    placeholder="Describe your project or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
                      onClick={handleNegotiate}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Offer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Your Offer</AlertDialogTitle>
                      <AlertDialogDescription>
                        You're about to send an offer of <strong>{offerAmount || freelancer.rate}</strong> to <strong>{freelancer.name}</strong>. 
                        Once they accept, you'll be able to communicate and arrange the details of your project.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleConfirm}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirm Offer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetail;
