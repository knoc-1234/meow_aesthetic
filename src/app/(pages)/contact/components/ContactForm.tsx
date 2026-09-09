"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactField {
  id: number;
  field_key: string;
  label: string;
  placeholder: string | null;
  type: "text" | "email" | "phone" | "textarea" | "number" | "select" | "checkbox" | "date";
  options: string[] | { label: string; value: string }[] | null;
  is_required: boolean;
  sort_order: number;
  is_active?: boolean;
}

const SITE_SLUG = "meowaesthetics-1785928248";
const API_KEY = "site_5032008e981bcfd1ebe7cde53e5573677f34e6d07c65c6e0";
const BASE_URL = "https://meow-service-test.flutterclone.com";

const ContactForm = () => {
  const [fields, setFields] = useState<ContactField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFields = async () => {
    setLoadingFields(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${BASE_URL}/api/sites/${SITE_SLUG}/contact-fields`, {
        headers: {
          "X-Site-Api-Key": API_KEY,
          Accept: "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load fields");
      }
      const activeFields = (json.data || [])
        .filter((f: ContactField) => f.is_active !== false)
        .sort((a: ContactField, b: ContactField) => (a.sort_order || 0) - (b.sort_order || 0));
      setFields(activeFields);

      const initial: Record<string, any> = {};
      activeFields.forEach((f: ContactField) => {
        initial[f.field_key] = f.type === "checkbox" && Array.isArray(f.options) ? [] : "";
      });
      setFormData(initial);
    } catch (err: any) {
      console.error("Error loading contact fields:", err);
      setErrorMessage(err.message || "Unable to load contact form fields.");
    } finally {
      setLoadingFields(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (key: string, val: string) => {
    const currentList: string[] = Array.isArray(formData[key]) ? [...formData[key]] : [];
    const index = currentList.indexOf(val);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(val);
    }
    handleInputChange(key, currentList);
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    const errors: Record<string, string> = {};
    fields.forEach((f) => {
      const val = formData[f.field_key];
      if (f.type === "checkbox" && Array.isArray(f.options)) {
        if (f.is_required && (!val || val.length === 0)) {
          errors[f.field_key] = `${f.label} is required.`;
        }
      } else if (f.type === "checkbox") {
        if (f.is_required && !val) {
          errors[f.field_key] = `${f.label} is required.`;
        }
      } else {
        if (f.is_required && (!val || !val.toString().trim())) {
          errors[f.field_key] = `${f.label} is required.`;
        } else if (val && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          errors[f.field_key] = "Please enter a valid email address.";
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please complete all required fields accurately.");
      return;
    }

    setLoading(true);

    try {
      const payloadData: Record<string, any> = {};
      fields.forEach((f) => {
        const val = formData[f.field_key];
        if (Array.isArray(val)) {
          payloadData[f.field_key] = val.join(", ");
        } else if (typeof val === "boolean") {
          payloadData[f.field_key] = val ? "Yes" : "No";
        } else {
          payloadData[f.field_key] = val ?? "";
        }
      });

      const res = await fetch(`${BASE_URL}/api/sites/${SITE_SLUG}/contact-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Site-Api-Key": API_KEY,
        },
        body: JSON.stringify({ data: payloadData }),
      });

      const result = await res.json();

      if (res.status === 200 && result.success) {
        setMessage(result.message || "Thank you for contacting Meow Aesthetics! Your message has been received.");
        const resetData: Record<string, any> = {};
        fields.forEach((f) => {
          resetData[f.field_key] = f.type === "checkbox" && Array.isArray(f.options) ? [] : "";
        });
        setFormData(resetData);
        setFieldErrors({});
      } else if (res.status === 422) {
        const errData = result.data || {};
        const serverErrors: Record<string, string> = {};
        Object.keys(errData).forEach((rawKey) => {
          const cleanKey = rawKey.replace(/^data\./, "");
          const msg = Array.isArray(errData[rawKey]) ? errData[rawKey][0] : errData[rawKey];
          serverErrors[cleanKey] = msg;
        });
        setFieldErrors(serverErrors);
        setErrorMessage(result.message || "Validation failed. Please check the highlighted fields.");
      } else {
        throw new Error(result.message || `Server returned error (${res.status})`);
      }
    } catch (error: any) {
      console.error(error, "error while submitting data");
      setErrorMessage(error.message || "Error while submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingFields) {
    return (
      <div className="bg-white rounded-md p-10 flex flex-col items-center justify-center gap-3 my-10 w-full text-neutral-500">
        <Loader2 className="h-7 w-7 animate-spin text-black" />
        <p className="text-sm">Loading contact form...</p>
      </div>
    );
  }

  return (
    <form
      className="bg-white rounded-md p-4 sm:p-8 flex flex-col gap-5 my-10 w-full shadow-sm"
      onSubmit={formSubmit}
      noValidate
    >
      {message && (
        <div className="flex items-center gap-2.5 p-4 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2.5 p-4 rounded bg-rose-50 text-rose-800 border border-rose-200">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {fields.map((field) => {
        const err = fieldErrors[field.field_key];

        return (
          <div key={field.field_key} className="flex flex-col w-full gap-1.5">
            <label
              htmlFor={`mae_${field.field_key}`}
              className="text-xs uppercase tracking-wider text-neutral-600 font-medium"
            >
              {field.label} {field.is_required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`mae_${field.field_key}`}
                rows={5}
                placeholder={field.placeholder || "How can we help you?"}
                value={formData[field.field_key] || ""}
                onChange={(e) => handleInputChange(field.field_key, e.target.value)}
                className={`border outline-none resize-none py-3 px-3 lg:px-4 rounded transition-colors ${
                  err ? "border-red-500" : "border-neutral-200 focus:border-black"
                }`}
              />
            ) : field.type === "select" ? (
              <select
                id={`mae_${field.field_key}`}
                value={formData[field.field_key] || ""}
                onChange={(e) => handleInputChange(field.field_key, e.target.value)}
                className={`border outline-none py-3 px-3 lg:px-4 rounded bg-white transition-colors ${
                  err ? "border-red-500" : "border-neutral-200 focus:border-black"
                }`}
              >
                <option value="">{field.placeholder || `-- Select ${field.label} --`}</option>
                {Array.isArray(field.options) &&
                  field.options.map((opt, idx) => {
                    const val = typeof opt === "object" ? opt.value || opt.label : opt;
                    const lbl = typeof opt === "object" ? opt.label || opt.value : opt;
                    return (
                      <option key={idx} value={val}>
                        {lbl}
                      </option>
                    );
                  })}
              </select>
            ) : field.type === "checkbox" && Array.isArray(field.options) && field.options.length > 0 ? (
              <div className="flex flex-wrap gap-4 py-1">
                {field.options.map((opt, idx) => {
                  const val = typeof opt === "object" ? opt.value || opt.label : opt;
                  const lbl = typeof opt === "object" ? opt.label || opt.value : opt;
                  const isChecked =
                    Array.isArray(formData[field.field_key]) &&
                    formData[field.field_key].includes(val);

                  return (
                    <label key={idx} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxToggle(field.field_key, val)}
                        className="accent-black h-4 w-4"
                      />
                      <span>{lbl}</span>
                    </label>
                  );
                })}
              </div>
            ) : field.type === "checkbox" ? (
              <label className="flex items-center gap-2 py-1 text-sm text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData[field.field_key]}
                  onChange={(e) => handleInputChange(field.field_key, e.target.checked)}
                  className="accent-black h-4 w-4"
                />
                <span>{field.placeholder || "Yes"}</span>
              </label>
            ) : (
              <input
                id={`mae_${field.field_key}`}
                type={
                  field.type === "email"
                    ? "email"
                    : field.type === "phone"
                    ? "tel"
                    : field.type === "number"
                    ? "number"
                    : field.type === "date"
                    ? "date"
                    : "text"
                }
                placeholder={field.placeholder || undefined}
                value={formData[field.field_key] || ""}
                onChange={(e) => handleInputChange(field.field_key, e.target.value)}
                className={`border outline-none py-3 px-3 lg:px-4 rounded transition-colors ${
                  err ? "border-red-500" : "border-neutral-200 focus:border-black"
                }`}
              />
            )}

            {err && <p className="text-red-500 text-xs px-1">{err}</p>}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={loading}
        className="bg-black hover:bg-neutral-800 transition-colors text-white rounded-full text-base tracking-wider px-8 py-3.5 mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Enquiry"
        )}
      </button>
    </form>
  );
};

export default ContactForm;
