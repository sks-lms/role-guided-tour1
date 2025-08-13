import { LegalHeader } from "@/components/LegalHeader";
import { LegalSection } from "@/components/LegalSection";
import { ContactCard } from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-container">
      <div className="max-w-5xl mx-auto p-6 md:p-8 py-12">
        <LegalHeader
          title="Privacy Policy"
          icon="shield"
          effectiveDate="August 13, 2025"
          onBack={() => navigate('/')}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LegalSection title="Introduction" delay={100}>
              <p>
                SK Solution ("we," "our," or "us") operates the website{' '}
                <a href="https://sksolution.app/" className="legal-link">
                  SK Solutions LMS
                </a>{' '}
                (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-muted-foreground">
                Your privacy is fundamental to our mission. We believe in transparency and want you to understand exactly how your data is handled.
              </p>
            </LegalSection>

            <LegalSection title="1. Information We Collect" delay={200}>
              <div className="space-y-6">
                <div className="bg-accent/30 p-6 rounded-xl border-l-4 border-primary/40">
                  <h4 className="font-bold text-primary mb-3">Personal Information You Provide</h4>
                  <p>When you use our Service, you may provide us with personal data including your name, email address, account creation details (via Google OAuth), and any other information you voluntarily submit.</p>
                </div>

                <div className="bg-muted/50 p-6 rounded-xl border-l-4 border-primary/20">
                  <h4 className="font-bold text-primary mb-3">Technical Data</h4>
                  <p>We automatically collect technical data such as your IP address, browser type, device information, operating system, and usage data through cookies and similar tracking technologies.</p>
                </div>

                <div className="bg-accent/30 p-6 rounded-xl border-l-4 border-primary/40">
                  <h4 className="font-bold text-primary mb-3">Usage Data</h4>
                  <p>Details of your interactions with our Service, including pages visited, features used, dates and times of access, and referral data.</p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="2. How We Use Your Information" delay={300}>
              <p>We use the information we collect for purposes including:</p>
              <ul className="list-disc list-inside space-y-3 mt-4 text-foreground/80">
                <li>Providing, operating, and maintaining our Service</li>
                <li>Managing user accounts and access authentication</li>
                <li>Improving, personalizing, and optimizing your experience</li>
                <li>Communicating with you about products, services, updates, and promotional offers</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Complying with legal obligations and enforcing our terms and policies</li>
              </ul>
            </LegalSection>

            <LegalSection title="3. Information Sharing and Disclosure" delay={400}>
              <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-xl mb-4">
                <p className="font-semibold text-destructive mb-2">Important Notice</p>
                <p>We do not sell your personal data. Period.</p>
              </div>

              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-3 mt-4 text-foreground/80">
                <li><strong>Service Providers:</strong> Trusted third-party vendors that assist with business operations (e.g., hosting, analytics, payment processing)</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Cookies and Tracking Technologies" highlighted delay={500}>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized advertising. You can control cookie settings via your browser preferences.
              </p>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-primary font-medium">
                  💡 Pro tip: Most browsers allow you to refuse all cookies, but this may impact your experience with our Service.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="5. Your Rights and Choices" delay={600}>
              <p>Depending on your jurisdiction, you have rights regarding your personal data, including:</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-card p-4 rounded-xl border border-border shadow-soft">
                  <h5 className="font-semibold text-primary mb-2">Access & Portability</h5>
                  <p className="text-sm text-muted-foreground">Get a copy of your data and move it elsewhere</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border shadow-soft">
                  <h5 className="font-semibold text-primary mb-2">Correction</h5>
                  <p className="text-sm text-muted-foreground">Fix inaccurate or incomplete information</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border shadow-soft">
                  <h5 className="font-semibold text-primary mb-2">Deletion</h5>
                  <p className="text-sm text-muted-foreground">Request removal of your personal data</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border shadow-soft">
                  <h5 className="font-semibold text-primary mb-2">Control</h5>
                  <p className="text-sm text-muted-foreground">Object to or restrict data processing</p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="6. Data Security" delay={700}>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="mt-4 flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm">
                  However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="7. Data Retention" delay={800}>
              <p>
                We retain your personal data only as long as necessary to provide our services, fulfill legal obligations, resolve disputes, and enforce agreements.
              </p>
            </LegalSection>

            <LegalSection title="8. International Data Transfers" delay={900}>
              <p>
                If you are located outside the country where SK Solution operates, your information may be transferred and processed in countries with different data protection laws. We will ensure adequate protection in accordance with applicable laws.
              </p>
            </LegalSection>

            <LegalSection title="9. Children's Privacy" delay={1000}>
              <div className="bg-accent/50 p-6 rounded-xl border border-primary/20">
                <p>
                  Our Service is not directed to individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we learn we have collected such data, we will take steps to delete it immediately.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="10. Updates to This Policy" delay={1100}>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new Privacy Policy on this page with a new effective date.
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="text-primary border-primary/20 hover:bg-primary/5">
                  Subscribe to Policy Updates
                </Button>
              </div>
            </LegalSection>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ContactCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;