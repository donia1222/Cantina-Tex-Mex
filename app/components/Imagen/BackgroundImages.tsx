'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLocation } from "@remix-run/react"

export default function BackgroundImages() {
  const [currentBg, setCurrentBg] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight / 2) {
        setCurrentBg(0)
      } else if (scrollPosition < windowHeight) {
        setCurrentBg(1)
      } else {
        setCurrentBg(2)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getBackgroundImage = (index: number) => {
    if (location.pathname === "/drinks") {
      return [
        '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg',
        '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg',
        '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg'
      ][index]
    } else if (location.pathname === "/menu") {
      return [
        'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85',
        'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85',
        'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85'
      ][index]
    } else {
      return [
        '/fajitas.jpg',
        'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85',
        '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg'
      ][index]
    }
  }

  return (
    <div className="fixed inset-0 z-0">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentBg === index ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ backgroundImage: `url('${getBackgroundImage(index)}')` }}
        />
      ))}
    </div>
  )
}