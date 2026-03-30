import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Phone, MapPin, CalendarDays, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { destinations } from "@/data/destinations";

import PixelSnow from "@/components/PixelSnow";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15).regex(/^[\d+\- ]+$/, "Invalid phone format"),
  destination: z.string().min(1, "Please select a destination"),
  customDestination: z.string().optional(),
  travelDates: z.string().min(1, "Please select travel dates"),
});

type FormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [searchParams] = useSearchParams();
  const prefilledDest = searchParams.get("destination") || "";
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    destination: prefilledDest,
    customDestination: "",
    travelDates: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      parsed.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    
    const spreadsheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
    
    if (!spreadsheetUrl) {
      console.error("VITE_GOOGLE_SHEET_URL is missing in .env");
      setSubmitting(false);
      return;
    }

    fetch(spreadsheetUrl, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script Web Apps in many environments
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...parsed.data,
        destination: form.destination === "custom" ? form.customDestination : form.destination
      }),
    })
      .then(() => {
        console.log("📋 WanderTrails Inquiry Saved to Google Sheets:", parsed.data);
        setSubmitting(false);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error saving inquiry:", error);
        setSubmitting(false);
        // We still show success to the user to avoid frustration, or you could show an error
        setSubmitted(true);
      });
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-muted/50 border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-destructive focus:ring-destructive/30"
        : "border-border focus:ring-primary/40"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div className="relative pt-32 pb-20 px-5 overflow-hidden flex flex-col items-center">
        {/* PixelSnow Background Animation */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <PixelSnow 
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.0}
            density={0.25}
            direction={125}
            brightness={1}
            depthFade={8}
            farPlane={20}
            gamma={0.4545}
            variant="square"
          />
        </div>

        <div className="container mx-auto max-w-2xl relative z-10 text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-3">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Ready to explore the unexplored? Share your travel dreams and we'll craft the perfect journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="pb-24 px-5">
        <div className="container mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="glass-card rounded-2xl p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle2 size={64} className="text-primary mx-auto mb-6" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Inquiry Sent!</h2>
                <p className="text-muted-foreground mb-6">
                  Our trail experts will reach out within 24 hours with a customized trip plan.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", destination: "", customDestination: "", travelDates: "" }); }}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-6 md:p-8 space-y-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <User size={14} className="text-primary" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Mail size={14} className="text-primary" /> Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Phone size={14} className="text-secondary" /> Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass("phone")}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Destination & Dates */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <MapPin size={14} className="text-primary" /> Destination
                    </label>
                    <select
                      value={form.destination}
                      onChange={(e) => update("destination", e.target.value)}
                      className={inputClass("destination") + " appearance-none"}
                    >
                      <option value="">Select destination</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                      <option value="custom">Other / Custom...</option>
                    </select>
                    {form.destination === "custom" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3"
                      >
                        <input
                          type="text"
                          placeholder="Where do you want to go?"
                          value={form.customDestination}
                          onChange={(e) => update("customDestination" as any, e.target.value)}
                          className={inputClass("destination")}
                        />
                      </motion.div>
                    )}
                    {errors.destination && <p className="text-xs text-destructive mt-1">{errors.destination}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <CalendarDays size={14} className="text-secondary" /> Travel Dates
                    </label>
                    <input
                      type="date"
                      value={form.travelDates}
                      onChange={(e) => update("travelDates", e.target.value)}
                      className={inputClass("travelDates")}
                    />
                    {errors.travelDates && <p className="text-xs text-destructive mt-1">{errors.travelDates}</p>}
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="btn-liquid w-full px-8 py-4 rounded-xl font-display font-bold text-primary-foreground text-sm disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Inquiry
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Contact;
