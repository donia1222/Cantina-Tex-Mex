'use client'

import { useEffect, useRef, useState } from 'react'
import Bloques from '~/components/Bloques'

export default function Component() {
  const containerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  const [scrollOpacity, setScrollOpacity] = useState([1, 1, 1])

  useEffect(() => {
    const handleScroll = () => {
      const newOpacities = containerRefs.map((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const visibility = Math.min(
            Math.max((viewportHeight - rect.top) / viewportHeight, 0),
            1
          )
          return visibility // Adjust opacity based on visibility
        }
        return 1
      })
      setScrollOpacity(newOpacities)
    }

    // Use requestAnimationFrame for smoother scrolling updates
    const optimizedHandleScroll = () => requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', optimizedHandleScroll)
    handleScroll() // Initial call to set initial state

    return () => window.removeEventListener('scroll', optimizedHandleScroll)
  }, [])

  return (
    <div className="min-h-[300vh]">
      {containerRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          className="sticky top-20 z-10 flex items-center justify-center overflow-hidden"
          style={{
            opacity: scrollOpacity[index], // Adjust opacity
            transition: 'opacity 0.5s ease-out', // Smooth opacity transition
            height: '60vh', // Fixed height for stability
          }}
        >
          <div className="relative h-full w-full">
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
              <div className="max-w-3xl space-y-4 text-white">
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
        <Bloques />
        <div className="mx-auto max-w-4xl p-8"></div>
      </div>
    </div>
  )
}
