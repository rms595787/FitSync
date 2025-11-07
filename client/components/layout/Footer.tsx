export default function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto py-8 text-sm text-foreground/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} FitSync. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          <span className="hidden sm:inline">Performance-first fitness automation.</span>
          <a href="/" className="underline hover:text-foreground">Home</a>
          <span>·</span>
          <a href="/dashboard" className="underline hover:text-foreground">Dashboard</a>
        </p>
      </div>
    </footer>
  );
}
