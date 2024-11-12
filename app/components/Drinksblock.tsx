'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const menuCategories = [
  {
    id: 'cocktails',
    title: 'Cocktails',
    image: '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg',
    items: ['Sex on the Beach', 'Margarita', 'Caipirinha', 'Mojito', 'Piña Colada', 'Tequila Sunrise', 'Pitufa']
  },
  {
    id: 'alkoholfrei',
    title: 'Alkoholfreie',
    image: 'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/mojito.jpeg',
    items: ['Caipirohne', 'Stress Killer', 'Malibu Dreams', 'Pitufo', 'Santa Fresana']
  },
  {
    id: 'biere',
    title: 'Biere',
    image: 'https://cantinatexmex.ch/images/2023/07/13/img_45701.jpeg',
    items: ['Feldschlösschen Flaschen', 'Alkoholfreies Bier', 'Paulaner Weissbier', 'Sol', 'Corona extra', 'Desperado', 'San Miguel']
  },
  {
    id: 'sussgetranke',
    title: 'Süßgetränke',
    image: '/colorful-soda-drinks-macro-shot.jpg',
    items: ['Shorley', 'Rivella', 'Fanta', 'Cola', 'Cola 0', 'Icetea']
  },
]

export default function DrinkMenu() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  return (
    <div className=" bg-gradient-to-br  text-red-500 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 "></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuCategories.map((category) => (
          <motion.div
            key={category.id}
            className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div 
              className="cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{category.title}</h2>
                {expandedCategory === category.id ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>
            </div>
            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black bg-opacity-30"
                >
                  <ul className="p-4 space-y-2">
                    {category.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-lg"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}