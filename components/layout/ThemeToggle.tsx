"use client";

import { Icon } from "@/components/ui/Icon";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("kinetic-theme", next);
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#121214" : "#FBFAF7");
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-surface-2"
    >
      <Icon name="moon" className="dark:hidden" />
      <Icon name="sun" className="hidden dark:block" />
    </button>
  );
}
