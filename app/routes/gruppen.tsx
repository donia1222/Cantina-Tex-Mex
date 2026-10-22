"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { CalendarDays, PhoneCall, Users, Gift, UtensilsCrossed, Snowflake, ArrowLeft } from "lucide-react"
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

/** De momento la foto de la mesa mexicana, la misma del banner. Si llega una foto propia para
 *  esta página, se cambia solo esta línea (y si el fichero no existe, el onError deja el fondo
 *  oscuro con las manchas de color). */
const HERO_IMAGE = "/gruppen-banner.jpg"

type Menue = {
  titel: string
  gaenge: string[]
  dessert: string
  /** Precio por persona, como en el cartel impreso. */
  preis: number
  farbe: string
  icon: typeof UtensilsCrossed
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
    farbe: "#e11d2a",
    icon: UtensilsCrossed,
  },
  {
    titel: "Quesadilla Festival",
    gaenge: [
      "Hausgemachte Weizenchips mit Guacamole und Hot Salsa.",
      "Verschiedene Quesadillas mit Poulet, Rind, Chorizo, Gemüse, Tomaten, Mais, Broccoli und Black Tiger Crevetten. Dazu Salat, Tomatenreis, Country Fries und verschiedene Dips zum Teilen.",
    ],
    dessert: "Hausgemachter American Brownie mit Vanilleglace und Schlagrahm",
    preis: 43,
    farbe: "#f59e0b",
    icon: Users,
  },
  {
    titel: "Tex-Mex Menü",
    gaenge: [
      "Hausgemachte Maissuppe mit pikantem Chili Popper.",
      "Bunte Tex-Mex Platte mit Burritos, Quesadillas, Flautas, Maiskolben, Country Fries, Spare Ribs, Chicken Fingers, Crevetten, Fleischspiessli und Chili con Carne.",
    ],
    dessert: "Hausgemachte Tarta de la Casa mit Schlagrahm",
    preis: 61,
    farbe: "#16a34a",
    icon: Gift,
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

export default function Gruppen() {
  const [loading, setLoading] = useState(true)
  const [heroLoaded, setHeroLoaded] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ FIXER BILDHINTERGRUND ━━━ */}
      {/* h-lvh statt inset-0: bleibt stabil, wenn die Adressleiste des Handys ein-/ausfährt */}
      <div className="fixed top-0 left-0 right-0 h-lvh z-0 bg-[#0b0b0f] pointer-events-none">
        {heroLoaded && (
          <motion.img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            onError={() => setHeroLoaded(false)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[#0b0b0f]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0f]/80 via-transparent to-[#0b0b0f]" />
      </div>

      {/* ━━━ INHALT ━━━ */}
      <div className="relative z-10">

        {/* ━━━ HERO ━━━ */}
        {/* overflow-hidden: die Farbflecken ragen seitlich hinaus und würden sonst
            die Seite horizontal scrollbar machen. */}
        {/* ━━━ ZURÜCK ━━━ */}
        {/* Quien llega desde Facebook entra directo aquí y no tiene de dónde volver:
            por eso es un enlace a la portada, no un history.back(). */}
        <div className="px-4 pt-28">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Zurück zur Startseite
            </Link>
          </div>
        </div>

        <section className="relative pt-10 pb-20 px-4 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-green-600/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-40 -right-24 w-[26rem] h-[26rem] rounded-full bg-red-600/20 blur-3xl"
          />

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-5"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-red-500/15 text-red-400 border border-red-500/25">
                <Snowflake className="w-3.5 h-3.5" />
                Weihnachtsessen
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-green-500/15 text-green-400 border border-green-500/25">
                <Users className="w-3.5 h-3.5" />
                Für Gruppen
              </span>
            </motion.div>

            <h1 className="pincel leading-[0.85] mb-5">
              {[
                { text: "Gruppen-", className: "text-white" },
                { text: "angebote", className: "text-amber-400" },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block text-[13vw] sm:text-[10vw] lg:text-[6rem] ${line.className}`}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="inline-block mt-3 bg-red-600 text-white text-3xl sm:text-4xl lg:text-5xl px-4 py-1 rounded-lg -rotate-2"
              >
                2026
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              <p className="text-lg sm:text-xl font-bold text-amber-400 uppercase tracking-wide mb-4">
                Planen Sie schon Ihr Weihnachtsessen?
              </p>
              <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
                Für Firmen, Vereine, Familien und Freunde: drei Menüs zum Teilen, für die ganze
                Gruppe an einem Tisch. Im Ushuaia und in der Cantina Tex-Mex an der Bahnhofstrasse 40
                in Buchs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ━━━ LAUFBAND ━━━ */}
        <div className="relative border-y border-white/10 bg-gradient-to-r from-green-600/15 via-amber-500/10 to-red-600/15 py-3 overflow-hidden">
          <div className="flex w-max animate-scroll-right">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center shrink-0">
                {["Gruppenangebote 2026", "Weihnachtsessen", "Menüs zum Teilen", "Jetzt reservieren"].map(
                  (word) => (
                    <span
                      key={word}
                      className="flex items-center gap-6 px-6 text-white/70 font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap"
                    >
                      {word}
                      <Kaktus className="w-3.5 h-4 text-green-400" />
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ DIE DREI MENÜS ━━━ */}
        {/* Las fichas van en papel claro, como el cartel impreso: el brochazo amarillo detrás del
            título y el cactus entre menú y menú. */}
        <section className="px-4 pt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white font-extrabold uppercase tracking-[0.2em] text-sm mb-10"
          >
            Unsere drei Gruppenmenüs
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {menues.map((menue, i) => (
              <div key={menue.titel}>
                {i > 0 && (
                  <div className="flex items-center gap-4 py-10">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
                    <Kaktus className="w-5 h-6 text-amber-500/70" />
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
                  </div>
                )}

                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl bg-[#fdf8e8] text-[#2b1d12] p-6 md:p-9 shadow-2xl shadow-black/40 ring-1 ring-black/10"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ background: `${menue.farbe}1f` }}
                    >
                      <menue.icon className="w-5 h-5" style={{ color: menue.farbe }} />
                    </div>
                    {/* El brochazo amarillo del cartel, detrás del título */}
                    <h3 className="relative isolate inline-block text-2xl md:text-4xl font-extrabold tracking-tight">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-x-3 top-[28%] bottom-[6%] -z-10 rounded-full bg-amber-300/70 -rotate-1"
                      />
                      {menue.titel}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {menue.gaenge.map((gang) => (
                      <p key={gang} className="text-[15px] md:text-base leading-relaxed text-[#3b2a1c]">
                        {gang}
                      </p>
                    ))}
                  </div>

                  <p className="mt-5 pt-4 border-t border-black/10 text-[15px] md:text-base text-[#3b2a1c]">
                    <span className="font-bold">Dessert:</span> {menue.dessert}
                  </p>

                  {/* El precio va en el mismo brochazo rojo del cartel. pointer-events-none:
                      es un rótulo, no un botón, y no debe reaccionar al ratón. */}
                  <div className="mt-6 flex justify-center">
                    <span className="btn-brocha btn-brocha--gross pointer-events-none">
                      <span className="text-[0.75em]">CHF</span>
                      <span className="mx-1 text-[1.2em]">{menue.preis}.–</span>
                      <span className="text-[0.7em]">pro Person</span>
                    </span>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </section>

        {/* ━━━ HINWEIS ━━━ */}
        <section className="px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/30 p-7 text-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center mb-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 flex items-center justify-center">
                <CalendarDays className="w-7 h-7 text-amber-400" />
              </div>
            </motion.div>
            <p className="text-xl md:text-2xl font-extrabold text-white uppercase">
              Frühzeitig reservieren
            </p>
            <p className="text-xl md:text-2xl font-extrabold text-red-500 uppercase">
              lohnt sich!
            </p>
            <p className="text-gray-300 text-sm mt-3 max-w-lg mx-auto">
              Die Menüs gelten für die ganze Gruppe. Preise pro Person, in Schweizer Franken. Gerne besprechen wir mit
              Ihnen Datum und Personenzahl – rufen Sie uns einfach an oder schreiben Sie uns.
            </p>
          </motion.div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-white font-bold uppercase tracking-[0.15em] mb-5">
              Tisch für Ihre Gruppe sichern
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
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
            <p className="mt-6 text-gray-400 text-sm">
              Ushuaia &amp; Cantina Tex-Mex · Bahnhofstrasse 40 · 9470 Buchs
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
