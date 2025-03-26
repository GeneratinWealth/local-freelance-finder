
import React from "react";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Clock } from "lucide-react";

export type FreelancerStatus = "available" | "offline" | "busy";

interface StatusBadgeProps {
  status: FreelancerStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: FreelancerStatus) => {
    switch (status) {
      case "available":
        return {
          icon: CircleCheck,
          text: "Available",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          iconColor: "text-green-500",
        };
      case "offline":
        return {
          icon: CircleX,
          text: "Offline",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          iconColor: "text-gray-500",
        };
      case "busy":
        return {
          icon: Clock,
          text: "Busy",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          iconColor: "text-red-500",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <Icon size={14} className={config.iconColor} />
      <span>{config.text}</span>
    </div>
  );
};
