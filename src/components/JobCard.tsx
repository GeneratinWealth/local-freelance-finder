
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedTime: string;
  image: string;
}

export const JobCard = ({
  title,
  company,
  location,
  salary,
  type,
  postedTime,
  image,
}: JobCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 animate-fade-in">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={company}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{company}</p>
            </div>
            <Badge variant="secondary" className="whitespace-nowrap">
              {type}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{postedTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
