import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return null;

  return authenticated ? children : <Navigate to="/social/login" />;
};

export default ProtectedRoute;
