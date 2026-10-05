import { cn } from "@/lib/cn";

/** Pictogramme Kinetic : carré arrondi bleu, K blanc cassé, lignes de vitesse corail. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="64" height="64" rx="13.5" fill="#2B37DE" />
      <rect x="19.6" y="14.9" width="8.4" height="34.9" rx="1.6" fill="#F1EFEA" />
      <path d="M28 27.8 42.4 14.9h9.7L35.7 32.3l16.4 17.5h-9.7L28 36.8z" fill="#F1EFEA" />
      <g fill="#EC7454">
        <rect x="6.7" y="23" width="8.9" height="3.8" rx="1.9" />
        <rect x="4.2" y="30.4" width="11.4" height="3.8" rx="1.9" />
        <rect x="6.7" y="37.8" width="8.9" height="3.8" rx="1.9" />
      </g>
    </svg>
  );
}

export function Logo({ className, tagline = false, taglineText = "Thème Shopify" }: { className?: string; tagline?: boolean; taglineText?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.32rem] font-extrabold tracking-[-0.01em] font-wide">KINETIC</span>
        {tagline && (
          <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted">{taglineText}</span>
        )}
      </span>
    </span>
  );
}
