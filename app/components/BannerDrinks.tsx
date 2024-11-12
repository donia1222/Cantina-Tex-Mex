'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Code, Check, Copy, X } from 'lucide-react'
import AnimatedGradientText from '~/components/AnimatedGradientText'; 
const products = [
    { id: 1, name: "Margartita mit Mango", image: "/IMG_083w.jpeg", description: "Mit einem Hauch von Blue Curaçao" },
    { id: 2, name: "Klassisches Margartita", image: "/IMG_0897.jpeg", description: "Die klassischste und frischeste" },
    { id: 3, name: "Erdbeere Margartita", image: "/IMG_1009.jpeg", description: "Best Margaritas in town!" },
]

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  useEffect(() => {
    setShowInfo(false)
    const timer = setTimeout(() => setShowInfo(true), 300)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const toggleInfo = () => setShowInfo(!showInfo)

  const toggleCode = () => setShowCode(!showCode)



  return (
    <div className="space-y-8 mt-20">

      <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-700 to-gray-600 overflow-hidden flex items-center justify-center">

        <div className="relative w-[600px] h-[300px] rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center rounded-lg"
            >
              <div className="relative w-full h-full rounded-lg" onClick={toggleInfo}>
                <img
                  src={products[currentIndex].image}
                  alt={products[currentIndex].name}
                  className="w-full h-full object-cover cursor-pointer rounded-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-purple-700 p-2 rounded-full shadow-lg hover:bg-purple-100 transition-colors duration-200 z-10"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-purple-700 p-2 rounded-full shadow-lg hover:bg-purple-100 transition-colors duration-200 z-10"
        >
          <ChevronRight size={24} />
        </button>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-t-3xl shadow-2xl"
            >
              <button
                onClick={toggleInfo}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-1 ">{products[currentIndex].name}</h2>
              <p className="text-gray-300 text-sm">{products[currentIndex].description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}