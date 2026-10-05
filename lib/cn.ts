/** Concatène des classes conditionnelles (remplace clsx, zéro dépendance). */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
