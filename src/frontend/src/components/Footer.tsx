export function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-surface border-t border-border" id="about">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-lg font-600 tracking-widest uppercase mb-4">
              Binita Art
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              A curated collection of original paintings celebrating the beauty
              of Indian landscapes, traditions, and the human spirit. Each work
              is created with devotion and care.
            </p>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-foreground mb-4">
              Visit Us
            </h4>
            <address className="font-body text-sm text-muted-foreground not-italic leading-relaxed">
              <p>By appointment only</p>
              <p className="mt-1">contact@binitaart.com</p>
            </address>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-foreground mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#gallery"
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {year}.{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
