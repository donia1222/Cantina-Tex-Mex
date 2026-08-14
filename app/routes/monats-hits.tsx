"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import type { MetaFunction } from "@remix-run/node"
import { Flame, Sparkles, CupSoda, Crown, CalendarDays, ChevronRight, Droplets } from "lucide-react"
import PageLoader from "~/components/PageLoader"
import MonatsHitsModal from "~/components/MonatsHitsModal"

export const meta: MetaFunction = () => [
  { title: "Monats-Hits | Cantina Tex-Mex" },
  {
    name: "description",
    content:
      "Smash Burger Plus – ab September in der Cantina Tex-Mex Buchs. Alle Smash Burger inklusive offenem Getränk.",
  },
]

const HERO_IMAGE = "/monats-hits-burger.jpg"
const CHEESE_IMAGE = "/monats-hits-cheese.jpg"

type Burger = {
  name: string
  desc: string
  price: number
  icon: typeof Flame
  color: string
  premium?: boolean
}

const burgers: Burger[] = [
  {
    name: "El Diablo",
    desc: "Mit Cheddar, Jalapeños, scharfer Sauce & Zwiebeln",
    price: 25.5,
    icon: Flame,
    color: "#f97316",
  },
  {
    name: "Trufa Loca",
    desc: "Mit Trüffel-Mayo, Rucola, Parmesan & Röstzwiebeln",
    price: 25.5,
    icon: Sparkles,
    color: "#d4d4d4",
  },
  {
    name: "Smoky BBQ",
    desc: "Mit Cheddar, BBQ Sauce, Röstzwiebeln & Pickles",
    price: 25.5,
    icon: Flame,
    color: "#dc2626",
  },
  {
    name: "La Mafiosa",
    desc: "Mit 3 Smash Patties, Doppel-Cheddar, Smash Sauce & Zwiebeln",
    price: 28.5,
    icon: Crown,
    color: "#fbbf24",
    premium: true,
  },
]

/** Preis, der beim Hereinscrollen hochzählt. */
function AnimatedPrice({ value, prefix = "" }: { value: number; prefix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <span ref={ref} className="tabular-nums">
      {inView ? (
        <CountUp end={value} decimals={2} decimal="." duration={1.1} prefix={prefix} />
      ) : (
        <span className="opacity-0">{prefix}0.00</span>
      )}
    </span>
  )
}

export default function MonatsHits() {
  const [loading, setLoading] = useState(true)
  const [heroLoaded, setHeroLoaded] = useState(true)
  const [cheeseLoaded, setCheeseLoaded] = useState(true)
  // Der Hero startet erst, wenn das Intro-Modal weg ist – sonst läuft die
  // Animation dahinter ab und niemand sieht sie.
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="relative"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      <PageLoader loading={loading} />

      {/* Begrüssungs-Modal – nur auf dieser Seite */}
      <MonatsHitsModal onReady={() => setHeroReady(true)} />

      {/* ━━━ FIXER BILDHINTERGRUND ━━━ */}
      {/* h-lvh statt inset-0: bleibt stabil, wenn die Adressleiste des Handys ein-/ausfährt */}
      <div className="fixed top-0 left-0 right-0 h-lvh z-0 bg-[#0b0b0f] pointer-events-none">
        {heroLoaded && (
          <motion.img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            onError={() => setHeroLoaded(false)}
            initial={{ scale: 1.12, opacity: 0 }}
            animate={heroReady ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        )}
        {/* Dunkler Schleier, damit die Schrift lesbar bleibt */}
        <div className="absolute inset-0 bg-[#0b0b0f]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0f]/80 via-transparent to-[#0b0b0f]" />
      </div>

      {/* ━━━ INHALT ━━━ */}
      <div className="relative z-10">

      {/* ━━━ HERO ━━━ */}
      {/* overflow-hidden: die Farbflecken ragen seitlich hinaus und würden
          sonst die Seite horizontal scrollbar machen. */}
      <section className="relative pt-32 pb-28 px-4 overflow-hidden">
        {/* Atmende Farbflecken */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-red-600/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-40 -right-24 w-[26rem] h-[26rem] rounded-full bg-amber-500/20 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* ── Text ── */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={heroReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-5"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-red-500/15 text-red-400 border border-red-500/25">
                Monats-Hits
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-green-500/15 text-green-400 border border-green-500/25">
                <CalendarDays className="w-3.5 h-3.5" />
                Ab September
              </span>
            </motion.div>

            {/* Der Titel ist der Star: Zeilen steigen auf, Glanz wandert darüber */}
            <h1 className="font-extrabold uppercase tracking-[-0.03em] leading-[0.82] mb-5">
              {[
                { text: "Smash", className: "text-white" },
                { text: "Burger", className: "text-red-500" },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={heroReady ? { y: 0 } : undefined}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative inline-block text-[19vw] sm:text-[13vw] lg:text-[7.5rem] ${line.className}`}
                  >
                    {line.text}
                    <motion.span
                      initial={{ x: "-120%" }}
                      animate={heroReady ? { x: "120%" } : undefined}
                      transition={{ delay: 1.2 + i * 0.15, duration: 1.1, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      style={{ mixBlendMode: "overlay" }}
                    />
                  </motion.span>
                </span>
              ))}

              <span className="flex items-center justify-center gap-3 mt-2">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={heroReady ? { scale: 1, opacity: 1 } : undefined}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="inline-block bg-green-600 text-white text-3xl sm:text-4xl lg:text-5xl px-4 py-1 rounded-lg -rotate-2"
                >
                  Plus
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              <p className="text-lg sm:text-xl font-bold text-amber-400 uppercase tracking-wide mb-4">
                mit offenem Getränk
              </p>
              <p className="text-gray-400 max-w-lg mx-auto">
                Vier neue Smash Burger, frisch auf der Plancha gepresst – jeder inklusive einem
                offenen Getränk Ihrer Wahl.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ LAUFBAND ━━━ */}
      <div className="relative border-y border-white/10 bg-gradient-to-r from-red-600/15 via-amber-500/10 to-green-600/15 py-3 overflow-hidden">
        <div className="flex w-max animate-scroll-right">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {["Smash Burger Plus", "Ab September", "Inkl. offenem Getränk", "Nur für kurze Zeit"].map(
                (word) => (
                  <span
                    key={word}
                    className="flex items-center gap-6 px-6 text-white/70 font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap"
                  >
                    {word}
                    <Flame className="w-4 h-4 text-amber-400" />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ BURGER LISTE ━━━ */}
      <section className="px-4 pt-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white font-extrabold uppercase tracking-[0.2em] text-sm mb-8"
        >
          Unsere vier Monats-Hits
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-5">
          {burgers.map((burger, i) => (
            <motion.div
              key={burger.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-2xl border p-5 md:p-6 transition-colors duration-300 ${
                burger.premium
                  ? "bg-gradient-to-r from-amber-500/15 to-red-500/10 border-amber-500/30 hover:border-amber-500/60"
                  : "bg-white/5 border-white/10 hover:bg-white/[0.09] hover:border-white/20"
              }`}
            >
              {burger.premium && (
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 left-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-red-600/30"
                >
                  <Crown className="w-3 h-3" />
                  Premium
                </motion.span>
              )}

              {/* Farbschimmer beim Hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(420px circle at 12% 50%, ${burger.color}1f, transparent 70%)`,
                }}
              />

              <div className="relative flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: `${burger.color}25` }}
                >
                  <burger.icon className="w-6 h-6" style={{ color: burger.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">
                    {burger.name}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{burger.desc}</p>
                </div>

                <div className="flex-shrink-0 rounded-xl bg-red-600 px-3 py-2 md:px-4 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-600/30">
                  <span className="text-white font-extrabold text-lg md:text-xl whitespace-nowrap">
                    <AnimatedPrice value={burger.price} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ━━━ EXTRA: GESCHMOLZENER KÄSE ━━━ */}
      <section className="px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group max-w-3xl mx-auto rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-orange-600/10 hover:border-amber-500/60 transition-colors duration-300"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Hochformat: auf dem Handy hoch genug, damit das Kännchen im Bild bleibt */}
            {cheeseLoaded && (
              <div className="w-full aspect-[4/5] sm:aspect-auto sm:w-52 sm:h-auto flex-shrink-0 relative overflow-hidden">
                <img
                  src={CHEESE_IMAGE}
                  alt="Geschmolzener Käse wird über einen Smash Burger gegossen"
                  onError={() => setCheeseLoaded(false)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-r" />
              </div>
            )}

            <div className="flex-1 p-6 md:p-7 relative">
              {/* Käse, der langsam von oben tropft */}
              <motion.div
                animate={{ opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute top-0 right-8 w-24 h-24 rounded-full bg-amber-400/25 blur-2xl"
              />

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
                <motion.span
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Droplets className="w-3.5 h-3.5" />
                </motion.span>
                Extra
              </span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide leading-tight mb-2">
                Geschmolzener Käse
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Sie möchten Ihren Burger mit geschmolzenem Käse? Wir bringen Ihnen heissen, flüssigen
                Käse im Kännchen an den Tisch – zum Selbstübergiessen, direkt über Ihren Smash
                Burger.
              </p>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-baseline rounded-xl bg-red-600 px-4 py-2 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-600/30">
                  <span className="text-white font-extrabold text-lg">
                    <AnimatedPrice value={4.5} prefix="+ " />
                  </span>
                </span>
                <span className="text-gray-400 text-sm">Aufpreis pro Burger</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ━━━ GETRÄNK-HINWEIS ━━━ */}
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
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
              <CupSoda className="w-7 h-7 text-amber-400" />
            </div>
          </motion.div>
          <p className="text-xl md:text-2xl font-extrabold text-white uppercase">
            Alle Smash Burger inkl.
          </p>
          <p className="text-xl md:text-2xl font-extrabold text-red-500 uppercase">
            offenem Getränk!
          </p>
          <p className="text-gray-400 text-sm mt-3">
            Preise in Schweizer Franken. Angebot gültig ab September.
          </p>
        </motion.div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-white font-bold uppercase tracking-[0.15em] mb-5">
            Jetzt entdecken und reservieren!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/reservierung"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-600/25"
              >
                Tisch reservieren
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/15 text-white font-bold hover:bg-white/15 transition-colors"
              >
                Zur Speisekarte
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      </div>
    </div>
  )
}
