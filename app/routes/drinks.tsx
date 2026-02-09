"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Wine,
  Beer,
  GlassWater,
  CupSoda,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import PageLoader from "~/components/PageLoader"

const drinkCategories = [
  {
    id: "cocktails",
    name: "Cocktails",
    desc: "Handgemixte Klassiker & Specials",
    icon: Wine,
    color: "#f59e0b",
    image: "/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg",
    items: ["Sex on the Beach", "Margarita", "Caipirinha", "Mojito", "Piña Colada", "Tequila Sunrise", "Pitufa"],
  },
  {
    id: "alkoholfrei",
    name: "Alkoholfreie Cocktails",
    desc: "Frisch & fruchtig ohne Alkohol",
    icon: GlassWater,
    color: "#22d3ee",
    image: "/47403431_l-2-12.jpg",
    items: ["Caipirohne", "Stress Killer", "Malibu Dreams", "Pitufo", "Santa Fresana"],
  },
  {
    id: "biere",
    name: "Biere",
    desc: "Vom Fass & Flaschenbiere",
    icon: Beer,
    color: "#f97316",
    image: "/341036281_572225944890060_1041368497201730289_n.jpg",
    items: ["Feldschlösschen Flaschen", "Alkoholfreies Bier", "Paulaner Weissbier", "Sol", "Corona extra", "Desperado", "San Miguel"],
  },
  {
    id: "sussgetranke",
    name: "Süssgetränke",
    desc: "Erfrischende Softdrinks",
    icon: CupSoda,
    color: "#ef4444",
    image: "/IMG_1696.jpeg",
    items: ["Jarritos", "Shorley", "Rivella", "Fanta", "Cola", "Cola 0", "Icetea"],
  },
]

const margaritas = [
  { name: "Margarita mit Mango", image: "/IMG_083w.jpeg", desc: "Mit einem Hauch von Blue Curaçao" },
  { name: "Klassische Margarita", image: "/IMG_0897.jpeg", desc: "Die klassischste und frischeste" },
  { name: "Erdbeer Margarita", image: "/IMG_1009.jpeg", desc: "Best Margaritas in town!" },
]

export default function Drinks() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSlideIdx((i) => (i + 1) % margaritas.length), 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [activeCategory])

  const activeData = drinkCategories.find((c) => c.id === activeCategory)

  return (
    <><div className="bg-black/60 backdrop-blur-sm" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-amber-500/10 text-amber-400">
              Getränkekarte
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Unsere{" "}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Getränke
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Handgemixte Cocktails, frische alkoholfreie Drinks, internationale Biere und erfrischende Softdrinks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ MARGARITA SHOWCASE ━━━ */}
      <section className="px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-[350px] md:h-[420px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIdx}
                src={margaritas[slideIdx].image}
                alt={margaritas[slideIdx].name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{margaritas[slideIdx].name}</h3>
                  <p className="text-gray-300">{margaritas[slideIdx].desc}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-2 mt-4">
                {margaritas.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === slideIdx ? "bg-amber-400 w-7" : "bg-white/30 w-2.5 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={() => setSlideIdx((i) => (i - 1 + margaritas.length) % margaritas.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSlideIdx((i) => (i + 1) % margaritas.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━ DRINK CATEGORIES GRID ━━━ */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {drinkCategories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setActiveCategory(cat.id)}
                className="group relative rounded-2xl overflow-hidden text-left h-56"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                    style={{ background: `${cat.color}25` }}
                  >
                    <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-1">{cat.name}</h3>
                  <p className="text-gray-200 text-base">{cat.desc}</p>
                  <p className="text-gray-300 text-sm mt-1">{cat.items.length} Getränke</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>

      {/* ━━━ CATEGORY MODAL ━━━ */}
      <AnimatePresence>
        {activeCategory && activeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveCategory(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="relative h-56 md:h-64 flex-shrink-0">
                <img
                  src={activeData.image}
                  alt={activeData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      style={{ background: `${activeData.color}30` }}
                    >
                      <activeData.icon className="w-7 h-7" style={{ color: activeData.color }} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-white">{activeData.name}</h2>
                      <p className="text-gray-300 text-base">{activeData.desc}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{activeData.items.length} Getränke</span>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal content */}
              <div className="overflow-y-auto flex-grow p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeData.items.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-5 py-4 hover:bg-white/10 transition-colors"
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: activeData.color }}
                      />
                      <span className="text-white font-semibold text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
