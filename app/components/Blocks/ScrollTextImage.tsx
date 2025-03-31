"use client"

import { useEffect, useRef, useState } from "react"

// Utility function to conditionally join class names
function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface ScrollTextVideoProps {
  videoUrl: string
  textItems: string[]
  className?: string
}

export default function ScrollTextVideo({ videoUrl, textItems, className }: ScrollTextVideoProps) {
  const [activeTextIndex, setActiveTextIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          document.addEventListener("scroll", handleScroll)
        } else {
          document.removeEventListener("scroll", handleScroll)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(section)

    const handleScroll = () => {
      if (!section) return

      const { top, height } = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far we've scrolled through the section
      const scrollPercentage = 1 - top / (windowHeight - height)

      // Determine which text to show based on scroll percentage
      if (scrollPercentage <= 0) {
        setActiveTextIndex(0)
      } else {
        const index = Math.min(Math.floor(scrollPercentage * textItems.length), textItems.length - 1)
        setActiveTextIndex(index)
      }
    }

    return () => {
      observer.disconnect()
      document.removeEventListener("scroll", handleScroll)
    }
  }, [textItems.length])

  return (
    <div
      ref={sectionRef}
      className={classNames(
        "relative h-[40vh] max-w-[95%] w-[1000px] mx-auto mb-20 mt-20 overflow-hidden rounded-lg",
        className,
      )}
    >
      <div className="absolute inset-0">
        <video
          src={videoUrl || "/placeholder.mp4"}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="text-center w-full">
          {textItems.map((text, index) => (
            <p
              key={index}
              className={classNames(
                "text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-gray-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-all duration-700 absolute left-0 right-0 px-4",
                activeTextIndex === index ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
              )}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

