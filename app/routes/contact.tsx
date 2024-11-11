'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, PhoneCall, Send } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-800 text-gray-400 bg-opacity-90 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-12">Kontakt 👋</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-red-800 to-red-500 shadow-xl rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Senden Sie uns eine Nachricht</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                ></textarea>
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent mt-10 rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Send className="w-5 h-5 mr-2 text-red-500" />
                  Nachricht senden
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-xl rounded-lg p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6">Kontaktinformationen</h2>
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
                    Di-Mi: 18:00-22:00<br />
                    Do-Fr: 11:30-13:30, 18:00-22:00<br />
                    Samstag: 18:00-22:00
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Reservierung</h3>
              <div className="space-y-4">
                <motion.a
                  href="#"
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
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Unser Standort</h2>
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