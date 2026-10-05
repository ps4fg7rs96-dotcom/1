"use server";

import { validateContact, type ContactState, type ContactValues } from "@/lib/contact";

/**
 * Server Action du formulaire de contact.
 * Si CONTACT_WEBHOOK_URL est défini, le message est transmis en JSON (Formspree, Make, Zapier, Slack…).
 * Sinon il est simplement journalisé côté serveur — à brancher avant la mise en production.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Pot de miel anti-spam : un humain ne remplit jamais ce champ caché.
  if (String(formData.get("company_website") || "")) return { status: "success", errors: {} };

  const values: ContactValues = {
    name: String(formData.get("name") || "").slice(0, 120),
    email: String(formData.get("email") || "").slice(0, 200),
    store: String(formData.get("store") || "").slice(0, 300),
    subject: String(formData.get("subject") || "").slice(0, 80),
    message: String(formData.get("message") || "").slice(0, 5000),
    consent: String(formData.get("consent") || ""),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length) return { status: "error", errors };

  const payload = { ...values, receivedAt: new Date().toISOString(), source: "kinetic-site" };
  const hook = process.env.CONTACT_WEBHOOK_URL;
  try {
    if (hook) {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
    } else {
      console.info("[contact] Nouveau message (aucun webhook configuré) :", { ...payload, message: `${values.message.slice(0, 80)}…` });
    }
  } catch (err) {
    console.error("[contact] Échec d'envoi :", err);
    return { status: "error", errors: {} };
  }
  return { status: "success", errors: {} };
}
