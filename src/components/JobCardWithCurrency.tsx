
import React from "react";
import { convertSalary } from "@/utils/currencyUtils";
import { CurrencyCode } from "@/components/CurrencySelector";
import { StatusBadge, FreelancerStatus } from "@/components/StatusBadge";

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
  status = "available", // Default to available if not provided
}) => {
  const convertedSalary = convertSalary(salary, "USD", currency);

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
        </div>
        <div className="text-gray-400 text-xs">Posted {postedTime}</div>
      </div>
    </div>
  );
};
