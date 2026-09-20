"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { cn, EASE_PREMIUM } from "@/lib/utils";
import { submitEnquiry } from "@/services/enquiry";

const schema = z
  .object({
    name: z.string().trim().min(2, "Please tell us your name"),
    phone: z.string().trim().regex(/^(\+?\d[\d\s-]{7,15})?$/, "Enter a valid phone number"),
    email: z.union([z.literal(""), z.email("Enter a valid email address")]),
    message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
  })
  .refine((v) => v.phone || v.email, { message: "Add a phone number or email so we can reply", path: ["phone"] });

type FormValues = z.infer<typeof schema>;

const field =
  "w-full rounded-2xl border bg-white/70 px-5 py-3.5 text-base text-ink transition-colors duration-300 placeholder:text-muted/60 focus:border-garnet focus:bg-white focus:outline-none";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="block overflow-hidden pt-1.5 text-sm text-garnet">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export function ContactForm() {
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = (values: FormValues) => {
    const { url } = submitEnquiry(values);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    reset();
  };

  return (
    <div className="rounded-3xl border border-line bg-bone p-6 shadow-[0_30px_60px_-40px_rgba(120,28,46,0.35)] sm:p-9">
      <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Prefer to write?</h2>
      <p className="mt-2 text-muted">Send us a note and we&apos;ll pick it up on WhatsApp.</p>

      <AnimatePresence mode="wait" initial={false}>
        {sentUrl ? (
          <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE_PREMIUM }} className="py-10 text-center">
            <CheckCircle2 className="mx-auto size-14 text-garnet" aria-hidden />
            <p className="mt-5 font-display text-2xl font-extrabold text-ink">WhatsApp is opening…</p>
            <p className="mx-auto mt-2 max-w-sm text-muted">Your message is pre-filled — just press send and we&apos;ll get back to you soon.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={sentUrl} external>
                Open WhatsApp again
              </Button>
              <Button variant="ghost" onClick={() => setSentUrl(null)}>
                Send another message
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate exit={{ opacity: 0 }} className="mt-7 space-y-5">
            <Field label="Your name" error={errors.name?.message}>
              <input {...register("name")} autoComplete="name" placeholder="Aarav Sharma" aria-invalid={!!errors.name} className={cn(field, errors.name ? "border-garnet" : "border-line")} />
            </Field>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} className={cn(field, errors.phone ? "border-garnet" : "border-line")} />
              </Field>
              <Field label="Email (optional)" error={errors.email?.message}>
                <input {...register("email")} type="email" autoComplete="email" placeholder="you@email.com" aria-invalid={!!errors.email} className={cn(field, errors.email ? "border-garnet" : "border-line")} />
              </Field>
            </div>
            <Field label="How can we help?" error={errors.message?.message}>
              <textarea {...register("message")} rows={5} placeholder="Tell us what you're looking for — size, colour, room…" aria-invalid={!!errors.message} className={cn(field, "resize-none", errors.message ? "border-garnet" : "border-line")} />
            </Field>
            <Button type="submit" size="lg" arrow disabled={isSubmitting} className="w-full sm:w-auto">
              Send Message
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
