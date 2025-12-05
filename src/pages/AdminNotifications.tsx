import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type ProfileOption = {
  id: string;
  full_name?: string | null;
  email?: string | null;
  role?: string | null;
};

const AdminNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<ProfileOption[]>([]);
  const [recipient, setRecipient] = useState<string | "all">("all");
  const [search, setSearch] = useState(""); // <-- FIXED

  useEffect(() => {
    (async () => {
      try {
        // Get logged-in user
        const { data } = await supabase.auth.getUser();
        const user = data?.user ?? null;
        if (!user) return navigate("/");

        setUserId(user.id);

        // Verify ADMIN role
        const { data: profileData, error: profileErr } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileErr || !profileData || profileData.role !== "admin") {
          console.warn("Not admin", profileErr);
          return navigate("/");
        }

        // Fetch all users (full_name + email)
        const { data: pData, error: pErr } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .order("full_name", { ascending: true });

        if (pErr) throw pErr;

        setProfiles(pData || []);

      } catch (err) {
        console.error(err);
        navigate("/");
      }
    })();
  }, [navigate]);

  // Send notification
  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      return toast.error("Please enter both title and message.");
    }

    const isGlobal = recipient === "all";

    try {
      const payload = {
        title: title.trim(),
        message: message.trim(),
        sent_by: userId,
        is_global: isGlobal,
        user_id: isGlobal ? null : recipient,
      };

      const res = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send notification");
      }

      toast.success("Notification sent!");

      // Reset fields
      setTitle("");
      setMessage("");
      setRecipient("all");

    } catch (err: any) {
      console.error("Failed to send notification", err);
      toast.error(err.message || "Sending failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Admin — Send Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>

              {/* RECIPIENT */}
              <div>
                <label className="block text-sm font-medium mb-1">Recipient</label>

                {/* SEARCH */}
                <input
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Search users by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* DROPDOWN */}
                <select
                  className="w-full p-2 border rounded"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value as any)}
                >
                  <option value="all">All Users (Global Notification)</option>

                  {profiles
                    .filter((p) => {
                      if (!search.trim()) return true;
                      const q = search.toLowerCase();
                      return (
                        (p.full_name || "").toLowerCase().includes(q) ||
                        (p.email || "").toLowerCase().includes(q)
                      );
                    })
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {`${p.full_name || p.email} (${p.email})`}
                      </option>
                    ))}
                </select>
              </div>

              {/* SHOW SELECTED NAME */}
              {recipient !== "all" && (
                <div className="text-sm font-medium">
                  To: {profiles.find((p) => p.id === recipient)?.full_name || "Unknown"}
                </div>
              )}

              {/* SEND BUTTON */}
              <div className="flex justify-end">
                <Button onClick={handleSend}>Send</Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminNotifications;
