'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f1a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.img
              src="/cantina_logocopia.png"
              alt="Cantina Tex-Mex"
              className="h-24 w-auto rounded-[10px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Text below logo */}
            <p className="text-2xl font-extrabold text-white tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
                Cantina
              </span>{' '}
              Tex-Mex
            </p>

            {/* Loading dots */}
            <motion.div
              className="flex items-center justify-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-amber-400"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
