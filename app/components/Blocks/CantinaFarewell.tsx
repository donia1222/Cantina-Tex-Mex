"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

export default function CantinaLoadingAnimation() {
  const [loadingStage, setLoadingStage] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  // German phrases that will appear during loading
  const germanPhrases = ["TEX-MEX FOOD", "PREMIUM COCKTAILS", "QUALITY HOOKAH AND TABAK", "UNIQUE ATMOSPHERE AND SOUND" ]

  useEffect(() => {
    // Stage 0: Initial black screen with German text (3 seconds)
    const timer1 = setTimeout(() => setLoadingStage(1), 3000)

    // Stage 1: Question mark appears (2 seconds)
    const timer2 = setTimeout(() => setLoadingStage(2), 5000)

    // Stage 2: Logo appears and stays
  

    // Stage 3: Complete animation and integrate with page
    const timer4 = setTimeout(() => setAnimationComplete(true), 8000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)

      clearTimeout(timer4)
    }
  }, [])

  // When animation is complete, render the content normally in the document flow
  if (animationComplete) {
    return (
      <div className="w-full overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
          {/* Star 1 */}
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

          {/* Star 2 */}
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

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 min-h-[80vh] mb-10">
          <div className="w-full max-w-5xl">
            {/* Logo and header */}
            <div className="text-center mb-8">
              <div>
                <img
                  src="/images-2.png"
                  alt="Cantina Tex-Mex Logo"
                  className="w-80 h-32 mx-auto rounded-full border-4 mb-10 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.6)]"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                <span className="text-amber-500">Kitchen by</span>
              </h1>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Cantina Tex-Mex</h1>

              <div className="h-1 w-40 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto my-6" />

              <p className="text-xl md:text-2xl text-amber-300 italic font-light">
                ¡Neuer Standort, gleicher authentischer Geschmack!
              </p>
            </div>

            {/* Main card with location info */}
            <div className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* Left side - Food image */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800&auto=format&fit=crop"
                        alt="Delicious Tex-Mex Food"
                        className="w-full h-auto rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Right side - Location info */}
                  <div className="text-white space-y-8">
                    <div>
                      <div className="inline-block px-6 py-3 rounded-full self-center bg-amber-500 text-black font-bold text-lg shadow-lg mb-6">
                        <span className="flex items-center ">
                          <Calendar className="mr-2 h-5 w-5" />
                          Ab 28. März 2025
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-amber-400 mb-2">Neue Adresse</h2>
                      <div className="flex items-start mt-4">
                        <MapPin className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xl text-white font-medium">Bahnhofstrasse 40</p>
                          <p className="text-xl text-white font-medium">9470 Buchs</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-amber-500/30">
                      <p className="text-lg text-gray-300 mb-6">
                        Roberto, das Herz der Cantina, ist weiterhin mit gewohnter Hingabe für Euch da; Andrea als
                        Supporter in der Küche jeweils am Wochenende.
                      </p>

                      <a
                        href="/reservierung"
                        className="group relative flex items-center justify-center px-8 py-4 font-bold text-white max-w-xs overflow-hidden rounded-xl"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 group-hover:bg-gradient-to-l transition-all duration-500"></span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay transition-opacity duration-500"></span>
                        <span className="relative flex items-center text-lg">
                          Jetzt Reservieren
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // During animation, use fixed positioning to cover the screen
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50">
      <AnimatePresence mode="wait">
        {/* Stage 0: German text appearing from background */}
        {loadingStage === 0 && (
          <motion.div
            key="german-text"
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {germanPhrases.map((phrase, index) => (
              <motion.div
                key={phrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [20, 0, -20],
                }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.5, 1],
                  delay: index * 0.8,
                }}
                className="text-amber-500 text-3xl md:text-5xl font-bold my-4"
              >
                {phrase}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stage 1: Question mark */}
        {loadingStage === 1 && (
          <motion.div
            key="question-mark"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-amber-500 text-[150px] md:text-[250px] font-bold"
          >
            ?
          </motion.div>
        )}

        {/* Stage 2 & 3: Logo and text (animation stages) */}
        {(loadingStage === 2 || loadingStage === 3) && (
          <div className="relative w-full overflow-hidden min-h-screen">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
              {/* Star 1 */}
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

              {/* Star 2 */}
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

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 min-h-[80vh] mb-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-5xl"
              >
                {/* Logo and header */}
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

                {/* Main card with location info */}
                {loadingStage === 3 && (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
                  >
                    <div className="p-8 md:p-10">
                      <div className="grid md:grid-cols-2 gap-10 items-center">
                        {/* Left side - Food image */}
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
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

                        {/* Right side - Location info */}
                        <motion.div
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                          className="text-white space-y-8"
                        >
                          <div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-block px-6 py-3 rounded-full self-center bg-amber-500 text-black font-bold text-lg shadow-lg mb-6"
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
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

