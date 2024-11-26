// app/routes/Menu.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderDrin from '~/components/Header/HeaderDrin'; 
import Drinksblock from '~/components/Blocks/Drinksblock'; 
import BannerDrinks from '~/components/Banner/BannerDrinks'; 




const Loadere = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <motion.div
      className="w-20 h-20 border-t-4 border-red-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
)



export default function Menu() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Variants para las animaciones de entrada de las tarjetas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
  };

  return (
    <div className=" bg-gray-900 bg-opacity-80 text-red-500 p-2 rounded-lg">
            {loading && <Loadere />}
      <HeaderDrin />
      <Drinksblock />

      <BannerDrinks />

    </div>
  );
}
