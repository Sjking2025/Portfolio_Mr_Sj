
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DemoProvider } from "@/contexts/DemoContext";
import ThemeSelector from "@/components/ThemeSelector";
import { CustomCursor } from "@/components/animations";
import { initSmoothScroll, destroySmoothScroll } from "@/lib/smooth-scroll";
import Layout from "./components/Layout";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Articles from "./pages/Articles";
import Profiles from "./pages/Profiles";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { applyPerformanceMode } from "@/lib/performance";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize smooth scrolling and performance mode
  useEffect(() => {
    applyPerformanceMode(); // Add CSS classes for low-end devices
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <>
      <CustomCursor />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <ThemeSelector />
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <DemoProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </DemoProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


