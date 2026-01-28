'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from '@remix-run/react'
import Bloques from '~/components/Blocks/Bloques'
import CantinaFarewell from '~/components/Blocks/CantinaFarewell'
import TextEffect from "~/components/Blocks/Texteffet";

const tiktokUrl = "https://www.tiktok.com/@lwebwebsitedesign";
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
  const [showJobModal, setShowJobModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenJobModal')
    if (!hasSeenModal) {
      const modalTimer = setTimeout(() => {
        setShowJobModal(true)
      }, 1000)
      return () => clearTimeout(modalTimer)
    }
  }, [])

  const closeModal = () => {
    setShowJobModal(false)
    localStorage.setItem('hasSeenJobModal', 'true')
  }

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

      <AnimatePresence>
        {showJobModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/koch.jpeg')" }}
              />
              <div className="absolute inset-0 bg-black/50" />

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="relative z-10 p-8 pt-16 pb-8 text-center min-h-[350px] flex flex-col justify-end">
                <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                  Wir suchen einen Koch!
                </h2>

                <p className="text-white/90 mb-6 text-lg drop-shadow-md">
                  Werde Teil unseres Teams in der Cantina Tex-Mex!
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/jobs"
                    onClick={closeModal}
                    className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Jetzt bewerben
                  </Link>

                  <button
                    onClick={closeModal}
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Vielleicht später
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



        <CantinaFarewell />

        <TextEffect />


        <Bloques />



    </>
  )

}