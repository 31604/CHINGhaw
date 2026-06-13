"use client";

import React, { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

/* ── EmailJS credentials ── */
const EMAILJS_SERVICE_ID  = "service_6wrvx6o";
const EMAILJS_TEMPLATE_ID = "template_fbuksqr";
const EMAILJS_PUBLIC_KEY  = "cyKq-RtUiURhBfvNH";

/** Fixed sender email — shown to the user but not editable. */
const SENDER_EMAIL = "myiotproject30@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

/**
 * IoT Support Hub — Report an Issue form.
 * Sends submissions to the configured inbox via EmailJS.
 *
 * EmailJS template variables (must match input name= attributes exactly):
 *   {{title}}   — Issue category
 *   {{name}}    — Affected node ID
 *   {{message}} — Description
 *   {{email}}   — Contact email
 *   {{time}}    — Auto-generated submission timestamp (hidden input)
 */
export default function SupportForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isSending = status === "sending";

  async function sendEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus("success");
      formRef.current.reset();

    } catch (err) {
      console.error("[SupportForm] EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Failed to send your report. Please check your connection and try again.");
    }
  }

  function handleReset() {
    formRef.current?.reset();
    setStatus("idle");
    setErrorMsg("");
  }

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <div role="status" aria-live="polite">
        <p>Report received.</p>
        <p>Our team will respond within one business day.</p>
        <button type="button" onClick={handleReset}>
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={sendEmail} noValidate>

      {/* Issue Category → {{title}} */}
      <div>
        <label htmlFor="title">Issue Category</label>
        <select
          id="title"
          name="title"
          required
          disabled={isSending}
          defaultValue=""
        >
          <option value="" disabled>Select a category…</option>
          <option value="Node / ESP32 Offline">Node / ESP32 Offline</option>
          <option value="Sensor Data Anomaly">Sensor Data Anomaly</option>
          <option value="MQTT Broker Fault">MQTT Broker Fault</option>
          <option value="Alert Not Triggering">Alert Not Triggering</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Your Name → {{name}} */}
      <div>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          required
          disabled={isSending}
        />
      </div>

      {/* Description → {{message}} */}
      <div>
        <label htmlFor="message">Description</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Your Message"
          required
          disabled={isSending}
        />
      </div>

      {/* Contact Email → {{email}} */}
      <div>
        <label htmlFor="email">Contact Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={SENDER_EMAIL}
          readOnly
          aria-readonly="true"
          className="support-form__input--readonly"
        />
      </div>

      {/* Hidden timestamp → {{time}} — captured at component mount */}
      <input type="hidden" name="time" defaultValue={new Date().toLocaleString()} />

      {/* Error message */}
      {status === "error" && errorMsg && (
        <p role="alert" className="support-form__error">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={isSending}>
        {isSending ? "Sending…" : "Submit Report"}
      </button>

    </form>
  );
}
