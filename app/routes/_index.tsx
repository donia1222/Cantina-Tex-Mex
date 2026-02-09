"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Clock, MapPin, Phone, Utensils, Wine, ChevronLeft, ChevronRight, Flame, Calendar, Users } from "lucide-react"
import { Link } from "@remix-run/react"
import PageLoader from "~/components/PageLoader"

/* ─── color tokens (Cantina brand) ─── */
const C = {
  gold:    "#f59e0b",
  goldLt:  "#fef3c7",
  red:     "#dc2626",
  redLt:   "#fef2f2",
  green:   "#16a34a",
  greenLt: "#f0fdf4",
}

/* ─── data ─── */
const reviews = [
  { name: "Roland Vogler", rating: 5, comment: "Preiswerte Mittagsmenüs. Gutes Essen (Tex-Mex) und Cocktails.", avatar: "/unnamed.png" },
  { name: "Ralph Heeb", rating: 5, comment: "Reservation von Vorteil... gute Auswahl an Gerichten und Getränke. Sehr nette und aufmerksame Bedienungen.", avatar: "/unnamed-1.png" },
  { name: "Garry Cane", rating: 5, comment: "A very pleasant dining experience with good food. Really busy and very loud. Will be going again!", avatar: "/unnamed-2.png" },
  { name: "C. Mullis", rating: 5, comment: "Dieses Restaurant zeigt was Professionalität heisst. Von Anfang bis zum Schluss einfach nur Top.", avatar: "/unnamed-1-1.png" },
]

const highlights = [
  {
    icon: Flame,
    title: "Tex-Mex Spezialitäten",
    desc: "Authentische mexikanische Küche – von Enchiladas bis Quesadillas, frisch zubereitet mit Liebe.",
    color: C.red,
    bg: C.redLt,
    img: "/img_45701.jpg",
  },
  {
    icon: Wine,
    title: "Exotische Cocktails",
    desc: "Handgemixte Premium-Cocktails und erfrischende Getränke für jeden Geschmack.",
    color: C.gold,
    bg: C.goldLt,
    img: "/alcoholic-beverage-cocktail-with-halves-pear-high-view.jpg",
  },
  {
    icon: Users,
    title: "Einzigartige Atmosphäre",
    desc: "Gemütliches Ambiente mit Terrasse – perfekt für Familienfeiern und gesellige Abende.",
    color: C.green,
    bg: C.greenLt,
    img: "/IMG_2654.jpeg",
  },
]

const galleryImages = [
  "/340871282_193406080143735_4389703553709751881_n.jpg",
  "/340953503_899805901242235_6919901440272749_n-1.jpg",
  "/380463587_6727241030653150_4048382247297197735_n.jpg",
  "/438173186_7653479781362599_697120932184771415_n.jpg",
  "/448072528_1062123745280128_8970901128475452127_n.jpg",
  "/465021723_8545854052134677_9182898130970509210_n.jpg",
]


/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let current = 0
    const step = Math.ceil(target / 40)
    const id = setInterval(() => {
      current += step
      if (current >= target) { current = target; clearInterval(id) }
      setCount(current)
    }, 30)
    return () => clearInterval(id)
  }, [started, target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Star rating ─── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

/* ─── Main page ─── */
export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [reviewIdx, setReviewIdx] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 5000)
    return () => clearInterval(id)
  }, [])

  const nextReview = () => setReviewIdx(i => (i + 1) % reviews.length)
  const prevReview = () => setReviewIdx(i => (i - 1 + reviews.length) % reviews.length)

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━━━ HERO ━━━━━ */}
      <section ref={heroRef} className="relative w-full h-[100vh] min-h-[600px] overflow-hidden rounded-2xl">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          {isMobile ? (
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src="/CANTINA4.MP4" type="video/mp4" />
            </video>
          ) : (
            <img src="/IMG_2654.jpeg" alt="Cantina Tex-Mex" className="w-full h-full object-cover" />
          )}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 rounded-2xl" />

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6"
          style={{ opacity: heroOpacity }}
        >
          <div className="text-center max-w-3xl">
            <div className="mb-6">
              <img src="/cantina_logocopia.png" alt="Cantina Logo" className="h-20 md:h-28 mx-auto drop-shadow-2xl rounded-[10px]" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Cantina
              </span>{" "}
              Tex-Mex
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-light max-w-xl mx-auto mb-3">
              Authentische mexikanische Küche & exotische Cocktails
            </p>

            <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-8">
              <MapPin className="w-4 h-4" />
              <span>Bahnhofstrasse 40, 9470 Buchs</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservierung"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.03] transition-all duration-200"
              >
                Jetzt Reservieren
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-200"
              >
                Speisekarte
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 bg-white/60 rounded-full" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ━━━━━ HIGHLIGHTS ━━━━━ */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto bg-black/50 backdrop-blur-sm rounded-3xl p-6 md:p-12">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: C.goldLt, color: C.gold }}
            >
              Willkommen
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Das erwartet Sie bei uns
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Entdecken Sie authentische Tex-Mex-Küche, handgemixte Cocktails und eine
              einzigartige Atmosphäre im Herzen von Buchs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div key={h.title}>
                <div className="group relative bg-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={h.img}
                      alt={h.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div
                      className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: h.bg }}
                    >
                      <h.icon className="w-6 h-6" style={{ color: h.color }} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{h.title}</h3>
                    <p className="text-gray-400 text-[15px] leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ ABOUT / FEATURES ━━━━━ */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto bg-black/60 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/close-up-woman-holding-tortilla-with-colorful-background.jpg"
                    alt="Tex-Mex Essen"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 md:bottom-6 md:-right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-gray-900">4.7</p>
                      <p className="text-xs text-gray-500 font-medium">Google Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div>
              <div>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                  style={{ background: C.redLt, color: C.red }}
                >
                  Über uns
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
                  Authentische Mexikanische
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                    Küche seit Jahren
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Im Cantina Tex-Mex verbinden wir traditionelle mexikanische Rezepte mit modernem Flair.
                  Jedes Gericht wird mit frischen Zutaten und viel Liebe zubereitet – genau so, wie es sein soll.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Utensils, text: "Frische Zutaten & authentische Rezepte", color: C.red },
                    { icon: Wine, text: "Handgemixte Premium-Cocktails", color: C.gold },
                    { icon: Clock, text: "Tagesmenü Di–Fr, 11:30–13:00", color: C.green },
                    { icon: Calendar, text: "Öffnungszeiten: Di–Sa ab 18:00", color: C.gold },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <span className="text-gray-300 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200"
                    style={{ background: `linear-gradient(135deg, ${C.red}, #ef4444)` }}
                  >
                    Speisekarte entdecken
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ STATS BAR ━━━━━ */}
      <section
        className="py-16 px-4 rounded-3xl mx-2 md:mx-4"
        style={{ background: `linear-gradient(135deg, ${C.red}, #b91c1c)` }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 4, suffix: ".7", label: "Google Bewertung" },
              { value: 50, suffix: "+", label: "Gerichte" },
              { value: 30, suffix: "+", label: "Cocktails" },
              { value: 100, suffix: "%", label: "Frische Zutaten" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-extrabold mb-1">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-white/80 font-medium text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ GALLERY ━━━━━ */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: C.greenLt, color: C.green }}
            >
              Galerie
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Einblicke in unser Restaurant
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src={img}
                  alt="Cantina Impressionen"
                  className="w-full h-56 md:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ REVIEWS ━━━━━ */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: C.goldLt, color: C.gold }}
            >
              Bewertungen
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Was unsere Gäste sagen
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIdx}
                className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-10 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={reviews[reviewIdx].avatar}
                    alt={reviews[reviewIdx].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                  />
                </div>
                <Stars count={reviews[reviewIdx].rating} />
                <p className="text-lg md:text-xl text-gray-300 italic my-6 leading-relaxed">
                  &ldquo;{reviews[reviewIdx].comment}&rdquo;
                </p>
                <p className="font-bold text-white text-lg">{reviews[reviewIdx].name}</p>
                <p className="text-gray-500 text-sm mt-1">Google Bewertung</p>

                <div className="flex justify-center gap-2 mt-6">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIdx(i)}
                      className={`h-2.5 rounded-full transition-all duration-200 ${
                        i === reviewIdx ? "bg-amber-400 w-7" : "bg-gray-600 hover:bg-gray-500 w-2.5"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━ DAILY MENU + RESERVATION CTA ━━━━━ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div
                className="relative rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
                style={{ background: `linear-gradient(135deg, #14532d, #1a3a2a)` }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#22c55e20' }}>
                    <Calendar className="w-7 h-7" style={{ color: '#4ade80' }} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Tagesmenü</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Dienstag bis Freitag<br />
                    11:30 – 13:00 Uhr<br />
                    <span className="text-green-400 font-semibold">Frisch & günstig!</span>
                  </p>
                </div>
                <Link to="/menu" className="inline-flex items-center gap-2 text-green-400 font-bold hover:gap-3 transition-all mt-6">
                  Menü ansehen <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-green-500/10" />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-green-500/5" />
              </div>
            </div>

            <div>
              <div
                className="relative rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
                style={{ background: `linear-gradient(135deg, ${C.red}, #991b1b)` }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Tisch Reservieren</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Reservieren Sie einfach und schnell Ihren Tisch bei uns – online oder telefonisch.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link
                    to="/reservierung"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-white text-red-600 font-bold hover:bg-gray-100 transition-all hover:scale-[1.03]"
                  >
                    Online Reservieren
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ INFO CARDS ━━━━━ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Standort",
                lines: ["Ushuaia & Cantina Tex-Mex", "Bahnhofstrasse 40", "9470 Buchs"],
                color: C.red,
                bg: C.redLt,
              },
              {
                icon: Clock,
                title: "Öffnungszeiten",
                lines: ["Mi–Fr: 11:30–13:30, 18:00–21:00", "Di & Sa: 18:00–22:00", "So & Mo: Ruhetag"],
                color: C.gold,
                bg: C.goldLt,
              },
              {
                icon: Phone,
                title: "Kontakt",
                lines: ["info@cantinatexmex.ch", "Reservierung online", "oder im Restaurant"],
                color: C.green,
                bg: C.greenLt,
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: item.bg }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-gray-400 text-[15px]">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
