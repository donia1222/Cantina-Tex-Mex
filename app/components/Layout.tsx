'use client'

import { Link, useLocation } from "@remix-run/react"
import { useState, useEffect } from "react"
import { Menu, X, Home, InfoIcon, Phone, UtensilsCrossed, Beer, Utensils, MapPin, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Component({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (scrollPosition < windowHeight / 3) {
        setCurrentBg(0)
      } else if (scrollPosition < (windowHeight * 2) / 3) {
        setCurrentBg(1)
      } else {
        setCurrentBg(2) 
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { to: "/", icon: Home, label: "Inicio" },
    { to: "/menu", icon: UtensilsCrossed, label: "Menú" },
    { to: "/drinks", icon: Beer, label: "Drinks" },
    { to: "https://cantinatexmex.ch/reservierung/index-4.html", icon: Utensils, label: "Reservierung", external: true },
    { to: "/contact", icon: Phone, label: "Contacto" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-red-100 relative flex flex-col">
      {/* Background Images */}
      <div className="fixed inset-0 z-0">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentBg === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ backgroundImage: `url('${
              location.pathname === "/drinks"
                ? (index === 0
                    ? '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg'
                    : index === 1
                    ? '/fajitas.jpg'
                    : 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85')
                : location.pathname === "/menu"
                ? (index === 0
                    ? 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85'
                    : index === 1
                    ? '/fajitas.jpg'
                    : '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg')
                : (index === 0
                    ? '/fajitas.jpg'
                    : index === 1
                    ? 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85'
                    : '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg')
            }')` }}
          />
        ))}
      </div>

      {/* SVG Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000000"></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md shadow-md bg-transparent md:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo a la izquierda */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo3-copia1.png" 
                  alt="Plato mexicano" 
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            
            {/* Menú de navegación centrado en pantallas grandes */}
            <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.external ? (
                    <a 
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center text-gray-200 hover:text-red-600 transition duration-150 ease-in-out group"
                    >
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <item.icon className="h-5 w-5 mr-1 group-hover:text-red-600" />
                        </motion.div>
                        <span>{item.label}</span>
                      </motion.div>
                    </a>
                  ) : (
                    <Link 
                      to={item.to} 
                      className={`flex items-center text-gray-200 hover:text-red-600 transition duration-150 ease-in-out group ${
                        location.pathname === item.to ? 'text-red-600 font-bold' : ''
                      }`}
                    >
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <item.icon className={`h-5 w-5 mr-1 ${
                            location.pathname === item.to ? 'text-red-600' : 'group-hover:text-red-600'
                          }`} />
                        </motion.div>
                        <span>{item.label}</span>
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            
            {/* Botón del menú móvil a la derecha */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="text-gray-200 hover:text-red-600 focus:outline-none rounded-md p-2"
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.external ? (
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-red-600 hover:bg-red-50 transition duration-150 ease-in-out group"
                      >
                        <motion.div
                          className="flex items-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <item.icon className="h-5 w-5 mr-2 group-hover:text-red-600" />
                          </motion.div>
                          <span>{item.label}</span>
                        </motion.div>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-red-600 hover:bg-red-50 transition duration-150 ease-in-out group ${
                          location.pathname === item.to ? 'text-red-600 bg-red-50 font-bold' : ''
                        }`}
                      >
                        <motion.div
                          className="flex items-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <item.icon className={`h-5 w-5 mr-2 ${
                              location.pathname === item.to ? 'text-red-600' : 'group-hover:text-red-600'
                            }`} />
                          </motion.div>
                          <span>{item.label}</span>
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="relative z-10 py-6 sm:px-6 lg:px-8 flex-grow">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-8 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Dirección", content: "Calle Principal 123\nCiudad de México, 12345\nMéxico" },
              { icon: Phone, title: "Teléfono", content: "+52 55 1234 5678" },
              { icon: Clock, title: "Horario", content: "Lunes a Viernes: 11:00 - 22:00\nSábado y Domingo: 12:00 - 23:00" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-6">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.3 }}
                  >
                    <item.icon className="h-12 w-12 text-red-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center mb-4">{item.title}</h3>
                  <p className="text-gray-300 text-center whitespace-pre-line">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-12 border-t border-gray-700 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-center text-gray-400 text-sm">
              © 2023 El Sabor Mexicano. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}