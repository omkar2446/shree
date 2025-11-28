/* --- IMPORTS --- */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import { supabase } from "@/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ADMIN_EMAIL } from "@/config/admin";

/* --- PROPS --- */
interface NavbarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const controlled = typeof sidebarOpen === "boolean";
  const open = controlled ? sidebarOpen! : internalOpen;
  const setOpen = controlled ? setSidebarOpen! : setInternalOpen;

  /* Prevent Scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Notifications + Admin Check */
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const LAST_VISIT_KEY = "notifications_last_visit";

  const setLastVisit = () =>
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());

  /* Load user + admin status */
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      setCurrentUserId(user.id);
      setIsAdmin(user.email === ADMIN_EMAIL); // ✔ ADMIN CHECK
    })();
  }, []);

  /* Load users for admin notification dialog */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendTitle, setSendTitle] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [sendRecipient, setSendRecipient] = useState<string | "all">("all");
  const [sendUsers, setSendUsers] = useState<
    Array<{ id: string; name: string; email: string }>
  >([]);

  useEffect(() => {
    if (!dialogOpen) return;

    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .order("full_name");

      setSendUsers(
        (data || []).map((u: any) => ({
          id: u.id,
          name: u.full_name || u.email,
          email: u.email,
        }))
      );
    })();
  }, [dialogOpen]);

  /* Send notification */
  const handleSendNotification = async () => {
    try {
      await supabase.from("notifications").insert([
        {
          title: sendTitle,
          message: sendMessage,
          is_global: sendRecipient === "all",
          sent_by: currentUserId,
          user_id: sendRecipient === "all" ? null : sendRecipient,
        },
      ]);

      toast.success("Notification sent!");
      setDialogOpen(false);
      setSendTitle("");
      setSendMessage("");
      setSendRecipient("all");
    } catch {
      toast.error("Failed to send notification");
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LEFT – Hamburger trigger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded hover:bg-primary/20 active:scale-90 transition"
            >
              <Menu size={26} />
            </button>

            {/* CENTER – Logo */}
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-divine bg-clip-text text-transparent drop-shadow-sm"
            >
              श्री स्वामी समर्थ
            </Link>

            {/* RIGHT – Notifications */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setLastVisit();
                  setUnreadCount(0);
                  navigate("/notifications");
                }}
                className="relative p-2 rounded hover:bg-primary/20 active:scale-90 transition"
              >
                <Bell className="text-primary" size={22} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-72 bg-background border-r shadow-2xl z-50"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "300ms ease",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b bg-primary/5">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded hover:bg-primary/10 active:scale-90 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-4 space-y-2 text-sm">
          <Link to="/" className="py-2 px-2 rounded hover:bg-primary/10">मुख्यपृष्ठ</Link>
          <Link to="/about" className="py-2 px-2 rounded hover:bg-primary/10">बद्दल</Link>
          <Link to="/calendar" className="py-2 px-2 rounded hover:bg-primary/10">दर्शन दिनदर्शिका</Link>
          <Link to="/books" className="py-2 px-2 rounded hover:bg-primary/10">पुस्तके</Link>
          <Link to="/social" className="py-2 px-2 rounded hover:bg-primary/10">Social Feed</Link>
          <Link to="/social/create" className="py-2 px-2 rounded hover:bg-primary/10">Create Post</Link>
          <Link to="/social/login" className="py-2 px-2 rounded hover:bg-primary/10">Login</Link>
        </nav>

        {/* ADMIN SECTION – This will show ONLY if admin */}
        {isAdmin && (
          <div className="p-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="w-full py-2 bg-primary text-white rounded shadow hover:bg-primary/90 active:scale-95 transition">
                  Send Notification
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Notification</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 mt-3">
                  <Input value={sendTitle} onChange={(e) => setSendTitle(e.target.value)} placeholder="Title" />
                  <Textarea value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} placeholder="Message" />

                  <select
                    value={sendRecipient}
                    onChange={(e) => setSendRecipient(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="all">All Users</option>
                    {sendUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>

                <DialogFooter>
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSendNotification}>Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* SIGN OUT */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setLastVisit();
              setOpen(false);
              navigate("/");
            }}
            className="w-full py-2 text-sm bg-red-600 text-white rounded hover:bg-red-500 active:scale-95 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};
