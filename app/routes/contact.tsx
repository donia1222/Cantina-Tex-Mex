"use client"

import { MapPin, Mail, Clock, PhoneCall, Facebook, Instagram, Download, ArrowRight, Calendar } from "lucide-react"
import handleDownloadVCard from "~/utils/downloadVCard"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@remix-run/react"
import PageLoader from "~/components/PageLoader"

export default function Contact() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-black/60 backdrop-blur-sm" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ HERO ━━━ */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-red-500/10 text-red-400">
              Kontakt
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Besuchen Sie{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
                uns
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Wir freuen uns auf Ihren Besuch in der Cantina Tex-Mex in Buchs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CONTENT ━━━ */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Contact info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-white font-bold mb-1">Adresse</h3>
              <p className="text-gray-400">Bahnhofstrasse 40</p>
              <p className="text-gray-400">9470 Buchs, Schweiz</p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500/15 flex items-center justify-center mb-4">
                <PhoneCall className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-white font-bold mb-1">Telefon</h3>
              <a href="tel:+41817560101" className="text-gray-400 hover:text-white transition-colors">
                +41 81 756 01 01
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold mb-1">E-Mail</h3>
              <a href="mailto:info@cantinatexmex.ch" className="text-gray-400 hover:text-white transition-colors">
                info@cantinatexmex.ch
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-bold mb-1">Öffnungszeiten</h3>
              <p className="text-gray-400">Mi–Fr: 11:30–13:30, 18:00–21:00</p>
              <p className="text-gray-400">Di & Sa: 18:00–22:00</p>
              <p className="text-gray-500 text-sm">So & Mo: Ruhetag</p>
            </motion.div>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <Link
              to="/reservierung"
              className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.02] transition-all"
            >
              <Calendar className="w-5 h-5" />
              Tisch reservieren
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDownloadVCard}
              className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-white/10 border border-white/10 text-gray-300 font-semibold hover:bg-white/15 transition-all"
            >
              <Download className="w-5 h-5" />
              Visitenkarte herunterladen
            </button>
          </motion.div>

          {/* Social + Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col items-center gap-6 pt-8"
          >
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/cantinasevelen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/cantina_badrans/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <img src="/cantina_logocopia.png" alt="Cantina Tex-Mex" className="h-16 w-auto opacity-60" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
