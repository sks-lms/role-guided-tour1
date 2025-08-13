import { ReactNode } from "react";

interface LegalSectionProps {
    title: string;
    children: ReactNode;
    highlighted?: boolean;
    delay?: number;
}

export const LegalSection = ({ title, children, highlighted = false, delay = 0 }: LegalSectionProps) => {
    return (
        <div
            className={`legal-section ${highlighted ? 'bg-secondary/10 border-secondary/30' : ''} animate-fade-in`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 group cursor-default">
                <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                    {title}
                </span>
            </h2>

            <div className="space-y-4 text-base md:text-lg leading-relaxed text-foreground/90">
                {children}
            </div>
        </div>
    );
};