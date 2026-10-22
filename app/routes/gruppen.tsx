"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { PhoneCall, ArrowLeft, Share2, Check } from "lucide-react"
import PageLoader from "~/components/PageLoader"

/** Esta página se comparte en Facebook, así que lleva sus propias og:* para que la
 *  tarjeta salga con título, texto y foto en vez de un enlace pelado. */
const TITEL = "Gruppenangebote 2026 | Cantina Tex-Mex"
const BESCHREIBUNG =
  "Weihnachtsessen und Gruppenmenüs in der Cantina Tex-Mex und im Ushuaia in Buchs: Fajitas à discrétion, Quesadilla Festival und das Tex-Mex Menü."
const SEITEN_URL = "https://cantinatexmex.ch/gruppen"
const TEILEN_BILD = "https://cantinatexmex.ch/gruppen-banner.jpg"

export const meta: MetaFunction = () => [
  { title: TITEL },
  { name: "description", content: BESCHREIBUNG },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "Gruppenangebote 2026 – Cantina Tex-Mex" },
  { property: "og:description", content: BESCHREIBUNG },
  { property: "og:url", content: SEITEN_URL },
  { property: "og:image", content: TEILEN_BILD },
  { property: "og:locale", content: "de_CH" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Gruppenangebote 2026 – Cantina Tex-Mex" },
  { name: "twitter:description", content: BESCHREIBUNG },
  { name: "twitter:image", content: TEILEN_BILD },
]

/** La mesa de madera: aquí se ve entera, sin velo oscuro, como en el cartel impreso. */
const HOLZ_BILD = "/gruppen-banner.jpg"

/** Los cuatro bordes rasgados de la hoja. Son tiras con un SVG repetido, no un filtro:
 *  un filter sobre una hoja de tres mil píxeles Safari lo trocea y la hoja sale cortada. */
const PAPIER = "#f7edd8"
const BORDE_H = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'12\' viewBox=\'0 0 240 12\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,12 L0,4.0 L9.5,6.6 L18.2,4.3 L27.9,2.5 L37,5 L48.3,2 L55.7,2 L67.2,5.3 L72.5,6.9 L85.2,5.1 L95.1,2.4 L100.2,4.4 L105.7,2.5 L112.6,1.7 L121.3,3.9 L133,4.4 L143.1,4.2 L153.4,4 L160.6,7 L173.6,6.1 L184.3,3.2 L191.1,3.1 L196.7,5.7 L204.9,6.2 L213,6.8 L224.8,1.5 L231.5,6.5 L240,4 L240,12 Z\' fill=\'%23f7edd8\'/%3E%3C/svg%3E")'
const BORDE_H2 = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'12\' viewBox=\'0 0 240 12\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,12 L0,6.9 L8.2,1.9 L18.2,5.8 L25.4,2 L33.1,6.8 L44.2,2.1 L51.2,2.1 L56.7,5.9 L63.1,4.6 L71.7,2.5 L82.6,2.2 L92.7,2.1 L101.1,2.7 L108.3,6.8 L119.7,3.2 L131.8,2.7 L140,6.2 L150.1,2.1 L163,2.7 L170.1,5.7 L177.7,3.1 L183.3,2 L193,2.8 L202.8,3.5 L211.4,6.8 L220.3,4.7 L232.2,2.5 L238.4,6.5 L240,6.9 L240,12 Z\' fill=\'%23f7edd8\'/%3E%3C/svg%3E")'
const BORDE_V = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'240\' viewBox=\'0 0 12 240\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M12,0 L2.9,0 L5.6,6.5 L2.6,19 L6.4,31.6 L3.8,41.4 L1.7,47.2 L2.8,59.9 L2.9,70.5 L4.8,82.1 L2.5,89.4 L1.9,100.2 L4.6,107 L4.9,118.8 L6.5,126 L1.6,132.6 L4,139.8 L2.5,145.3 L4.6,153.3 L3.5,159.4 L6.9,171.5 L5.3,181.8 L2.3,191.5 L1.6,196.8 L5.4,209.1 L1.6,221.8 L4.2,231.9 L2.9,240 L12,240 Z\' fill=\'%23f7edd8\'/%3E%3C/svg%3E")'
const BORDE_V2 = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'240\' viewBox=\'0 0 12 240\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M12,0 L3.3,0 L1.9,13 L5.6,22.4 L5.6,34.6 L5.9,45.2 L3.4,57.5 L6.5,68 L3.8,80 L6.2,91.3 L4.9,100.9 L4.7,109 L1.9,118.9 L7,129 L5.5,141 L5.5,149.1 L3.9,158.7 L2,170.4 L1.7,181.4 L4.1,191.2 L5.3,198 L4.9,207 L2.9,219.4 L3.2,224.5 L2.6,234.9 L3.3,240 L12,240 Z\' fill=\'%23f7edd8\'/%3E%3C/svg%3E")'

type Menue = {
  titel: string
  gaenge: string[]
  dessert: string
  /** Precio por persona, como en el cartel impreso. */
  preis: number
}

const menues: Menue[] = [
  {
    titel: "Fajitas à discrétion",
    gaenge: [
      "Kleiner gemischter Salat an Mexican Dressing.",
      "Fajitas zum Selberwickeln mit Poulet, Rindshuftwürfeli, Black Tiger Crevetten und Gemüse. Dazu servieren wir unsere hausgemachten Fajita-Saucen. Tortillas und Füllungen können beliebig nachbestellt werden.",
    ],
    dessert: "Hausgemachter American Brownie mit Vanilleglace und Schlagrahm",
    preis: 51,
  },
  {
    titel: "Quesadilla Festival",
    gaenge: [
      "Hausgemachte Weizenchips mit Guacamole und Hot Salsa.",
      "Verschiedene Quesadillas mit Poulet, Rind, Chorizo, Gemüse, Tomaten, Mais, Broccoli und Black Tiger Crevetten. Dazu Salat, Tomatenreis, Country Fries und verschiedene Dips zum Teilen.",
    ],
    dessert: "Hausgemachter American Brownie mit Vanilleglace und Schlagrahm",
    preis: 43,
  },
  {
    titel: "Tex-Mex Menü",
    gaenge: [
      "Hausgemachte Maissuppe mit pikantem Chili Popper.",
      "Bunte Tex-Mex Platte mit Burritos, Quesadillas, Flautas, Maiskolben, Country Fries, Spare Ribs, Chicken Fingers, Crevetten, Fleischspiessli und Chili con Carne.",
    ],
    dessert: "Hausgemachte Tarta de la Casa mit Schlagrahm",
    preis: 61,
  },
]

/** El cactus que separa los menús en el cartel impreso. */
function Kaktus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M10.5 31h3V13.5h2.2a3.3 3.3 0 0 0 3.3-3.3V7h-2.4v3.2c0 .5-.4.9-.9.9h-2.2V4.5a1.5 1.5 0 0 0-3 0v9.1H8.3a.9.9 0 0 1-.9-.9V8.5H5v4.2a3.3 3.3 0 0 0 3.3 3.3h2.2V31Z" />
    </svg>
  )
}

/** Línea dorada con el cactus en medio, igual que en el cartel. */
function Trenner() {
  return (
    <div className="flex items-center gap-4 my-8">
      <span className="h-px flex-1 bg-[#c8a15a]" />
      <Kaktus className="w-4 h-5 text-[#c8a15a]" />
      <span className="h-px flex-1 bg-[#c8a15a]" />
    </div>
  )
}

export default function Gruppen() {
  const [loading, setLoading] = useState(true)
  const [holzGeladen, setHolzGeladen] = useState(true)
  const [kopiert, setKopiert] = useState(false)

  /** Compartir la página. La hoja del sistema solo existe en el móvil; si no está,
   *  copiamos el enlace al portapapeles y avisamos durante dos segundos. */
  const teilen = async () => {
    const datos = {
      title: "Gruppenangebote 2026 – Cantina Tex-Mex",
      text: BESCHREIBUNG,
      url: SEITEN_URL,
    }
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(datos)
        return
      } catch {
        // El usuario ha cerrado la hoja: no hay nada que hacer.
        return
      }
    }
    try {
      await navigator.clipboard.writeText(SEITEN_URL)
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    } catch {
      // Sin portapapeles (http o permiso denegado): abrimos el diálogo de Facebook.
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SEITEN_URL)}`,
        "_blank",
        "noopener,noreferrer",
      )
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />


      {/* ━━━ HOLZTISCH ━━━ */}
      {/* h-lvh: queda quieto cuando la barra del móvil entra y sale. */}
      <div className="fixed top-0 left-0 right-0 h-lvh z-0 bg-[#6b3b1e] pointer-events-none">
        {holzGeladen && (
          <img
            src={HOLZ_BILD}
            alt=""
            aria-hidden="true"
            onError={() => setHolzGeladen(false)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ━━━ INHALT ━━━ */}
      <div className="relative z-10 px-6 pt-24 pb-16">

        {/* ━━━ ZURÜCK ━━━ */}
        {/* Quien llega desde Facebook entra directo aquí y no tiene de dónde volver:
            por eso es un enlace a la portada, no un history.back(). */}
        <div className="max-w-3xl mx-auto mb-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2b1d12]/85 px-4 py-2 text-sm font-semibold text-[#fdf6e3] shadow-lg shadow-black/30 hover:bg-[#2b1d12] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Zurück zur Startseite
          </Link>
        </div>

        {/* ━━━ DAS BLATT ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          {/* El papel: el cuerpo plano y, pegadas a los cuatro lados, las tiras del borde roto. */}
          <div aria-hidden="true" className="absolute -inset-2 sm:-inset-3">
            <div
              className="absolute inset-0"
              style={{ background: PAPIER, boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}
            />
            {/* Las tiras se salen 8 px por los lados para que las esquinas no queden abiertas. */}
            <div className="absolute -left-2 -right-2 -top-[11px] h-3"
                 style={{ backgroundImage: BORDE_H, backgroundRepeat: "repeat-x", backgroundSize: "240px 12px" }} />
            <div className="absolute -left-2 -right-2 -bottom-[11px] h-3 rotate-180"
                 style={{ backgroundImage: BORDE_H2, backgroundRepeat: "repeat-x", backgroundSize: "240px 12px" }} />
            <div className="absolute -top-2 -bottom-2 -left-[11px] w-3"
                 style={{ backgroundImage: BORDE_V, backgroundRepeat: "repeat-y", backgroundSize: "12px 240px" }} />
            <div className="absolute -top-2 -bottom-2 -right-[11px] w-3 rotate-180"
                 style={{ backgroundImage: BORDE_V2, backgroundRepeat: "repeat-y", backgroundSize: "12px 240px" }} />
          </div>

          <div className="relative px-6 py-10 sm:px-12 sm:py-14 text-[#3b2a1c]">
            {/* ── Kopf ── */}
            <div className="text-center">
              {/* El logo va recortado con fondo transparente, para que se apoye en el papel. */}
              <img
                src="/gruppen-logo.png"
                alt="Cantina Tex-Mex"
                className="mx-auto w-[min(78%,340px)]"
              />
              <h1 className="mt-1 text-[8.5vw] sm:text-5xl font-extrabold tracking-tight text-[#9b1b1b] leading-none">
                Gruppenangebote 2026
              </h1>
              <p className="mt-3 text-lg sm:text-2xl font-bold text-[#2b1d12]">
                Ushuaia &amp; Cantina Tex-Mex
              </p>
              <p className="mt-1 text-sm sm:text-lg text-[#5b4733]">
                Bahnhofstrasse 40 · 9470 Buchs
              </p>
              <p className="mt-4 text-base sm:text-lg font-bold text-[#9b1b1b]">
                Planen Sie schon Ihr Weihnachtsessen?
              </p>
            </div>

            {/* ── Die drei Menüs ── */}
            {menues.map((menue) => (
              <div key={menue.titel}>
                <Trenner />

                {/* El brochazo amarillo detrás del título, como en el cartel. */}
                <h2 className="relative isolate inline-block text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1c1208]">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-x-3 top-[30%] bottom-[4%] -z-10 rounded-full bg-[#f2dca6] -rotate-1"
                  />
                  {menue.titel}
                </h2>

                <div className="mt-4 space-y-1.5">
                  {menue.gaenge.map((gang) => (
                    <p key={gang} className="text-[15px] sm:text-[17px] leading-relaxed">
                      {gang}
                    </p>
                  ))}
                </div>

                <p className="mt-4 text-[15px] sm:text-[17px]">
                  <span className="font-bold">Dessert:</span> {menue.dessert}
                </p>

                {/* El precio, en el mismo brochazo rojo del cartel. pointer-events-none:
                    es un rótulo, no un botón. */}
                <div className="mt-6 flex justify-center">
                  <span className="btn-brocha btn-brocha--gross pointer-events-none">
                    <span className="text-[0.75em]">CHF</span>
                    <span className="mx-1 text-[1.2em]">{menue.preis}.–</span>
                    <span className="text-[0.7em]">pro Person</span>
                  </span>
                </div>
              </div>
            ))}

            <Trenner />

            {/* ── Reservieren ── */}
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-[#9b1b1b] mb-1">
                Frühzeitig reservieren lohnt sich!
              </p>
              <p className="text-[15px] sm:text-[17px] max-w-xl mx-auto">
                Die Menüs gelten für die ganze Gruppe. Gerne besprechen wir mit Ihnen Datum und
                Personenzahl.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/reservierung" className="btn-brocha">
                    Tisch reservieren
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <a href="tel:+41817560101" className="btn-brocha btn-brocha--gelb">
                    <PhoneCall className="w-5 h-5" />
                    081 756 01 01
                  </a>
                </motion.div>
              </div>

              {/* Compartir: en el móvil abre la hoja del sistema (WhatsApp, Facebook...);
                  en el escritorio no existe, así que copia el enlace y lo dice. */}
              <div className="mt-5 flex justify-center">
                <motion.button
                  type="button"
                  onClick={teilen}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#9b1b1b]/35 bg-white/55 px-6 py-2.5 text-[15px] font-bold text-[#9b1b1b] hover:bg-white/80 transition-colors"
                >
                  {kopiert ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  {kopiert ? "Link kopiert!" : "Seite teilen"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
