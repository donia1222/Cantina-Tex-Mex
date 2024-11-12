'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { X, Diff } from 'lucide-react'
import HeaderSpe from '~/components/HeaderSpe';

const menuSections = [
  { id: 'vorspeisen', name: 'Vorspeisen', color: '#FF6B6B', icon: <Diff size={32} />, image: 'https://cantinatexmex.ch/images/2022/03/13/3_copia-1-copia.jpg' },
  { id: 'texas', name: 'Texas', color: '#4ECDC4', icon: <Diff size={32} />, image: 'https://cantinatexmex.ch/images/2023/02/24/3_copia-11.jpg' },
  { id: 'mexico', name: 'Mexico', color: '#45B7D1', icon: <Diff size={32} />, image: 'https://cantinatexmex.ch/images/2022/03/13/3_copia-11.jpg' },
  { id: 'kinder', name: 'Kinder', color: '#FFA07A', icon: <Diff size={32} />, image: 'https://cantinatexmex.ch/images/2022/07/16/pexels-alleksana-6400028-2.jpg' },
  { id: 'desserts', name: 'Desserts', color: '#C06C84', icon: <Diff size={32} />, image: 'https://cantinatexmex.ch/images/2022/03/13/3_copia-14.jpg' },
  { id: 'mittagsmenu', name: 'Mittagsmenu', color: '#FFD700', icon: <Diff size={32} />, image: 'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/chili.jpeg' },
] as const

type SectionId = typeof menuSections[number]['id']

type MenuItem = {
  name: string
  price?: number
  description?: string
  vegi?: boolean
}

type MenuData = Record<SectionId, MenuItem[]>

const menuItems: MenuData = {
  vorspeisen: [
    { name: 'Chips mit Sauce', price: 8.50, description: 'Weizen Chips mit Guacamole und Salsa', vegi: true },
    { name: 'Onion Rings', price: 10.50, description: 'Frittierte Zwiebelringe, dazu Salsa und Sour Cream', vegi: true },
    { name: 'Sopa de maiz con Chili', price: 9.50, description: 'Maissuppe, serviert mit einem pikanten Red Chili Popper', vegi: true },
    { name: 'Grüner Salat', price: 8.00, description: 'Verschiedene knackige Blattsalate mit Brotcroûtons', vegi: true },
    { name: 'Gemischter Salat', price: 9.50, description: 'Gemischte Salate mit Avocadostreifen', vegi: true },
  ],
  texas: [
    { name: 'Baked Potatoes', price: 20.50, description: 'Kartoffelscheiben gemischt mit verschiedenen Gemüsen goldbraun überbacken mit Mozzarella und Cheddar', vegi: true },
    { name: 'Chicken Potatoes', price: 25.50, description: 'Kartoffelscheiben gemischt mit knackigem Broccoli und gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken' },
    { name: 'Shrimps Potatoes', price: 25.50, description: 'Kartoffelscheiben gemischt mit Crevetten, Cherry Tomaten und Kräuter, gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken' },
  ],
  mexico: [
    { name: 'Fajitas', price: 28.50, description: 'Mit Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse' },
    { name: 'Quesadillas de Tomate y maiz', price: 18.50, description: 'Mit frischen Tomaten und Mais', vegi: true },
    { name: 'Quesadillas de Pollo', price: 21.50, description: 'Mit Pouletfleisch' },
  ],
  kinder: [
    { name: 'Kalbswürstchen am Spiess', price: 12.50, description: 'Serviert mit Pommes' },
    { name: 'Chicken Fingers mit Pommes', price: 12.50, description: 'Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade' },
    { name: 'Mini Burritos mit Pouletfleisch', price: 12.50, description: '' },
  ],
  desserts: [
    { name: 'Flan de Coco', price: 9.00, description: 'Kokos-Flan serviert mit frischer Ananas und Schlagrahm' },
    { name: 'Tarta de la casa', price: 9.50, description: 'Süsse Köstlichkeit nach Geheimrezept' },
    { name: 'Churros', price: 10.50, description: 'Serviert mit Glace und Schokoladensauce' },
  ],
  mittagsmenu: [
    { name: 'Donnerstags', description: 'Menü 1, Menü Vegui und Menü Spezial zur Auswahl' },
    { name: 'Freitags', description: 'Menü 1 (Fajitas), Menü Vegui und Menü Spezial zur Auswahl' },
  ],
}

export default function Component() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const containerRef = useRef(null)

  const handleSectionClick = (sectionId: SectionId) => {
    setActiveSection(sectionId)
  }

  const closeModal = () => {
    setActiveSection(null)
  }

  return (
    <div className="bg-cover bg-center flex flex-col items-center justify-start font-sans bg-gray-900 bg-opacity-80 text-red-500 p-4 rounded-lg min-h-screen">
     <HeaderSpe />
      <div ref={containerRef} className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20">
        {menuSections.map((section, index) => (
          <MenuCard
            key={section.id}
            section={section}
            onClick={() => handleSectionClick(section.id)}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>
   
      <AnimatePresence>
        {activeSection && (
          <MenuModal
            section={menuSections.find((s) => s.id === activeSection)!}
            items={menuItems[activeSection]}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

interface MenuCardProps {
  section: typeof menuSections[number];
  onClick: () => void;
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

function MenuCard({ section, onClick, index, containerRef }: MenuCardProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Modificado para que la animación empiece antes
  const yOffset = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const xOffset = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -100 : 100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const yAnimation = useSpring(yOffset, springConfig)
  const xAnimation = useSpring(xOffset, springConfig)
  const opacityAnimation = useSpring(opacity, springConfig)

  return (
    <motion.div
      style={{
        y: yAnimation,
        x: xAnimation,
        opacity: opacityAnimation
      }}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <div className="p-0">
        <div className="relative">
          <img
            src={section.image}
            alt={section.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2">
              <span>{section.icon}</span>
              <h2 className="text-xl font-semibold">{section.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface MenuModalProps {
  section: typeof menuSections[number];
  items: MenuItem[];
  onClose: () => void;
}

function MenuModal({ section, items, onClose }: MenuModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg overflow-hidden max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 flex-shrink-0">
          <img
            src={section.image}
            alt={section.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
            {section.name}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow modal-content">
          <div className="p-6 grid gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-100 rounded-lg shadow-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-red-700">{item.name}</h3>
                  {item.price !== undefined && (
                    <span className="text-lg font-bold text-green-600">CHF {item.price.toFixed(2)}</span>
                  )}
                </div>
                {item.description && <p className="text-gray-600">{item.description}</p>}
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
  )
}