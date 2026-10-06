import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import useLenis from "./hooks/useLenis";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import NetworkStatus from "./components/ui/NetworkStatus";
import CookieBanner from "./components/ui/CookieBanner";
import BackToTop from "./components/ui/BackToTop";

// Lazy-load page components
const Home = lazy(() => import("./pages/Home"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Facilities = lazy(() => import("./pages/Facilities"));
const BeyondClassroom = lazy(() => import("./pages/BeyondClassroom"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AppContent() {
  useLenis();
  const location = useLocation();
  return (
    <>
      <NetworkStatus />
      <CookieBanner />
      <BackToTop />
      <WhatsAppButton />
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/beyond-classroom" element={<BeyondClassroom />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <AppContent />
    </BrowserRouter>
  );
}