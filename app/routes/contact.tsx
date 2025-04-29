"use client"

import { MapPin, Mail, Clock, Calendar, PhoneCall, Facebook, Instagram, Download } from "lucide-react"
import handleDownloadVCard from "~/utils/downloadVCard"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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

export default function Contact() {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-80 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
      {loading && <Loadere />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-center items-center mt-5 mb-10">
          <div className={`text-3xl sm:text-4xl md:text-4xl font-poppins font-bold ml-4 `}>
            <span className="bg-gradient-to-r from-gray-200 via-gray-500 to-red-500 text-transparent bg-clip-text font-poppins">
              Kontakt 👋
            </span>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="30"
            height="40"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle id="pattern-circle" cx="5" cy="5" r="1" fill="#fff"></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Kontaktinformationen</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-red-500" />
              <span>Bahnhofstrasse 40, 9470 Buchs</span>
            </li>

            <li className="flex items-center">
              <PhoneCall className="h-6 w-6 mr-3 text-red-500" />
              <a href="tel:+41817560101" className="hover:underline">
                +41 81 756 01 01
              </a>
            </li>

            <li className="flex items-center">
              <Mail className="h-6 w-6 mr-3 text-red-500" />
              <a href="mailto:info@cantinatexmex.ch" className="hover:underline">
                info@cantinatexmex.ch
              </a>
            </li>
            <li className="flex items-start">
              <Clock className="h-6 w-6 mr-3 mt-1 text-red-500" />
              <span>
                Di-Sa: 11:30-13:30 / 18:00-21:00
                <br />
              </span>
            </li>
          </ul>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reservierung</h3>
            <div className="space-y-4">
              <motion.a
                href="/reservierung"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Tisch online Reservieren
              </motion.a>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              id="downloadVCard"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleDownloadVCard} // Asignar la función de descarga
            >
              <Download className="w-5 h-5 mr-2" />
              Visitenkarte herunterladen
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <motion.a
              href="https://www.facebook.com/cantinasevelen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Besuchen Sie uns auf Facebook"
            >
              <Facebook className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/cantina_badrans/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Folgen Sie uns auf Instagram"
            >
              <Instagram className="w-8 h-8" />
            </motion.a>
          </div>
        </div>
        <div className="flex justify-center items-center my-12">
          <img src="/images-2.png" alt="Cantina Tex Mex Logo" className="rounded-lg shadow-md h-34 object-cover" />
        </div>
      </motion.div>
    </div>
  )
}
