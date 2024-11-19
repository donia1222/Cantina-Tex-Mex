'use client'

import { useEffect, useRef, useState } from 'react'

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call to set initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getTranslateY = (index: number) => {
    // Calculate a smooth vertical translation effect
    const offset = (scrollPosition / 10) - (index * 50)
    return `translateY(${offset}px)`
  }

  return (
    <div className="min-h-[200vh]">
      {containerRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          className="sticky top-20 z-10 flex items-center justify-center overflow-hidden mt-20"
          style={{ height: '60vh' }} // Fixed height for stability
        >
          <div
            className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: getTranslateY(index),
            }}
          >
            <img
              src={
                index === 0
                  ? '/271248933_4690667767653344_444005926034541016_n.jpg'
                  : index === 1
                  ? '/71090723_2437703966283080_832535812116578304_n.jpg'
                  : '/IMG_1535.JPG'
              }
              alt={
                index === 0
                  ? 'Bunte mexikanische Gerichte'
                  : index === 1
                  ? 'Mexikanischer Koch bei der Essenszubereitung'
                  : 'Innenraum des mexikanischen Restaurants'
              }
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-2 text-center">
              <div className="max-w-3xl space-y-4 text-white bg-black/50 rounded-lg p-4 shadow-lg">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  {index === 0
                    ? 'Authentische Mexikanische Aromen'
                    : index === 1
                    ? 'Die Besten Fajitas'
                    : 'Lebendige Atmosphäre'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="relative z-20">
        <div className="mx-auto max-w-4xl p-8"></div>
      </div>
    </div>
  )
}
