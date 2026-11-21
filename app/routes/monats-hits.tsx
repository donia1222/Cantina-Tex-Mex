"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import type { MetaFunction } from "@remix-run/node"
import { Flame, Sparkles, Drumstick, Beef, Salad, CookingPot, Utensils, Droplets } from "lucide-react"
import Picado from "~/components/Picado"
import PageLoader from "~/components/PageLoader"
import MonatsHitsModal from "~/components/MonatsHitsModal"

export const meta: MetaFunction = () => [
  { title: "Monats-Hit: Tacos | Cantina Tex-Mex" },
  {
    name: "description",
    content:
      "Monats-Hit in der Cantina Tex-Mex Buchs: zwei Tacos – Poulet und Rind – mit Tomatenreis, Kartoffeln, Salat und Saucen für 21.90 CHF.",
  },
]

// 21/11/2026: el Monats-Hit pasa de los Smash Burger a los tacos (copia de la página anterior en git).
const HERO_IMAGE = "/monats-hits-tacos.jpg"
const PREIS = 21.9

const tacos = [
  { name: "Taco Pollo", desc: "Mit Poulet", icon: Drumstick, color: "#f59e0b" },
  { name: "Taco Res", desc: "Mit Rindfleisch", icon: Beef, color: "#d61f26" },
]

const beilagen = [
  { name: "Tomatenreis", icon: CookingPot },
  { name: "Kartoffeln", icon: Utensils },
  { name: "Salat", icon: Salad },
  { name: "Saucen", icon: Droplets },
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

      {/* El fondo oscuro con la foto se quitó el 20/11/2026: ahora manda el fondo suave de toda la web. */}

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
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-[#d61f26]/10 text-[#b3161c] border border-[#d61f26]/25">
                Monats-Hits
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-[#15803d]/10 text-[#166534] border border-[#15803d]/25">
                <Sparkles className="w-3.5 h-3.5" />
                Neu
              </span>
            </motion.div>

            {/* Der Titel ist der Star: Zeilen steigen auf, Glanz wandert darüber */}
            <h1 className="pincel ] leading-[0.82] mb-5">
              {[
                { text: "Tacos", className: "text-amber-400" },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={heroReady ? { y: 0 } : undefined}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative inline-block text-[26vw] sm:text-[17vw] lg:text-[10rem] ${line.className}`}
                  >
                    {line.text}
                    <motion.span
                      initial={{ x: "-120%" }}
                      animate={heroReady ? { x: "120%", opacity: [0, 1, 1, 0] } : undefined}
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
                  className="inline-flex items-baseline gap-2 bg-[#d61f26] text-white text-4xl sm:text-5xl lg:text-6xl px-5 py-1.5 rounded-xl -rotate-3 shadow-lg shadow-red-600/25"
                >
                  21.90 <span className="text-xl sm:text-2xl lg:text-3xl">CHF</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              <p className="text-lg sm:text-xl font-extrabold text-[#c2410c] uppercase tracking-wide mb-4">
                Poulet &amp; Rind
              </p>
              <p className="kopf-text max-w-lg mx-auto">
                Zwei Tacos – einer mit Poulet, einer mit Rindfleisch – mit Tomatenreis, Kartoffeln,
                Salat und Saucen.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ LAUFBAND ━━━ */}
      <div className="relative border-y border-[#e3c99f] bg-gradient-to-r from-red-600/10 via-amber-500/15 to-green-600/10 py-3 overflow-hidden">
        <div className="flex w-max animate-scroll-right">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {["Monats-Hit", "Tacos", "Poulet & Rind", "21.90 CHF", "Nur für kurze Zeit"].map(
                (word) => (
                  <span
                    key={word}
                    className="flex items-center gap-6 px-6 text-[#5b4a3d] font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap"
                  >
                    {word}
                    <Flame className="w-4 h-4 text-[#d61f26]" />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ DER TELLER ━━━ */}
      <section className="px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="papel mit-picado max-w-3xl mx-auto px-4 pb-6 md:px-8 md:pb-8"
        >
          <Picado n={14} />
          <p className="text-center !mb-6"><span className="papel-kicker">Der Monats-Hit</span></p>

          {heroLoaded && (
            <div className="group relative rounded-2xl overflow-hidden aspect-[5/4] sm:aspect-[16/11]">
              <img
                src={HERO_IMAGE}
                alt="Zwei Tacos mit Poulet und Rind, Tomatenreis, Kartoffeln, Salat und Saucen"
                onError={() => setHeroLoaded(false)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Sello del precio, como en el cartel */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -14 }}
                whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 14 }}
                className="absolute right-3 top-3 sm:right-5 sm:top-5 rounded-2xl bg-[#d61f26] px-4 py-2 sm:px-5 sm:py-3 text-center shadow-xl shadow-black/30"
              >
                <span className="block text-white font-extrabold text-2xl sm:text-4xl leading-none tabular-nums">21.90</span>
                <span className="block text-white/90 font-bold text-xs sm:text-sm tracking-[0.2em] mt-0.5">CHF</span>
              </motion.div>
            </div>
          )}

          <h2 className="papel-titel text-center text-3xl md:text-4xl mt-7 mb-5">Zwei Tacos</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {tacos.map((taco, i) => (
              <motion.div
                key={taco.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-4 rounded-2xl border bg-white border-[rgba(29,20,16,0.08)] hover:border-[rgba(29,20,16,0.2)] p-4 md:p-5 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: `${taco.color}22` }}
                >
                  <taco.icon className="w-6 h-6" style={{ color: taco.color }} />
                </div>
                <div className="min-w-0">
                  <h3 className="pincel text-xl md:text-2xl text-white">{taco.name}</h3>
                  <p className="text-gray-400 text-sm">{taco.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <hr className="papel-trenner my-7" />

          <p className="text-center !mb-4"><span className="papel-kicker">Dazu</span></p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {beilagen.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
                className="flex flex-col items-center gap-2 rounded-2xl bg-[#f6ead6] py-4"
              >
                <span className="papel-icon papel-icon--gruen w-11 h-11">
                  <b.icon className="w-5 h-5" />
                </span>
                <span className="font-bold text-[15px]" style={{ color: "var(--tinta)" }}>{b.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 rounded-2xl bg-[#fef3c7] border border-amber-300 px-5 py-4">
            <div>
              <p className="font-extrabold uppercase tracking-wide text-sm" style={{ color: "var(--tinta)" }}>Der ganze Teller</p>
              <p className="text-gray-400 text-sm">Preis in Schweizer Franken</p>
            </div>
            <span className="flex-shrink-0 rounded-xl bg-red-600 px-4 py-2">
              <span className="text-white font-extrabold text-xl md:text-2xl whitespace-nowrap">
                <AnimatedPrice value={PREIS} /> <span className="text-base">CHF</span>
              </span>
            </span>
          </div>
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
          <p className="text-[#3b2a1c] font-extrabold uppercase tracking-[0.15em] mb-5">
            Jetzt entdecken und reservieren!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/reservierung"
                className="btn-brocha"
              >
                Tisch reservieren
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/menu"
                className="btn-brocha btn-brocha--gelb"
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
