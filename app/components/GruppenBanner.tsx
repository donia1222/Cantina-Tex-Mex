"use client"

import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { ChevronRight, Gift } from "lucide-react"

/**
 * Banner que anuncia los menús de grupo y el Weihnachtsessen, y lleva a /gruppen.
 * Está aparte para poder colgarlo de cualquier página (Home y Speisekarte).
 * 20/11/2026: al estilo «papel» del resto de la web (tarjeta crema, foto a un lado,
 * título rotulado en rojo); antes era una franja oscura sobre la foto.
 */
export default function GruppenBanner({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className={`max-w-5xl mx-auto ${className}`}
    >
      <Link to="/gruppen" className="papel papel--klein group flex items-stretch overflow-hidden">
        {/* Foto de la mesa mexicana: franja a la izquierda */}
        <div className="relative w-28 sm:w-60 flex-shrink-0 overflow-hidden">
          <img
            src="/gruppen-banner.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#d61f26] text-white grid place-items-center shadow-md">
            <Gift className="w-5 h-5" />
          </span>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-5 px-4 py-4 sm:px-7 sm:py-6">
          <div className="flex-1 min-w-0">
            <span className="papel-kicker !mb-1 !text-[11px] sm:!text-xs">
              Weihnachtsessen<span className="hidden sm:inline"> &amp; Gruppen</span>
            </span>
            <span className="papel-titel block text-2xl sm:text-4xl">Gruppenangebote 2026</span>
            <span className="mt-1.5 block text-sm sm:text-base" style={{ color: "var(--tinta2)" }}>
              Menüs für Ihre Feier
              <span className="hidden sm:inline"> – Weihnachtsessen, Firmen, Vereine und Familien</span>
            </span>
          </div>
          <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d61f26] text-white grid place-items-center transition-transform duration-300 group-hover:translate-x-1">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
