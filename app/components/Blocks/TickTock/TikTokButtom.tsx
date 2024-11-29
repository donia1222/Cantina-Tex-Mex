'use client'

import { motion } from 'framer-motion'
import { FlameKindling } from 'lucide-react'

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
          <a
            href="https://www.tiktok.com/@lwebwebsitedesign"
            className="relative px-6 py-3 font-bold text-gray-100 group max-w-[80%] mx-auto block mt-10"
          >
            <span className="absolute inset-0 transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-gray-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 border-2 border-gray-300"></span>
            <span className="relative flex items-center justify-center">
             <span className="text-red-400 mx-1">TikTok</span> 
              <FlameKindling className="ml-2 h-8 w-8" />
            </span>
          </a>
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

