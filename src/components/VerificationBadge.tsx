
import React from "react";
import { BadgeCheck, Shield, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export type VerificationLevel = "basic" | "verified" | "premium";

interface VerificationBadgeProps {
  level: VerificationLevel;
  className?: string;
}

export const VerificationBadge = ({ level, className }: VerificationBadgeProps) => {
  const getLevelConfig = (level: VerificationLevel) => {
    switch (level) {
      case "basic":
        return {
          icon: Shield,
          text: "Basic",
          color: "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200",
          description: "Email and phone verification",
        };
      case "verified":
        return {
          icon: BadgeCheck,
          text: "Verified",
          color: "bg-green-100 hover:bg-green-200 text-green-700 border-green-200",
          description: "ID verified, address confirmed",
        };
      case "premium":
        return {
          icon: Fingerprint,
          text: "Premium",
          color: "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200",
          description: "Background check, experience verified, fingerprints on file",
        };
    }
  };

  const config = getLevelConfig(level);
  const Icon = config.icon;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className={cn("cursor-help gap-1", config.color, className)} variant="outline">
          <Icon size={14} />
          <span>{config.text}</span>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 text-sm">
        <div className="space-y-2">
          <h4 className="font-medium">{config.text} Verification</h4>
          <p>{config.description}</p>
          {level === "basic" && (
            <p>This freelancer has completed the minimum verification requirements.</p>
          )}
          {level === "verified" && (
            <p>This freelancer has validated their identity and address with our verification team.</p>
          )}
          {level === "premium" && (
            <p>This freelancer has completed our most rigorous verification process, including background checks and professional credential verification.</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
