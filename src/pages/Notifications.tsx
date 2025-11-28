import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  sent_by?: string | null;
  is_global?: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let currentUserId: string | null = null;

    const init = async () => {
      setLoading(true);
      try {
        const { data: userResp } = await supabase.auth.getUser();
        const user = userResp?.user ?? null;
        currentUserId = user?.id ?? null;

        // Fetch notifications that are global OR addressed to the current user
        const filter = currentUserId
          ? `is_global.eq.true,user_id.eq.${currentUserId}`
          : `is_global.eq.true`;

        const { data, error } = await supabase
          .from("notifications")
          .select("id, title, message, created_at, sent_by, is_global, user_id")
          .or(filter)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!mounted) return;
        setNotifications((data as Notification[]) || []);
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load notifications");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const channel = supabase
      .channel("notifications-list")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const newNotif = payload.new as Notification & { user_id?: string | null };
          // Only add/show if it's global or targeted to current user
          if (newNotif.is_global || (newNotif.user_id && newNotif.user_id === currentUserId)) {
            setNotifications((s) => [newNotif, ...s]);
            toast.success(`${newNotif.title}`);
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
        <div className="space-y-4">
          {loading ? (
            <p>Loading…</p>
          ) : notifications.length === 0 ? (
            <p className="text-muted-foreground">No notifications yet.</p>
          ) : (
            notifications.map((n) => (
              <Card key={n.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{n.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
