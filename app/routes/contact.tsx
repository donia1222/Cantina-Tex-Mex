'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, PhoneCall, Facebook, Instagram } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Neue Nachricht von der Website');
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\nNachricht: ${formState.message}`);
    window.location.href = `mailto:info@cantinatexmex.ch?subject=${subject}&body=${body}`;
    setFormState({ name: '', email: '', message: '' });
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-400 bg-opacity-90 py-12 px-2 sm:px-6 lg:px-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-12">Kontakt 👋</h1>
        
        <div className="flex justify-center items-center">
        <div className="absolute inset-0 z-0 opacity-20">
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
        </div>
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-xl rounded-lg p-8 flex flex-col justify-between"
          >
            <div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-red-500" />
                  <span>Bahnhofstrasse 46, 9475 Sevelen</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-red-500" />
                  <span>0817501911</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-red-500" />
                  <span>info@cantinatexmex.ch</span>
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
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Reservierung</h3>
              <div className="space-y-4">
                <motion.a
                  href="https://cantinatexmex.ch/reservierung/index-4.html"
                  className="block w-full bg-white text-red-600 py-2 px-4 rounded-md shadow-sm text-center font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Calendar className="w-5 h-5 mr-2 text-red-500" />
                  Tisch online Reservieren
                </motion.a>
                <motion.a
                  href="tel:0817501911"
                  className="block w-full bg-white text-red-600 py-2 px-4 rounded-md shadow-sm text-center font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <PhoneCall className="w-5 h-5 mr-2 text-red-500" />
                  0817501911
                </motion.a>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="mt-8 flex justify-center space-x-4">
              <motion.a
                href="https://www.facebook.com/cantinasevelen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors duration-200"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Facebook className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/cantina_badrans/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors duration-200"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Instagram className="w-8 h-8" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center items-center mb-10 mt-20 ">
          <img 
            src="https://cantinatexmex.ch/images/2022/03/05/logo3-copia1.png" 
            alt="Plato mexicano" 
            className="rounded-lg shadow-md h-34 object-cover bg-gray-100"
          />
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Unser Standort</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.4866543537747!2d9.494731315591655!3d47.11466397915501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b3168f6b9d0c3%3A0x4b7a1d5b6a7b0f0a!2sBahnhofstrasse%2046%2C%209475%20Sevelen%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1635794729872!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}