import type { Locale } from "@/lib/site";
import { fr, type Dict } from "./fr";
import { en } from "./en";

const dictionaries: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
