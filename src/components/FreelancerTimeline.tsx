
import React from "react";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { FreelancerStatus } from "@/components/StatusBadge";

interface FreelancerTimelineProps {
  status: FreelancerStatus;
  estimatedArrival?: string;
  currentJobEndsAt?: string;
}

const FreelancerTimeline: React.FC<FreelancerTimelineProps> = ({ 
  status, 
  estimatedArrival, 
  currentJobEndsAt 
}) => {
  const getTimelineContent = () => {
    switch (status) {
      case "available":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          title: "Available Now",
          description: "This freelancer is ready to take on new projects immediately.",
          timeline: estimatedArrival ? `Can arrive in ${estimatedArrival}` : "Ready to start"
        };
      case "busy":
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          title: "Currently Busy",
          description: "This freelancer is working on another project.",
          timeline: currentJobEndsAt ? `Current job ends ${currentJobEndsAt}` : "Will be available soon"
        };
      case "offline":
        return {
          icon: <XCircle className="h-5 w-5 text-gray-500" />,
          title: "Offline",
          description: "This freelancer is not currently active on the platform.",
          timeline: "Check back later"
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
          title: "Status Unknown",
          description: "Unable to determine this freelancer's current status.",
          timeline: "Contact for availability"
        };
    }
  };
  
  const content = getTimelineContent();
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          {content.icon}
          <h3 className="ml-2 text-sm font-medium text-gray-800">{content.title}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600">{content.description}</p>
        
        <div className="mt-4 flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
          <div className="h-0.5 w-12 bg-purple-200 mx-2"></div>
          <div className="flex items-center text-purple-700 font-medium">
            <ArrowRight className="h-4 w-4 mr-1" />
            <span>{content.timeline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerTimeline;
