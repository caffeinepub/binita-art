import { Link } from "@tanstack/react-router";

export function PublicHeader() {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/assets/uploads/1774076028919-1.png"
            alt="Binita Art Gallery Logo"
            className="h-10 w-10 object-contain rounded-full"
          />
          <span
            className="font-display text-2xl font-700 tracking-widest uppercase"
            style={{
              background:
                "linear-gradient(135deg, #e84393 0%, #a855f7 30%, #3b82f6 60%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Binita Art Gallery
          </span>
        </Link>

        {/* Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            data-ocid="home.link"
            className="font-body text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <a
            href="#gallery"
            data-ocid="gallery.link"
            className="font-body text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors"
          >
            Gallery
          </a>
          <a
            href="#about"
            data-ocid="about.link"
            className="font-body text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors"
          >
            About
          </a>
        </nav>

        {/* Admin link */}
        <Link
          to="/admin"
          data-ocid="admin.link"
          className="font-body text-xs tracking-widest uppercase border border-foreground/30 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
