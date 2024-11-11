'use client'

import AnimatedGradientText from '~/components/AnimatedGradientText'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from "@remix-run/react"
import ImagenScroll from '~/components/ImagenScroll'
import Header from '~/components/Header'
import ReviewsCarousel from '~/components/ReviewsCarousel'

const colors = [
  'bg-gray-800', 'bg-gray-800',
]

const foodImages = [
  'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/tex-mex.jpeg',
  'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/fleisch.jpg',
  'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/res1.png',
  'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/nachos.jpeg',
  'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/fingers.jpeg',
  'https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/mojito.jpeg',
]

const AnimatedHeader = () => {
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-60 mb-16">
      <AnimatePresence>
        {!showImage && (
          <motion.h1
            className="text-7xl font-bold text-center text-red-500 absolute w-full top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
            key="text"
          >
            El Sabor de México
          </motion.h1>
        )}
        {showImage && (
          <motion.div
            className="absolute w-full h-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              duration: 1.5
            }}
            key="image"
          >
            <img
              src="https://cantinatexmex.ch/images/logo3-copia.png"
              alt="Sombrero mexicano"
              className="w-60 h-30 bg-red-50/40 bg-gradient-to-br from-red-50/50 to-yellow-50/50 rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AnimatedElementProps {
  index: number;
  image: string;
  title: string;
  description: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ index, image, title, description }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const yOffset = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [200 * (index % 2), 100 * (index % 2), 0]
  )

  const xOffset = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100 * Math.sin(index), 50 * Math.sin(index), 0]
  )

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [20 * (index % 2 ? 1 : -1), 10 * (index % 2 ? 1 : -1), 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 0.9, 1]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        y: yOffset,
        x: xOffset,
        rotate: rotate,
        scale: scale,
      }}
      className={`p-6 rounded-lg shadow-lg transition-all duration-300 ease-out ${colors[index % colors.length]} overflow-hidden w-full`}
    >
      <img src={image} alt="Comida mexicana" className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h2 className={`text-2xl font-semibold mb-2 ${index % 2 === 1 ? 'text-green-600' : 'text-red-500'}`}>
        {title}
      </h2>
      <p className={`${index % 2 === 1 ? 'text-gray-100' : 'text-green-100'}`}>
        {description}
      </p>
    </motion.div>
  ) 
}

export default function MenuPage() {
  const items = [
    { title: "Enchiladas Verdes", description: "Tortillas rellenas bañadas en salsa verde." },
    { title: "Quesadillas de Queso", description: "Con queso Oaxaca derretido y tortilla crujiente." },
    { title: "Mole Poblano", description: "Salsa compleja con chocolate y chiles." },
    { title: "Torta Mexicana", description: "Sándwich tradicional con diversos ingredientes." },

  ]

  return (
    <div className="min-h-[300vh] p-8 font-sans bg-gray-900 bg-opacity-50 rounded-lg">
      <Header />
      <div className="bg-cover bg-center flex flex-col items-center justify-start font-poppins rounded-lg mt-20 mb-10">
    
      </div>

      <div className="h-[10vh]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
        {items.map((item, index) => (
          <AnimatedElement 
            key={index}
            index={index}
            image={foodImages[index]}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <ImagenScroll />
      <ReviewsCarousel />

    </div>
  )
}