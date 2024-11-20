'use client'

import { useRef, useEffect, useState } from 'react'
import { Images } from 'lucide-react'
export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const images = [
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t1.6435-9/96771444_3048192125224744_9026765579553341440_n.jpg?stp=c0.79.720.720a_dst-jpg_s552x414&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=HueD_G8fSEMQ7kNvgHIxehV&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=ACsvFNo8Uxvb9lUKmJ9sW6s&oh=00_AYDazqqIcVAQedEImHDiOlstHEuoQVlryKKFPMPrIblhYg&oe=67640CD4',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/332276678_729678142048349_6055069951294180526_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_ohc=YQcGMGGkE3UQ7kNvgFiu3YX&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AtcDxPfBiBZnSDLZQXdqPh6&oh=00_AYD1w0L_ChMBkYeAKhrrRbo4q2iYy-jTAlvfsiJ8WxKc3w&oe=67425096',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t1.6435-9/97244267_3048192211891402_6039080813994180608_n.jpg?stp=c0.79.720.720a_dst-jpg_s552x414&_nc_cat=111&ccb=1-7&_nc_sid=50ad20&_nc_ohc=VIAkKTYkBUcQ7kNvgETwE18&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AjVRDSIbsLkQcYYcv6f8QvL&oh=00_AYC2OqZgGu9efHToqBoQOCasJvZVuI7VBT09_GvjkSUfIw&oe=67654492',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/408778701_7023455594365024_5665042725466621561_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=110&ccb=1-7&_nc_sid=50ad20&_nc_ohc=7r_LZTDaBHkQ7kNvgH4g0PO&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AqEDtqA0AlLQ5FEMnAz48ER&oh=00_AYCeAppu48ml6neXdAkFgfKmhzoYU4TbskIzV_oaLSAYAA&oe=67426D16',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/460975576_8424326554277914_5997345390722191984_n.jpg?stp=c155.0.650.650a_dst-jpg_s552x414&_nc_cat=103&ccb=1-7&_nc_sid=969c58&_nc_ohc=0h8opbQos3sQ7kNvgHPeQrg&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=ADYkh561nZcUqQmiKR7cdwz&oh=00_AYDqSLM5t-suZhh5o3uTHOLrHLcxEWQ07WcdnFwrZgC9ng&oe=67438AA5',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/381058243_6727241220653131_9016943948658063679_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_ohc=h0x6GPtp-gMQ7kNvgE6vUTW&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A5HJJUd_OsNj-4svE793DhM&oh=00_AYBVk5ynOLZK0B0tB_GXtmPGQ7bx7Kc22oKE6oFjU9cDrQ&oe=6743B7F8',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/439841319_7627758137268097_6078669999976348850_n.jpg?stp=c0.45.405.405a_cp6_dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=w9VP9fHWvcIQ7kNvgHBOGQN&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7yAyFxNZku2fkoxn0qtWWS&oh=00_AYCi3k6xf0ana1ByFEjRS5oEFDvjkm8vIWUJKVKtKEgsIA&oe=6742414A',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/340953503_899805901242235_6919901440272749_n.jpg?stp=c215.0.1618.1618a_dst-jpg_s552x414&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=touP2vsRln4Q7kNvgGRA9WM&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7VliaeQNqIos7kk9Z4MmdJ&oh=00_AYAq3cMrrF6gjq5ouCabJ7sA7BhMQupf7Nf1r7yxtfeqmQ&oe=6742367E',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/461159350_8424326254277944_3371331706199332092_n.jpg?stp=c261.0.636.636a_dst-jpg_s552x414&_nc_cat=103&ccb=1-7&_nc_sid=50c75d&_nc_ohc=-u1LVAXd2vAQ7kNvgGu8Pck&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=Ach0xfQaei3-EuXjrnWEAPi&oh=00_AYCEpECW-JNgb9xNrcoFj2vOOnV_leBNJJtwU21BxOL13Q&oe=6743903F',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/392752901_6836433206400598_674011603173879248_n.jpg?stp=c14.0.539.539a_dst-jpg_s552x414&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_ohc=4oHdJOpUCo8Q7kNvgEZ7O4T&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A8CEfIEGUzOnwDqfyCDGhLZ&oh=00_AYBrefLIGHh4DKD3nmaVpAYvx-NIPy1udioWNh5_BqfIrg&oe=67425D08',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/460951897_8424326557611247_2679532686594186090_n.jpg?stp=c159.0.643.643a_dst-jpg_s552x414&_nc_cat=100&ccb=1-7&_nc_sid=969c58&_nc_ohc=o1lDXFBp3-4Q7kNvgGkjeFC&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=ADYkh561nZcUqQmiKR7cdwz&oh=00_AYCrzyJRZFgOMRjFOdSf4stkHQv2JtxIlaokrSvX73IJqg&oe=6743B4C3',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/379923160_6727241013986485_7685687752845216281_n.jpg?stp=c0.296.1152.1152a_dst-jpg_s552x414&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_ohc=xDWsvPl8qj4Q7kNvgGjGnLT&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A8CEfIEGUzOnwDqfyCDGhLZ&oh=00_AYCdbFTnHz6Ijfu6V9CZpPSfKtWlnjLTAFyTtfGh77A9_A&oe=67423C0E',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/462422528_8551985061512062_7133407350959336931_n.jpg?stp=c0.45.405.405a_cp6_dst-jpg_p180x540&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=H8Mq4Ro_UYQQ7kNvgFbK7ST&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AqEDtqA0AlLQ5FEMnAz48ER&oh=00_AYAlRO0Ve_9Pb7knowqTzwEUcEl7ELrEp4tybPU-0YN0lA&oe=67424C6A',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/340953503_899805901242235_6919901440272749_n.jpg?stp=c215.0.1618.1618a_dst-jpg_s552x414&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=touP2vsRln4Q7kNvgGRA9WM&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7VliaeQNqIos7kk9Z4MmdJ&oh=00_AYAq3cMrrF6gjq5ouCabJ7sA7BhMQupf7Nf1r7yxtfeqmQ&oe=6742367E',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/341017676_193394293476182_6026518463803186226_n.jpg?stp=c0.48.1902.1902a_dst-jpg_s552x414&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=1MNlNpEZ6OYQ7kNvgGWuQFJ&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7xU3q4ZLErXcJ4_7slvylU&oh=00_AYCRvndBb5ExuGSNYydXdeznFS2J8UpMxItJzql6RkXu5g&oe=6743AACA',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/380463587_6727241030653150_4048382247297197735_n.jpg?stp=c0.169.1088.1088a_dst-jpg_s552x414&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=efsrcwwQl-oQ7kNvgF5vayy&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A5HJJUd_OsNj-4svE793DhM&oh=00_AYCTB4Q2u4pg69SUgoioAGBV0mSL5h6i6jkJtcaZfKQMQA&oe=67439D29',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/438173186_7653479781362599_697120932184771415_n.jpg?stp=c0.264.1248.1248a_cp6_dst-jpg_s552x414&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=tKXswizWCRQQ7kNvgE9Y29N&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AFqxzRe9YO7IeKqhnyw3w2N&oh=00_AYAdO0PHDSPkKWW_4OgYUMn9CDmbPlmrFFZEDKi2EmCC0g&oe=6743B1B0',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/380485952_6727241060653147_6823954597876842557_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=IzY3rUNj_bIQ7kNvgH7bKRh&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A5HJJUd_OsNj-4svE793DhM&oh=00_AYDOSTOuYrpjZEjlDmk4NJRRBy7TJfOBg25qpSpt_Up6Kg&oe=6743AAFE',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/340854948_1629254124154980_5818330145106395863_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_ohc=wJ9xDkpyBDYQ7kNvgFRF1SN&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AtzLPqSWvPF1oTQKhBo1oSc&oh=00_AYCoPg0c_wsb06xCK8BzqWjIwY8K8HFE0zI5R6Uvc7uXwQ&oe=6743AB13',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/340906815_2031380237202113_926181127649440560_n.jpg?stp=c0.130.1655.1655a_dst-jpg_s552x414&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=BOCFyWbF2cMQ7kNvgHqNvJU&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7xU3q4ZLErXcJ4_7slvylU&oh=00_AYAqS3d7DVTdD_k-5c6VTkUEUhD8AC4V2ru7O72eWz0KBw&oe=6743895A',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t1.6435-9/97083152_3048192061891417_4450445743475392512_n.jpg?stp=c0.79.720.720a_dst-jpg_s552x414&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=nFewEo_GT6IQ7kNvgG_NOje&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AjVRDSIbsLkQcYYcv6f8QvL&oh=00_AYAjxxK7PYJSass8b9W_1iYx4wttrbjXX45Lwgds_UcioQ&oe=67653D56',

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
        className="rounded-full  text-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mt-5 "
      >
        <Images className="h-8 w-8" />
        <span className="sr-only">Ver Todas las Fotos</span>
      </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className= "bg-gray-800 rounded-lg overflow-auto max-w-3xl w-full max-h-full p-4 relative">
            {/* Botón de cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed top-5 right-4 bg-white text-gray-600 hover:text-gray-800 p-1 rounded-full z-50 "
              aria-label="Cerrar Galería"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
