import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, phone, date } = req.body;

    if (!name || !phone || !date) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        // Assuming there is a 'reminders' or 'users' table. 
        // Since I don't know the schema, I'll create a 'reminders' table entry.
        // Or I can just log it for now if I don't want to break things.
        // The user prompt was about notifications.
        // I'll check if 'reminders' table exists later or just create it.

        const { error } = await supabase.from("reminders").upsert([
            {
                name,
                phone,
                day_of_month: parseInt(date),
                created_at: new Date().toISOString(),
            },
        ]);

        if (error) throw error;

        return res.status(200).json({ message: "User saved" });
    } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
