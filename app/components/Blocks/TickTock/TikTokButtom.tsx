'use client'

import { motion } from 'framer-motion'
import { Music2 } from 'lucide-react'

const iconVariants = {
  animate: {
    rotate: [0, 10, -10, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export default function Header() {
  return (
    <header className="text-gray-200 p-6 rounded-xl overflow-hidden mb-28" style={{ maxWidth: '1000px', margin: '1rem auto' }}>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center"
        >

        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 text-center"
      >
      </motion.div>
    </header>
  )
}

