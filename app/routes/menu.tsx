"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  X,
  CirclePlus,
  Utensils,
  Salad,
  Beef,
  FishIcon as Shrimp,
  BirdIcon as Chicken,
  Carrot,
  Clock,
} from "lucide-react"
import HeaderSpe from "~/components/Header/HeaderSpe"

const menuSections = [
  {
    id: "vorspeisen",
    name: "Vorspeisen",
    color: "#FF6B6B",
    icon: <CirclePlus size={32} />,
    image: "96771444_3048192125224744_9026765579553341440_n.jpg",
  },
  {
    id: "texas",
    name: "Texas",
    color: "#4ECDC4",
    icon: <CirclePlus size={32} />,
    image: "439906677_1038135431012293_4590580434033471940_n.jpg",
  },
  {
    id: "mexico",
    name: "Mexico",
    color: "#45B7D1",
    icon: <CirclePlus size={32} />,
    image: "271206981_4690667750986679_6769410685630349301_n.jpg",
  },
  {
    id: "kinder",
    name: "Kinder",
    color: "#FFA07A",
    icon: <CirclePlus size={32} />,
    image: "/271248933_4690667767653344_444005926034541016_n.jpg",
  },
  {
    id: "desserts",
    name: "Desserts",
    color: "#C06C84",
    icon: <CirclePlus size={32} />,
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

const carouselImages = ["/448072528_1062123745280128_8970901128475452127_n.jpg"]

const Loadere = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <motion.div
      className="w-20 h-20 border-t-4 border-red-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  </motion.div>
)

export const loader: LoaderFunction = async () => {
  const menuItems: MenuData = {
    vorspeisen: [
      { name: "Chips mit Sauce", description: "Weizen Chips mit Guacamole und Salsa", vegi: true },
      { name: "Onion Rings", description: "Frittierte Zwiebelringe, dazu Salsa und Sour Cream", vegi: true },
      {
        name: "Sopa de maiz con Chili",
        description: "Maissuppe, serviert mit einem pikanten Red Chili Popper",
        vegi: true,
      },
      { name: "Grüner Salat", description: "Verschiedene knackige Blattsalate mit Brotcroûtons", vegi: true },
      { name: "Gemischter Salat", description: "Gemischte Salate mit Avocadostreifen", vegi: true },
      {
        name: "Nachos mit Cheese",
        description: "Mais Chips mit Salsa und Sour Cream mit Mozzarella und Cheddar Cheese überbacken",
        vegi: true,
      },
      {
        name: "The Real Caesar Salad",
        description: "Eisbergsalat mit Parmesan, Brotcroûtons, Ceasar Sauce und knusprigen Speckwürfeli",
      },
      {
        name: 'Salat "Cantina"',
        description: "Grosser gemischter Salat mit Pouletstreifen Onion Rings und Tortilla Chips",
      },
      {
        name: "Macho Nachos",
        description: "Mais Chips mit hausgemachtem Chili con Carne mit Mozzarella und Cheddar Cheese überbacken",
      },
      { name: "Gambas al ajillo", description: "Sautierte Crevetten mit Knoblauch und Olivenöl flambiert mit Brandy" },
      {
        name: "Mexikanische Vorspeisenplatte",
        description:
          "Nachos, Quesadilla, Guacamole, Onion Rings, Chicken Fingers, Crevetten (ab 2 Personen, Preis pro Person)",
      },
      {
        name: "Chips-Chicken Fingers",
        description: "6 Stück Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade Mozzarella Sticks",
      },
    ],
    texas: [
      {
        name: "Baked Potatoes",
        description:
          "Kartoffelscheiben gemischt mit verschiedenen Gemüsen goldbraun überbacken mit Mozzarella und Cheddar",
        vegi: true,
      },
      {
        name: "Chicken Potatoes",
        description:
          "Kartoffelscheiben gemischt mit knackigem Broccoli und gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken",
      },
      {
        name: "Shrimps Potatoes",
        description:
          "Kartoffelscheiben gemischt mit Crevetten, Cherry Tomaten und Kräuter, gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken",
      },
      {
        name: "Chicken Fingers",
        description: "Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade dazu Pommes",
      },
      {
        name: "Cantiworker",
        description:
          "200 Gramm 100% Black Angus Rindfleisch. Mit Eisbergsalat, roten Zwiebeln, Cheddar Cheese, hausgemachter BBQ Sauce und…viel Liebe gefüllt",
      },
      {
        name: "Cantina Spiess 250gr",
        description: "Saftiger gemischter Fleischspiess mit Country Fries und Knoblauchbrot, dazu Saucen zum Dippen",
      },
      {
        name: "Rancher Steak 200gr",
        description:
          "Rindsentrecôte, gratiniert mit Kräuterbutter und Parmesan, dazu Pommes, Onion Rings und Saucen zum Dippen",
      },
    ],
    mexico: [
      { name: "Fajitas", description: "Mit Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse" },
      { name: "Quesadillas de Tomate y maiz", description: "Mit frischen Tomaten und Mais", vegi: true },
      { name: "Quesadillas de Pollo", description: "Mit Pouletfleisch" },
      { name: "Quesadillas de Chorizo", description: "Mit pikantem Chorizo" },
      { name: "Quesadillas res y pimiento", description: "Mit Rindshuftwürfeli und Peperoni" },
      { name: "Quesadillas mar y tierra", description: "Mit Crevetten und Broccoli" },
      {
        name: "Burritos con verdura",
        description:
          "Grosse, gerollte Weizentortillas gefüllt mit frischem Gemüse, dazu Sour Cream und Salsa serviert mit Tomatenreis oder Salat",
        vegi: true,
      },
      {
        name: "Burritos con Pollo y Res",
        description:
          "Grosse, gerollte Weizentortillas gefüllt mit Mais, Paprika Poulet-/Rindfleisch, dazu Sour Cream und Salsa, serviert mit Tomatenreis oder Salat",
      },
      {
        name: "Chili con Carne",
        description: "Rindfleisch mit Chili, frischen Tomaten, Mais und Kidneybohnen, serviert im Reisring",
      },
      { name: "Enachiladas", description: "Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse" },
    ],
    kinder: [
      { name: "Kalbswürstchen am Spiess", description: "Serviert mit Pommes" },
      {
        name: "Chicken Fingers mit Pommes",
        description: "Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade",
      },
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
  const [showMittagsmenuModal, setShowMittagsmenuModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalHeaderRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionClick = (sectionId: SectionId) => {
    setActiveSection(sectionId)
  }

  const closeModal = () => {
    setActiveSection(null)
    setShowMittagsmenuModal(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length)
  }

  useEffect(() => {
    if (activeSection || showMittagsmenuModal) {
      const modalContent = document.querySelector(".modal-content")
      if (modalContent) {
        modalContent.scrollTop = 0
      }
    }
  }, [activeSection, showMittagsmenuModal])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
  }

  const wochentage = ["Donnerstag", "Freitag"]
  const menuOptionen = [
    { name: "Menü 1", preis: 19.5, icon: <Utensils className="w-6 h-6" /> },
    { name: "Vegetarisches Menü", preis: 17.5, icon: <Salad className="w-6 h-6" /> },
    { name: "Spezialmenü", preis: 28.5, icon: <Beef className="w-6 h-6" /> },
  ]
  const ersterGang = ["Salat", "Suppe", "Nachos", "Hausgemachte Chips"]
  const quesadillas = {
    preis: 17.5,
    optionen: [
      { name: "Hähnchen", icon: <Chicken className="w-6 h-6" /> },
      { name: "Rindfleisch", icon: <Beef className="w-6 h-6" /> },
      { name: "Garnelen", icon: <Shrimp className="w-6 h-6" /> },
      { name: "Tomate (Vegetarisch)", icon: <Carrot className="w-6 h-6" /> },
    ],
  }
  const beilagen = ["Pommes frites", "Salat", "Tomatenreis", "Country Fries"]

  return (
    <div className="bg-cover bg-center flex flex-col items-center justify-start font-poppins bg-gray-900 bg-opacity-80 text-red-500 p-0 rounded-lg">
      <HeaderSpe />
      <main></main>
      {loading && <Loadere />}

      {/* Mittagsmenü Button - Elegante versión */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-6xl px-4 mb-8 mt-8"
      >
        <button
          onClick={() => setShowMittagsmenuModal(true)}
          className="w-full bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="relative p-6 flex flex-col md:flex-row items-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-amber-500 to-orange-500"></div>

            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-400 rounded-full flex items-center justify-center shadow-inner">
                <Utensils className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl font-bold text-amber-800 mb-1 group-hover:text-amber-900">Mittagsmenü</h2>
              <p className="text-amber-700 mb-2">Genießen Sie authentische mexikanische Aromen im Herzen der Stadt</p>
              <div className="flex items-center justify-center md:justify-start text-amber-700">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">DIENSTAG BIS FREITAG • 11:30 - 13:30</span>
              </div>
            </div>

            <div className="hidden md:block ml-4">
              <div className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Ansehen
              </div>
            </div>
          </div>
        </button>
      </motion.div>

      <motion.div
        className="w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuSections.map((section) => (
          <motion.div
            key={section.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="relative">
              <img
                src={section.image || "/placeholder.svg"}
                alt={section.name}
                className="w-full h-48 object-cover opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-t-lg"></div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded p-2 text-white">
                <div className="flex items-center space-x-2">
                  <span>{section.icon}</span>
                  <h2 className="text-xl font-semibold">{section.name}</h2>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg overflow-hidden max-w-2xl w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div ref={modalHeaderRef} className="relative h-24 flex-shrink-0">
                <img
                  src={menuSections.find((s) => s.id === activeSection)?.image || "/placeholder.svg"}
                  alt={menuSections.find((s) => s.id === activeSection)?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
                  {menuSections.find((s) => s.id === activeSection)?.name}
                </h2>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow modal-content">
                <div className="p-6 grid gap-6">
                  {menuItems[activeSection].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-100 rounded-lg shadow-md p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-red-700">{item.name}</h3>
                      </div>
                      {item.description && <p className="text-gray-600">{item.description}</p>}
                      {item.subItems && (
                        <ul className="list-disc list-inside mt-2">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name} className="text-gray-600">
                              {subItem.name} {subItem.description && `- ${subItem.description}`}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.vegi && (
                        <span className="mt-2 inline-block bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Vegi
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showMittagsmenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header elegante */}
              <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 p-8 text-center">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-amber-500 to-orange-500"></div>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Utensils className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-2 text-white">Mittagsmenü</h2>
                <p className="text-amber-100 text-lg mb-4">
                  Genießen Sie authentische mexikanische Aromen im Herzen der Stadt
                </p>
                <div className="inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <p className="text-white font-medium">DIENSTAG BIS FREITAG</p>
                  <p className="text-3xl font-bold text-white">11:30 - 13:30</p>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto flex-grow modal-content p-6">
                {/* Menü opciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-1 bg-gradient-to-r from-amber-400 to-amber-500"></div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="bg-amber-100 p-3 rounded-full mr-3">
                          <Utensils className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-amber-800">Menü</h3>
                      </div>
                      <p className="text-gray-600 mb-3 min-h-[50px]">
                        Authentische mexikanische Aromen mit traditionellen Rezepten
                      </p>
                      <p className="text-2xl font-bold text-amber-600">Fr. 19.50</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-1 bg-gradient-to-r from-green-400 to-green-500"></div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-100 p-3 rounded-full mr-3">
                          <Salad className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Vegetarisches Menü</h3>
                      </div>
                      <p className="text-gray-600 mb-3 min-h-[50px]">
                        Köstliche vegetarische Optionen voller Geschmack
                      </p>
                      <p className="text-2xl font-bold text-green-600">Fr. 18.50</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden md:col-span-2"
                  >
                    <div className="p-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 p-3 rounded-full mr-3">
                          <Beef className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-800">Spezialmenü</h3>
                      </div>
                      <p className="text-gray-600 mb-3">Exklusive Kreationen unseres Küchenchefs mit Premium-Zutaten</p>
                      <p className="text-2xl font-bold text-orange-600">Fr. 28.50</p>
                    </div>
                  </motion.div>
                </div>

                {/* Vorspeisen */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-amber-800 text-center mb-4">VORSPEISE NACH WAHL</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {ersterGang.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="bg-white rounded-lg py-3 px-4 text-center shadow-md border border-amber-200"
                      >
                        <p className="font-medium text-amber-700">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Información adicional */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg p-6 text-center"
                >
                  <p className="text-amber-800 mb-3">Jedes Menü enthält eine Vorspeise nach Wahl und einen Hauptgang</p>
                  <p className="text-xl font-bold text-amber-900">
                    Kommen Sie und genießen Sie das authentische mexikanische Erlebnis!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full max-w-6xl mx-auto text-center mb-8 mt-4">
        <div className="bg-red-600 text-white py-4 px-6 rounded-lg shadow-lg">
          <p className="text-xl font-bold">Wir bieten kein Essen zum Mitnehmen an</p>
        </div>
      </div>
    </div>
  )
}
