"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function ImageHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Images array - replace with your actual image paths
  const images = [
    "/IMG_2654.jpeg",

  ]

  // Transform opacity based on scroll position
  // As user scrolls down, opacity will decrease from 1 to 0
  const textOpacity = useTransform(
    scrollY,
    [0, 300], // Start fading at 0px scroll, completely transparent at 300px scroll
    [1, 0],
  )

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 2000) // Change image every 2 seconds

    return () => clearInterval(interval)
  }, [images.length])

  // Import Montserrat font
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
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden rounded-xl">
      {/* Background images with crossfade effect */}
      <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
        {images.map((src, index) => (
          <motion.img
            key={`image-${index}`}
            src={src}
            alt={`Restaurant ambience ${index + 1}`}
            className="absolute min-w-full min-h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
      </div>

      {/* Centered content with fade effect on scroll */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4"
        style={{ opacity: textOpacity }} // Apply the opacity based on scroll
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {/* Main title with the same typography */}
          <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-widest text-amber-300">USHUAIA KITCHEN BY</h2>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Cantina Tex-Mex</h1>

          {/* Reservation button with letter animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8"
          >
            <motion.a
              href="/reservierung"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-transparent px-6 py-3 font-bold text-white shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button background */}
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"></span>

              {/* Button content with letter animation */}
              <span className="relative z-10 flex items-center">
                <TextAnimation />
                <motion.span
                  className="ml-2 inline-flex"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Text animation component
function TextAnimation() {
  const text = "Jetzt Reservieren"

  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={`char-${index}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8 + index * 0.05,
            type: "spring",
            stiffness: 300,
            damping: 10,
            bounce: 0.5,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

