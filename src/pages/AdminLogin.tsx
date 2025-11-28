import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/supabase/client";
import { ADMIN_EMAIL } from "@/config/admin";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // check profile role
      const { data: userResp } = await supabase.auth.getUser();
      const user = userResp?.user ?? null;
      if (!user) throw new Error("Authentication failed");

      // Only allow the configured admin email to proceed
      if ((user.email ?? "") !== ADMIN_EMAIL) {
        toast.error("You are not authorized as admin");
        await supabase.auth.signOut();
        return;
      }

      // Optional: verify profile role if you also use role-based checks
      const { data: profile, error: pErr } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (pErr) {
        console.warn("Failed to read profile role", pErr);
      }

      toast.success("Welcome, admin");
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
            </div>
            <div>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
