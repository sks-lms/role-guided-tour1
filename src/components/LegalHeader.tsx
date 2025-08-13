import { ArrowLeft, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalHeaderProps {
    title: string;
    icon: "shield" | "file";
    effectiveDate: string;
    onBack?: () => void;
}

export const LegalHeader = ({ title, icon, effectiveDate, onBack }: LegalHeaderProps) => {
    const IconComponent = icon === "shield" ? Shield : FileText;

    return (
        <div className="legal-card p-8 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                {onBack && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                )}
                <div className="flex-1" />
            </div>

            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 animate-float">
                    <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4 animate-scale-in">
                    {title}
                </h1>

                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-primary/20 animate-slideUp">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Effective Date: {effectiveDate}
                    </p>
                </div>
            </div>
        </div>
    );
};