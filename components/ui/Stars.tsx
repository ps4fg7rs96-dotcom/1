import { Icon } from "./Icon";

export function Stars({ count = 5, className = "text-amber-500 dark:text-amber-400", label }: { count?: number; className?: string; label?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="star" filled size={16} />
      ))}
    </span>
  );
}
