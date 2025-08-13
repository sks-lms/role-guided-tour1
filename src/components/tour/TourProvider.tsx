import React, { useEffect } from 'react';
import { useFirstTimeTour } from '@/hooks/useFirstTimeTour';
import { useTour } from '@/hooks/useTour';

interface TourProviderProps {
  children: React.ReactNode;
}

export function TourProvider({ children }: TourProviderProps) {
  const { shouldShowTour, markTourAsCompleted, userType } = useFirstTimeTour();
  const { startTour } = useTour();

  useEffect(() => {
    // Add styles for Shepherd.js tour
    const style = document.createElement('style');
    style.textContent = `
      .shepherd-modal-overlay-container {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }
      
      .shepherd-element {
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-radius: var(--radius);
        box-shadow: var(--shadow-elegant);
        color: hsl(var(--card-foreground));
        max-width: 400px;
        z-index: 9999;
      }
      
      .shepherd-text {
        padding: 1.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
      }
      
      .shepherd-text h1,
      .shepherd-text h2,
      .shepherd-text h3,
      .shepherd-text h4 {
        color: hsl(var(--primary));
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      
      .shepherd-footer {
        background: hsl(var(--muted));
        border-top: 1px solid hsl(var(--border));
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0 0 var(--radius) var(--radius);
      }
      
      .shepherd-button {
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        border: none;
        padding: 0.5rem 1rem;
        border-radius: calc(var(--radius) - 2px);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .shepherd-button:hover {
        background: hsl(var(--primary) / 0.9);
        transform: translateY(-1px);
      }
      
      .shepherd-button.btn-secondary {
        background: hsl(var(--secondary));
        color: hsl(var(--secondary-foreground));
      }
      
      .shepherd-button.btn-ghost {
        background: transparent;
        color: hsl(var(--muted-foreground));
        border: 1px solid hsl(var(--border));
      }
      
      .shepherd-button.btn-ghost:hover {
        background: hsl(var(--muted));
        color: hsl(var(--foreground));
      }
      
      .shepherd-header {
        padding: 1rem 1.5rem 0;
      }
      
      .shepherd-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: hsl(var(--primary));
        margin: 0;
        padding-right: 2rem;
      }
      
      .shepherd-cancel-icon {
        color: hsl(var(--muted-foreground));
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.2s ease;
      }
      
      .shepherd-cancel-icon:hover {
        color: hsl(var(--foreground));
        background: hsl(var(--muted));
      }
      
      .shepherd-arrow:before {
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
      }
    `;
    document.head.appendChild(style);

    // Auto-start tour for first-time users
    if (shouldShowTour && userType && (userType === 'tutor' || userType === 'student')) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        startTour(userType as 'tutor' | 'student');
      }, 1000);
      
      return () => clearTimeout(timer);
    }

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [shouldShowTour, userType, startTour]);

  return <>{children}</>;
}