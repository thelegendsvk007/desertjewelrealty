import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Developers from "@/pages/Developers";
import DeveloperDetail from "@/pages/DeveloperDetail";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactFloatingButton from "@/components/ContactFloatingButton";
import BackToTop from "@/components/BackToTop";
import ProgressBar from "@/components/ProgressBar";

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
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProgressBar />
        <Navigation />
        <main className="pt-16">
          <Router />
        </main>
        <Footer />
        <ContactFloatingButton />
        <BackToTop />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
