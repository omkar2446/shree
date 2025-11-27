import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// MAIN APP PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Calendar from "./pages/Calendar";
import BooksPage from "./pages/BooksPage";
import NotFound from "./pages/NotFound";

// SOCIAL HUB PAGES
import SocialHome from "./socialhub/pages/Home";
import SocialAuth from "./socialhub/pages/Auth";
import SocialCreatePost from "./socialhub/pages/CreatePost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* MANDIR WEBSITE ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/books" element={<BooksPage />} />

          {/* SOCIAL HUB ROUTES */}
          <Route path="/social" element={<SocialHome />} />
          <Route path="/social/login" element={<SocialAuth />} />
          <Route path="/social/create" element={<SocialCreatePost />} />

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
