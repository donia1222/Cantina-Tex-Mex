"use client"

import ReservationForm from "~/components/Rerserve/ReservationForm"
import CurrentMessage from "~/components/Rerserve/CurrentMessage"
import ContinuousScroll from "~/components/Imagen/Continuous-Scroll-Reserve"
import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dog, Accessibility as Wheelchair, CreditCard } from "lucide-react"
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

      {/* Sin cabecera (20/11/2026): el formulario va arriba del todo y lleva su propio título. */}
      <h1 className="sr-only">Tisch reservieren</h1>

      {/* ━━━ CONTENT ━━━ */}
      <section className="px-2 md:px-4 pt-[84px] md:pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Current message */}
          <CurrentMessage />

          {/* Reservation form */}
          <ReservationForm />

          {/* Service info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Mismo papel crema que el formulario (20/11/2026) */}
            <div className="ct-info">
              <p className="ct-info__titel">Gut zu wissen</p>
              <div className="ct-info__gitter">
                {[
                  { icon: Dog, farbe: "rot", title: "Haustierfreie Zone", desc: "Aus hygienischen Gründen können wir leider keine Haustiere aufnehmen.", crossed: true },
                  { icon: Wheelchair, farbe: "tuerkis", title: "Barrierefrei", desc: "Vollständig rollstuhlgerecht eingerichtet und zugänglich.", crossed: false },
                  { icon: CreditCard, farbe: "gruen", title: "Kartenzahlung", desc: "Alle gängigen Kreditkarten und EC-Karten werden akzeptiert.", crossed: false },
                ].map((item) => (
                  <div key={item.title} className="ct-info__item">
                    <div className={"ct-info__icon ct-info__icon--" + item.farbe}>
                      <item.icon />
                      {item.crossed && <i aria-hidden="true" />}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="ct-info__hinweis">
                <b>Hinweis:</b> Für spezielle Anforderungen kontaktieren Sie uns bitte im Voraus.
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
