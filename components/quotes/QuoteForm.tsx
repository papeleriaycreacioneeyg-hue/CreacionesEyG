"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  ArrowLeft,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useQuote } from "@/lib/context/QuoteContext";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  commune?: string;
}

export function QuoteForm() {
  const { items, totalItems } = useQuote();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [commune, setCommune] = useState("");
  const [notes, setNotes] = useState("");
  const [preferredChannel, setPreferredChannel] = useState<"whatsapp" | "email">("whatsapp");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    reference: string;
    name: string;
    email: string;
    phone: string;
    commune: string;
    channel: string;
    itemsCount: number;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Por favor ingresa tu nombre completo (mínimo 2 letras).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Ingresa un correo electrónico válido (ej: nombre@correo.com).";
    }

    const cleanPhone = phone.replace(/[\s+-]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = "Ingresa un número telefónico de contacto válido (mínimo 8 dígitos).";
    }

    if (!commune.trim()) {
      newErrors.commune = "Indica tu comuna o ciudad para calcular tiempos de despacho.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean local processing for prototype (1 second)
    setTimeout(() => {
      const simulatedRef = `COT-PROTOTIPO-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedData({
        reference: simulatedRef,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        commune: commune.trim(),
        channel: preferredChannel === "whatsapp" ? "WhatsApp" : "Correo Electrónico",
        itemsCount: totalItems,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setName("");
    setEmail("");
    setPhone("");
    setCommune("");
    setNotes("");
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200/60 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Prototipo Funcional Verificado
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-plum">
            ¡Simulación de Solicitud Exitosa!
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Referencia de prueba:{" "}
            <strong className="text-plum font-bold">{submittedData.reference}</strong>
          </p>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-2xl bg-secondary/50 border border-purple-100 text-left text-xs text-foreground/80 space-y-2">
          <p className="font-bold text-plum flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Aviso de Prototipo Visual</span>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Esta es una demostración de frontend para revisión de diseño y usabilidad. Los datos
            ingresados se validaron localmente en tu navegador. En la fase posterior se habilitará
            el registro definitivo en base de datos y despacho hacia el taller de Papelería y
            Creaciones E&G.
          </p>
          <div className="pt-2 border-t border-purple-100/60 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-muted-foreground">Cliente: </span>
              <strong className="text-plum">{submittedData.name}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Comuna: </span>
              <strong className="text-plum">{submittedData.commune}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Canal preferido: </span>
              <strong className="text-plum">{submittedData.channel}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Productos: </span>
              <strong className="text-plum">{submittedData.itemsCount} unidades</strong>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/productos"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-primary hover:bg-[#c93d75] shadow-xs transition-colors"
          >
            Volver al catálogo
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-plum bg-secondary hover:bg-rose-100 border border-purple-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Probar otro envío</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Summary of Quoted Items (5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-plum">Resumen del Pedido</h2>
          </div>
          <span className="text-xs font-bold text-primary bg-rose-50 px-2.5 py-1 rounded-full">
            {totalItems} {totalItems === 1 ? "ítem" : "ítems"}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center space-y-3 bg-secondary/30 rounded-2xl border border-dashed border-rose-200">
            <p className="text-xs text-muted-foreground">
              Aún no has seleccionado productos del catálogo.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Explorar catálogo primero</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-secondary/30 border border-rose-100/60 flex items-start justify-between text-xs"
              >
                <div className="space-y-0.5 max-w-[70%]">
                  <p className="font-bold text-plum truncate">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.categoryName}</p>
                  {item.notes && (
                    <p className="text-[10px] italic text-muted-foreground/80 truncate">
                      «{item.notes}»
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary bg-white px-2 py-0.5 rounded-md border border-rose-100 shadow-2xs">
                    x{item.quantity}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">A medida</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-rose-100 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>Respuesta estimada: dentro de 24 horas hábiles.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>Sin costo ni compromiso comercial.</span>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Details Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-plum">Solicitar Presupuesto</h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Completa tus datos de contacto para que nuestro equipo te envíe el detalle de tu
            cotización con precios a medida.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Nombre Completo */}
          <div className="space-y-1.5">
            <label
              htmlFor="client-name"
              className="text-xs font-bold text-plum flex items-center justify-between"
            >
              <span>Nombre y Apellido *</span>
              {errors.name && <span className="text-destructive font-normal">{errors.name}</span>}
            </label>
            <input
              id="client-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Ej: Carolina Morales"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all ${
                errors.name
                  ? "border-destructive bg-destructive/5 ring-1 ring-destructive/20"
                  : "border-rose-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
          </div>

          {/* Email y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="client-email"
                className="text-xs font-bold text-plum flex items-center justify-between"
              >
                <span>Correo Electrónico *</span>
                {errors.email && <span className="text-destructive font-normal">Requerido</span>}
              </label>
              <input
                id="client-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="correo@ejemplo.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all ${
                  errors.email
                    ? "border-destructive bg-destructive/5 ring-1 ring-destructive/20"
                    : "border-rose-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
            </div>

            {/* Teléfono */}
            <div className="space-y-1.5">
              <label
                htmlFor="client-phone"
                className="text-xs font-bold text-plum flex items-center justify-between"
              >
                <span>Teléfono / WhatsApp *</span>
                {errors.phone && <span className="text-destructive font-normal">Requerido</span>}
              </label>
              <input
                id="client-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="+56 9 4867 2300"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all ${
                  errors.phone
                    ? "border-destructive bg-destructive/5 ring-1 ring-destructive/20"
                    : "border-rose-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {errors.phone && <p className="text-[11px] text-destructive">{errors.phone}</p>}
            </div>
          </div>

          {/* Comuna / Ciudad */}
          <div className="space-y-1.5">
            <label
              htmlFor="client-commune"
              className="text-xs font-bold text-plum flex items-center justify-between"
            >
              <span>Comuna o Ciudad de Despacho *</span>
              {errors.commune && (
                <span className="text-destructive font-normal">{errors.commune}</span>
              )}
            </label>
            <input
              id="client-commune"
              type="text"
              value={commune}
              onChange={(e) => {
                setCommune(e.target.value);
                if (errors.commune) setErrors((prev) => ({ ...prev, commune: undefined }));
              }}
              placeholder="Ej: Puente Alto, Santiago, Providencia, Valparaíso..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all ${
                errors.commune
                  ? "border-destructive bg-destructive/5 ring-1 ring-destructive/20"
                  : "border-rose-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
          </div>

          {/* Observaciones Generales */}
          <div className="space-y-1.5">
            <label
              htmlFor="client-notes"
              className="text-xs font-bold text-plum flex items-center justify-between"
            >
              <span>Fecha del evento o notas adicionales</span>
              <span className="text-muted-foreground font-normal text-[11px]">(opcional)</span>
            </label>
            <textarea
              id="client-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Para qué fecha necesitas las creaciones? ¿Hay detalles de diseño que quieras contarnos?"
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Canal Preferido de Respuesta */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-plum block">
              ¿Por qué canal prefieres recibir la cotización? *
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPreferredChannel("whatsapp")}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  preferredChannel === "whatsapp"
                    ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-950 font-bold"
                    : "border-rose-100 bg-white hover:bg-rose-50/50 text-plum font-medium"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-xs">Por WhatsApp</p>
                  <p className="text-[10px] text-muted-foreground font-normal">Respuesta rápida</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPreferredChannel("email")}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  preferredChannel === "email"
                    ? "border-primary bg-rose-50/70 ring-2 ring-primary/20 text-plum font-bold"
                    : "border-rose-100 bg-white hover:bg-rose-50/50 text-plum font-medium"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs">Por Correo</p>
                  <p className="text-[10px] text-muted-foreground font-normal">Detalle en PDF</p>
                </div>
              </button>
            </div>
          </div>

          {/* Privacidad & Tratamiento */}
          <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
            Tus datos de contacto se utilizarán exclusivamente para elaborar y responder tu
            solicitud de presupuesto. No enviamos spam ni compartimos tu información.
          </p>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white bg-primary hover:bg-[#c93d75] disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Procesando cotización...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Solicitud de Cotización</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
