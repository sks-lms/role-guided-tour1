import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "@/App";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import { OAuthRedirectHandler } from "@/components/oAuthRedirectHandler";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import CheckoutCancel from "@/pages/CheckoutCancel";
import { LandingPage } from "@/pages/landingPage";
import { PaymentPage } from "@/pages/paymentPage";
import { InvitationPage } from "@/pages/invitationPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";

const RoutesWrapper = () => (
    <BrowserRouter>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/tutor/oauth/redirect" element={<OAuthRedirectHandler />} />
            <Route path="/student/oauth/redirect" element={<OAuthRedirectHandler />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/tutor-dashboard/*" element={<PrivateRoute component={App} role="tutor" />} />
            <Route path="/student-dashboard/*" element={<PrivateRoute component={App} role="student" />} />
            <Route path="/student/accept-invitation" element={<InvitationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesWrapper;