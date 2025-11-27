self.addEventListener("push", function (event) {
  let data = {};

  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "Notification", body: "You have a reminder!" };
  }

  const title = data.title || "Monthly Reminder";
  const options = {
    body: data.body || "This is your scheduled monthly reminder!",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Click handler (optional)
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Open home page
  );
});
