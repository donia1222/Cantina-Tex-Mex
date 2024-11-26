'use client'

import { useRef, useEffect, useState } from 'react'
import { Images } from 'lucide-react'
export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  // Manejar cierre del modal con ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  const renderImages = () => {
    return [...images, ...images].map((src, i) => (
      <div
        key={i}
        className="relative h-[200px] w-[300px] flex-shrink-0 overflow-hidden border-4 border-white shadow-md transform rotate-[-5deg] mx-[-20px]"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
      >
        <img
          src={src}
          alt={`Plato mexicano ${(i % images.length) + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
    ))
  }

  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden bg-background py-12 mt-10">
      <h1 className="mb-12 text-center text-4xl font-bold">
        <span className="text-white">Delicious</span>{' '}
        <span className="text-red-500">Mexican </span>
        <span className="text-green-500">Food</span>
      </h1>

      <div className="relative w-full overflow-hidden" style={{ perspective: '1000px' }}>
        <div 
          ref={carouselRef} 
          className={`flex transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(45deg)',
          }}
        >
          {renderImages()}
        </div>
      </div>

      {/* Botón con ícono de "+" */}
      <div className="flex justify-center mt-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-full  text-red-500 bg-gray-800 hover:bg-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mt-5 "
      >
        <Images className="h-6 w-6" />
        <span className="sr-only">Ver Todas las Fotos</span>
      </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className= "bg-gray-800 rounded-lg overflow-auto max-w-3xl w-full max-h-full p-4 relative">
    

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4  overflow-y-auto">
                      {/* Botón de cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed  bg-white text-gray-600 hover:text-gray-800 p-1 rounded-full z-50 "
              aria-label="Cerrar Galería"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

              {images.map((src, index) => (
                
                <div key={index} className="overflow-hidden rounded shadow-md">
                  <img src={src} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
