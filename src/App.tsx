import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/supabase/client";

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
// Notifications
import NotificationsPage from "./pages/Notifications";
import AdminNotifications from "./pages/AdminNotifications";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "@/components/AdminRoute";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    let mounted = true;

    const ensureProfile = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user ?? null;
        if (!user) return;
        const name = (user.user_metadata as any)?.full_name || (user.user_metadata as any)?.name || user.email?.split("@")[0] || null;
        // Upsert into profiles table so admins can see users
        await supabase.from("profiles").upsert({ id: user.id, name, email: user.email });
      } catch (err) {
        console.warn("Failed to upsert profile", err);
      }
    };

    // Ensure profile on load
    ensureProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        // when a user signs in, ensure they have a profile row
        ensureProfile();
      }
    });

    return () => {
      mounted = false;
      try {
        subscription?.unsubscribe();
      } catch {}
    };
    }, []);

  return (
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

          {/* Notifications */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

};

export default App;
