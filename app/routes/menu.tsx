import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { X, CirclePlus, Utensils, Salad, Coffee, Pizza, Beef, FishIcon as Shrimp, BirdIcon as Chicken, Carrot, ChevronLeft, ChevronRight } from 'lucide-react';
import HeaderSpe from '~/components/Header/HeaderSpe';
import BannerFood from '~/components/Banner/BannerFood';
import DayMenu from '~/components/Blocks/SpezialMenu';

const menuSections = [
  { id: 'vorspeisen', name: 'Vorspeisen', color: '#FF6B6B', icon: <CirclePlus size={32} />, image: '96771444_3048192125224744_9026765579553341440_n.jpg' },
  { id: 'texas', name: 'Texas', color: '#4ECDC4', icon: <CirclePlus size={32} />, image: '439906677_1038135431012293_4590580434033471940_n.jpg' },
  { id: 'mexico', name: 'Mexico', color: '#45B7D1', icon: <CirclePlus size={32} />, image: '271206981_4690667750986679_6769410685630349301_n.jpg' },
  { id: 'kinder', name: 'Kinder', color: '#FFA07A', icon: <CirclePlus size={32} />, image: '/271248933_4690667767653344_444005926034541016_n.jpg' },
  { id: 'desserts', name: 'Desserts', color: '#C06C84', icon: <CirclePlus size={32} />, image: '/440017389_1038135447678958_7213220999231999312_n.jpg' },
  { id: 'mittagsmenu', name: 'Mittagsmenu', color: '#FFD700', icon: <CirclePlus size={32} />, image: '/340871282_193406080143735_4389703553709751881_n.jpg' },
] as const;

type SectionId = typeof menuSections[number]['id'];

type SubMenuItem = {
  name: string;
  description: string;
};

type MenuItem = {
  name: string;
  price?: number;
  description?: string;
  subItems?: SubMenuItem[];
  vegi?: boolean;
};

type MenuData = Record<SectionId, MenuItem[]>;

const carouselImages = [
  '/448072528_1062123745280128_8970901128475452127_n.jpg',

];

export const loader: LoaderFunction = async () => {
  const menuItems: MenuData = {
    vorspeisen: [
      { name: 'Chips mit Sauce', price: 8.50, description: 'Weizen Chips mit Guacamole und Salsa', vegi: true },
      { name: 'Onion Rings', price: 10.50, description: 'Frittierte Zwiebelringe, dazu Salsa und Sour Cream', vegi: true },
      { name: 'Sopa de maiz con Chili', price: 9.50, description: 'Maissuppe, serviert mit einem pikanten Red Chili Popper', vegi: true },
      { name: 'Grüner Salat', price: 8.00, description: 'Verschiedene knackige Blattsalate mit Brotcroûtons', vegi: true },
      { name: 'Gemischter Salat', price: 9.50, description: 'Gemischte Salate mit Avocadostreifen', vegi: true },
      { name: 'Nachos mit Cheese', price: 10.50, description: 'Mais Chips mit Salsa und Sour Cream mit Mozzarella und Cheddar Cheese überbacken', vegi: true },
      { name: 'The Real Caesar Salad', price: 13.50, description: 'Eisbergsalat mit Parmesan, Brotcroûtons, Ceasar Sauce und knusprigen Speckwürfeli' },
      { name: 'Salat "Cantina"', price: 15.00, description: 'Grosser gemischter Salat mit Pouletstreifen Onion Rings und Tortilla Chips' },
      { name: 'Macho Nachos', price: 15.50, description: 'Mais Chips mit hausgemachtem Chili con Carne mit Mozzarella und Cheddar Cheese überbacken' },
      { name: 'Gambas al ajillo', price: 15.50, description: 'Sautierte Crevetten mit Knoblauch und Olivenöl flambiert mit Brandy' },
      { name: 'Mexikanische Vorspeisenplatte', price: 16.50, description: 'Nachos, Quesadilla, Guacamole, Onion Rings, Chicken Fingers, Crevetten (ab 2 Personen, Preis pro Person)' },
      { name: 'Chips-Chicken Fingers', price: 12.50, description: '6 Stück Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade Mozzarella Sticks' },
    ],
    texas: [
      { name: 'Baked Potatoes', price: 20.50, description: 'Kartoffelscheiben gemischt mit verschiedenen Gemüsen goldbraun überbacken mit Mozzarella und Cheddar', vegi: true },
      { name: 'Chicken Potatoes', price: 25.50, description: 'Kartoffelscheiben gemischt mit knackigem Broccoli und gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken' },
      { name: 'Shrimps Potatoes', price: 25.50, description: 'Kartoffelscheiben gemischt mit Crevetten, Cherry Tomaten und Kräuter, gebratenen Pouletstreifen, mit Mozzarella und Cheddar Cheese goldbraun überbacken' },
      { name: 'Chicken Fingers', price: 26.50, description: 'Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade dazu Pommes' },
      { name: 'Cantiworker', price: 24.50, description: '200 Gramm 100% Black Angus Rindfleisch. Mit Eisbergsalat, roten Zwiebeln, Cheddar Cheese, hausgemachter BBQ Sauce und…viel Liebe gefüllt' },
      { name: 'Cantina Spiess 250gr', price: 36.50, description: 'Saftiger gemischter Fleischspiess mit Country Fries und Knoblauchbrot, dazu Saucen zum Dippen' },
      { name: 'Rancher Steak 200gr', price: 37.50, description: 'Rindsentrecôte, gratiniert mit Kräuterbutter und Parmesan, dazu Pommes, Onion Rings und Saucen zum Dippen' },
    ],
    mexico: [
      { name: 'Fajitas', price: 28.50, description: 'Mit Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse' },
      { name: 'Quesadillas de Tomate y maiz', price: 18.50, description: 'Mit frischen Tomaten und Mais', vegi: true },
      { name: 'Quesadillas de Pollo', price: 21.50, description: 'Mit Pouletfleisch' },
      { name: 'Quesadillas de Chorizo', price: 22.50, description: 'Mit pikantem Chorizo' },
      { name: 'Quesadillas res y pimiento', price: 25.50, description: 'Mit Rindshuftwürfeli und Peperoni' },
      { name: 'Quesadillas mar y tierra', price: 25.50, description: 'Mit Crevetten und Broccoli' },
      { name: 'Burritos con verdura', price: 25.50, description: 'Grosse, gerollte Weizentortillas gefüllt mit frischem Gemüse, dazu Sour Cream und Salsa serviert mit Tomatenreis oder Salat', vegi: true },
      { name: 'Burritos con Pollo y Res', price: 26.50, description: 'Grosse, gerollte Weizentortillas gefüllt mit Mais, Paprika Poulet-/Rindfleisch, dazu Sour Cream und Salsa, serviert mit Tomatenreis oder Salat' },
      { name: 'Chili con Carne', price: 28.50, description: 'Rindfleisch mit Chili, frischen Tomaten, Mais und Kidneybohnen, serviert im Reisring' },
      { name: 'Enachiladas', price: 16.50, description: 'Pouletfleisch, Rindshuftwürfeli, Crevetten oder Gemüse' },
    ],
    kinder: [
      { name: 'Kalbswürstchen am Spiess', price: 12.50, description: 'Serviert mit Pommes' },
      { name: 'Chicken Fingers mit Pommes', price: 12.50, description: 'Hausgemachte, knusprige Pouletstreifen mit Tortilla-Chips Panade' },
      { name: 'Mini Burritos mit Pouletfleisch', price: 12.50, description: '' },
    ],
    desserts: [
      { name: 'Flan de Coco', price: 9.00, description: 'Kokos-Flan serviert mit frischer Ananas und Schlagrahm' },
      { name: 'Tarta de la casa', price: 9.50, description: 'Süsse Köstlichkeit nach Geheimrezept' },
      { name: 'Churros', price: 10.50, description: 'Serviert mit Glace und Schokoladensauce' },
      { name: 'Choco Banana', price: 9.50, description: '2 Kugeln Bananenglace mit heisser Schokoladensauce und Schlagrahm' },
      { name: 'Copa Silvestre', price: 9.50, description: 'Erdbeerglace, Vanilleglace, Merengue und heisse Beerensauce' },
      { name: 'Don Chocolate', price: 10.50, description: 'Schokoladenglace, Moccaglace, Tobleronestückchen und Schlagrahm' },
      { name: 'Mexican Coffee', price: 12.50, description: 'Kaffeeglace gemischt mit heissem Espresso, Kahlúa Likör und Schlagrahm' },
    ],
    mittagsmenu: [
      { name: 'Donnerstags', description: 'Menü 1, Menü Vegui und Menü Spezial zur Auswahl ', price: undefined },
      { name: 'Freitags', description: 'Menü 1 (Fajitas), Menü Vegui und Menü Spezial zur Auswahl', price: undefined },
    ],
  };

  return json(menuItems);
};

export default function Menu() {
  const menuItems = useLoaderData<MenuData>();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [showMittagsmenuModal, setShowMittagsmenuModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalHeaderRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (sectionId: SectionId) => {
    if (sectionId === 'mittagsmenu') {
      setShowMittagsmenuModal(true);
    } else {
      setActiveSection(sectionId);
    }
  };

  const closeModal = () => {
    setActiveSection(null);
    setShowMittagsmenuModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    if (activeSection || showMittagsmenuModal) {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }
  }, [activeSection, showMittagsmenuModal]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
  };

  const wochentage = ['Donnerstag', 'Freitag'];
  const menuOptionen = [
    { name: 'Menü 1', preis: 19.50, icon: <Utensils className="w-6 h-6" /> },
    { name: 'Vegetarisches Menü', preis: 17.50, icon: <Salad className="w-6 h-6" /> },
    { name: 'Spezialmenü', preis: 28.50, icon: <Beef className="w-6 h-6" /> },
  ];
  const ersterGang = ['Salat', 'Suppe', 'Nachos', 'Hausgemachte Chips'];
  const quesadillas = {
    preis: 17.50,
    optionen: [
      { name: 'Hähnchen', icon: <Chicken className="w-6 h-6" /> },
      { name: 'Rindfleisch', icon: <Beef className="w-6 h-6" /> },
      { name: 'Garnelen', icon: <Shrimp className="w-6 h-6" /> },
      { name: 'Tomate (Vegetarisch)', icon: <Carrot className="w-6 h-6" /> },
    ],
  };
  const beilagen = ['Pommes frites', 'Salat', 'Tomatenreis', 'Country Fries'];

  return (
    <div className="bg-cover bg-center flex flex-col items-center justify-start font-poppins bg-gray-900 bg-opacity-80 text-red-500 p-0 rounded-lg">
      <HeaderSpe />
      <BannerFood />
      <motion.div
        className="w-full max-w-6xl px-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuSections.map((section) => (
          <motion.div
            key={section.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="relative">
              <img
                src={section.image}
                alt={section.name}
                className="w-full h-48 object-cover opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-t-lg"></div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded p-2 text-white">
                <div className="flex items-center space-x-2">
                  <span>{section.icon}</span>
                  <h2 className="text-xl font-semibold">{section.name}</h2>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg overflow-hidden max-w-2xl w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div ref={modalHeaderRef} className="relative h-24 flex-shrink-0">
                <img
                  src={menuSections.find((s) => s.id === activeSection)?.image}
                  alt={menuSections.find((s) => s.id === activeSection)?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
                  {menuSections.find((s) => s.id === activeSection)?.name}
                </h2>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow modal-content">
                <div className="p-6 grid gap-6">
                  {menuItems[activeSection].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-100 rounded-lg shadow-md p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-red-700">{item.name}</h3>
                        {item.price !== undefined && (
                          <span className="text-lg font-bold text-green-600">CHF {item.price.toFixed(2)}</span>
                        )}
                      </div>
                      {item.description && <p className="text-gray-600">{item.description}</p>}
                      {item.subItems && (
                        <ul className="list-disc list-inside mt-2">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name} className="text-gray-600">
                              {subItem.name} {subItem.description && `- ${subItem.description}`}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.vegi && (
                        <span className="mt-2 inline-block bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Vegi
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showMittagsmenuModal && (
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-32 md:h-60">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentImageIndex}
                    src={carouselImages[currentImageIndex]}
                    alt={`Carousel image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
           
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                
                <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">Mittagsmenu</h2>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow modal-content p-8 bg-gray-800">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {wochentage.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * (index + 1) }}
                    >
                      <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-center mb-4">{tag}</h2>
                        <div className="space-y-4">
                          {menuOptionen.map((option, optionIndex) => (
                            <motion.div
                              key={option.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * (optionIndex + 1) }}
                              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                            >
                              <div className="flex items-center space-x-4">
                                {option.icon}
                                <span className="font-semibold">{option.name}</span>
                              </div>
                              <span className="font-bold text-gray-500">{option.preis.toFixed(2)} CHF</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-4">Vorspeisen (zur Auswahl)</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {ersterGang.map((gericht, index) => (
                        <motion.div
                          key={gericht}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * (index + 1) }}
                          className="bg-white p-4 rounded-lg text-center font-semibold shadow"
                        >
                          {gericht}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8"
                >
                  <div className="bg-gray-800 rounded-lg p-6">
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
                cx="15"
                cy="15"
                r="2"
                fill="gray"
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
    
                    <h2 className="text-4xl font-bold  text-gray-300 text-center mb-4 mt-10 ">Quesadillas</h2>
                    <div className="flex justify-center">
  <img 
    src="/chicken-quesadilla-tomato-corn-pepper-onion-cheese-sour-cream.jpg" 
    alt="Plato mexicano" 
    className="rounded-lg bg-gray-200 h-34 object-cover mb-10"
  />
</div>

                    <div className="text-center mb-4">
                      <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                        {quesadillas.preis.toFixed(2)} CHF
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {quesadillas.optionen.map((option, index) => (
                        <motion.div
                          key={option.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * (index + 1) }}
                          className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg text-center font-semibold shadow"
                        >
                          {option.icon}
                          <span>{option.name}</span>
                        </motion.div>
                      ))}
                    </div>
                    <h3 className="text-xl  text-center mb-4 text-gray-300">Beilagen (zur Auswahl)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {beilagen.map((beilage, index) => (
                        <motion.div
                          key={beilage}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * (index + 1) }}
                          className="bg-white p-4 rounded-lg text-center font-semibold shadow"
                        >
                          {beilage}
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-4 text-center text-gray-600">
                      Inklusive einem Vorspeisen zur Auswahl
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}