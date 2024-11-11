'use client'

import { useEffect, useRef, useState } from 'react'
import Bloques from '~/components/Bloques'; 
export default function Component() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef1 = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)
  const containerRef3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight - windowHeight
      const scrollPosition = window.scrollY
      const progress = Math.min(scrollPosition / fullHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call to set initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getScale = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementVisibility = Math.min(Math.max((viewportHeight - rect.top) / viewportHeight, 0), 1)
      return 1 - (elementVisibility * 0.3) // Reduce by 30% at most
    }
    return 1
  }

  const getHeight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementVisibility = Math.min(Math.max((viewportHeight - rect.top) / viewportHeight, 0), 1)
      return 100 - (elementVisibility * 40) // Reduce height by 40% at most
    }
    return 100
  }

  return (
    <div className="min-h-[300vh]">
      <div
        ref={containerRef1}
        className="sticky top-20 z-10 flex items-center justify-center overflow-hidden"
        style={{
          height: `${Math.max(getHeight(containerRef1), 60)}vh`, // Minimum height of 60vh
        }}
      >
        <div 
          className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `scale(${getScale(containerRef1)})`,
          }}
        >
          <img
            src="https://cantinatexmex.ch/images/2022/01/29/pexels-alleksana-6400028-2.jpg"
            alt="Hero image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center">
            <div className="max-w-3xl space-y-4 text-white">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Liquid Retina XDR Display</h1>
              <p className="text-lg sm:text-xl">
                Go from the sunniest terrace to the darkest studio with more ease than ever. The eye-popping display offers
                1,600 nits peak HDR brightness.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={containerRef2}
        className="sticky top-20 z-10 flex items-center justify-center overflow-hidden"
        style={{
          height: `${Math.max(getHeight(containerRef2), 60)}vh`, // Minimum height of 60vh
        }}
      >
        <div 
          className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `scale(${getScale(containerRef2)})`,
          }}
        >
          <img
            src="https://cantinatexmex.ch/images/2022/01/29/18936025_m-1.jpg"
            alt="Hero image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center">
            <div className="max-w-2xl space-y-4 text-white">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Powerful Performance</h1>
              <p className="text-lg sm:text-xl">
                Experience unparalleled speed and efficiency with our latest processor. Multitask like never before and 
                push your creativity to new heights.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 ">
      <Bloques />
        <div className="mx-auto max-w-4xl p-8">
      
        </div>
      </div>
      <div
        ref={containerRef3}
        className="sticky top-20 z-10 flex items-center justify-center overflow-hidden"
        style={{
          height: `${Math.max(getHeight(containerRef3), 60)}vh`, // Minimum height of 60vh
        }}
      >
        <div 
          className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `scale(${getScale(containerRef3)})`,
          }}
        >
          <img
            src="https://cantinatexmex.ch/images/speasyimagegallery/albums/1/images/res1.png"
            alt="Hero image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center">
            <div className="max-w-2xl space-y-4 text-white">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Innovative Design</h1>
              <p className="text-lg sm:text-xl">
                Sleek, elegant, and built to last. Our cutting-edge design combines form and function
                to create a device that's not just powerful, but beautiful too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}