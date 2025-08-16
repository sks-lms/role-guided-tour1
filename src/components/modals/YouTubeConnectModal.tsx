import React from 'react';
import { Youtube } from 'lucide-react';
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <Youtube className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <DialogTitle className="text-xl font-semibold">Connect YouTube</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            To publish lessons to YouTube, you need to authorize your YouTube account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Click <span className="font-medium text-foreground">Connect YouTube</span> to open the authorization
          window. After authorization, your lesson upload will automatically continue.
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center sm:space-x-3 sm:space-y-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConnectYouTube}
            className="w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 sm:w-auto"
          >
            <Youtube className="mr-2 h-4 w-4" />
            Connect YouTube
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}