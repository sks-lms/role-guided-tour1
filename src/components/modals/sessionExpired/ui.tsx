import React from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionExpiredModalProps, useHandler } from "./handler";

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ open }) => {
    const [state, handlers] = useHandler();

    return (
        <Dialog open={open} onOpenChange={() => { }} modal>
            <DialogContent
                className="sm:max-w-[420px] p-0 overflow-hidden bg-background border-0 shadow-elegant"
                hideCloseButton
            >
                <div className="p-8 text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center animate-scale-in">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3 animate-fade-in">
                        <h2 className="text-2xl font-bold text-foreground">
                            Session Expired
                        </h2>
                        <p className="text-muted-foreground max-w-[300px] mx-auto leading-relaxed">
                            Your session has expired for security reasons. Please log in again to
                            continue using the application.
                        </p>
                    </div>

                    {/* Button */}
                    <Button
                        onClick={handlers.handleLoginAgain}
                        className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 group animate-slideUp"
                        style={{ animationDelay: "200ms" }}
                    >
                        Login Again
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};