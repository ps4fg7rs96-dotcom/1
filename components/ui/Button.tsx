import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-kinetic)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg shadow-glow hover:bg-primary-hover",
  secondary: "bg-surface text-fg ring-1 ring-inset ring-border-strong hover:ring-fg/40 hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2",
  inverse: "bg-ink-50 text-ink-950 hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; icon?: IconName; children: ReactNode; className?: string };

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

function Inner({ icon, children }: { icon?: IconName; children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5 motion-reduce:transform-none"
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  icon,
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant,
  size,
  icon,
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
