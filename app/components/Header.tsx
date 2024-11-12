'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Coffee, UtensilsCrossed } from 'lucide-react'
import AnimatedGradientText from '~/components/AnimatedGradientText'

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(false)
  const [welcomeText, setWelcomeText] = useState('Hola!')

  const AnimatedText = ({ text }: { text: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-1xs font-bold text-center text-yellow-500 mb-8"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setWelcomeText('Bienvenidos')
    }, 2000) // Cambiado de 500 a 2000 ms (2 segundos)
    return () => clearTimeout(timer)
  }, [])

  return (
    <header className="text-gray-200 p-6 rounded-xl bg-gray-900 bg-opacity-90 overflow-hidden" style={{ maxWidth: '1000px', margin: '1rem auto' }}>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center">
              <img 
                src="https://cantinatexmex.ch/images/2022/03/05/logo3-copia1.png" 
                alt="Plato mexicano" 
                className="rounded-lg bg-gray-200 h-34 object-cover mt-10"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={welcomeText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.5 }} // Cambiado de 0.5 a 1.5 segundos
                className="text-5xl font-semibold mb-8 text-center"
              >
                {welcomeText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.08 }} // Aumentado duration y delay
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
            </AnimatePresence>
            <div className="bg-cover bg-center flex flex-col items-center justify-start font-poppins rounded-lg">
              <AnimatedText text="CANTINA SEIT 2010 IN SEVELEN" />
            </div>
            <a
              href="https://cantinatexmex.ch/reservierung/index-4.html"
              className="relative px-6 py-3 font-bold text-gray-100 group max-w-[80%] mx-auto block"
            >
              <span className="absolute inset-0 transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 border-2 border-gray-300"></span>
              <span className="relative">Jetzt Reservieren</span>
            </a>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
        </motion.div>
      </div>
    </header>
  )
}