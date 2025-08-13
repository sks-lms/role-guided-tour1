import { LegalHeader } from "@/components/LegalHeader";
import { LegalSection } from "@/components/LegalSection";
import { ContactCard } from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle } from "lucide-react";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-container">
      <div className="max-w-5xl mx-auto p-6 md:p-8 py-12">
        <LegalHeader
          title="Terms & Conditions"
          icon="file"
          effectiveDate="August 13, 2025"
          onBack={() => navigate('/')}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LegalSection title="1. Acceptance of Terms" delay={100}>
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary mb-2">Welcome to SK Solution</p>
                    <p>
                      By accessing or using our website{' '}
                      <a href="https://sksolution.app/" className="legal-link">
                        SK Solutions LMS
                      </a>{' '}
                      (the "Service"), you agree to comply with and be bound by these Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="2. Account Registration and Security" delay={200}>
              <div className="space-y-6">
                <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-soft">
                  <h4 className="font-bold text-primary mb-3">Account Creation</h4>
                  <p>To access certain features, you must create an account, which may require Google OAuth authentication.</p>
                </div>

                <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-soft">
                  <h4 className="font-bold text-primary mb-3">Your Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-2 text-foreground/80">
                    <li>Maintain confidentiality of your account credentials</li>
                    <li>Take responsibility for all activities under your account</li>
                    <li>Provide accurate and truthful information during registration</li>
                    <li>Update information as necessary</li>
                  </ul>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-destructive mb-2">Account Suspension</p>
                      <p className="text-sm">We reserve the right to suspend or terminate accounts that violate these Terms or show suspicious activity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="3. Use of the Service" delay={300}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-primary text-lg">✅ Allowed Uses</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Lawful purposes only</li>
                    <li>• Educational activities</li>
                    <li>• Personal learning</li>
                    <li>• Legitimate business use</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-destructive text-lg">❌ Prohibited Activities</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Harmful or disruptive conduct</li>
                    <li>• Unauthorized access attempts</li>
                    <li>• Interfering with other users</li>
                    <li>• Violating any applicable laws</li>
                  </ul>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="4. Intellectual Property" highlighted delay={400}>
              <div className="bg-accent/50 p-6 rounded-xl border border-primary/20">
                <p className="mb-4">
                  All content, trademarks, logos, and materials on the Service are the property of SK Solution or its licensors and are protected by intellectual property laws.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary">
                    🔒 You may not reproduce, distribute, modify, create derivative works, publicly display, or otherwise use any content without prior written permission.
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="5. Third-Party Services" delay={500}>
              <div className="space-y-4">
                <p>The Service may integrate third-party services (e.g., Google OAuth). Your use of these services is also governed by their respective terms.</p>
                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Disclaimer:</strong> We are not responsible for third-party actions or content.
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="6. Disclaimer of Warranties" delay={600}>
              <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-soft">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div className="space-y-3">
                    <p className="font-semibold">Service "As Is" Basis</p>
                    <p>The Service is provided "as is," "as available" without warranties of any kind, either express or implied.</p>
                    <p className="text-sm text-muted-foreground">
                      We do not guarantee that the Service will be uninterrupted, error-free, or secure.
                    </p>
                  </div>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="7. Limitation of Liability" delay={700}>
              <p>
                To the maximum extent permitted by law, SK Solution shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.
              </p>
            </LegalSection>

            <LegalSection title="8. Indemnification" delay={800}>
              <div className="bg-accent/30 p-6 rounded-xl border-l-4 border-primary/40">
                <p>
                  You agree to indemnify and hold harmless SK Solution and its affiliates, officers, agents, and employees from any claims, damages, liabilities, and expenses arising out of your use of the Service or violation of these Terms.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="9. Termination" delay={900}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
                  <h4 className="font-bold text-primary mb-3">Our Rights</h4>
                  <p className="text-sm">We may terminate or suspend your access at our sole discretion, without prior notice, for any reason including breach of these Terms.</p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
                  <h4 className="font-bold text-primary mb-3">Your Rights</h4>
                  <p className="text-sm">You may terminate your account at any time by contacting us or through your account settings.</p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="10. Governing Law and Jurisdiction" delay={1000}>
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of Sri Lanka. You agree to submit to the exclusive jurisdiction of the courts located in Sri Lanka for any disputes arising out of these Terms.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="11. Changes to Terms" delay={1100}>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will notify you of significant changes by posting the new Terms on this page with an updated effective date.
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <Button variant="outline" size="sm" className="text-primary border-primary/20 hover:bg-primary/5">
                  Get Terms Updates
                </Button>
                <span className="text-sm text-muted-foreground">Stay informed about important changes</span>
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

export default TermsAndConditions;