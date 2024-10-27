import { useState, useEffect } from 'react';
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Clock, MapPin, Star } from "lucide-react";

export default function Index() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-screen">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={img} alt={`Platillo mexicano ${index + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold text-white mb-4"
            >
              El Sabor Mexicano
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-2xl text-white mb-8"
            >
              Auténtica cocina mexicana en el corazón de la ciudad
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link 
                to="/menu" 
                className="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300"
              >
                Ver Menú
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-red-200"
          >
            <UtensilsCrossed className="h-12 w-12 text-red-600 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-red-800 mb-2 text-center">Nuestro Menú</h2>
            <p className="text-gray-600 text-center mb-4">Explora nuestra variedad de platillos tradicionales y modernos</p>
            <Link to="/menu" className="block text-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out">
              Ver Menú
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-red-200"
          >
            <Clock className="h-12 w-12 text-red-600 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-red-800 mb-2 text-center">Horario</h2>
            <p className="text-gray-600 text-center mb-4">Lunes a Domingo: 11:00 AM - 10:00 PM</p>
            <Link to="/contact" className="block text-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out">
              Reservar
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-red-200"
          >
            <MapPin className="h-12 w-12 text-red-600 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-red-800 mb-2 text-center">Ubicación</h2>
            <p className="text-gray-600 text-center mb-4">Calle Principal 123, Ciudad de México</p>
            <Link to="/contact" className="block text-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out">
              Cómo llegar
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special of the Day Section */}
      <section className="bg-gradient-to-r from-red-500 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold text-red-800 mb-4 text-center">Especial del Día</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <img src="/placeholder.svg?height=300&width=400" alt="Platillo del día" className="rounded-lg shadow-md" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-semibold text-red-700 mb-2">Mole Poblano</h3>
                <p className="text-gray-700 mb-4">Delicioso mole poblano servido con pollo tierno y arroz. Una explosión de sabores que no te puedes perder.</p>
                <p className="text-2xl font-bold text-red-600 mb-4">$15.99</p>
                <Link to="/menu" className="inline-block bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition duration-300">
                  Ordenar Ahora
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg border border-red-200"
            >
              <div className="flex items-center mb-4">
                <img src={`/placeholder.svg?height=50&width=50`} alt={`Cliente ${i}`} className="rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold text-red-800">Cliente {i}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "La comida es increíble y el ambiente es acogedor. Definitivamente volveré pronto."
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para una experiencia culinaria única?</h2>
          <p className="text-xl text-white mb-8">Haz tu reserva ahora y disfruta de los mejores sabores de México.</p>
          <Link 
            to="/contact" 
            className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-red-100 transition duration-300"
          >
            Reservar Mesa
          </Link>
        </div>
      </section>
    </div>
  );
}