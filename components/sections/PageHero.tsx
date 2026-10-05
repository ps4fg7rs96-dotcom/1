import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";

/** En-tête des pages internes, avec fil d'Ariane. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs: { name: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="container-k relative pb-16 pt-10 sm:pb-20 sm:pt-12">
        <nav aria-label="Breadcrumb" className="mb-10 flex justify-center">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <Icon name="chevronRight" size={14} />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-fg hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-fg">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} reveal={false}>
          {children}
        </SectionHeading>
      </div>
    </section>
  );
}
