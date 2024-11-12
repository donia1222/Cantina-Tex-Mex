import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Coffee, UtensilsCrossed } from 'lucide-react'
import AnimatedGradientText from '~/components/AnimatedGradientText';

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header className=" p-6 rounded-xl shadow-2xl overflow-hidden bg-gray-900 bg-opacity-90 " style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div className="relative">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
   <AnimatedGradientText texts={['Mojito',  ' Caipirinha',  'Margarita',  'Piña Colada', ]} className="text-white"  />

        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="IMG_0898.jpeg" 
              alt="Plato mexicano" 
              className="rounded-lg shadow-md w-full h-48 object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-semibold mb-90  text-white text-center ">Unsere Getränkekarte</h2>
            <p className="text-white mb-4"></p>
           
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
        </motion.div>
      </div>
    </header>
  )
}