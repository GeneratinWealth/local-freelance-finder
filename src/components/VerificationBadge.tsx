
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export type VerificationLevel = 'verified' | 'premium' | 'none';

interface VerificationBadgeProps {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  level, 
  size = 'md', 
  showIcon = true 
}) => {
  if (level === 'none') return null;

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

  const getVariantClasses = () => {
    switch (level) {
      case 'premium':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'verified':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Badge 
      variant="secondary" 
      className={`${getVariantClasses()} ${sizeClasses[size]} flex items-center gap-1`}
    >
      {showIcon && <Shield size={iconSizes[size]} />}
      {level === 'premium' ? 'Premium' : 'Verified'}
    </Badge>
  );
};

export default VerificationBadge;
export { VerificationBadge };
