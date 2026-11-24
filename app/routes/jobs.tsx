"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Calendar, Mail, Share2, HandPlatter, CheckCircle2 } from "lucide-react"
import PageLoader from "~/components/PageLoader"
import Picado from "~/components/Picado"
import { redirect } from "@remix-run/node"

// 24/11/2026: ya no buscan a nadie. /jobs manda a la portada (302, temporal) en vez de enseñar la oferta.
// Para volver a publicarla: borrar este loader y devolver «Jobs» al menú en components/Layout.tsx.
export const loader = () => redirect("/", 302)

export default function Jobs() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ HERO with background image ━━━ */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 kopf-pille kopf-pille--gelb">
              Karriere
            </span>
            <h1 className="pincel text-4xl md:text-6xl text-white mb-4">
              Werde Teil unseres{" "}
              <span className="text-amber-400">
                Teams
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto kopf-text">
              Wir suchen eine Aushilfe im Service: als Kellner oder Kellnerin, zur Unterstützung an den Wochenenden.
              Melden Sie sich einfach bei uns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ JOB IMAGE ━━━ */}
      <section className="px-4 mb-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="papel overflow-hidden p-2"
          >
            {/* Foto: Kate Townsend en Unsplash (licencia Unsplash), photo-1516788875874.
                object-[45%_42%]: así la bandeja con las copas queda dentro también en el móvil. */}
            <img
              src="/jobs-service.jpg"
              alt="Kellner mit einem Tablett voller Getränke"
              className="block w-full h-[220px] md:h-[300px] object-cover object-[45%_42%] rounded-[22px]"
            />
            <div className="px-4 md:px-5 pt-4 pb-3">
              <div className="flex items-center gap-3">
                <div className="papel-icon papel-icon--gelb w-12 h-12 flex-shrink-0">
                  <HandPlatter className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="pincel text-2xl text-white">Aushilfe Service <span className="text-amber-400">(Kellner/in)</span></h2>
                  <p className="text-gray-300 text-sm">Ushuaia Cantina, Buchs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ JOB DETAILS ━━━ */}
      <section className="px-4 pb-20">
        <div className="papel mit-picado max-w-4xl mx-auto space-y-6 px-4 pb-6 md:px-8 md:pb-8">
          <Picado n={16} />
          {/* Schedule + Contract */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 !shadow-[0_0_0_1.5px_rgba(29,20,16,0.07)] !border-0"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Arbeitszeiten</h3>
              <p className="text-gray-200 text-base">Vor allem am Wochenende</p>
              <p className="text-gray-200 text-base">Zeiten nach Absprache</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 !shadow-[0_0_0_1.5px_rgba(29,20,16,0.07)] !border-0"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Vertrag</h3>
              <p className="text-gray-200 text-base">Stundenbasierter Vertrag</p>
              <p className="text-gray-200 text-base">Flexible Einsatzzeiten möglich</p>
            </motion.div>
          </div>

          {/* What we offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 !shadow-[0_0_0_1.5px_rgba(29,20,16,0.07)] !border-0"
          >
            <h3 className="text-white font-bold mb-4">Was wir bieten</h3>
            <div className="space-y-3">
              {[
                "Ein freundliches und dynamisches Arbeitsumfeld",
                "Faire Bezahlung",
                "Möglichkeit zur beruflichen Weiterentwicklung",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200 text-base">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What we expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 !shadow-[0_0_0_1.5px_rgba(29,20,16,0.07)] !border-0"
          >
            <h3 className="text-white font-bold mb-4">Was wir erwarten</h3>
            <div className="space-y-3">
              {[
                "Mithilfe im Service: Gäste bedienen, Getränke servieren, Tische abräumen",
                "Keine Erfahrung nötig, wir zeigen Ihnen alles",
                "Freundliches Auftreten und Freude am Kontakt mit Gästen",
                "Teamfähigkeit und Zuverlässigkeit",
                "Zeit an den Wochenenden",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200 text-base">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#fef3c7] rounded-3xl p-8 text-center"
          >
            <h2 className="pincel text-2xl md:text-3xl text-white mb-3">Kontaktieren Sie uns <span className="text-amber-400">einfach!</span></h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Bitte kontaktieren Sie uns per E-Mail. Ein kurzes Wort über Sie genügt, wir melden uns bei Ihnen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:info@cantinatexmex.ch?subject=Aushilfe Service bei der Cantina Tex-Mex"
                className="btn-brocha"
              >
                Kontakt aufnehmen
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "Stellenangebot: Aushilfe Service (Kellner/in) bei Cantina Tex-Mex",
                        text: "Schau dir diese Stellenanzeige bei Cantina Tex-Mex an!",
                        url: window.location.href,
                      })
                      .catch(() => {})
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white/10 border border-white/10 text-gray-300 font-semibold hover:bg-white/15 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Teilen
              </button>
            </div>

            <p className="mt-5 text-gray-500 text-sm">
              Wir werden uns so schnell wie möglich bei Ihnen melden.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
