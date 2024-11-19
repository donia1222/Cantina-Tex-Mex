'use client'

import { useRef, useEffect, useState } from 'react'

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const images = [
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t1.6435-9/96771444_3048192125224744_9026765579553341440_n.jpg?stp=c0.79.720.720a_dst-jpg_s552x414&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=HueD_G8fSEMQ7kNvgHIxehV&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=ACsvFNo8Uxvb9lUKmJ9sW6s&oh=00_AYDazqqIcVAQedEImHDiOlstHEuoQVlryKKFPMPrIblhYg&oe=67640CD4',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/332276678_729678142048349_6055069951294180526_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_ohc=YQcGMGGkE3UQ7kNvgFiu3YX&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AtcDxPfBiBZnSDLZQXdqPh6&oh=00_AYD1w0L_ChMBkYeAKhrrRbo4q2iYy-jTAlvfsiJ8WxKc3w&oe=67425096',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/408778701_7023455594365024_5665042725466621561_n.jpg?stp=c0.45.405.405a_dst-jpg_p180x540&_nc_cat=110&ccb=1-7&_nc_sid=50ad20&_nc_ohc=7r_LZTDaBHkQ7kNvgH4g0PO&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AqEDtqA0AlLQ5FEMnAz48ER&oh=00_AYCeAppu48ml6neXdAkFgfKmhzoYU4TbskIzV_oaLSAYAA&oe=67426D16',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/439841319_7627758137268097_6078669999976348850_n.jpg?stp=c0.45.405.405a_cp6_dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=w9VP9fHWvcIQ7kNvgHBOGQN&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7yAyFxNZku2fkoxn0qtWWS&oh=00_AYCi3k6xf0ana1ByFEjRS5oEFDvjkm8vIWUJKVKtKEgsIA&oe=6742414A',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/340953503_899805901242235_6919901440272749_n.jpg?stp=c215.0.1618.1618a_dst-jpg_s552x414&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=touP2vsRln4Q7kNvgGRA9WM&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7VliaeQNqIos7kk9Z4MmdJ&oh=00_AYAq3cMrrF6gjq5ouCabJ7sA7BhMQupf7Nf1r7yxtfeqmQ&oe=6742367E',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/392752901_6836433206400598_674011603173879248_n.jpg?stp=c14.0.539.539a_dst-jpg_s552x414&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_ohc=4oHdJOpUCo8Q7kNvgEZ7O4T&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A8CEfIEGUzOnwDqfyCDGhLZ&oh=00_AYBrefLIGHh4DKD3nmaVpAYvx-NIPy1udioWNh5_BqfIrg&oe=67425D08',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/379923160_6727241013986485_7685687752845216281_n.jpg?stp=c0.296.1152.1152a_dst-jpg_s552x414&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_ohc=xDWsvPl8qj4Q7kNvgGjGnLT&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A8CEfIEGUzOnwDqfyCDGhLZ&oh=00_AYCdbFTnHz6Ijfu6V9CZpPSfKtWlnjLTAFyTtfGh77A9_A&oe=67423C0E',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/462422528_8551985061512062_7133407350959336931_n.jpg?stp=c0.45.405.405a_cp6_dst-jpg_p180x540&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=H8Mq4Ro_UYQQ7kNvgFbK7ST&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=AqEDtqA0AlLQ5FEMnAz48ER&oh=00_AYAlRO0Ve_9Pb7knowqTzwEUcEl7ELrEp4tybPU-0YN0lA&oe=67424C6A',
    'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/340953503_899805901242235_6919901440272749_n.jpg?stp=c215.0.1618.1618a_dst-jpg_s552x414&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=touP2vsRln4Q7kNvgGRA9WM&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=A7VliaeQNqIos7kk9Z4MmdJ&oh=00_AYAq3cMrrF6gjq5ouCabJ7sA7BhMQupf7Nf1r7yxtfeqmQ&oe=6742367E',

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
    </div>
  )
}