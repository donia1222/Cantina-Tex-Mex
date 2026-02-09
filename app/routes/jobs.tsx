"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Calendar, Mail, Share2, ChefHat, CheckCircle2 } from "lucide-react"
import PageLoader from "~/components/PageLoader"

export default function Jobs() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-black/60 backdrop-blur-sm" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ HERO with background image ━━━ */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-amber-500/10 text-amber-400">
              Karriere
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Werde Teil unseres{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
                Teams
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Wir suchen einen engagierten Koch, der unser Küchenteam in der Cantina Tex-Mex verstärkt.
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
            className="relative rounded-3xl overflow-hidden h-[280px] md:h-[350px]"
          >
            <img
              src="/koch.jpeg"
              alt="Koch in der Küche"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Koch (m/w/d)</h2>
                  <p className="text-gray-300 text-sm">Cantina Tex-Mex, Buchs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ JOB DETAILS ━━━ */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Schedule + Contract */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Arbeitszeiten</h3>
              <p className="text-gray-200 text-base">Dienstag bis Samstag</p>
              <p className="text-gray-200 text-base">Sonntag und Montag frei</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
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
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
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
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold mb-4">Was wir erwarten</h3>
            <div className="space-y-3">
              {[
                "Erfahrung in der Küche wünschenswert",
                "Leidenschaft fürs Kochen",
                "Teamfähigkeit und Zuverlässigkeit",
                "Flexibilität bei den Arbeitszeiten",
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
            className="bg-gradient-to-br from-amber-500/15 to-red-500/10 border border-amber-500/20 rounded-3xl p-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Bewerben Sie sich jetzt!</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Bitte senden Sie uns Ihren Lebenslauf direkt per E-Mail. Wir freuen uns auf Ihre Bewerbung!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:info@cantinatexmex.ch?subject=Bewerbung als Koch"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.03] transition-all"
              >
                <Mail className="w-5 h-5" />
                Bewerben
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "Stellenangebot: Koch bei Cantina Tex-Mex",
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
