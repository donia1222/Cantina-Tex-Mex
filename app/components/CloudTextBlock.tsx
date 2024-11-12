'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, Check, Copy } from 'lucide-react';

const slides = [
  {
    image: '/IMG_1537.JPG',
    title: 'Tex-Mex Platte',
    description: 'Geniesst als Gruppe ab 10 Personen unser Highlight: die Tex-Mex Platte, eine Auswahl an Tex-Mex Spezialitäten. Sie wird als Buffet am Tisch serviert, bei dem sich jeder nehmen kann, was ihm am besten schmeckt.' 
  },
  {
    image: '/alcoholic-beverage-cocktail-with-halves-pear-high-view.jpg',
    title: 'Monatsspezial',
    description: 'Apfel-Birnen-Margarita mit einem Hauch Zimt. Auch in einer alkoholfreien Variante erhältlich.'
  },
  {
    image: '/reserved-table-restaurant.jpg',
    title: 'Zukunft der Cantina',
    description: 'Neuigkeiten ab dem nächsten Jahr: Schon bald werden wir wissen, was mit der Cantina passiert. Schließen wir? Ziehen wir um? Wohin? Bleiben Sie gespannt auf weitere Informationen!'
  }
];

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };




  return (
    <div className="space-y-8 mb-24 mt-4">
      
       <h1 className="text-4xl font-bold mb-6 text-gray-400 text-center">Cantina<span className="ml-2  text-4xl font-bold mb-6 text-red-500 text-center">
            News!
          </span></h1>

      <div className="relative w-full max-w-6xl mx-auto  bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl overflow-hidden ">
        <div className="flex flex-col lg:flex-row">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="30"
              height="40"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="5"
                cy="5"
                r="1"
                fill="#fff"
              ></circle>
            </pattern>
            <rect
              id="rect"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
        </div>
          <div className="w-full lg:w-1/2 relative overflow-hidden h-[300px] lg:h-[500px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="absolute inset-0 w-full h-full object-cover"
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1
                  },
                  exit: (direction: number) => ({
                    zIndex: 0,
                    x: direction < 0 ? 1000 : -1000,
                    opacity: 0
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
              <button
                onClick={handlePrev}
                className="bg-white bg-opacity-70 text-gray-800 rounded-full p-3 hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-label="Previous slide"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="bg-white bg-opacity-70 text-gray-800 rounded-full p-3 hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-label="Next slide"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">{slides[currentIndex].title}</h2>
                <p className="text-base lg:text-lg text-gray-400">{slides[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
   
      </div>

      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            <code className="language-typescript"></code>
          </pre>
      
        </motion.div>
      )}
    </div>
  );
}