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
import Contact from "@/pages/Contact";
import Tools from "@/pages/Tools";
import ToolsPage from "@/pages/ToolsPage";
import FAQPage from "@/pages/FAQPage";
import LocationInsights from "@/pages/LocationInsights";
import AdminReview from "@/pages/AdminReview";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

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
        <Route path="/developers" component={Developers} />
        <Route path="/developers/:id" component={DeveloperDetail} />
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={Contact} />
        <Route path="/tools" component={Tools} />
        <Route path="/investment-tools" component={ToolsPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/location-insights" component={LocationInsights} />
        
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
          <ProgressBar />
          <Navigation />
          <main className="pt-16">
            <Router />
          </main>
          <Footer />
          <VerticalContactMenu />
          <BackToTop />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
