'use client'

import { useRef, useEffect, useState } from 'react'
import { Images, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const images = [
    '96771444_3048192125224744_9026765579553341440_n.jpg',
    '97244267_3048192211891402_6039080813994180608_n-1.jpg',
    '408778701_7023455594365024_5665042725466621561_n.jpg',
    '380463587_6727241030653150_4048382247297197735_n.jpg',
    '332276678_729678142048349_6055069951294180526_n.jpg',
    '340953503_899805901242235_6919901440272749_n-1.jpg',
    '438173186_7653479781362599_697120932184771415_n.jpg',
    '341017676_193394293476182_6026518463803186226_n.jpg',
    '379923160_6727241013986485_7685687752845216281_n.jpg',
    '392752901_6836433206400598_674011603173879248_n.jpg',
    '439841319_7627758137268097_6078669999976348850_n-1.jpg',
    '460951897_8424326557611247_2679532686594186090_n.jpg',
    '461159350_8424326254277944_3371331706199332092_n.jpg',
    '462422528_8551985061512062_7133407350959336931_n.jpg',
  ]
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
    const carousel = carouselRef.current

    if (carousel) {
      const totalWidth = carousel.scrollWidth / 2
      let position = 0

      const animate = () => {
        position -= 0.5
        if (Math.abs(position) >= totalWidth) {
          position = 0
        }
        carousel.style.transform = `translateX(${position}px)`
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isModalOpen])

  const modal = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <Images className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Galerie</h2>
                  <p className="text-gray-400 text-sm">{images.length} Fotos</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid */}
            <div className="overflow-y-auto flex-grow p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="relative rounded-2xl overflow-hidden group aspect-[4/3]"
                  >
                    <img
                      src={src}
                      alt={`Cantina Impressionen ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <div className="w-full max-w-5xl mx-auto overflow-hidden py-10">
        <div className="relative w-full overflow-hidden" style={{ perspective: '1000px' }}>
          <div
            ref={carouselRef}
            className={`flex transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(45deg)',
            }}
          >
            {[...images, ...images].map((src, i) => (
              <div
                key={i}
                className="relative h-[200px] w-[300px] flex-shrink-0 overflow-hidden rounded-xl border-2 border-white/20 mx-[-10px]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <img
                  src={src}
                  alt={`Cantina ${(i % images.length) + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white/10 border border-white/10 text-gray-300 font-semibold text-sm hover:bg-white/15 transition-all"
          >
            <Images className="w-5 h-5" />
            Alle Fotos ansehen
          </button>
        </div>
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  )
}
