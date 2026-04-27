import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../config/api";

const CHECKOUT_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
const SERVICE_OPTIONS = [
  {
    key: "domain_renewal",
    labels: { en: "Domain Renewal", it: "Domain Renewal" },
    defaultAmountInRupees: 700,
  },
  {
    key: "new_domain",
    labels: { en: "New Domain", it: "New Domain" },
    defaultAmountInRupees: 1200,
  },
  {
    key: "website_design",
    labels: { en: "Website Design", it: "Website Design" },
    defaultAmountInRupees: 15000,
  },
  {
    key: "seo_service",
    labels: { en: "SEO Service", it: "SEO Service" },
    defaultAmountInRupees: 8000,
  },
  {
    key: "photoshop",
    labels: { en: "Photoshop", it: "Photoshop" },
    defaultAmountInRupees: 2500,
  },
];

const COPY = {
  en: {
    title: "Razorpay Payment",
    subtitle: "You selected India. Complete payment securely using Razorpay Checkout.",
    serviceLabel: "Select Service",
    amountLabel: "Amount (INR)",
    amountPlaceholder: "Enter amount",
    amountHint: "Use Razorpay Test Mode keys first, then switch to Live keys.",
    amountLockedHint: "Amount is auto-set based on selected service.",
    amountValidation: "Please enter a valid amount of at least 1 INR.",
    proceed: "Pay With Razorpay",
    processing: "Opening Checkout...",
    back: "Back To Country Selection",
    paymentSuccess: "Payment verified successfully.",
    paymentCancelled: "Payment window closed.",
    genericError: "Unable to start payment right now. Please try again.",
    verificationFailed: "Payment completed but verification failed. Please contact support.",
    authError: "Please log in again to continue with payment.",
  },
  it: {
    title: "Pagamento Razorpay",
    subtitle: "Hai selezionato India. Completa il pagamento in modo sicuro con Razorpay Checkout.",
    serviceLabel: "Seleziona Servizio",
    amountLabel: "Importo (INR)",
    amountPlaceholder: "Inserisci importo",
    amountHint: "Usa prima le chiavi Test Mode di Razorpay, poi passa alle chiavi Live.",
    amountLockedHint: "L'importo viene impostato automaticamente in base al servizio selezionato.",
    amountValidation: "Inserisci un importo valido di almeno 1 INR.",
    proceed: "Paga Con Razorpay",
    processing: "Apertura Checkout...",
    back: "Torna Alla Scelta Del Paese",
    paymentSuccess: "Pagamento verificato con successo.",
    paymentCancelled: "Finestra di pagamento chiusa.",
    genericError: "Impossibile avviare il pagamento adesso. Riprova.",
    verificationFailed: "Pagamento completato ma verifica non riuscita. Contatta il supporto.",
    authError: "Accedi di nuovo per continuare il pagamento.",
  },
};

const parseTokenPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (normalizedPayload.length % 4)) % 4);
    const decodedPayload = atob(`${normalizedPayload}${padding}`);
    return JSON.parse(decodedPayload);
  } catch (error) {
    return null;
  }
};

const loadRazorpayCheckout = () =>
  new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Browser environment unavailable."));
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${CHECKOUT_SCRIPT_URL}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Razorpay SDK failed to load.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
    document.body.appendChild(script);
  });

const getErrorMessage = (error, fallbackMessage) =>
  String(error?.response?.data?.error || error?.message || fallbackMessage);

export default function RazorpayPayment({ locale = "en" }) {
  const navigate = useNavigate();
  const text = locale === "it" ? COPY.it : COPY.en;
  const countryRoute = locale === "it" ? "/it/country-selection" : "/country-selection";
  const [selectedServiceKey, setSelectedServiceKey] = useState(SERVICE_OPTIONS[0].key);
  const [amountInput, setAmountInput] = useState(String(SERVICE_OPTIONS[0].defaultAmountInRupees));
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedService = useMemo(
    () => SERVICE_OPTIONS.find((service) => service.key === selectedServiceKey) || SERVICE_OPTIONS[0],
    [selectedServiceKey]
  );
  const selectedServiceLabel = selectedService.labels[locale] || selectedService.labels.en;
  const numericAmount = useMemo(() => Number.parseFloat(amountInput), [amountInput]);

  const amountPreview = useMemo(() => {
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return null;
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(numericAmount);
  }, [numericAmount]);

  const handleProceed = async () => {
    setStatusMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage(text.authError);
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount < 1) {
      setErrorMessage(text.amountValidation);
      return;
    }

    const safeAmountInRupees = Math.round(numericAmount * 100) / 100;
    const tokenPayload = parseTokenPayload(token);
    const customerEmail = tokenPayload?.email || "";

    setIsStartingPayment(true);

    try {
      await loadRazorpayCheckout();

      const orderResponse = await axios.post(
        buildApiUrl("/api/payments/razorpay/order"),
        {
          amountInRupees: safeAmountInRupees,
          serviceKey: selectedService.key,
          serviceName: selectedServiceLabel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const keyId = orderResponse.data?.keyId;
      const order = orderResponse.data?.order;

      if (!keyId || !order?.id) {
        throw new Error(text.genericError);
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Asiduo Solutions",
        description: `${selectedServiceLabel} - ${safeAmountInRupees.toFixed(2)} INR`,
        order_id: order.id,
        prefill: {
          email: customerEmail,
        },
        theme: {
          color: "#38bdf8",
        },
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              buildApiUrl("/api/payments/razorpay/verify"),
              {
                orderId: order.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!verifyResponse.data?.verified) {
              throw new Error(text.verificationFailed);
            }

            const paymentStatus = verifyResponse.data?.status ? ` (${verifyResponse.data.status})` : "";
            setStatusMessage(`${text.paymentSuccess}${paymentStatus}`);
            setErrorMessage("");
          } catch (error) {
            setStatusMessage("");
            setErrorMessage(getErrorMessage(error, text.verificationFailed));
          }
        },
        modal: {
          ondismiss: () => {
            setStatusMessage(text.paymentCancelled);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", (response) => {
        const failureReason = response?.error?.description || text.genericError;
        setStatusMessage("");
        setErrorMessage(failureReason);
      });

      razorpayInstance.open();
    } catch (error) {
      setStatusMessage("");
      setErrorMessage(getErrorMessage(error, text.genericError));
    } finally {
      setIsStartingPayment(false);
    }
  };

  return (
    <main className="safe-mobile-padding flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 py-24 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-sky-200/30 bg-slate-900/70 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-10">
        <h1 className="text-3xl font-black text-sky-300 sm:text-4xl">{text.title}</h1>
        <p className="mt-4 text-sm text-slate-200 sm:text-base">{text.subtitle}</p>

        <div className="mt-6 rounded-2xl border border-sky-100/20 bg-slate-950/55 p-4 text-left">
          <label htmlFor="razorpay-service" className="block text-sm font-semibold text-sky-200">
            {text.serviceLabel}
          </label>
          <select
            id="razorpay-service"
            value={selectedServiceKey}
            onChange={(event) => {
              const nextService =
                SERVICE_OPTIONS.find((service) => service.key === event.target.value) || SERVICE_OPTIONS[0];

              setSelectedServiceKey(nextService.key);
              setAmountInput(String(nextService.defaultAmountInRupees));
              setStatusMessage("");
              setErrorMessage("");
            }}
            className="mt-2 w-full rounded-xl border border-sky-100/40 bg-slate-950/80 px-4 py-2.5 text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/40"
          >
            {SERVICE_OPTIONS.map((service) => (
              <option key={service.key} value={service.key} className="bg-slate-900 text-white">
                {service.labels[locale] || service.labels.en}
              </option>
            ))}
          </select>

          <label htmlFor="razorpay-amount" className="mt-4 block text-sm font-semibold text-sky-200">
            {text.amountLabel}
          </label>
          <input
            id="razorpay-amount"
            type="number"
            min="1"
            step="0.01"
            value={amountInput}
            readOnly
            placeholder={text.amountPlaceholder}
            className="mt-2 w-full cursor-not-allowed rounded-xl border border-sky-100/40 bg-slate-950/80 px-4 py-2.5 text-white opacity-85 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/40"
          />
          <p className="mt-2 text-xs text-slate-300">{text.amountHint}</p>
          <p className="mt-1 text-xs text-sky-200/90">{text.amountLockedHint}</p>
          {amountPreview ? <p className="mt-1 text-sm text-sky-200">Payable: {amountPreview}</p> : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleProceed}
            disabled={isStartingPayment}
            className="rounded-full border border-sky-200 bg-sky-500/20 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-sky-500/35 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isStartingPayment ? text.processing : text.proceed}
          </button>

          <button
            type="button"
            onClick={() => navigate(countryRoute)}
            className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {text.back}
          </button>
        </div>

        {statusMessage ? <p className="mt-5 text-sm text-emerald-300">{statusMessage}</p> : null}
        {errorMessage ? <p className="mt-3 text-sm text-red-300">{errorMessage}</p> : null}
      </section>
    </main>
  );
}
