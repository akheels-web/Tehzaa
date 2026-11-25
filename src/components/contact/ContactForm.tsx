"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormData,
  EVENT_TYPES,
  EVENT_TYPE_OPTIONS,
  BUDGET_RANGES,
  HYDERABAD_LOCALITIES,
  EventType,
} from "@/lib/validation";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import type { ZodTypeAny } from "zod";
import { CONTACT_GROUPS, groupProgress } from "@/lib/landing/formProgress";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { STUDIO_PHONE_TEL, whatsappHref } from "@/lib/contact";
import { ThreadProgress } from "@/components/inner/ThreadProgress";

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  mobile: "Mobile Number",
  email: "Email Address",
  eventType: "Celebration Type",
  eventDate: "Preferred Date",
  eventLocation: "Hyderabad Area or Venue",
  expectedGuests: "Expected Guests",
  budgetRange: "Estimated Budget",
  additionalDetails: "Traditions, Culinary Tastes & Vision",
};

function ContactParamsSync({
  onPrefill,
}: {
  onPrefill: (eventType?: EventType, brief?: string) => void;
}) {
  const searchParams = useSearchParams();
  const paramEvent = searchParams.get("eventType");
  const paramBrief = searchParams.get("brief");

  useEffect(() => {
    const validEvent =
      paramEvent && (EVENT_TYPES as readonly string[]).includes(paramEvent)
        ? (paramEvent as EventType)
        : undefined;
    const validBrief =
      paramBrief && paramBrief.trim().length > 0
        ? paramBrief.trim().slice(0, 2000)
        : undefined;

    if (validEvent || validBrief) {
      onPrefill(validEvent, validBrief);
    }
  }, [paramEvent, paramBrief, onPrefill]);

  return null;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopiedRef, setHasCopiedRef] = useState(false);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [prefilledNotice, setPrefilledNotice] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      eventType: undefined,
      eventDate: "",
      eventLocation: "",
      expectedGuests: "",
      budgetRange: "",
      additionalDetails: "",
      honeypot: "",
    },
  });

  const handlePrefill = React.useCallback(
    (eventType?: EventType, brief?: string) => {
      if (eventType) {
        setValue("eventType", eventType, { shouldValidate: false });
      }
      if (brief) {
        setValue("additionalDetails", brief, { shouldValidate: false });
      }
      setPrefilledNotice(true);
    },
    [setValue]
  );

  const additionalDetailsValue = watch("additionalDetails") || "";

  // Gold-thread progress: a group ties when its fields are valid. Besides react-hook-form's
  // (on-blur) errors, each filled field is checked live against its own schema rule, so a
  // half-typed phone number doesn't tie "About you" early.
  const motionAllowed = useMotionAllowed();
  const formValues = watch() as Record<string, unknown>;
  const fieldShape = contactFormSchema.shape as Record<string, ZodTypeAny>;
  const liveErrors: Record<string, unknown> = { ...errors };
  for (const g of CONTACT_GROUPS) {
    for (const f of [...g.required, ...g.optional]) {
      if (fieldShape[f] && !fieldShape[f].safeParse(formValues[f]).success) liveErrors[f] = liveErrors[f] ?? { message: "invalid" };
    }
  }
  const progress = groupProgress(formValues, liveErrors, CONTACT_GROUPS);

  const errorEntries = Object.entries(errors).filter(
    ([key, val]) => key !== "honeypot" && val && typeof val.message === "string"
  );

  const onSubmit = async (data: ContactFormData) => {
    setShowErrorSummary(false);
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit enquiry at this time.");
      }

      setSubmissionSuccess(result.referenceId || "TEH-2026-CONFIRMED");
      reset();
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected network error occurred. Please contact our concierge directly.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (_fieldErrors: FieldErrors<ContactFormData>) => {
    setShowErrorSummary(true);
    requestAnimationFrame(() => {
      errorSummaryRef.current?.focus();
    });
  };

  const handleCopyReference = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setHasCopiedRef(true);
    setTimeout(() => setHasCopiedRef(false), 2500);
  };

  const resetFormState = () => {
    setSubmissionSuccess(null);
    setErrorMessage(null);
    setShowErrorSummary(false);
    reset();
  };

  // SUCCESS STATE VIEW
  if (submissionSuccess) {
    const whatsappUrl = whatsappHref(
      `Hello Tehzaa Celebrations, I just submitted an enquiry on your website. My Reference ID is ${submissionSuccess}. Could we discuss our celebration details?`
    );

    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white border border-brass/50 p-8 sm:p-10 md:p-12 shadow-ruby outline outline-1 outline-offset-4 outline-brass/30 text-ink"
      >
        <div className="flex flex-col items-center text-center">
          {/* Wax seal stamped onto the dawat */}
          <motion.div
            aria-hidden="true"
            initial={motionAllowed ? { scale: 1.4, rotate: -8, opacity: 0 } : false}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#D9B26A] text-center shadow-[0_8px_18px_rgba(40,10,10,0.35)]"
            style={{ background: "radial-gradient(circle at 35% 35%, #E7C27D, #B08A4A 60%, #8A6A34)" }}
          >
            <CheckCircle2 className="h-6 w-6 stroke-[1.5] text-ruby-dark" />
            <span className="mt-1 font-display text-sm italic leading-tight text-ruby-dark">
              Dawat
              <br />
              received
            </span>
          </motion.div>

          <span className="editorial-kicker block mb-2">
            Shukriya — Got your note
          </span>

          <h3 className="display-section text-ink mb-3">
            Your Chat Slot is{" "}
            <span className="editorial-italic">Locked In</span>
          </h3>

          <p className="text-sm text-ink-muted max-w-lg mb-8 leading-relaxed">
            Our Jubilee Hills crew has received everything safely! Somebody from our senior team will WhatsApp or ring you back shortly with ideas and venue dates.
          </p>

          {/* Reference ID Plinth */}
          <div className="w-full max-w-md bg-marble border border-brass/40 p-6 mb-8 flex flex-col items-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle mb-2">
              Your Booking Reference
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-semibold tracking-wider text-ink tabular-nums">
                {submissionSuccess}
              </span>
              <button
                type="button"
                onClick={() => handleCopyReference(submissionSuccess)}
                aria-label={hasCopiedRef ? "Reference code copied" : "Copy reference code"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brass/40 bg-white hover:bg-ruby hover:text-marble hover:border-ruby text-xs text-ink transition-colors cursor-pointer"
                title="Copy reference code"
              >
                {hasCopiedRef ? (
                  <>
                    <Check aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span className="text-xs font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span className="text-xs font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-ink-subtle mt-2.5">
              Drop this code on WhatsApp if you want faster edits!
            </p>
          </div>

          {/* Fast-Track Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-dark flex-1 w-full"
            >
              <MessageCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              <span>Ping on WhatsApp</span>
            </a>

            <a
              href={`tel:${STUDIO_PHONE_TEL}`}
              className="btn-editorial-outline flex-1 w-full"
            >
              <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark" />
              <span>Call Us Directly</span>
            </a>
          </div>

          <button
            type="button"
            onClick={resetFormState}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-subtle hover:text-ink transition-colors pt-2 border-b border-transparent hover:border-brass pb-0.5 cursor-pointer"
          >
            <RotateCcw aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Send another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  const inputBaseClass =
    "w-full px-4 py-3 bg-marble/60 border text-ink text-sm placeholder:text-ink-subtle/60 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 transition-colors";
  const inputNormalClass = "border-brass/40 focus:border-brass";
  const inputErrorClass = "border-garnet focus:border-garnet-dark focus-visible:ring-garnet/30";
  const labelBaseClass =
    "block text-xs font-semibold tracking-[0.04em] text-ink mb-2";

  // STANDARD SILK ARCHITECTURAL FORM VIEW
  return (
    <div className="bg-white border border-brass/50 p-7 sm:p-10 md:p-12 shadow-ruby outline outline-1 outline-offset-4 outline-brass/30">
      <Suspense fallback={null}>
        <ContactParamsSync onPrefill={handlePrefill} />
      </Suspense>

      {/* Header inside Silk Frame */}
      <div className="pb-7 mb-8 border-b border-brass/30">
        <span className="editorial-kicker block mb-2">
          Chai pe charcha — tell us your story
        </span>
        <h2 className="display-section text-ink">
          Drop Us a Quick{" "}
          <span className="editorial-italic">Event Brief</span>
        </h2>
        <p className="text-sm text-ink-muted mt-2.5 leading-relaxed">
          Planning a Telugu Pelli, Muslim Nikkah &amp; Walima, Baraat, house function, or tech summit? Just drop basic details — nothing needs to be finalized yet!
        </p>
      </div>

      <ThreadProgress groups={CONTACT_GROUPS} complete={progress} />

      {/* Dismissible Pre-Filled Brief Notice */}
      {prefilledNotice && (
        <div
          role="status"
          className="mb-7 p-4 bg-marble-warm border border-brass/30 border-l-2 border-l-ruby text-ink text-xs flex items-center justify-between gap-3"
        >
          <span>
            Awesome — your chosen dishes or decor look got pre-loaded below! Edit anything you want before hitting send.
          </span>
          <button
            type="button"
            onClick={() => setPrefilledNotice(false)}
            aria-label="Dismiss notice"
            className="p-1 hover:bg-brass/20 cursor-pointer shrink-0"
          >
            <X aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      )}

      {/* Client Validation Summary */}
      {showErrorSummary && errorEntries.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="form-error-summary-title"
          className="mb-7 p-4 sm:p-5 bg-garnet/5 border border-garnet/35 text-garnet-dark space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garnet"
        >
          <div className="flex items-center gap-2">
            <AlertCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-garnet shrink-0" />
            <h3 id="form-error-summary-title" className="text-xs font-semibold text-garnet-dark">
              Quick check — please fill or fix these highlighted fields ({errorEntries.length})
            </h3>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            {errorEntries.map(([field, err]) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  className="underline underline-offset-2 hover:text-ink font-medium"
                >
                  {FIELD_LABELS[field] || field}: {(err as { message?: string })?.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Server Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-7 p-4 bg-garnet/5 border border-garnet/35 text-garnet-dark text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-garnet shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappHref("Hello Tehzaa Celebrations!")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-ruby text-marble text-xs font-medium flex items-center gap-1.5"
            >
              <MessageCircle aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
              WhatsApp
            </a>
            <a
              href={`tel:${STUDIO_PHONE_TEL}`}
              className="px-3.5 py-2 border border-brass/40 bg-marble text-ink text-xs font-medium"
            >
              Call Directly
            </a>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
        <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="hp_field">Do not fill this</label>
          <input
            id="hp_field"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className={labelBaseClass}>
              Your Name <span className="text-garnet">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Ananya Reddy / Zeeshan Ali"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
              className={`${inputBaseClass} ${
                errors.fullName ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.fullName && (
              <p
                id="fullName-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="mobile" className={labelBaseClass}>
              WhatsApp / Mobile Number <span className="text-garnet">*</span>
            </label>
            <input
              id="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="e.g. 98765 43210"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              {...register("mobile")}
              className={`${inputBaseClass} ${
                errors.mobile ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.mobile && (
              <p
                id="mobile-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.mobile.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelBaseClass}>
              Email{" "}
              <span className="font-normal text-ink-subtle">(Optional)</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. family@example.com"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className={`${inputBaseClass} ${
                errors.email ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="eventType" className={labelBaseClass}>
              What Are We Celebrating? <span className="text-garnet">*</span>
            </label>
            <select
              id="eventType"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.eventType)}
              aria-describedby={errors.eventType ? "eventType-error" : undefined}
              {...register("eventType")}
              className={`${inputBaseClass} ${
                errors.eventType ? inputErrorClass : inputNormalClass
              }`}
            >
              <option value="">Pick Celebration Type</option>
              {EVENT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <p
                id="eventType-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventType.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="eventDate" className={labelBaseClass}>
              Rough Event Date{" "}
              <span className="font-normal text-ink-subtle">(Optional)</span>
            </label>
            <input
              id="eventDate"
              type="date"
              disabled={isSubmitting}
              min={minDate}
              aria-invalid={Boolean(errors.eventDate)}
              aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
              {...register("eventDate")}
              className={`${inputBaseClass} ${
                errors.eventDate ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.eventDate && (
              <p
                id="eventDate-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventDate.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="eventLocation" className={labelBaseClass}>
              Hyderabad Area or Venue <span className="text-garnet">*</span>
            </label>
            <input
              id="eventLocation"
              type="text"
              list="hyderabad-venues-list"
              placeholder="e.g. Chowmahalla, Jubilee Hills, Gandipet"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.eventLocation)}
              aria-describedby={
                errors.eventLocation ? "eventLocation-error" : undefined
              }
              {...register("eventLocation")}
              className={`${inputBaseClass} ${
                errors.eventLocation ? inputErrorClass : inputNormalClass
              }`}
            />
            <datalist id="hyderabad-venues-list">
              {HYDERABAD_LOCALITIES.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
            {errors.eventLocation && (
              <p
                id="eventLocation-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventLocation.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="expectedGuests" className={labelBaseClass}>
              Rough Guest Count{" "}
              <span className="font-normal text-ink-subtle">(Optional)</span>
            </label>
            <input
              id="expectedGuests"
              type="number"
              inputMode="numeric"
              min="1"
              max="50000"
              placeholder="e.g. 350"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.expectedGuests)}
              aria-describedby={
                errors.expectedGuests ? "expectedGuests-error" : undefined
              }
              {...register("expectedGuests")}
              className={`${inputBaseClass} ${
                errors.expectedGuests ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.expectedGuests && (
              <p
                id="expectedGuests-error"
                role="alert"
                className="mt-1.5 text-xs text-garnet flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.expectedGuests.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="budgetRange" className={labelBaseClass}>
              Ballpark Budget{" "}
              <span className="font-normal text-ink-subtle">(Optional)</span>
            </label>
            <select
              id="budgetRange"
              disabled={isSubmitting}
              {...register("budgetRange")}
              className={`${inputBaseClass} ${inputNormalClass}`}
            >
              <option value="">Select Budget Idea</option>
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5 */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor="additionalDetails" className="block text-xs font-semibold tracking-[0.04em] text-ink">
              Tell Us Your Vibe, Food Must-Haves or Decor Ideas{" "}
              <span className="font-normal text-ink-subtle">(Optional)</span>
            </label>
            <span className="text-xs text-ink-subtle tabular-nums">
              {additionalDetailsValue.length} / 2000
            </span>
          </div>
          <textarea
            id="additionalDetails"
            rows={4}
            maxLength={2000}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.additionalDetails)}
            aria-describedby={
              errors.additionalDetails ? "additionalDetails-error" : undefined
            }
            placeholder="e.g. Need a morning Telugu Pelli Pandiri + evening Walima with Mutton Dum Biryani, Sufiyani & bilkul alag Pure Veg Jain section..."
            {...register("additionalDetails")}
            className={`${inputBaseClass} ${
              errors.additionalDetails ? inputErrorClass : inputNormalClass
            } leading-relaxed`}
          />
          {errors.additionalDetails && (
            <p
              id="additionalDetails-error"
              role="alert"
              className="mt-1.5 text-xs text-garnet flex items-center gap-1"
            >
              <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.additionalDetails.message}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-subtle pt-4 border-t border-brass/30">
          <ShieldCheck aria-hidden="true" className="w-4 h-4 text-brass-dark shrink-0 stroke-[1.5]" />
          <span>
            Zero spam, zero shared numbers — stays strictly between your family and our Jubilee Hills studio.
          </span>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-editorial-dark w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="w-4 h-4 stroke-[1.5] animate-spin" />
                <span>Sending to Studio...</span>
              </>
            ) : (
              <>
                <span>Send Event Brief</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
