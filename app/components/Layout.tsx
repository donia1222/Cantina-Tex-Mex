"use client"

import type React from "react"
import { Link, useLocation } from "@remix-run/react"
import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Home,
  UtensilsCrossed,
  Beer,
  MapPin,
  Clock,
  ArrowUp,
  Download,
  BookCheck,
  ArrowRight,
  Phone,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import RestaurantStatus from "~/components/Rerserve/RestaurantStatus"
import BackgroundImages from "~/components/Imagen/BackgroundImages"
import handleDownloadVCard from "~/utils/downloadVCard"

const menuItems = [
  { to: "/", icon: Home, label: "Startseite" },
  { to: "/menu", icon: UtensilsCrossed, label: "Speisekarte" },
  { to: "/drinks", icon: Beer, label: "Getränke" },
  { to: "/contact", icon: BookCheck, label: "Kontakt" },
  { to: "/reservierung", icon: BookCheck, label: "Reservierung" },
  { to: "/jobs", icon: ArrowRight, label: "Jobs" },
]

export default function Component({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [impressumOpen, setImpressumOpen] = useState(false)
  const [datenschutzOpen, setDatenschutzOpen] = useState(false)
  const [cookieConsent, setCookieConsent] = useState(false)
  const [showUpButton, setShowUpButton] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      setShowUpButton(window.scrollY > 800)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) setCookieConsent(true)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      {/* Background Images */}
      <div className="fixed inset-0 z-0">
        <BackgroundImages />
      </div>

      {/* SVG Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.6257413380501518" fill="#ffffff" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      {/* ━━━ HEADER ━━━ */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "lg:bg-[#111118]/90 lg:backdrop-blur-xl lg:shadow-lg lg:shadow-black/10 lg:border-b lg:border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/logo3-copia1.png" alt="Cantina Tex-Mex" className="h-9 w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const active = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                      active
                        ? "text-amber-400"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/reservierung"
                className="inline-flex items-center h-11 px-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-[15px] shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.03] transition-all duration-200"
              >
                Reservieren
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ━━━ MOBILE MENU OVERLAY ━━━ */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Slide-in panel */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-[300px] bg-[#1a1a2e] shadow-2xl lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <img src="/cantina_logocopia.png" alt="Cantina" className="h-9 w-auto rounded-md" />
                <button
                  onClick={closeMenu}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                {menuItems.map((item, index) => {
                  const active = location.pathname === item.to
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 mb-1 ${
                          active
                            ? "bg-amber-500/10 text-amber-400"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.label}</span>
                        {active && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-white/10">
                <Link
                  to="/reservierung"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg"
                >
                  Jetzt Reservieren
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ━━━ SCROLL TO TOP ━━━ */}
      <AnimatePresence>
        {showUpButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-2xl bg-[#1a1a2e] border border-white/10 text-amber-400 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ━━━ MAIN CONTENT ━━━ */}
      <main className="relative z-10 flex-grow">{children}</main>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="relative z-10 mt-0 bg-black/60 backdrop-blur-sm">
        {/* Main footer */}
        <div className="bg-gray-900/95 backdrop-blur-md rounded-t-3xl mx-2 md:mx-4 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Top: Logo + CTA */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <img src="/cantina_logocopia.png" alt="Cantina Tex-Mex" className="h-12 w-auto" />
                <div>
                  <p className="text-white font-bold text-lg">Cantina Tex-Mex</p>
                  <RestaurantStatus />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadVCard}
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white/10 text-gray-300 font-semibold text-sm hover:bg-white/15 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Visitenkarte
                </button>
                <Link
                  to="/reservierung"
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all"
                >
                  Reservieren
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Middle: 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Links */}
              <div>
                <h4 className="text-gray-400 font-semibold text-xs uppercase tracking-widest mb-4">Navigation</h4>
                <div className="grid grid-cols-2 gap-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors py-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-gray-400 font-semibold text-xs uppercase tracking-widest mb-4">Kontakt</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    Bahnhofstrasse 40, 9470 Buchs
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-400" />
                    info@cantinatexmex.ch
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h4 className="text-gray-400 font-semibold text-xs uppercase tracking-widest mb-4">Öffnungszeiten</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Mi–Fr: 11:30–13:30, 18:00–21:00</p>
                  <p>Di & Sa: 18:00–22:00</p>
                  <p className="text-gray-600">So & Mo: Ruhetag</p>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
              <p className="text-gray-600 text-xs">
                &copy; 2026 Cantina Tex-Mex. Alle Rechte vorbehalten.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <button onClick={() => setImpressumOpen(true)} className="text-gray-500 hover:text-white transition-colors">
                  Impressum
                </button>
                <button onClick={() => setDatenschutzOpen(true)} className="text-gray-500 hover:text-white transition-colors">
                  Datenschutz
                </button>
              </div>
            </div>

            {/* lweb.ch banner */}
            <a
              href="https://lweb.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-8 group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff69b4]/10 via-purple-500/10 to-blue-500/10 border border-white/5 p-4 hover:border-[#ff69b4]/30 transition-all duration-300">
                <div className="flex items-center justify-center gap-3">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-0.5">Moderne & individuelle Webseiten</p>
                    <p className="text-lg font-bold">
                      <span className="bg-gradient-to-r from-[#ff69b4] via-purple-400 to-blue-400 bg-clip-text text-transparent">
                        lweb.ch
                      </span>
                    </p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#ff69b4]/5 group-hover:bg-[#ff69b4]/10 transition-colors" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </footer>

      {/* ━━━ COOKIE CONSENT ━━━ */}
      <AnimatePresence>
        {cookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-2xl mx-auto bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-gray-300 text-[15px] mb-4">
                Wir verwenden Cookies, um Ihre Erfahrung auf unserer Webseite zu verbessern.
                Durch das Akzeptieren stimmen Sie der Verwendung von Cookies zu.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem("cookieConsent", "true")
                    setCookieConsent(false)
                  }}
                  className="h-10 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors"
                >
                  Akzeptieren
                </button>
                <button
                  onClick={() => (window.location.href = "https://www.cantinatexmex.ch")}
                  className="h-10 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-semibold text-sm transition-colors"
                >
                  Ablehnen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ IMPRESSUM MODAL ━━━ */}
      <AnimatePresence>
        {impressumOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setImpressumOpen(false)} />
            <motion.div
              className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-5">Impressum</h2>
              <div className="text-gray-400 space-y-1 text-[15px]">
                <p className="text-white font-semibold">flomic GmbH</p>
                <p>Bahnhofstrasse 40</p>
                <p>9470 / Buchs</p>
                <p className="mt-4 text-gray-500">
                  Webseite Design{" "}
                  <a href="https://lweb.ch" target="_blank" rel="noopener noreferrer" className="text-[#ff69b4] hover:underline">
                    lweb.ch
                  </a>
                </p>
              </div>
              <p className="mt-6 text-sm text-gray-600">
                einige Bilder stammen von{" "}
                <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline">
                  Freepik
                </a>
              </p>
              <button
                onClick={() => setImpressumOpen(false)}
                className="mt-6 h-10 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors"
              >
                Schließen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ DATENSCHUTZ MODAL ━━━ */}
      <AnimatePresence>
        {datenschutzOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDatenschutzOpen(false)} />
            <motion.div
              className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-white text-center mb-5">Datenschutzerklärung</h2>
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-gray-400 text-[15px] leading-relaxed">
                <section>
                  <h3 className="text-lg font-bold text-white mb-2">DATENSCHUTZ</h3>
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                    personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
                    dieser Datenschutzerklärung.
                  </p>
                  <p className="mt-3">
                    Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf
                    unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben
                    werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre
                    ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                  </p>
                  <p className="mt-3">
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                    Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                    nicht möglich.
                  </p>
                  <p className="mt-3">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <p className="mt-2 text-gray-300">flomic GmbH<br />Bahnhofstrasse 40<br />9470 / Buchs<br />Schweiz</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-2">COOKIES</h3>
                  <p>
                    Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
                    Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher,
                    effektiver und sicherer zu machen.
                  </p>
                  <p className="mt-3">
                    Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                    Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                    ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-2">SSL-VERSCHLÜSSELUNG</h3>
                  <p>
                    Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte
                    eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
                    des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-2">GOOGLE ANALYTICS</h3>
                  <p>
                    Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc.,
                    1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
                  </p>
                  <p className="mt-3">
                    Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf
                    Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-2">IP ANONYMISIERUNG</h3>
                  <p>
                    Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse
                    von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des
                    Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-2">GOOGLE WEB FONTS</h3>
                  <p>
                    Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google
                    bereitgestellt werden. Weitere Informationen zu Google Web Fonts finden Sie unter{" "}
                    <a href="https://developers.google.com/fonts/faq" className="text-amber-400 hover:underline">
                      developers.google.com/fonts/faq
                    </a>
                    .
                  </p>
                </section>
              </div>
              <div className="flex justify-center mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setDatenschutzOpen(false)}
                  className="h-10 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
