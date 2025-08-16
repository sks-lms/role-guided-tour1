import React from 'react';
import { Youtube, Play, CheckCircle, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface YouTubeConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function YouTubeConnectModal({ open, onOpenChange }: YouTubeConnectModalProps) {
  const handleConnectYouTube = () => {
    // TODO: Implement YouTube OAuth connection
    console.log('Connecting to YouTube...');
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-0 p-0 overflow-hidden bg-gradient-to-br from-background via-background to-red-50/20 dark:to-red-950/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-red-400/5 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-red-500/5 to-transparent rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        <div className="relative z-10 p-8">
          <DialogHeader className="text-center space-y-6">
            {/* Animated YouTube Icon */}
            <div className="mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-ping opacity-20"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-2xl animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/50 to-transparent rounded-full"></div>
                <Youtube className="h-10 w-10 text-white relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-3 w-3 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent">
                Connect to YouTube
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground text-base leading-relaxed">
                Unlock the power of video publishing by connecting your YouTube account
              </DialogDescription>
            </div>
          </DialogHeader>
          
          {/* Features List */}
          <div className="mt-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Play, text: "Publish lessons directly to YouTube" },
              { icon: CheckCircle, text: "Automatic video optimization" },
              { icon: Sparkles, text: "Seamless content management" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-950/20 border border-red-100/50 dark:border-red-900/20 animate-slide-in-right hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <feature.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Authorization Instructions */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200/50 dark:border-blue-800/30 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-center text-muted-foreground">
              Click <span className="font-semibold text-red-600 dark:text-red-400">Connect YouTube</span> to open the secure authorization window. 
              Your lesson upload will continue automatically after authentication.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto hover:shadow-md transition-all duration-300 hover-scale"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnectYouTube}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Youtube className="mr-2 h-5 w-5 relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">Connect YouTube</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}