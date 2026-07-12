import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import useLenis from "./hooks/useLenis";

function AppContent() {
  useLenis();
  const location = useLocation();
  return (
    <>
      <WhatsAppButton />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
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