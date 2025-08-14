import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTour } from '@/hooks/useTour';
import { useAppSelector } from '@/redux/hooks';

export function TourButton() {
<<<<<<< Updated upstream
  const { startTour } = useTour();
  const userType = useAppSelector((state) => state.auth.userType) as 'tutor' | 'student';

  const handleStartTour = () => {
    if (userType) {
      startTour(userType);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStartTour}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant z-50 animate-float"
          data-tour="tour-button"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-card text-card-foreground border shadow-card">
        <p>Start Dashboard Tour</p>
      </TooltipContent>
    </Tooltip>
  );
=======
    const { startTour } = useTour();
    const userType = useAppSelector((state) => state.auth.userType) as 'tutor' | 'student';

    const handleStartTour = () => {
        if (userType) {
            startTour(userType);
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleStartTour}
                    className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant z-50 animate-float"
                    data-tour="tour-button"
                >
                    <HelpCircle className="h-6 w-6" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-card text-card-foreground border shadow-card">
                <p>Start Dashboard Tour</p>
            </TooltipContent>
        </Tooltip>
    );
>>>>>>> Stashed changes
}