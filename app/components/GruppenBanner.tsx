"use client"

import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { Gift, ChevronRight } from "lucide-react"

/**
 * Banner que anuncia los menús de grupo y el Weihnachtsessen, y lleva a /gruppen.
 * Está aparte para poder colgarlo de cualquier página; hoy va arriba de la Speisekarte.
 */
export default function GruppenBanner({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className={`max-w-5xl mx-auto ${className}`}
    >
      <Link
        to="/gruppen"
        className="group relative block overflow-hidden rounded-3xl border border-amber-500/30 bg-[#2a1710] px-6 py-7 sm:px-8 sm:py-8 hover:border-amber-400/60 transition-colors duration-300"
      >
        {/* Foto de la mesa mexicana de fondo, con un velo oscuro encima para que el texto se lea. */}
        <img
          src="/gruppen-banner.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />

        {/* Brillo que cruza el banner cada pocos segundos */}
        <motion.span
          aria-hidden="true"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="relative flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0"
          >
            <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-amber-300 mb-1">
              {/* En el móvil no cabe la línea entera: la parte larga solo a partir de sm. */}
              Weihnachtsessen<span className="hidden sm:inline"> &amp; Gruppen</span>
            </span>
            <span className="block text-white font-extrabold text-xl sm:text-3xl leading-tight">
              Gruppenangebote 2026
            </span>
            <span className="mt-1 block text-gray-300 text-sm sm:text-base">
              Menüs für Ihre Feier
              <span className="hidden sm:inline"> – Weihnachtsessen, Firmen, Vereine und Familien</span>
            </span>
          </div>
          {/* La flecha va en su propio círculo: encima de la foto, sola, se perdía. */}
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-black/55 border border-amber-300/30 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
