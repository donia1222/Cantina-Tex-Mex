"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  X,
  Utensils,
  Salad,
  Beef,
  FishIcon as Shrimp,
  BirdIcon as Chicken,
  Carrot,
  Clock,
  Flame,
  IceCreamCone,
  Baby,
  ChevronRight,
  Leaf,
} from "lucide-react"
import PageLoader from "~/components/PageLoader"

const menuSections = [
  {
    id: "vorspeisen",
    name: "Vorspeisen",
    desc: "Frische Starter & Klassiker",
    icon: Salad,
    color: "#FF6B6B",
    image: "96771444_3048192125224744_9026765579553341440_n.jpg",
  },
  {
    id: "texas",
    name: "Texas",
    desc: "BBQ, Burger & mehr",
    icon: Flame,
    color: "#4ECDC4",
    image: "439906677_1038135431012293_4590580434033471940_n.jpg",
  },
  {
    id: "mexico",
    name: "Mexico",
    desc: "Fajitas, Burritos & Enchiladas",
    icon: Utensils,
    color: "#f59e0b",
    image: "271206981_4690667750986679_6769410685630349301_n.jpg",
  },
  {
    id: "kinder",
    name: "Kinder",
    desc: "Für unsere kleinen Gäste",
    icon: Baby,
    color: "#FFA07A",
    image: "/271248933_4690667767653344_444005926034541016_n.jpg",
  },
  {
    id: "desserts",
    name: "Desserts",
    desc: "Süsse Versuchungen",
    icon: IceCreamCone,
    color: "#C06C84",
    image: "/440017389_1038135447678958_7213220999231999312_n.jpg",
  },
] as const

type SectionId = (typeof menuSections)[number]["id"]

type SubMenuItem = {
  name: string
  description: string
}

type MenuItem = {
  name: string
  price?: number
  description?: string
  subItems?: SubMenuItem[]
  vegi?: boolean
}

type MenuData = Record<SectionId, MenuItem[]>

export const loader: LoaderFunction = async () => {
  const menuItems: MenuData = {
    vorspeisen: [
      { name: "Chips mit Sauce", description: "Weizen Chips mit Guacamole und Salsa", vegi: true },
      { name: "Onion Rings", description: "Frittierte Zwiebelringe, dazu Salsa und Sour Cream", vegi: true },
      { name: "Sopa de maiz con Chili", description: "Maissuppe, serviert mit einem pikanten Red Chili Popper", vegi: true },
      { name: "Grüner Salat", description: "Verschiedene knackige Blattsalate mit Brotcroûtons", vegi: true },
      { name: "Gemischter Salat", description: "Gemischte Salate mit Avocadostreifen", vegi: true },
      { name: "Nachos mit Cheese", description: "Mais Chips mit Salsa und Sour Cream mit Mozzarella und Cheddar Cheese überbacken", vegi: true },
      { name: "The Real Caesar Salad", description: "Eisbergsalat mit Parmesan, Brotcroûtons, Ceasar Sauce und knusprigen Speckwürfeli" },
      { name: 'Salat "Cantina"', description: "Grosser gemischter Salat mit Pouletstreifen Onion Rings und Tortilla Chips" },
      { name: "Macho Nachos", description: "Mais Chips mit hausgemachtem Chili con Carne mit Mozzarella und Cheddar Cheese überbacken" },
      { name: "Gambas al ajillo", description: "Sautierte Crevetten mit Knoblauch und Olivenöl flambiert mit Brandy" },
      { name: "Mexikanische Vorspeisenplatte", description: "Nachos, Quesadilla, Guacamole, Onion Rings, Chicken Fingers, Crevetten (ab 2 Personen, Preis pro Person)" },
      { name: "Chips-Chicken Fingers", description: "6 Stück Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade Mozzarella Sticks" },
    ],
    texas: [
      { name: "Baked Potatoes", description: "Kartoffelscheiben gemischt mit verschiedenen Gemüsen goldbraun überbacken mit Mozzarella und Cheddar", vegi: true },
      { name: "Chicken Potatoes", description: "Kartoffelscheiben gemischt mit knackigem Broccoli und gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken" },
      { name: "Shrimps Potatoes", description: "Kartoffelscheiben gemischt mit Crevetten, Cherry Tomaten und Kräuter, gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken" },
      { name: "Chicken Fingers", description: "Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade dazu Pommes" },
      { name: "Cantiworker", description: "200 Gramm 100% Black Angus Rindfleisch. Mit Eisbergsalat, roten Zwiebeln, Cheddar Cheese, hausgemachter BBQ Sauce und…viel Liebe gefüllt" },
      { name: "Cantina Spiess 250gr", description: "Saftiger gemischter Fleischspiess mit Country Fries und Knoblauchbrot, dazu Saucen zum Dippen" },
      { name: "Rancher Steak 200gr", description: "Rindsentrecôte, gratiniert mit Kräuterbutter und Parmesan, dazu Pommes, Onion Rings und Saucen zum Dippen" },
    ],
    mexico: [
      { name: "Fajitas", description: "Mit Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse" },
      { name: "Quesadillas de Tomate y maiz", description: "Mit frischen Tomaten und Mais", vegi: true },
      { name: "Quesadillas de Pollo", description: "Mit Pouletfleisch" },
      { name: "Quesadillas de Chorizo", description: "Mit pikantem Chorizo" },
      { name: "Quesadillas res y pimiento", description: "Mit Rindshuftwürfeli und Peperoni" },
      { name: "Quesadillas mar y tierra", description: "Mit Crevetten und Broccoli" },
      { name: "Burritos con verdura", description: "Grosse, gerollte Weizentortillas gefüllt mit frischem Gemüse, dazu Sour Cream und Salsa serviert mit Tomatenreis oder Salat", vegi: true },
      { name: "Burritos con Pollo y Res", description: "Grosse, gerollte Weizentortillas gefüllt mit Mais, Paprika Poulet-/Rindfleisch, dazu Sour Cream und Salsa, serviert mit Tomatenreis oder Salat" },
      { name: "Chili con Carne", description: "Rindfleisch mit Chili, frischen Tomaten, Mais und Kidneybohnen, serviert im Reisring" },
      { name: "Enchiladas", description: "Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse" },
    ],
    kinder: [
      { name: "Kalbswürstchen am Spiess", description: "Serviert mit Pommes" },
      { name: "Chicken Fingers mit Pommes", description: "Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade" },
      { name: "Mini Burritos mit Pouletfleisch", description: "" },
    ],
    desserts: [
      { name: "Flan de Coco", description: "Kokos-Flan serviert mit frischer Ananas und Schlagrahm" },
      { name: "Tarta de la casa", description: "Süsse Köstlichkeit nach Geheimrezept" },
      { name: "Churros", description: "Serviert mit Glace und Schokoladensauce" },
      { name: "Choco Banana", description: "2 Kugeln Bananenglace mit heisser Schokoladensauce und Schlagrahm" },
      { name: "Copa Silvestre", description: "Erdbeerglace, Vanilleglace, Merengue und heisse Beerensauce" },
      { name: "Don Chocolate", description: "Schokoladenglace, Moccaglace, Tobleronestückchen und Schlagrahm" },
      { name: "Mexican Coffee", description: "Kaffeeglace gemischt mit heissem Espresso, Kahlúa Likör und Schlagrahm" },
    ],
  }

  return json(menuItems)
}

export default function Menu() {
  const menuItems = useLoaderData<MenuData>()
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [showMittagsmenu, setShowMittagsmenu] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const closeModal = () => {
    setActiveSection(null)
    setShowMittagsmenu(false)
  }

  useEffect(() => {
    if (activeSection || showMittagsmenu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [activeSection, showMittagsmenu])

  const ersterGang = ["Salat", "Suppe", "Nachos", "Hausgemachte Chips"]

  return (
    <><div className="bg-black/60 backdrop-blur-sm" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <PageLoader loading={loading} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-red-500/10 text-red-400">
              Speisekarte
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Unsere{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
                Spezialitäten
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Entdecken Sie authentische Tex-Mex-Küche mit frischen Zutaten und traditionellen Rezepten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ MITTAGSMENU BANNER ━━━ */}
      <section className="px-4 mb-12">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setShowMittagsmenu(true)}
          className="w-full max-w-5xl mx-auto block"
        >
          <div className="relative bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6 md:p-8 overflow-hidden group hover:border-amber-500/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Mittagsmenü</h2>
                <p className="text-gray-400">
                  Mittwoch bis Freitag, 11:30 – 13:30 Uhr
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold text-lg">ab Fr. 18.50</span>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                  <ChevronRight className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/5" />
            <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-red-500/5" />
          </div>
        </motion.button>
      </section>

      {/* ━━━ MENU GRID ━━━ */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {menuSections.map((section, i) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setActiveSection(section.id)}
                className="group relative rounded-2xl overflow-hidden text-left h-64"
              >
                <img
                  src={section.image}
                  alt={section.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${section.color}25` }}
                  >
                    <section.icon className="w-5 h-5" style={{ color: section.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{section.name}</h3>
                  <p className="text-gray-400 text-sm">{section.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* No takeaway notice */}
          <div className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              <X className="w-4 h-4" />
              Wir bieten kein Essen zum Mitnehmen an
            </p>
          </div>
        </div>
      </section>
    </div>

      {/* ━━━ MENU ITEMS MODAL ━━━ */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="relative h-40 flex-shrink-0">
                <img
                  src={menuSections.find((s) => s.id === activeSection)?.image}
                  alt={menuSections.find((s) => s.id === activeSection)?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  {(() => {
                    const sec = menuSections.find((s) => s.id === activeSection)
                    if (!sec) return null
                    return (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${sec.color}25` }}
                      >
                        <sec.icon className="w-5 h-5" style={{ color: sec.color }} />
                      </div>
                    )
                  })()}
                  <h2 className="text-2xl font-bold text-white">
                    {menuSections.find((s) => s.id === activeSection)?.name}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal content */}
              <div className="overflow-y-auto flex-grow p-6 space-y-3">
                {menuItems[activeSection].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/8 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold">{item.name}</h3>
                          {item.vegi && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-medium">
                              <Leaf className="w-3 h-3" />
                              Vegi
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {item.subItems && (
                      <div className="mt-3 pl-3 border-l-2 border-white/10 space-y-1">
                        {item.subItems.map((sub) => (
                          <p key={sub.name} className="text-gray-400 text-sm">
                            <span className="text-gray-300">{sub.name}</span>
                            {sub.description && ` – ${sub.description}`}
                          </p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ MITTAGSMENU MODAL ━━━ */}
      <AnimatePresence>
        {showMittagsmenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-amber-500/20 to-red-500/10 p-8 text-center flex-shrink-0 border-b border-white/10">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                    <Utensils className="w-7 h-7 text-amber-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Mittagsmenü</h2>
                <p className="text-gray-400 mb-4">
                  Authentische mexikanische Aromen im Herzen der Stadt
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Mittwoch – Freitag, 11:30 – 13:30
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-grow p-6 space-y-6">
                {/* Menu options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "Menü", price: "19.50", color: "amber", icon: Utensils, desc: "Traditionelle Rezepte" },
                    { name: "Vegetarisch", price: "18.50", color: "green", icon: Salad, desc: "Voller Geschmack" },
                    { name: "Spezial", price: "28.50", color: "orange", icon: Beef, desc: "Premium-Zutaten" },
                  ].map((menu) => (
                    <div
                      key={menu.name}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/8 transition-colors"
                    >
                      <menu.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                      <h3 className="text-white font-bold mb-1">{menu.name}</h3>
                      <p className="text-gray-500 text-xs mb-2">{menu.desc}</p>
                      <p className="text-amber-400 font-bold text-lg">Fr. {menu.price}</p>
                    </div>
                  ))}
                </div>

                {/* Vorspeise */}
                <div>
                  <h3 className="text-white font-bold text-center mb-3">Vorspeise nach Wahl</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ersterGang.map((item) => (
                      <div
                        key={item}
                        className="bg-white/5 border border-white/5 rounded-xl py-2.5 px-3 text-center"
                      >
                        <p className="text-gray-300 text-sm font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 text-center">
                  <p className="text-gray-300 text-sm mb-1">
                    Jedes Menü enthält eine Vorspeise nach Wahl und einen Hauptgang
                  </p>
                  <p className="text-amber-400 font-bold">
                    Kommen Sie und geniessen Sie das authentische mexikanische Erlebnis!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
