import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Benefits({ t }: { t: Dict["benefits"] }) {
  return (
    <Section labelledBy="benefits-title">
      <SectionHeading id="benefits-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group relative rounded-2xl border border-border bg-surface p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-link transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-fg">
              <Icon name={item.icon} size={24} />
            </span>
            <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
