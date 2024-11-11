import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Coffee, UtensilsCrossed } from 'lucide-react'

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
    <header className="bg-gray-800 text-red-500 p-6 rounded-xl shadow-2xl overflow-hidden" style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold">El Sabor Mexicano</h1>
          <div className="flex space-x-4">
            <motion.div variants={iconVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} transition={{ delay: 0.2 }}>
              <ChefHat className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <motion.div variants={iconVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} transition={{ delay: 0.4 }}>
              <Coffee className="w-8 h-8 text-green-500" />
            </motion.div>
            <motion.div variants={iconVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} transition={{ delay: 0.6 }}>
              <UtensilsCrossed className="w-8 h-8 text-red-500" />
            </motion.div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=500&q=80" 
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
            <h2 className="text-2xl font-semibold mb-2">Bienvenidos a nuestra cocina</h2>
            <p className="text-white mb-4">Descubre los auténticos sabores de México en cada plato.</p>
            <button 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
              onClick={() => alert('¡Gracias por tu interés! Pronto podrás hacer reservaciones.')}
            >
              Reserva Ahora
            </button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-lg text-yellow-500 font-medium">Abierto de Martes a Domingo | 12:00 PM - 10:00 PM</p>
        </motion.div>
      </div>
    </header>
  )
}