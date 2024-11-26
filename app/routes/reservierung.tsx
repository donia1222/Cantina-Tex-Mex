
import ReservationForm from "~/components/Rerserve/ReservationForm";
import AnimatedGradientText from '~/components/AnimatedGradient/AnimatedGradientTextdos';
import CurrentMessage from '~/components/Rerserve/CurrentMessage';
import ContinuousScroll from '~/components/Imagen/Continuous-Scroll-Reserve'; 

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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



const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 500)
  return () => clearTimeout(timer)
}, [])

  return (
    <div className="container mx-auto">
                  {loading && <Loadere />}
      <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-4">
        
        {/* Header Section */}
        <div className="flex justify-center items-center mt-5 ">
          <div className="text-3xl sm:text-4xl md:text-4xl font-poppins font-bold ml-4">
            <span className="bg-gradient-to-r from-gray-200 via-gray-500 to-red-500 text-transparent bg-clip-text font-poppins">
              Reservierung
            </span>
  
          </div>
        </div>


        <CurrentMessage />

        <ReservationForm />
        <ContinuousScroll />

      </div>

      {/* Footer (if any) */}
    </div>
  );
};

export default IndexPage;
