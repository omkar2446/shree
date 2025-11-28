import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/supabase/client";
import { ADMIN_EMAIL } from "@/config/admin";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user ?? null;
      if (!user) {
        if (mounted) setIsAdmin(false);
        return;
      }
      // require that the user's profile role is 'admin'
      const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (error) {
        console.error(error);
        if (mounted) setIsAdmin(false);
        return;
      }
      if (!profile || profile.role !== "admin") {
        if (mounted) setIsAdmin(false);
        return;
      }
      if (mounted) setIsAdmin(true);
    })();
    return () => { mounted = false; };
  }, []);

  if (isAdmin === null) return null; // or a spinner
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default AdminRoute;
