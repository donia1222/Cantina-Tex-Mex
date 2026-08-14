"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Flame, ArrowRight, CalendarDays } from "lucide-react"
import { Link } from "@remix-run/react"

/* ─────────────────────────────────────────────
   MONATS-HITS — Angebot des Monats
   Beim ersten Besuch erscheint dieses Modal einmal.
   Für ein neues Angebot einfach OFFER anpassen –
   eine neue `id` lässt das Modal erneut erscheinen.
   ───────────────────────────────────────────── */
const OFFER = {
  id: "2026-09-smash-burger-plus", // eindeutige ID pro Angebot → Modal erscheint erneut
  name: "Smash Burger Plus",
  desc: "Ab September neu bei uns: vier Smash Burger, frisch auf der Plancha gepresst – jeder inklusive einem offenen Getränk Ihrer Wahl.",
  price: "25.50",
  currency: "CHF",
  image: "/monats-hits-burger.jpg",
  tags: ["El Diablo", "Trufa Loca", "Smoky BBQ", "La Mafiosa"],
}

/**
 * @param onReady Wird aufgerufen, sobald der Hero animieren darf: entweder
 *   sofort (Modal wurde schon gesehen) oder erst beim Schliessen des Modals.
 */
export default function MonatsHitsModal({ onReady }: { onReady?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Einmal pro Angebot pro Besucher anzeigen
    const seen = localStorage.getItem("monatsHitsSeen")
    if (seen === OFFER.id) {
      onReady?.()
      return
    }
    const timer = setTimeout(() => setIsOpen(true), 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = () => {
    localStorage.setItem("monatsHitsSeen", OFFER.id)
    setIsOpen(false)
    onReady?.()
  }

  // Mit Escape schliessen
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
        >
          {/* Backdrop – als Button, damit Klick und Tastatur gleich funktionieren */}
          <button
            type="button"
            aria-label="Schliessen"
            onClick={close}
            className="absolute inset-0 w-full h-full bg-black/75 backdrop-blur-sm cursor-default"
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#1a1a2e] border border-white/10 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Schliessen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Bild + Titel */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={OFFER.image}
                alt={OFFER.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-extrabold uppercase tracking-wide shadow-lg">
                <CalendarDays className="w-3.5 h-3.5" />
                Neu ab September
              </div>

              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-amber-400 font-bold text-sm uppercase tracking-[0.2em]">
                    Monats-Hits
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg uppercase">
                  {OFFER.name}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6">
              <p className="text-gray-400 text-[15px] leading-relaxed mb-4">{OFFER.desc}</p>

              {/* Die vier Burger */}
              <div className="flex flex-wrap gap-2 mb-5">
                {OFFER.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Preis + CTA */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-gray-400 mr-1">ab</span>
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {OFFER.price}
                  </span>
                  <span className="text-lg font-bold text-amber-400">{OFFER.currency}</span>
                </div>

                <Link
                  to="/monats-hits"
                  onClick={close}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.03] transition-all duration-200"
                >
                  Burger ansehen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <button
                onClick={close}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Vielleicht später
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
