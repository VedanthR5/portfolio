import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import emailjs from "@emailjs/browser";

import { SectionWrapper } from "../hoc";
import { profile } from "../constants";
import ResumeLink from "./ResumeLink";

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const fieldClass =
  "rounded-xl border border-white/10 bg-[#080a1a] px-4 py-3 text-[15px] text-white outline-hidden transition-colors duration-200 placeholder:text-[#77728f] focus:border-[#c9b8ff]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b8ff]";

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter an email address I can reply to.";
    }
    if (form.message.trim().length < 10) {
      newErrors.message = "Write at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot !== "") return;

    const validationErrors = validate();
    const invalid = ["name", "email", "message"].filter((field) => validationErrors[field]);
    if (invalid.length > 0) {
      setErrors(validationErrors);
      // Move to the first field that needs fixing; its message is read with it.
      document.getElementById(invalid[0])?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    setIsSuccess(false);
    setIsError(false);

    emailjs
      .send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: form.name,
          to_name: "Vedanth Ramanathan",
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        emailConfig.publicKey
      )
      .then(
        () => {
          setLoading(false);
          setIsSuccess(true);
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setIsError(true);
          console.error("EmailJS error:", error.status, error.text);
        }
      );
  };

  const enter = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 };

  return (
    <div className="contact-grid">
      <div className="contact-intro">
        <h2 className="section-title">Contact</h2>
        <p>Email reaches me fastest. The form sends to the same inbox.</p>
        <ul className="contact-channels">
          <li>
            <span>Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              in/vedanthramanathan<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              VedanthR5<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <span>Résumé</span>
            <ResumeLink />
          </li>
        </ul>
      </div>

      <div className="contact-form-wrap">
        <AnimatePresence mode="wait" initial={false}>
          {isSuccess ? (
            <motion.div
              key="thanks"
              role="status"
              initial={enter}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="contact-thanks"
            >
              <h3>Message sent.</h3>
              <p>Thanks for writing. I&apos;ll reply to the address you gave.</p>
              <button type="button" className="contact-secondary" onClick={() => setIsSuccess(false)}>
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              aria-label="Contact form"
              noValidate
              initial={false}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                name="bot-field"
                aria-hidden="true"
                tabIndex={-1}
                className="hidden"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
              <label className="contact-field">
                <span>Name</span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={loading}
                  className={fieldClass}
                />
                {errors.name && (
                  <span id="name-error" className="contact-error">
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="contact-field">
                <span>Email</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={loading}
                  className={fieldClass}
                />
                {errors.email && (
                  <span id="email-error" className="contact-error">
                    {errors.email}
                  </span>
                )}
              </label>
              <label className="contact-field">
                <span>Message</span>
                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  disabled={loading}
                  className={`${fieldClass} resize-y`}
                />
                {errors.message && (
                  <span id="message-error" className="contact-error">
                    {errors.message}
                  </span>
                )}
              </label>

              <p role="alert" className="sr-only">
                {Object.values(errors).filter(Boolean).length > 0 &&
                  `Check the form: ${Object.values(errors).filter(Boolean).join(" ")}`}
              </p>

              <button type="submit" disabled={loading} className="contact-submit">
                {loading ? "Sending…" : "Send message"}
              </button>

              {isError && (
                <p role="alert" className="contact-error">
                  The message didn&apos;t send. Try again, or email{" "}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WrappedContact = SectionWrapper(Contact, "contact");
WrappedContact.displayName = "Contact";

export default WrappedContact;
