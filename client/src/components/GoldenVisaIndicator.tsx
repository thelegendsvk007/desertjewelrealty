import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BadgeCheck } from 'lucide-react';

interface GoldenVisaIndicatorProps {
  price: number;
  className?: string;
}

const GoldenVisaIndicator = ({ price, className = '' }: GoldenVisaIndicatorProps) => {
  // Golden Visa eligibility - properties worth AED 2 million or more
  const isEligible = price >= 2000000;

  if (!isEligible) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center space-x-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md cursor-help animate-pulse ${className}`}>
            <BadgeCheck className="h-4 w-4 text-amber-600 animate-bounce" />
            <span className="text-xs font-medium">Golden Visa Eligible</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-sm">
            This property meets the AED 2 million minimum investment requirement for UAE Golden Visa eligibility.
            The Golden Visa program offers long-term residency (5-10 years) to investors and their families.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GoldenVisaIndicator;