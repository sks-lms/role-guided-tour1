import { Mail, MapPin, Building } from "lucide-react";

export const ContactCard = () => {
    return (
        <div className="legal-card p-8 bg-gradient-primary text-white animate-fade-in">
            <div className="flex items-center mb-6">
                <Building className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-bold">Contact SK Solution</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                    <Mail className="w-5 h-5 mt-1 text-white/80 group-hover:text-white transition-colors" />
                    <div>
                        <p className="font-medium">Email</p>
                        <a
                            href="mailto:skksolutions.lms@gmail.com"
                            className="text-white/90 hover:text-white underline underline-offset-2 transition-colors"
                        >
                            skksolutions.lms@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-start space-x-3 group">
                    <MapPin className="w-5 h-5 mt-1 text-white/80 group-hover:text-white transition-colors" />
                    <div>
                        <p className="font-medium">Address</p>
                        <p className="text-white/90">
                            90/F, Kurawalana<br />
                            Kahatowita, Sri Lanka
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/80">
                    Have questions about our policies? We're here to help and ensure transparency in all our practices.
                </p>
            </div>
        </div>
    );
};