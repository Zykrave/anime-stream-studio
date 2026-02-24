const Footer = () => (
  <footer className="border-t border-border/30 mt-10 pb-20 md:pb-6">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xl font-display font-bold neon-text text-primary">ANIMEX</span>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Help</span>
          <span>Contact</span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 ANIMEX. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
