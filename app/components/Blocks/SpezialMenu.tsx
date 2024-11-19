'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const menuItems = [
  { 
    title: '🔥 Flambierte Fajitas', 
    description: 'Spektakuläre Fajitas, am Tisch mit Tequila flambiert, für ein einzigartiges und geschmackvolles kulinarisches Erlebnis.', 
    image: '/465021723_8545854052134677_9182898130970509210_n.jpg' 
  },
  { 
    title: '🍖 XXL Fleischspieß', 
    description: '450 g Entrecote und Kalbsfilet mit Hähnchen und Chorizo, eine Geschmacksexplosion auf einem Teller.', 
    image: 'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/464391326_8516519911734758_243634951877597356_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeGVgYNJHHJG1yiBh71_l78Fo8hMUnYp8MOjyExSdinwwxMVP9RIEgDwr2NW2RFZtS2Ly29-C2dxijDO52rHFpwm&_nc_ohc=TR8X6_mjxBcQ7kNvgEd1xcL&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AAo9OG55LkM0zGWMhnTe8_m&oh=00_AYAzoNu1kYDRN8jxQUQuQjeqlX7Ifo5bqaLprtFx-0C4zg&oe=6741AC08' 
  },

]
export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const navigateMenu = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : menuItems.length - 1))
    } else {
      setCurrentIndex((prevIndex) => (prevIndex < menuItems.length - 1 ? prevIndex + 1 : 0))
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-8 mb-28 font-poppins relative overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="30"
            height="40"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              id="pattern-circle"
              cx="5"
              cy="5"
              r="1"
              fill="green"
            ></circle>
          </pattern>
          <rect
            id="rect"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          ></rect>
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center relative z-10">
  <span className="text-white">Neuheiten!</span>{' '}

</h1>
      <p className="text-gray-400 text-sm text-center">
   Entdecken Sie unsere kommenden kulinarischen Köstlichkeiten ab Dezember 2024
</p>

      <div className="w-full max-w-3xl mx-auto relative overflow-hidden rounded-lg shadow-lg z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mx-2 sm:mx-4 my-2 sm:my-4 flex flex-col items-center"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-between h-full w-full">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 text-center">{menuItems[currentIndex].title}</h3>
              <div className="w-full h-48 mb-4 relative overflow-hidden rounded-lg">
                <img
                  src={menuItems[currentIndex].image}
                  alt={`Bild von ${menuItems[currentIndex].title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
              <p className="text-sm sm:text-base text-gray-300 text-center mb-4">{menuItems[currentIndex].description}</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-600">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${((currentIndex + 1) / menuItems.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-center items-center mt-4 sm:mt-6 mb-2 sm:mb-4 space-x-4 relative z-10">
        <button
          onClick={() => navigateMenu('left')}
          className="p-2 bg-red-500 rounded-full shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Vorheriges"
        >
          <ChevronLeft size={24} className="text-gray-100" />
        </button>
        <button
          onClick={() => navigateMenu('right')}
          className="p-2 bg-red-500 rounded-full shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Nächstes"
        >
          <ChevronRight size={24} className="text-gray-100" />
        </button>
      </div>
      </div>

  )
}