// app/components/ImageTextScrollBlock.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Section = {
  id: number;
  title: string;
  description: string;
};

const sections: Section[] = [
  {
    id: 1,
    title: 'Bienvenido a Nuestra Cantina',
    description: 'Disfruta de una experiencia culinaria única con nuestros platillos auténticos y deliciosos cócteles.',
  },
  {
    id: 2,
    title: 'Nuestros Platillos',
    description: 'Prueba nuestras especialidades preparadas con los ingredientes más frescos y sabores exquisitos.',
  },
  {
    id: 3,
    title: 'Cócteles Exclusivos',
    description: 'Descubre una amplia variedad de cócteles artesanales que complementarán tu experiencia gastronómica.',
  },
  // Añade más secciones según tus necesidades
];

const ImageTextScrollBlock: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(sections[0]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const current = sections.find((section, index) => {
        const ref = sectionRefs.current[index];
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (current && current.id !== currentSection.id) {
        setCurrentSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Llamar a handleScroll inicialmente para establecer la sección correcta
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between py-16 px-4 bg-gray-100 relative">
      
      {/* Texto a la Izquierda */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <AnimatePresence mode="wait">
          {currentSection && (
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">{currentSection.title}</h2>
              <p className="text-gray-700">{currentSection.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Imagen a la Derecha */}
      <div className="w-full md:w-1/2">
        <img
          src="https://cantinatexmex.ch/images/2022/03/06/40867849_l1.jpg" // Reemplaza con la URL de tu imagen
          alt="Imagen de la Cantina"
          className="w-full h-auto rounded-lg shadow-lg fixed md:relative md:h-96 object-cover"
        />
      </div>

      {/* Referencias a las Secciones */}
      <div className="absolute top-0 left-0 w-full h-0">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="h-screen"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageTextScrollBlock;
