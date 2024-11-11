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
    <header className="bg-gray-800 text-gray-400 p-6 rounded-xl shadow-2xl overflow-hidden" style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
   <AnimatedGradientText texts={['Mojito',  ' Caipirinha',  'Margarita',  'Piña Colada',  'Sex on the Beach']} className="text-white"  />

        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="IMG_1696.jpeg" 
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
            <h2 className="text-5xl font-semibold mb-8  text-center ">Drinks</h2>
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