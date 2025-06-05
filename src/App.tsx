
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FreelancerDetail from "./pages/FreelancerDetail";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import BecomeClient from "./pages/BecomeClient";
import Verification from "./pages/Verification";
import Help from "./pages/Help";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import ProfileCreation from "./pages/ProfileCreation";
import BrowseFreelancers from "./pages/BrowseFreelancers";
import RequestBooking from "./pages/RequestBooking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Messages from "./pages/Messages";
import VerificationScreen from "./pages/VerificationScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/profile-creation" element={<ProfileCreation />} />
              <Route path="/browse-freelancers" element={<BrowseFreelancers />} />
              <Route path="/request-booking" element={<RequestBooking />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/verification" element={<VerificationScreen />} />
              <Route path="/freelancer/:id" element={<FreelancerDetail />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/become-client" element={<BecomeClient />} />
              <Route path="/help" element={<Help />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
