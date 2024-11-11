import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

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
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formState);
    // Resetear el formulario
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-70 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-12">Kontakt 👋 </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-xl rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-red-700 mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-red-600 text-white shadow-xl rounded-lg p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6">Información de contacto</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3" />
                  <span>Calle Principal 123, Ciudad de México, México</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 mr-3" />
                  <span>+52 (55) 1234-5678</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-6 w-6 mr-3" />
                  <span>info@elsabormexicano.com</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  <span>Lunes a Domingo: 11:00 AM - 10:00 PM</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Síguenos en redes sociales</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-yellow-300 transition duration-150 ease-in-out">Facebook</a>
                <a href="#" className="hover:text-yellow-300 transition duration-150 ease-in-out">Instagram</a>
                <a href="#" className="hover:text-yellow-300 transition duration-150 ease-in-out">Twitter</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-red-800 mb-6">Nuestra ubicación</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.761237045005!2d-99.16869068469864!3d19.42702468688713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sZocalo%2C%20Centro%20Historico%2C%20Centro%2C%20Mexico%20City%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1635794729872!5m2!1sen!2sus"
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