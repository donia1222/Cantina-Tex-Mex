// app/routes/Menu.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { X, Leaf, Flame, Baby, IceCream, Diff } from 'lucide-react';
import AnimatedGradientText from '~/components/AnimatedGradientText'; // Asegúrate de que la ruta sea correcta
import HeaderDrin from '~/components/HeaderDrin'; 
import Drinksblock from '~/components/Drinksblock'; 



export default function Menu() {

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
    <div className=" bg-gray-900 bg-opacity-80 text-red-500 p-0 rounded-lg">


      <HeaderDrin />
      <Drinksblock />

      {/* Modal de sección activa */}

    </div>
  );
}
