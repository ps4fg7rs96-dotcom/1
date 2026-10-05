/** Validation partagée client / serveur du formulaire de contact (zéro dépendance). */
export type ContactField = "name" | "email" | "store" | "subject" | "message" | "consent";
export type ContactErrors = Partial<Record<ContactField, true>>;
export type ContactValues = Record<ContactField, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = true;
  if (!EMAIL.test(v.email.trim())) e.email = true;
  if (v.store.trim()) {
    try {
      const u = new URL(v.store.trim().startsWith("http") ? v.store.trim() : `https://${v.store.trim()}`);
      if (!u.hostname.includes(".")) e.store = true;
    } catch {
      e.store = true;
    }
  }
  if (!v.subject) e.subject = true;
  if (v.message.trim().length < 20) e.message = true;
  if (v.consent !== "on") e.consent = true;
  return e;
}

export type ContactState = { status: "idle" | "success" | "error"; errors: ContactErrors };
