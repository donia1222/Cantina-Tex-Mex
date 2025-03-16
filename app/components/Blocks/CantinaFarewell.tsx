"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Users, GlassWater, Palmtree } from "lucide-react"

export default function CantinaHeader() {
  const [scrollY, setScrollY] = useState(0)

  // Efecto parallax básico para el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative w-full overflow-hidden font-sans">
      {/* Fondo con patrón SVG similar al anterior */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1.6257413380501518" fill="#ffffff" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      {/* Elementos decorativos (opcional) */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {/* Estrella animada 1 */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 opacity-30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61 39H100L69 63L80 100L50 77L20 100L31 63L0 39H39L50 0Z" fill="#FFD700" />
          </svg>
        </motion.div>

        {/* Estrella animada 2 */}
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61 39H100L69 63L80 100L50 77L20 100L31 63L0 39H39L50 0Z" fill="#FF4500" />
          </svg>
        </motion.div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 min-h-[80vh] mb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          {/* Logo y encabezado */}
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <img
                src="/images-2.png"
                alt="Cantina Tex-Mex Logo"
                className="w-80 h-32 mx-auto rounded-full border-4 mb-10 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.6)]"
              />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="text-amber-500">Kitchen by</span>
            </motion.h1>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Cantina Tex-Mex
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="h-1 w-40 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto my-6"
            />

            <motion.p
              className="text-xl md:text-2xl text-amber-300 italic font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              ¡Neuer Standort, gleicher authentischer Geschmack!
            </motion.p>
          </motion.div>

          {/* Tarjeta principal con información de ubicación */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
            className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Lado izquierdo - Imagen de comida */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <motion.img
                      src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800&auto=format&fit=crop"
                      alt="Delicious Tex-Mex Food"
                      className="w-full h-auto rounded-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Lado derecho - Información de ubicación */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="text-white space-y-8"
                >
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-lg shadow-lg mb-6"
                    >
                      <span className="flex items-center ">
                        <Calendar className="mr-2 h-5 w-5" />
                        Ab 28. März 2025
                      </span>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-amber-400 mb-2">Neue Adresse</h2>
                    <div className="flex items-start mt-4">
                      <MapPin className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xl text-white font-medium">Bahnhofstrasse 40</p>
                        <p className="text-xl text-white font-medium">9470 Buchs</p>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-amber-400 mb-3">Kapazität</h3>
                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Users className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                        <p className="text-lg text-white">100 Plätze im Restaurant</p>
                      </motion.div>

                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <GlassWater className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                        <p className="text-lg text-white">100 Plätze in der Bar & Shisha-Lounge</p>
                      </motion.div>

                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Palmtree className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <p className="text-lg text-white">100 Plätze auf der Terrasse</p>
                      </motion.div>
                    </div>

                    <motion.p
                      className="text-gray-300 mt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      Jeder Bereich ist unabhängig, mit eigener Musik und Schiebetüren.
                    </motion.p>
                  </motion.div>

                  <div className="pt-6 border-t border-amber-500/30">
                    <p className="text-lg text-gray-300 mb-6">
                      Roberto, das Herz der Cantina, ist weiterhin mit gewohnter Hingabe für Euch da; Andrea als
                      Supporter in der Küche jeweils am Wochenende.
                    </p>

                    <motion.a
                      href="/reservierung"
                      className="group relative flex items-center justify-center px-8 py-4 font-bold text-white max-w-xs overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 group-hover:bg-gradient-to-l transition-all duration-500"></span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay transition-opacity duration-500"></span>
                      <span className="relative flex items-center text-lg">
                        Jetzt Reservieren
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

