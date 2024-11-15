'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Calendar, PhoneCall, Facebook, Instagram } from 'lucide-react'
import handleDownloadVCard from '~/utils/downloadVCard';
export default function Contact() {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Kontakt <span aria-hidden="true">👋</span></h1>

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
              <circle
                id="pattern-circle"
                cx="5"
                cy="5"
                r="1"
                fill="#fff"
              ></circle>
            </pattern>
            <rect
              id="rect"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
   
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Kontaktinformationen</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-red-500" />
              <span>Bahnhofstrasse 46, 9475 Sevelen</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-6 w-6 mr-3 text-red-500" />
              <a href="tel:0817501911" className="hover:underline">0817501911</a>
            </li>
            <li className="flex items-center">
              <Mail className="h-6 w-6 mr-3 text-red-500" />
              <a href="mailto:info@cantinatexmex.ch" className="hover:underline">info@cantinatexmex.ch</a>
            </li>
            <li className="flex items-start">
              <Clock className="h-6 w-6 mr-3 mt-1 text-red-500" />
              <span>
                Di-Mi: 18:00-21:30<br />
                Do-Fr: 11:30-13:30, 18:00-22:00<br />
                Samstag: 18:00-22:30
              </span>
            </li>
          </ul>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reservierung</h3>
            <div className="space-y-4">
              <motion.a
                href="https://reservierung.cantinatexmex.ch"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Tisch online Reservieren
              </motion.a>
              <motion.a
                href="tel:0817501911"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                0817501911
              </motion.a>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
          <button
          id="downloadVCard"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleDownloadVCard} // Asignar la función de descarga
        >
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
          <img 
            src="/logo3-copia1-1.png" 
            alt="Cantina Tex Mex Logo" 
            className="rounded-lg shadow-md h-34 object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Unser Standort</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.4866543537747!2d9.494731315591655!3d47.11466397915501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b3168f6b9d0c3%3A0x4b7a1d5b6a7b0f0a!2sBahnhofstrasse%2046%2C%209475%20Sevelen%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1635794729872!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Cantina Tex Mex Standort"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}