/* --- SAME IMPORTS --- */
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

  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const LAST_VISIT_KEY = "notifications_last_visit";
  const getLastVisit = () => {
    const v = localStorage.getItem(LAST_VISIT_KEY);
    return v ? new Date(v) : null;
  };
  const setLastVisit = (d = new Date()) =>
    localStorage.setItem(LAST_VISIT_KEY, d.toISOString());

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendTitle, setSendTitle] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [sendRecipient, setSendRecipient] = useState<string | "all">("all");
  const [sendUsers, setSendUsers] = useState<
    Array<{ id: string; name: string; email: string }>
  >([]);

  /* Load admin users */
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

  /* SEND NOTIFICATION */
  const handleSendNotification = async () => {
    try {
      await supabase.from("notifications").insert([
        {
          title: sendTitle,
          message: sendMessage,
          sent_by: currentUserId,
          is_global: sendRecipient === "all",
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
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LEFT: Hamburger Menu */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded hover:bg-primary/10 active:scale-90 transition"
            >
              <Menu size={26} />
            </button>

            {/* LEFT DESKTOP LINKS */}
            <div className="hidden md:flex gap-6 text-sm">
              <Link to="/">मुख्यपृष्ठ</Link>
              <Link to="/about">बद्दल</Link>
              <Link to="/calendar">दर्शन दिनदर्शिका</Link>
              <Link to="/books">पुस्तके</Link>
              <Link to="/social">Social Feed</Link>
              <Link to="/social/create">Create Post</Link>
              <Link to="/social/login">Login</Link>
            </div>

            {/* CENTER LOGO */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold 
              bg-gradient-divine bg-clip-text text-transparent drop-shadow-md"
            >
              श्री स्वामी समर्थ
            </Link>

            {/* RIGHT: Notifications + Admin */}
            <div className="flex items-center gap-4 ml-auto">

              {/* Notification Bell */}
              <button
                onClick={() => {
                  setLastVisit();
                  setUnreadCount(0);
                  navigate("/notifications");
                }}
                className="relative p-2 rounded hover:bg-primary/10 active:scale-90 transition"
              >
                <Bell size={22} className="text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* ADMIN BUTTON */}
              {isAdmin && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90">
                      Admin
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Notification</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                      <Input
                        placeholder="Title"
                        value={sendTitle}
                        onChange={(e) => setSendTitle(e.target.value)}
                      />
                      <Textarea
                        placeholder="Message"
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                      />
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
                      <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendNotification}>Send</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-72 bg-background shadow-2xl border-r z-50"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms ease",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" onClick={() => setOpen(false)}>मुख्यपृष्ठ</Link>
          <Link to="/about" onClick={() => setOpen(false)}>बद्दल</Link>
          <Link to="/calendar" onClick={() => setOpen(false)}>दर्शन दिनदर्शिका</Link>
          <Link to="/books" onClick={() => setOpen(false)}>पुस्तके</Link>
          <Link to="/social" onClick={() => setOpen(false)}>Social Feed</Link>
          <Link to="/social/create" onClick={() => setOpen(false)}>Create Post</Link>
          <Link to="/social/login" onClick={() => setOpen(false)}>Login</Link>
        </nav>

        {/* SIGN OUT */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setOpen(false);
              navigate("/");
            }}
            className="w-full py-2 rounded hover:bg-primary/10 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};
