"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternatePath } from "@/lib/routes";
import type { Locale } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function LangSwitch({
  locale,
  label,
  short,
  aria,
  className,
}: {
  locale: Locale;
  label: string;
  short: string;
  aria: string;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const target: Locale = locale === "fr" ? "en" : "fr";
  return (
    <Link
      href={alternatePath(pathname, target)}
      hrefLang={target}
      lang={target}
      title={aria}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-fg transition-colors hover:bg-surface-2",
        className,
      )}
    >
      <Icon name="globe" size={18} />
      <span className="sm:hidden" aria-hidden="true">
        {short}
      </span>
      <span className="max-sm:sr-only">{label}</span>
    </Link>
  );
}
