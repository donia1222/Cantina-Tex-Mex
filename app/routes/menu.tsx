import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

const menuSections = [
  { id: 'entrantes', name: 'Entrantes', image: '/placeholder.svg?height=400&width=800' },
  { id: 'principales', name: 'Platos Principales', image: '/placeholder.svg?height=400&width=800' },
  { id: 'postres', name: 'Postres', image: '/placeholder.svg?height=400&width=800' },
  { id: 'bebidas', name: 'Bebidas', image: '/placeholder.svg?height=400&width=800' }
] as const;

type SectionId = typeof menuSections[number]['id'];

type MenuItem = {
  name: string;
  price: number;
  description: string;
};

type MenuData = Record<SectionId, MenuItem[]>;

export const loader: LoaderFunction = async () => {
  const menuItems: MenuData = {
    entrantes: [
      { name: 'Guacamole Fresco', price: 8.99, description: 'Aguacate fresco machacado con tomate, cebolla y cilantro' },
      { name: 'Nachos Supremos', price: 10.99, description: 'Totopos cubiertos con frijoles, queso fundido, pico de gallo y crema agria' },
      { name: 'Quesadillas de Chorizo', price: 9.99, description: 'Tortillas de maíz rellenas de queso fundido y chorizo' },
    ],
    principales: [
      { name: 'Tacos al Pastor', price: 14.99, description: 'Tres tacos de cerdo marinado con piña, cebolla y cilantro' },
      { name: 'Enchiladas Verdes', price: 13.99, description: 'Tortillas rellenas de pollo, bañadas en salsa verde y queso' },
      { name: 'Mole Poblano', price: 16.99, description: 'Pechuga de pollo bañada en salsa mole, servida con arroz' },
    ],
    postres: [
      { name: 'Flan de Caramelo', price: 6.99, description: 'Suave flan casero con salsa de caramelo' },
      { name: 'Churros con Chocolate', price: 7.99, description: 'Churros crujientes servidos con salsa de chocolate caliente' },
      { name: 'Pastel de Tres Leches', price: 8.99, description: 'Esponjoso pastel empapado en tres tipos de leche' },
    ],
    bebidas: [
      { name: 'Margarita Clásica', price: 9.99, description: 'Tequila, triple sec y jugo de limón' },
      { name: 'Agua de Horchata', price: 3.99, description: 'Bebida refrescante de arroz con canela' },
      { name: 'Michelada', price: 7.99, description: 'Cerveza mexicana con jugo de tomate, limón y especias' },
    ],
  };

  return json(menuItems);
};

export default function Menu() {
  const menuItems = useLoaderData<MenuData>();
  const [activeSection, setActiveSection] = useState<SectionId>(menuSections[0].id);
  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    entrantes: null,
    principales: null,
    postres: null,
    bebidas: null,
  });

  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of menuSections) {
        const element = sectionRefs.current[section.id];
        if (element && scrollPosition >= element.offsetTop && scrollPosition < (element.offsetTop + element.offsetHeight)) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 to-yellow-50 min-h-screen">
      <header className="bg-red-600 text-white py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-6">Nuestro Menú</h1>
          <nav className="flex justify-center space-x-4 overflow-x-auto pb-2">
            {menuSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-white text-red-600'
                    : 'text-white hover:bg-red-500'
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {menuSections.map((section) => (
          <motion.div
            key={section.id}
            ref={(el) => {
              if (el) sectionRefs.current[section.id] = el;
            }}
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
              <img src={section.image} alt={section.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">{section.name}</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {menuItems[section.id].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden p-6 transform transition duration-300 hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-red-700">{item.name}</h3>
                    <span className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}