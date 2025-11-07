type Props = { className?: string };

export default function Logo({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="12" fill="url(#g)"/>
      <path d="M20 36c6 0 10-8 12-12 2 4 6 12 12 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="36" r="3" fill="white"/>
      <circle cx="44" cy="36" r="3" fill="white"/>
    </svg>
  );
}
