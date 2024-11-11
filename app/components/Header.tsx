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

  const AnimatedText = ({ text }: { text: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-1xl font-bold text-center text-yellow-500 mb-8"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    )
  }
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
<div className="flex justify-center items-center ml-20">
  <AnimatedGradientText 
    texts={['Lust auf Tex-Mex', ' und Cocktails?']} 
    className="text-white" 
  />
</div>


        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
        <div className="flex justify-center items-center">
  <img 
    src="https://cantinatexmex.ch/images/2022/03/05/logo3-copia1.png" 
    alt="Plato mexicano" 
    className="rounded-lg shadow-md h-40 object-cover bg-gray-300"
  />
</div>

          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl font-semibold mb-8  text-center ">Bienvenidos</h2>
            <div className="bg-cover bg-center flex flex-col items-center justify-start font-poppins rounded-lg">
          <AnimatedText text="CANTINA SEIT 2010 IM SEVELEN" />
        </div>
 
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