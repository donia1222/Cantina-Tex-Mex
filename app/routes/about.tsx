"use client"

import { useEffect, useRef, useState } from "react"

export default function Component() {
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrollPosition = window.scrollY
      const containerHeight = containerRef.current.offsetHeight
      
      // Calculate scale based on scroll position
      // Minimum scale is 0.8, maximum is 1
      const newScale = Math.max(0.8, 1 - (scrollPosition / containerHeight) * 0.5)
      setScale(newScale)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-[200vh]">
      <div 
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black"
      >
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <img
            ref={imageRef}
            src="https://cantinatexmex.ch/images/2022/01/29/pexels-alleksana-6400028-2.jpg"
            alt="Featured image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      
      {/* Content that creates scrollable space */}
      <div className="relative pt-[100vh] ">
        <div className="bg-background min-h-screen p-8 bg-white  ">
          <h1 className="text-4xl font-bold mb-4">Scroll down to see the effect</h1>
          <p className="text-lg text-muted-foreground">
            As you scroll, the image above will smoothly scale down to create a dynamic visual effect.
          </p>
        </div>
      </div>
    </div>
  )
}