
import React from "react";
import { convertSalary } from "@/utils/currencyUtils";
import { CurrencyCode } from "@/components/CurrencySelector";
import { StatusBadge, FreelancerStatus } from "@/components/StatusBadge";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface JobCardWithCurrencyProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedTime: string;
  image: string;
  category: string;
  currency: CurrencyCode;
  status?: FreelancerStatus;
  distance?: string;
  id: string;
}

export const JobCardWithCurrency: React.FC<JobCardWithCurrencyProps> = ({
  title,
  company,
  location,
  salary,
  type,
  postedTime,
  image,
  category,
  currency,
  status = "available",
  distance = "2.5 miles",
  id,
}) => {
  const convertedSalary = convertSalary(salary, "USD", currency);
  
  // Handle the navigation in a way that doesn't break if used outside Router context
  const handleNegotiate = () => {
    window.location.href = `/freelancer/${id}`;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow flex gap-4 border border-gray-100">
      <div className="flex-shrink-0 relative">
        <img
          src={image}
          alt={company}
          className="w-16 h-16 rounded-lg object-cover"
        />
        {status && (
          <div className="absolute -bottom-2 -right-2">
            <StatusBadge status={status} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{company}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full flex items-center">
            <span className="mr-1">📍</span> {location}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {convertedSalary}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {type}
          </span>
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
            {category}
          </span>
          <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {distance}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">Posted {postedTime}</div>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs bg-green-600 text-white border-0 hover:bg-green-700"
            onClick={handleNegotiate}
          >
            Negotiate
          </Button>
        </div>
      </div>
    </div>
  );
};
