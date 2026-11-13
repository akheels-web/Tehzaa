"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormData,
  EVENT_TYPE_OPTIONS,
  BUDGET_RANGES,
  HYDERABAD_LOCALITIES,
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
} from "lucide-react";

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

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopiedRef, setHasCopiedRef] = useState(false);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  const additionalDetailsValue = watch("additionalDetails") || "";

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
    const whatsappText = encodeURIComponent(
      `Hello Tehzaa Celebrations, I just submitted an enquiry on your website. My Reference ID is ${submissionSuccess}. Could we discuss our celebration details?`
    );
    const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-ivory-light border border-gold/30 rounded-2xl p-8 sm:p-10 md:p-12 shadow-royale text-charcoal"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full border border-emerald-deep/30 bg-emerald-deep/5 flex items-center justify-center text-emerald-deep mb-6">
            <CheckCircle2 aria-hidden="true" className="w-7 h-7 stroke-[1.5]" />
          </div>

          <span className="editorial-kicker mb-2">
            Enquiry Confirmed • Hyderabad Concierge
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal mb-3">
            Warmest Thanks — Your Consultation is{" "}
            <span className="font-medium text-burgundy">Reserved</span>
          </h3>

          <p className="text-sm text-taupe-dark max-w-lg mb-8 leading-relaxed">
            Your celebration vision has been received by our senior curation desk in Jubilee Hills. A dedicated planner will review your traditions and venue preferences and connect with you within two business hours.
          </p>

          {/* Reference ID Card */}
          <div className="w-full max-w-md bg-ivory/70 border border-gold/25 rounded-xl p-6 mb-8 flex flex-col items-center">
            <span className="text-xs text-taupe-dark font-medium mb-2">
              Booking Reference Code
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-semibold tracking-wider text-charcoal tabular-nums">
                {submissionSuccess}
              </span>
              <button
                type="button"
                onClick={() => handleCopyReference(submissionSuccess)}
                aria-label={hasCopiedRef ? "Reference code copied" : "Copy reference code"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/35 bg-ivory-light hover:bg-gold hover:text-ivory-light text-xs text-gold-dark transition-colors cursor-pointer"
                title="Copy reference code"
              >
                {hasCopiedRef ? (
                  <>
                    <Check aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    <span className="text-xs font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    <span className="text-xs font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-taupe-dark mt-2.5">
              Please mention this reference when speaking with our concierge.
            </p>
          </div>

          {/* Fast-Track Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full py-3 px-5 rounded-lg bg-emerald-deep hover:bg-emerald-dark text-ivory-light text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              <span>WhatsApp Desk</span>
            </a>

            <a
              href="tel:+919876543210"
              className="flex-1 w-full py-3 px-5 rounded-lg border border-gold/40 bg-ivory-light hover:border-burgundy hover:text-burgundy text-charcoal text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
              <span>Call Concierge</span>
            </a>
          </div>

          <button
            type="button"
            onClick={resetFormState}
            className="inline-flex items-center gap-1.5 text-xs text-taupe-dark hover:text-burgundy transition-colors pt-2 border-b border-transparent hover:border-burgundy/40 pb-0.5 cursor-pointer"
          >
            <RotateCcw aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            <span>Submit another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  const inputBaseClass =
    "w-full px-4 py-3 rounded-lg bg-white/80 border text-charcoal text-sm placeholder:text-taupe-dark/60 focus:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-gold/50 transition-colors";
  const inputNormalClass = "border-gold/25 focus:border-gold";
  const inputErrorClass = "border-burgundy/70 focus:border-burgundy focus-visible:ring-burgundy/40";
  const labelBaseClass =
    "block text-xs text-taupe-dark font-medium mb-2";

  // STANDARD FORM VIEW
  return (
    <div className="bg-ivory-light border border-gold/25 rounded-2xl p-7 sm:p-10 md:p-12 shadow-royale">
      {/* Header inside card */}
      <div className="pb-7 mb-8 border-b border-gold/20">
        <span className="editorial-kicker block mb-2">
          Private Consultation • Hyderabad Atelier
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight">
          Reserve Your <span className="font-medium text-burgundy">Consultation</span>
        </h2>
        <p className="text-sm text-taupe-dark mt-2.5 leading-relaxed">
          Whether planning a Telugu Muhurtham, a vibrant Sangeet &amp; Baraat, a traditional Hyderabadi Nikkah, or an executive summit, share your vision below for a bespoke proposal.
        </p>
      </div>

      {/* Focusable Client Validation Error Summary */}
      {showErrorSummary && errorEntries.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="form-error-summary-title"
          className="mb-7 p-4 sm:p-5 rounded-xl bg-burgundy/5 border border-burgundy/35 text-burgundy-dark space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
        >
          <div className="flex items-center gap-2">
            <AlertCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-burgundy shrink-0" />
            <h3 id="form-error-summary-title" className="text-xs font-semibold text-burgundy-dark">
              Please review the highlighted fields before submitting ({errorEntries.length})
            </h3>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            {errorEntries.map(([field, err]) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  className="underline underline-offset-2 hover:text-burgundy font-medium"
                >
                  {FIELD_LABELS[field] || field}: {(err as { message?: string })?.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Server/Network Error alert fallback */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-7 p-4 rounded-xl bg-burgundy/5 border border-burgundy/30 text-burgundy-dark text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-burgundy shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-deep text-ivory-light text-xs font-medium flex items-center gap-1.5"
            >
              <MessageCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              WhatsApp
            </a>
            <a
              href="tel:+919876543210"
              className="px-3 py-1.5 rounded-lg border border-burgundy/40 text-burgundy-dark text-xs font-medium"
            >
              Call Directly
            </a>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
        {/* Anti-spam Honeypot field (hidden from genuine users) */}
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

        {/* Row 1: Full Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className={labelBaseClass}>
              Full Name <span className="text-burgundy">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Ananya Reddy / Arjun Mehta"
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="mobile" className={labelBaseClass}>
              Mobile Number <span className="text-burgundy">*</span>
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.mobile.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email & Event Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelBaseClass}>
              Email Address{" "}
              <span className="font-normal text-taupe-dark">(Optional)</span>
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="eventType" className={labelBaseClass}>
              Celebration Type <span className="text-burgundy">*</span>
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
              <option value="">Select Celebration Type</option>
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventType.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Event Date & Hyderabad Venue Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="eventDate" className={labelBaseClass}>
              Preferred Date{" "}
              <span className="font-normal text-taupe-dark">(Optional)</span>
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventDate.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="eventLocation" className={labelBaseClass}>
              Hyderabad Area or Venue <span className="text-burgundy">*</span>
            </label>
            <input
              id="eventLocation"
              type="text"
              list="hyderabad-venues-list"
              placeholder="e.g. Jubilee Hills, Gandipet, Falaknuma"
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventLocation.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Expected Guests & Budget Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="expectedGuests" className={labelBaseClass}>
              Expected Guests{" "}
              <span className="font-normal text-taupe-dark">(Optional)</span>
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
                className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
              >
                <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.expectedGuests.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="budgetRange" className={labelBaseClass}>
              Estimated Budget{" "}
              <span className="font-normal text-taupe-dark">(Optional)</span>
            </label>
            <select
              id="budgetRange"
              disabled={isSubmitting}
              {...register("budgetRange")}
              className={`${inputBaseClass} ${inputNormalClass}`}
            >
              <option value="">Select Target Budget</option>
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Additional Details */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor="additionalDetails" className="block text-xs text-taupe-dark font-medium">
              Traditions, Culinary Tastes &amp; Vision{" "}
              <span className="font-normal text-taupe-dark">(Optional)</span>
            </label>
            <span className="text-xs text-taupe-dark tabular-nums">
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
            placeholder="Share your ceremony details—Telugu Muhurtham mandapam, Sangeet & Phoolon ki Chadar, Nikkah floral arch, Telugu Vindhu Bhojanam, Hyderabadi Dum cuisine, or pure vegetarian / Jain kitchen needs..."
            {...register("additionalDetails")}
            className={`${inputBaseClass} ${
              errors.additionalDetails ? inputErrorClass : inputNormalClass
            } leading-relaxed`}
          />
          {errors.additionalDetails && (
            <p
              id="additionalDetails-error"
              role="alert"
              className="mt-1.5 text-xs text-burgundy flex items-center gap-1"
            >
              <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.additionalDetails.message}</span>
            </p>
          )}
        </div>

        {/* Security & Privacy Assurance */}
        <div className="flex items-center gap-3 text-xs text-taupe-dark pt-3 border-t border-gold/15">
          <ShieldCheck aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 stroke-[1.5]" />
          <span>
            Complete discretion assured. Your family contact details and guest plans are never shared externally.
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-lg bg-burgundy hover:bg-burgundy-dark text-ivory-light font-medium text-xs transition-[background-color,opacity] duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="w-4 h-4 stroke-[1.5] animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Enquiry to Concierge</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
