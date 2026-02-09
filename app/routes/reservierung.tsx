"use client"

import ReservationForm from "~/components/Rerserve/ReservationForm"
import CurrentMessage from "~/components/Rerserve/CurrentMessage"
import ContinuousScroll from "~/components/Imagen/Continuous-Scroll-Reserve"
import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dog, ShipWheelIcon as Wheelchair, CreditCard } from "lucide-react"
import PageLoader from "~/components/PageLoader"

const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-black/60 backdrop-blur-sm" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ HERO ━━━ */}
      <section className="pt-20 pb-2 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-red-500/10 text-red-400">
              Reservierung
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Tisch{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
                reservieren
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CONTENT ━━━ */}
      <section className="px-2 md:px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Current message */}
          <CurrentMessage />

          {/* Reservation form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-8">
            <ReservationForm />
          </div>

          {/* Service info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-center mb-5">Service-Informationen</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Dog,
                  color: "amber",
                  title: "Haustierfreie Zone",
                  desc: "Aus hygienischen Gründen können wir leider keine Haustiere aufnehmen.",
                  crossed: true,
                },
                {
                  icon: Wheelchair,
                  color: "blue",
                  title: "Barrierefrei",
                  desc: "Vollständig rollstuhlgerecht eingerichtet und zugänglich.",
                  crossed: false,
                },
                {
                  icon: CreditCard,
                  color: "green",
                  title: "Kartenzahlung",
                  desc: "Alle gängigen Kreditkarten und EC-Karten werden akzeptiert.",
                  crossed: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/15 flex items-center justify-center mx-auto mb-4 relative`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                    {item.crossed && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-9 h-0.5 bg-red-400 rotate-45" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-sm">
                <span className="text-red-400 font-semibold">Hinweis:</span> Für spezielle Anforderungen kontaktieren Sie uns bitte im Voraus.
              </p>
            </div>
          </motion.div>

          {/* Scroll images */}
          <ContinuousScroll />
        </div>
      </section>
    </div>
  )
}

export default IndexPage
