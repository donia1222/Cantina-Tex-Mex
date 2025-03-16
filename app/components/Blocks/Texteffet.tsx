"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AnimatedScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transiciones para el texto y otros elementos
  const scale = useTransform(scrollYProgress, [0, 0.5], [2, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Configuración de círculos flotantes
  const numberOfCircles = 20
  const randomX = Array.from({ length: numberOfCircles }, () => Math.random() * 1000 - 500)
  const randomY = Array.from({ length: numberOfCircles }, () => Math.random() * 1000 - 500)
  const randomScaleFactor = Array.from({ length: numberOfCircles }, () => Math.random() * 0.8 + 0.2)
  const randomRotation = Array.from({ length: numberOfCircles }, () => Math.random() * 720 - 360)
  const circleSizes = Array.from({ length: numberOfCircles }, () => Math.random() * 100 + 20)

  const circleX = randomX.map((x) => useTransform(scrollYProgress, [0, 1], [x, x]))
  const circleY = randomY.map((y) => useTransform(scrollYProgress, [0, 1], [y, y]))
  const circleScale = randomScaleFactor.map((scaleFactor) =>
    useTransform(scrollYProgress, [0, 0.5, 1], [0, scaleFactor, 0])
  )
  const circleRotate = randomRotation.map((rotation) =>
    useTransform(scrollYProgress, [0, 1], [0, rotation])
  )

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo SVG igual al del otro componente */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.6257413380501518" fill="#ffffff" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>

        {/* Texto principal */}
        <motion.h1
  className="font-bold text-center px-4 z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
  style={{
    scale,
    opacity,
  }}
>
  Tex-Mex food
</motion.h1>


        {/* Círculos flotantes */}
        {[...Array(numberOfCircles)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              x: circleX[i],
              y: circleY[i],
              scale: circleScale[i],
              rotate: circleRotate[i],
              backgroundColor: i % 2 === 0 ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)",
              width: `${circleSizes[i]}px`,
              height: `${circleSizes[i]}px`,
            }}
          />
        ))}

        {/* Elemento giratorio */}
        <motion.div
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] border-[15px] sm:border-[20px] md:border-[30px] border-white/10 rounded-full"
          style={{ rotate }}
        />

        {/* Elementos de texto en parallax */}
        <motion.p
          className="absolute text-white/70 text-base sm:text-xl font-light bottom-[30%] left-[10%]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        >
          UNIQUE ATMOSPHERE AND SOUND
        </motion.p>

        <motion.p
          className="absolute text-white/70 text-base sm:text-xl font-light top-[30%] right-[10%]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        >
          TERRACE
        </motion.p>

        {/* Texto de fondo */}
        <motion.div
  className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-200 to-gray-700 bg-clip-text text-transparent drop-shadow-lg"
  style={{
    y: useTransform(scrollYProgress, [0, 1], [200, -200]),
    x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5]),
  }}
>
  Premium Cocktail
</motion.div>

      </div>
    </div>
  )
}
