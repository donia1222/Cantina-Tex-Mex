"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { PhoneCall, ArrowLeft } from "lucide-react"
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* El filtro que rompe el borde de la hoja: ruido + desplazamiento, como un papel rasgado.
          Va sobre el fondo de la hoja, nunca sobre el texto (un filter borronearía las letras). */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="papierriss">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.022" numOctaves="4" seed="9" result="rauschen" />
          <feDisplacementMap in="SourceGraphic" in2="rauschen" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

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
      <div className="relative z-10 px-4 pt-24 pb-16">

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
          {/* El papel: color y borde roto. Es solo fondo, no lleva texto. */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 sm:-inset-3"
            style={{
              filter: "url(#papierriss) drop-shadow(0 18px 40px rgba(0,0,0,0.45))",
              background:
                "radial-gradient(120% 90% at 20% 10%, #fdf8ec 0%, #f6edda 45%, #ece0c6 100%)",
            }}
          />

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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
