"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Dict } from "@/content";
import { sendContact } from "@/app/actions/contact";
import { validateContact, type ContactErrors, type ContactField, type ContactState, type ContactValues } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const SUBJECT_VALUES = ["presale", "support", "agency", "other"] as const;
const initial: ContactState = { status: "idle", errors: {} };
const ORDER: ContactField[] = ["name", "email", "store", "subject", "message", "consent"];

function readForm(form: HTMLFormElement): ContactValues {
  const fd = new FormData(form);
  return {
    name: String(fd.get("name") || ""),
    email: String(fd.get("email") || ""),
    store: String(fd.get("store") || ""),
    subject: String(fd.get("subject") || ""),
    message: String(fd.get("message") || ""),
    consent: String(fd.get("consent") || ""),
  };
}

export function ContactForm({ t, privacyHref }: { t: Dict["contactPage"]["form"]; privacyHref: string }) {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [subject, setSubject] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  // Pré-sélection du sujet via ?sujet=agence (liens « Programme agences », formule Studio).
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("sujet");
    if (s === "agence") setSubject("agency");
  }, []);

  // Synchronise les erreurs renvoyées par le serveur.
  useEffect(() => {
    if (state.status === "error" && Object.keys(state.errors).length) setErrors(state.errors);
    if (state.status === "success") {
      formRef.current?.reset();
      setSubject("");
      setErrors({});
      setTouched({});
    }
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const shownErrors = ORDER.filter((f) => errors[f]);

  function revalidate(field: ContactField) {
    if (!formRef.current) return;
    const all = validateContact(readForm(formRef.current));
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  }

  function onBlur(field: ContactField) {
    setTouched((p) => ({ ...p, [field]: true }));
    revalidate(field);
  }

  function onChange(field: ContactField) {
    if (touched[field] || errors[field]) revalidate(field);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const all = validateContact(readForm(e.currentTarget));
    if (Object.keys(all).length) {
      e.preventDefault();
      setErrors(all);
      setTouched(Object.fromEntries(ORDER.map((f) => [f, true])));
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const fieldCls = (f: ContactField) =>
    cn(
      "mt-1.5 block w-full rounded-xl border bg-surface px-4 py-3 text-base text-fg shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/15",
      errors[f] ? "border-danger" : "border-border-strong",
    );

  const describedBy = (f: ContactField, hint?: boolean) =>
    [hint ? id(`${f}-hint`) : null, errors[f] ? id(`${f}-error`) : null].filter(Boolean).join(" ") || undefined;

  const errorMsg = (f: ContactField) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
        <Icon name="alert" size={16} className="shrink-0" />
        {t.errors[f]}
      </p>
    ) : null;

  const label = (f: ContactField, text: string, optional?: boolean) => (
    <label htmlFor={id(f)} className="text-sm font-semibold">
      {text}{" "}
      {optional ? (
        <span className="font-normal text-subtle">({t.optional})</span>
      ) : (
        <span className="text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={id("req-note")}>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === "success" && (
          <p className="flex items-start gap-3 rounded-xl bg-success-soft p-4 font-medium text-success">
            <Icon name="check" size={20} strokeWidth={2.5} className="mt-0.5 shrink-0" />
            {t.success}
          </p>
        )}
        {state.status === "error" && !Object.keys(state.errors).length && (
          <p className="flex items-start gap-3 rounded-xl bg-danger-soft p-4 font-medium text-danger">
            <Icon name="alert" size={20} className="mt-0.5 shrink-0" />
            {t.error}
          </p>
        )}
      </div>

      {shownErrors.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-danger/40 bg-danger-soft p-4 text-sm text-danger outline-none">
          <p className="font-semibold">{t.errorSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {shownErrors.map((f) => (
              <li key={f}>
                <a href={`#${id(f)}`} className="underline underline-offset-2">
                  {t.errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p id={id("req-note")} className="text-sm text-muted">
        <span className="text-danger" aria-hidden="true">
          *
        </span>{" "}
        = {t.required}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", t.name)}
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            onBlur={() => onBlur("name")}
            onChange={() => onChange("name")}
            className={fieldCls("name")}
          />
          {errorMsg("name")}
        </div>
        <div>
          {label("email", t.email)}
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            onBlur={() => onBlur("email")}
            onChange={() => onChange("email")}
            className={fieldCls("email")}
          />
          {errorMsg("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("store", t.store, true)}
          <input
            id={id("store")}
            name="store"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            aria-invalid={!!errors.store}
            aria-describedby={describedBy("store")}
            onBlur={() => onBlur("store")}
            onChange={() => onChange("store")}
            className={fieldCls("store")}
          />
          {errorMsg("store")}
        </div>
        <div>
          {label("subject", t.subject)}
          <div className="relative">
            <select
              id={id("subject")}
              name="subject"
              required
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={describedBy("subject")}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                onChange("subject");
              }}
              onBlur={() => onBlur("subject")}
              className={cn(fieldCls("subject"), "appearance-none pr-10")}
            >
              <option value="" disabled>
                —
              </option>
              {t.subjects.map((s, i) => (
                <option key={s} value={SUBJECT_VALUES[i]}>
                  {s}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={18} className="pointer-events-none absolute right-4 top-1/2 mt-[3px] -translate-y-1/2 text-subtle" />
          </div>
          {errorMsg("subject")}
        </div>
      </div>

      <div>
        {label("message", t.message)}
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          aria-required="true"
          minLength={20}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message", true)}
          onBlur={() => onBlur("message")}
          onChange={() => onChange("message")}
          className={cn(fieldCls("message"), "resize-y")}
        />
        <p id={id("message-hint")} className="mt-1.5 text-sm text-subtle">
          {t.messageHint}
        </p>
        {errorMsg("message")}
      </div>

      {/* Pot de miel — masqué aux humains et aux lecteurs d'écran */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            onChange={() => onChange("consent")}
            className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-[var(--primary)]"
          />
          <label htmlFor={id("consent")} className="text-sm leading-relaxed text-muted">
            {t.consent}{" "}
            <Link href={privacyHref} className="font-semibold text-link underline underline-offset-2">
              {t.consentLink}
            </Link>
            .
          </label>
        </div>
        {errorMsg("consent")}
      </div>

      <Button type="submit" size="lg" icon={pending ? undefined : "arrowRight"} disabled={pending} className="w-full sm:w-auto" aria-disabled={pending}>
        {pending ? t.sending : t.submit}
      </Button>
    </form>
  );
}
