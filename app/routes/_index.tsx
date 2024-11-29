'use client'

import AnimatedGradientText from '~/components/AnimatedGradient/AnimatedGradientText'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from "@remix-run/react"
import ImagenScroll from '~/components/Imagen/ImagenScroll'
import Header from '~/components/Header/Header'
import ReviewsCarousel from '~/components/Rerserve/RerserveBlock'
import CloudTextBlock from '~/components/Blocks/CloudTextBlock'
import Bloques from '~/components/Blocks/Bloques'
import ContinuousScroll from '~/components/Imagen/Continuous-Scroll-Reserve'; 
import TikTokVideos from "~/components/Blocks/TickTock/TikTokVideos";
import TikTokVideose from "~/components/Blocks/TickTock/TikTokButtom";

const Loader = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <motion.div
      className="w-20 h-20 border-t-4 border-red-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
)

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
      <motion.h2 
        className={`text-2xl font-semibold mb-2 ${index % 2 === 1 ? 'text-green-600' : 'text-red-500'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p 
        className={`${index % 2 === 1 ? 'text-gray-100' : 'text-green-100'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  ) 
}


export default function MenuPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const items = [
    { title: "Enchiladas Verdes", description: "Tortillas rellenas bañadas en salsa verde." },
    { title: "Quesadillas de Queso", description: "Con queso Oaxaca derretido y tortilla crujiente." },
    { title: "Mole Poblano", description: "Salsa compleja con chocolate y chiles." },
    { title: "Torta Mexicana", description: "Sándwich tradicional con diversos ingredientes." },
  ]

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      <div className="min-h-[300vh]  font-sans bg-gray-900 bg-opacity-60 rounded-lg">¨
   
        <Header />

        <div className="h-[5vh]" />
        <ContinuousScroll />

        <ImagenScroll />
        <Bloques />
        <CloudTextBlock/>
        <ReviewsCarousel />
        <TikTokVideos />
        <TikTokVideose />
      

      </div>
    </>
  )
}