import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Developers from "@/pages/Developers";
import DeveloperDetail from "@/pages/DeveloperDetail";
import AboutUs from "@/pages/AboutUs";
import TeamMemberProfile from "@/pages/TeamMemberProfile";
import Contact from "@/pages/Contact";
import Tools from "@/pages/Tools";
import ToolsPage from "@/pages/ToolsPage";
import FAQPage from "@/pages/FAQPage";
import LocationInsights from "@/pages/LocationInsights";
import AdminReview from "@/pages/AdminReview";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiesPolicy from "@/pages/CookiesPolicy";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProgressBar from "@/components/ProgressBar";
import VerticalContactMenu from "@/components/VerticalContactMenu";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/properties" component={Properties} />
        <Route path="/properties/:id" component={PropertyDetail} />
        <Route path="/property/:id" component={PropertyDetail} />
        <Route path="/developers" component={Developers} />
        <Route path="/developers/:id" component={DeveloperDetail} />
        <Route path="/about" component={AboutUs} />
        <Route path="/team/:id" component={TeamMemberProfile} />
        <Route path="/contact" component={Contact} />
        <Route path="/tools" component={Tools} />
        <Route path="/investment-tools" component={ToolsPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/location-insights" component={LocationInsights} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/cookies-policy" component={CookiesPolicy} />
        
        {/* Admin routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <ProtectedRoute path="/admin" component={AdminDashboard} adminOnly={true} />
        <ProtectedRoute path="/admin/review" component={AdminReview} adminOnly={true} />
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="relative min-h-screen">
            <div className="relative z-20">
              <ProgressBar />
              <Navigation />
              <main className="pt-16 relative">
                <Router />
              </main>
              <Footer />
              <VerticalContactMenu />
              <BackToTop />
              <Toaster />
            </div>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
