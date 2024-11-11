"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import HeaderDrin from '~/components/HeaderDrin'

const menuItems = [
  { id: 'cocktails', title: 'Cocktails', image: 'https://cdn-icons-png.flaticon.com/128/7432/7432530.png', color: 'bg-[#73738a59] ' },
  { id: 'alkoholfrei', title: 'Alkoholfreie', image: 'https://cdn-icons-png.flaticon.com/128/920/920719.png', color: 'bg-[#73738a59] ' },
  { id: 'biere', title: 'Biere', image: 'https://cdn-icons-png.flaticon.com/128/1290/1290641.png', color: 'bg-[#73738a59] ' },
  { id: 'sussgetranke', title: 'Süßgetränke', image: 'https://cdn-icons-png.flaticon.com/128/5821/5821449.png', color: 'bg-[#73738a59] ' },
]

export default function Component() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showScrollCircle, setShowScrollCircle] = useState(true)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setShowScrollCircle(false)
      } else {
        setShowScrollCircle(true)
      }
    }

    // Set initial window width
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleItemClick = (id: string) => {
    setActiveSection(activeSection === id ? null : id)
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-80 text-white overflow-hidden relative">
      <HeaderDrin />

      <motion.div
        className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />

      <div className="absolute inset-0 flex items-center justify-center mt-80 ">
        <motion.div
          className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {menuItems.map((item, index) => {
            const radius = windowWidth < 640 ? 130 : 200
            const angle = (index / menuItems.length) * 2 * Math.PI
            const x = (windowWidth < 640 ? 160 : 200) + radius * Math.cos(angle) - (windowWidth < 640 ? 55 : 70)
            const y = (windowWidth < 640 ? 160 : 200) + radius * Math.sin(angle) - (windowWidth < 640 ? 55 : 70)

            return (
              <motion.div
                key={item.id}
                className={`absolute cursor-pointer bg-gray-800 rounded-full shadow-lg w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] flex items-center justify-center overflow-hidden`}
                style={{ left: x, top: y }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleItemClick(item.id)}
              >
                <motion.div
                  className="flex flex-col items-center justify-center w-full h-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-20 h-20 sm:w-24 sm:h-24 object-cover ${activeSection === item.id ? 'animate-pulse' : ''}`}
                  />
                  <span className="text-sm sm:text-base font-medium mt-1 sm:mt-2 text-white text-center px-1">{item.title}</span>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={() => setActiveSection(null)}
          >
            <motion.div
              className="bg-gray-800 bg-opacity-90 p-8 rounded-lg max-w-2xl w-full m-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setActiveSection(null)}
              >
                <X className="w-6 h-6" />
              </button>
              {activeSection === 'cocktails' && (
                <div>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <img src="/placeholder.svg?height=40&width=40" alt="Cocktails" className="w-10 h-10 mr-2" />
                    Cocktails
                  </h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <img src="/placeholder.svg?height=300&width=300" alt="Cocktails" className="w-[300px] h-[300px] rounded-lg" />
                    <ul className="space-y-2">
                      <li>Mojito - 8€</li>
                      <li>Margarita - 9€</li>
                      <li>Piña Colada - 8.50€</li>
                      <li>Cosmopolitan - 9.50€</li>
                    </ul>
                  </div>
                </div>
              )}
              {activeSection === 'alkoholfrei' && (
                <div>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <img src="/placeholder.svg?height=40&width=40" alt="Alkoholfreie Cocktails" className="w-10 h-10 mr-2" />
                    Alkoholfreie Cocktails
                  </h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <img src="/placeholder.svg?height=300&width=300" alt="Alkoholfreie Cocktails" className="w-[300px] h-[300px] rounded-lg" />
                    <ul className="space-y-2">
                      <li>Virgin Mojito - 6€</li>
                      <li>Fruit Punch - 5.50€</li>
                      <li>Shirley Temple - 5€</li>
                      <li>Virgin Piña Colada - 6.50€</li>
                    </ul>
                  </div>
                </div>
              )}
              {activeSection === 'biere' && (
                <div>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <img src="/placeholder.svg?height=40&width=40" alt="Biere" className="w-10 h-10 mr-2" />
                    Biere
                  </h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <img src="/placeholder.svg?height=300&width=300" alt="Biere" className="w-[300px] h-[300px] rounded-lg" />
                    <ul className="space-y-2">
                      <li>Pilsner - 3.50€</li>
                      <li>Weißbier - 4€</li>
                      <li>Dunkles - 4€</li>
                      <li>IPA - 4.50€</li>
                    </ul>
                  </div>
                </div>
              )}
              {activeSection === 'sussgetranke' && (
                <div>
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <img src="/placeholder.svg?height=40&width=40" alt="Süßgetränke" className="w-10 h-10 mr-2" />
                    Süßgetränke
                  </h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <img src="/placeholder.svg?height=300&width=300" alt="Süßgetränke" className="w-[300px] h-[300px] rounded-lg" />
                    <ul className="space-y-2">
                      <li>Cola - 2.50€</li>
                      <li>Limonade - 2.50€</li>
                      <li>Eistee - 3€</li>
                      <li>Fruchtsaft - 3€</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showScrollCircle && (
        <motion.div
          className="fixed bottom-8 right-8 cursor-pointer rounded-full shadow-lg px-4 py-3 flex flex-row items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0,0,0,0.3)' }}
          onClick={handleScrollDown}
        >
          <span className="text-white mr-2 z-10">Speisekarte</span>
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-6 h-6 text-white z-10" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </div>
  )
}