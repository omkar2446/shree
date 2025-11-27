import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function Reminder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  // Register SW + Notification Permission
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Notification permission denied");
        return;
      }

      // Register service worker
      const reg = await navigator.serviceWorker.register("/sw.js");

      // Create push subscription
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC,
      });

      // Save the subscription to backend
      await fetch("/api/save-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, subscription }),
      });

      setStatus("Notifications enabled!");
    } catch (err) {
      console.error(err);
      setStatus("Error enabling notifications");
    }
  };

  // Save user form data
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, date }),
    });

    if (res.ok) {
      setStatus("User saved! Now enable notifications.");
    } else {
      setStatus("Error saving user.");
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-10 shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-6">Monthly Reminder</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
          <p className="text-center text-muted-foreground mb-10">
            Enter your details to receive monthly notifications.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                className="w-full p-3 rounded border"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Phone Number</label>
              <input
                className="w-full p-3 rounded border"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Day of Month (1–31)
              </label>
              <input
                className="w-full p-3 rounded border"
                type="number"
                min="1"
                max="31"
                placeholder="Example: 5"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600"
            >
              Save Details
            </button>
          </form>

          <button
            onClick={requestPermission}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
          >
            Enable Notifications
          </button>

          {status && (
            <p className="text-center mt-6 text-lg font-medium text-blue-600">
              {status}
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
