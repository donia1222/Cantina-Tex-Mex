"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Flame, ArrowRight, Star } from "lucide-react"
import { Link } from "@remix-run/react"

/* ─────────────────────────────────────────────
   XTREME WRAPS — Wöchentliches Angebot
   Jede Woche ein neuer Wrap. Diese Woche:
   Chili con Carne & Nacho Wrap mit Guacamole-Pommes.
   Zum Wechseln des Angebots einfach WEEKLY_OFFER
   und ggf. das Bild in /public anpassen.
   ───────────────────────────────────────────── */
const WEEKLY_OFFER = {
  id: "2026-w28-chili-nacho", // eindeutige ID pro Woche → Modal erscheint erneut
  name: "Chili con Carne & Nacho Wrap",
  desc: "Saftiges Chili con Carne, knusprige Nachos & Guacamole – eingewickelt in einem XXL-Wrap, dazu goldene Pommes frites.",
  price: "16",
  currency: "CHF",
  image: "/xtreme-wrap-chili.png",
  tags: ["Chili con Carne", "Nachos", "Guacamole-Pommes"],
}

export default function XtremeWrapModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Immer beim Betreten der Website anzeigen (einmal pro Angebot pro Besucher)
    const seen = localStorage.getItem("xtremeWrapSeen")
    if (seen !== WEEKLY_OFFER.id) {
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const close = () => {
    localStorage.setItem("xtremeWrapSeen", WEEKLY_OFFER.id)
    setIsOpen(false)
  }

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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
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
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image + brand header */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={WEEKLY_OFFER.image}
                alt={WEEKLY_OFFER.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/30 to-transparent" />

              {/* Weekly badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-extrabold uppercase tracking-wide shadow-lg">
                <Star className="w-3.5 h-3.5 fill-black" />
                Angebot der Woche
              </div>

              {/* Xtreme Wraps title */}
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-amber-400 font-bold text-sm uppercase tracking-[0.2em]">
                    Xtreme Wraps
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
                  {WEEKLY_OFFER.name}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6">
              <p className="text-gray-400 text-[15px] leading-relaxed mb-4">
                {WEEKLY_OFFER.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {WEEKLY_OFFER.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {WEEKLY_OFFER.price}
                  </span>
                  <span className="text-lg font-bold text-amber-400">
                    {WEEKLY_OFFER.currency}
                  </span>
                </div>

                <Link
                  to="/reservierung"
                  onClick={close}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.03] transition-all duration-200"
                >
                  Jetzt Reservieren
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
