import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { phone, subscription } = req.body;

    if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: "Invalid subscription" });
    }

    try {
        // Check if subscription already exists
        const { data: existing } = await supabase
            .from("subscriptions")
            .select("id")
            .eq("endpoint", subscription.endpoint)
            .single();

        if (existing) {
            return res.status(200).json({ message: "Subscription updated" });
        }

        // Insert new subscription
        const { error } = await supabase.from("subscriptions").insert([
            {
                user_phone: phone || null,
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                created_at: new Date().toISOString(),
            },
        ]);

        if (error) throw error;

        return res.status(200).json({ message: "Subscription saved" });
    } catch (err) {
        console.error("Error saving subscription:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
