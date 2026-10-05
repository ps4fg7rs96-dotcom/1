import type { Dict } from "@/content";

/** Logos clients — PLACEHOLDERS : remplacez chaque tuile par un vrai logo (SVG monochrome conseillé). */
const shapes = [
  <circle key="c" cx="12" cy="12" r="8" />,
  <rect key="r" x="4" y="4" width="16" height="16" rx="4" />,
  <path key="t" d="M12 4 20 19H4z" />,
  <path key="d" d="M12 3 21 12 12 21 3 12z" />,
  <path key="h" d="M7 4h10l4 8-4 8H7l-4-8z" />,
  <path key="s" d="M4 12a8 8 0 0 1 16 0H4Z" />,
];

export function LogoCloud({ t }: { t: Dict["logos"] }) {
  return (
    <section aria-labelledby="logos-title" className="border-y border-border bg-surface py-10">
      <div className="container-k">
        <h2 id="logos-title" className="text-center font-sans text-sm font-semibold text-muted" style={{ fontStretch: "100%", letterSpacing: 0 }}>
          {t.title}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {shapes.map((shape, i) => (
            <li
              key={i}
              title={t.placeholder}
              className="flex h-14 items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong text-subtle grayscale transition-colors hover:text-fg"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                {shape}
              </svg>
              <span className="text-xs font-semibold tracking-wide">
                {t.placeholder.replace("]", ` ${i + 1}]`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
