import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Lock page scroll when sidebar opens
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto focus sidebar
  useEffect(() => {
    if (open) sidebarRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Top navigation bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                मुख्यपृष्ठ
              </Link>

              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                बद्दल
              </Link>

              <Link to="/calendar" className="text-foreground hover:text-primary transition-colors font-medium">
                दर्शन दिनदर्शिका
              </Link>

              <Link to="/books" className="text-foreground hover:text-primary transition-colors font-medium">
                पुस्तके
              </Link>

              {/* ⭐ SOCIAL HUB LINKS */}
              <Link to="/social" className="text-foreground hover:text-primary transition-colors font-medium">
                Social Feed
              </Link>

              <Link to="/social/create" className="text-foreground hover:text-primary transition-colors font-medium">
                Create Post
              </Link>

              <Link to="/social/login" className="text-foreground hover:text-primary transition-colors font-medium">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded hover:bg-gray-200/20 transition"
            >
              <Menu size={26} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-divine bg-clip-text text-transparent"
            >
              श्री स्वामी समर्थ
            </Link>

          </div>
        </div>
      </nav>

      {/* Dark Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          transition: "opacity 300ms ease",
        }}
      />

      {/* Slide Sidebar */}
      <aside
        ref={sidebarRef}
        tabIndex={-1}
        className="fixed top-0 left-0 h-full w-72 max-w-[90vw] z-50 shadow-xl bg-background border-r border-border"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms ease",
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">मेनू</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded hover:bg-gray-200/20 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            मुख्यपृष्ठ
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            बद्दल
          </Link>

          <Link
            to="/calendar"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            दर्शन दिनदर्शिका
          </Link>

          <Link
            to="/books"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            पुस्तके
          </Link>

          {/* ⭐ SOCIAL HUB LINKS IN MOBILE SIDEBAR */}
           <Link
            to="/social/login"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            Login
          </Link>
          <Link
            to="/social"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            Social Feed
            
          </Link>

          <Link
            to="/social/create"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2 px-2 rounded hover:bg-gray-200/10"
          >
            Create Post
          </Link>

         
        </nav>
      </aside>
    </>
  );
};
