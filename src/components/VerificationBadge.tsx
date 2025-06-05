
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface VerificationBadgeProps {
  isVerified: boolean;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  isVerified, 
  size = 'md', 
  showIcon = true 
}) => {
  if (!isVerified) return null;

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <Badge 
      variant="secondary" 
      className={`bg-green-100 text-green-700 border-green-200 ${sizeClasses[size]} flex items-center gap-1`}
    >
      {showIcon && <Shield size={iconSizes[size]} />}
      Verified
    </Badge>
  );
};

export default VerificationBadge;
