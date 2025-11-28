import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type UserOption = { id: string; full_name?: string | null; email?: string | null };

const AdminDashboard: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // quick send state
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState<string | "all">("all");
  const [users, setUsers] = useState<UserOption[]>([]);
  // per-user modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRecipientId, setModalRecipientId] = useState<string | null>(null);
  const [modalRecipientName, setModalRecipientName] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [selectedProfileName, setSelectedProfileName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data?.user?.email ?? null);

      // fetch users for recipient dropdown (via serverless endpoint)
      try {
        // Fetch users directly from profiles table per requirement
        const { data: pData, error: pErr } = await supabase.from('profiles').select('id, full_name, email').order('full_name', { ascending: true });
        if (pErr) throw pErr;
        const list = (pData || []).map((u: any) => ({ id: u.id, full_name: u.full_name, email: u.email }));
        setUsers(list as UserOption[]);
      } catch (err) {
        console.warn('Failed to load users for admin dropdown', err);
      }
    })();
  }, []);

  const handleQuickSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Please provide title and message');
      return;
    }

    try {
      const { data: userResp } = await supabase.auth.getUser();
      const adminId = userResp?.user?.id ?? null;

      const isGlobal = recipient === 'all';
      const payload: any = {
        title: title.trim(),
        message: message.trim(),
        sent_by: adminId,
        is_global: isGlobal,
        user_id: isGlobal ? null : recipient,
      };

      const { error } = await supabase.from('notifications').insert([payload]);
      if (error) throw error;
      toast.success('Notification sent');
      setTitle('');
      setMessage('');
      setRecipient('all');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to send');
    }
  };

  const openSendModalFor = (user: UserOption) => {
    setModalRecipientId(user.id);
    setModalRecipientName(user.full_name || user.email || user.id);
    setSelectedProfileName(user.full_name || user.email || user.id);
    setModalTitle("");
    setModalMessage("");
    setModalOpen(true);
  };

  const handleSendFromModal = async () => {
    if (!modalTitle.trim() || !modalMessage.trim()) {
      toast.error('Please provide title and message');
      return;
    }
    try {
      const { data: userResp } = await supabase.auth.getUser();
      const adminId = userResp?.user?.id ?? null;
      const payload: any = {
        title: modalTitle.trim(),
        message: modalMessage.trim(),
        sent_by: adminId,
        is_global: false,
        user_id: modalRecipientId,
      };
      const { error } = await supabase.from('notifications').insert([payload]);
      if (error) throw error;
      toast.success('Notification sent');
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to send');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>Logged in as: <strong>{email}</strong></div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quick Send Notification</h3>
                <div>
                  <label className="block text-sm mb-1">Title</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Message</label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Recipient</label>
                  <select className="w-full p-2 border rounded" value={recipient} onChange={(e) => setRecipient(e.target.value as any)}>
                    <option value="all">All Users (Global)</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{(u.name ? u.name : u.email) + (u.email && u.name ? ` (${u.email})` : '')}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/admin/notifications')}>Open Notifications Panel</Button>
                  <Button onClick={handleQuickSend}>Send Notification</Button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium">Users</h3>
                <div className="mt-3 space-y-2">
                  {users.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{u.full_name || u.email || u.id}</div>
                        <div className="text-sm text-muted-foreground">{u.email}</div>
                      </div>
                      <div>
                        <Button size="sm" onClick={() => openSendModalFor(u)}>Send</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Per-user send modal */}
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send to {modalRecipientName}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 mt-2">
                    <Input value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} placeholder="Title" />
                    <Textarea value={modalMessage} onChange={(e) => setModalMessage(e.target.value)} placeholder="Message" />
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleSendFromModal}>Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
