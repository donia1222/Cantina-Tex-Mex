"use client"

import ReservationForm from "~/components/Rerserve/ReservationForm"
import CurrentMessage from "~/components/Rerserve/CurrentMessage"
import ContinuousScroll from "~/components/Imagen/Continuous-Scroll-Reserve"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dog, ShipWheelIcon as Wheelchair, CreditCard } from "lucide-react"

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
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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


        {/* Service Information Section */}
        <motion.div
          className="mt-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 shadow-xl border border-gray-600">
            <h3 className="text-xl font-semibold text-center mb-6 bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text">
              Service-Informationen
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dogs Not Allowed - Friendly Version */}
              <motion.div
                className="flex flex-col items-center text-center p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600 hover:border-red-400 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-full mb-3 relative">
                  <Dog className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-0.5 bg-white transform rotate-45"></div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-200 mb-2">Haustierfreie Zone</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Aus hygienischen Gründen können wir leider keine Haustiere aufnehmen.
                </p>
              </motion.div>

              {/* Wheelchair Accessibility */}
              <motion.div
                className="flex flex-col items-center text-center p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600 hover:border-red-400 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mb-3">
                  <Wheelchair className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-200 mb-2">Barrierefrei</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Vollständig rollstuhlgerecht eingerichtet und zugänglich.
                </p>
              </motion.div>

              {/* Credit Card Payment */}
              <motion.div
                className="flex flex-col items-center text-center p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600 hover:border-red-400 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full mb-3">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-200 mb-2">Kartenzahlung</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Alle gängigen Kreditkarten und EC-Karten werden akzeptiert.
                </p>
              </motion.div>
            </div>

            {/* Additional Info Bar */}
            <motion.div
              className="mt-6 p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-center text-sm text-red-100">
                <span className="font-semibold">Hinweis:</span> Für spezielle Anforderungen kontaktieren Sie uns bitte
                im Voraus.
              </p>
            </motion.div>
          </div>
        </motion.div>
                <ContinuousScroll />
      </div>

      {/* Footer (if any) */}
    </div>
  )
}

export default IndexPage
