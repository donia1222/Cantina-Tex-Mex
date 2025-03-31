"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect } from "react"

export default function VideoHero() {
  // Importar fuente Montserrat
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo a pantalla completa */}
      <div className="absolute inset-0 w-full h-full">
        <video className="absolute min-w-full min-h-full object-cover" autoPlay muted loop playsInline>
          <source src="/restaurant-ambience.mp4" type="video/mp4" />
        </video>
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {/* Título principal con la misma tipografía */}
          <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-widest text-amber-300">USHUAIA KITCHEN BY</h2>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Cantina Tex-Mex</h1>

          {/* Línea decorativa */}
          <div className="h-0.5 w-24 bg-gradient-to-r from-red-600 to-amber-500 mx-auto mb-10"></div>

          {/* Botón de reserva */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6"
          >
            <a
              href="/reservierung"
              className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
            >
              Jetzt Reservieren
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}





