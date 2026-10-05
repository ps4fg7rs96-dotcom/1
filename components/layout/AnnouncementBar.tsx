import Link from "next/link";
import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";

export function AnnouncementBar({ t, href }: { t: Dict["common"]["announcement"]; href: string }) {
  return (
    <div className="bg-ink-950 text-ink-50">
      <div className="container-k flex min-h-10 items-center justify-center gap-3 py-2 text-center text-[0.82rem] sm:text-sm">
        <span className="hidden rounded-full bg-coral-400 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-ink-950 sm:inline">
          {t.badge}
        </span>
        <p className="text-ink-100">
          <span className="sr-only sm:hidden">{t.badge} : </span>
          {t.text}{" "}
          <Link href={href} className="group inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline">
            {t.cta}
            <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
