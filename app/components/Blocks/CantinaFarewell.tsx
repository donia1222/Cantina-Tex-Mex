"use client"
import { motion } from "framer-motion"
import { MapPin, ArrowRight, Users, GlassWater, Palmtree, Calendar } from "lucide-react"
import { useEffect } from "react"

export default function CantinaHeader() {
  // Importar la fuente Poppins de Google Fonts
  useEffect(() => {
    // Crear un elemento link para la fuente Poppins
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Aplicar Poppins como fuente principal
    document.documentElement.style.fontFamily = "'Poppins', sans-serif"

    // Limpiar al desmontar
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="  text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BLOQUE 1: Logo e información principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-black to-amber-950/30 rounded-3xl overflow-hidden border border-amber-500/20 shadow-xl flex flex-col"
          >
            <div className="p-8 flex flex-col items-center justify-center h-full text-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-8 w-full max-w-xs mx-auto"
              >
                <img src="/images-2.png" alt="Cantina Tex-Mex Logo" className="w-full h-auto" />
              </motion.div>

              {/* Título */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-medium text-amber-400 mb-2">Kitchen by</h2>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Cantina Tex-Mex</h1>
                <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-amber-500 mx-auto mb-6"></div>
                <p className="text-xl text-amber-300 italic">¡Neuer Standort, gleicher authentischer Geschmack!</p>
                <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 w-full max-w-xs mx-auto"
              >
                <img src="/cantina_logocopia.png" alt="Cantina Tex-Mex Logo" className="w-full h-auto" />
              </motion.div>
              </motion.div>

              {/* Fecha de apertura */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-auto"
              >
                <div className="inline-flex items-center bg-red-600/80 px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Ab 28. März 2025</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* BLOQUE 2: Dirección, capacidad e imagen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gradient-to-br from-black to-red-950/30 rounded-3xl overflow-hidden border border-red-500/20 shadow-xl flex flex-col"
          >
            <div className="p-8">
              {/* Dirección */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-amber-400 mb-4">Neue Adresse</h2>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xl text-white font-medium">Bahnhofstrasse 40</p>
                    <p className="text-xl text-white font-medium">9470 Buchs</p>
                  </div>
                </div>
              </motion.div>

              {/* Capacidad */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-amber-400 mb-4">Kapazität</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                    <p className="text-white">100 Plätze im Restaurant</p>
                  </div>
                  <div className="flex items-center">
                    <GlassWater className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    <p className="text-white">100 Plätze in der Bar & Shisha-Lounge</p>
                  </div>
                  <div className="flex items-center">
                    <Palmtree className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <p className="text-white">100 Plätze auf der Terrasse</p>
                  </div>
                </div>
              </motion.div>

              {/* Información adicional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-gray-300">Jeder Bereich ist unabhängig, mit eigener Musik und Schiebetüren.</p>
              </motion.div>

              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="relative h-48 rounded-xl overflow-hidden"
              >
                <img
                  src="/475697279_9242326152477946_202445652559172266_n-1.jpg"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* BLOQUE 3: Información personal y botón de reserva */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-gradient-to-br from-black to-amber-950/30 rounded-3xl overflow-hidden border border-amber-500/20 shadow-xl flex flex-col"
          >
            <div className="p-8 flex flex-col h-full">
              {/* Primera imagen de comida */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative h-40 rounded-xl overflow-hidden mb-4"
              >
                <img
        
                  src="fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg"
                  alt="Tex-Mex Food"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Segunda imagen de comida */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative h-40 rounded-xl overflow-hidden mb-6"
              >
                <img
                           src="fajitas.jpg"
                  alt="Tex-Mex Atmosphere"
                  className="w-full h-full object-cover bg-blend-color-dodge"
                />
              </motion.div>

              {/* Información personal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mb-8 flex-grow"
              >
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-300">
                    Roberto, das Herz der Cantina, ist weiterhin mit gewohnter Hingabe für Euch da; Andrea als Supporter
                    in der Küche jeweils am Wochenende.
                  </p>
                </div>
              </motion.div>

              {/* Botón de reserva */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-auto"
              >
                <a
                  href="/reservierung"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Jetzt Reservieren
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

