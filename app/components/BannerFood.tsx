'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TextImageScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Ajuste de offsets
  });

  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "50%", "100%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.5, 0]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div ref={containerRef} className="relative h-[200vh]"> {/* Altura reducida a 200vh */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: imageScale, opacity: imageOpacity, willChange: "transform, opacity" }} // Añadir will-change
        >
          <img
            src="pexels-diamond-multimedia-99937091.jpg"
            alt="Background"
            className="w-full h-min object-cover rounded-lg"
          />
        </motion.div>
        <motion.div
          ref={ref}
          className="relative z-10 h-full flex items-center justify-center"
          style={{ y: textY }}
        >
          <div className="w-3/4 p-20 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg">
            <motion.h2
              className="text-5xl font-bold mb-4 w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }} // Ajuste de duración
            >
              Tex-<span className="text-[#349b27] text-5xl font-bold mb-4 w-full text-center">
            Mex
          </span>
      
            </motion.h2>
            

            
            <motion.p
              className="text-lg text-gray-300  text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }} // Ajuste de duración
            >
             Genießen Sie in unserem Restaurant eine perfekte Kombination aus traditionellen und modernen Aromen aus Texas & Mexiko
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TextImageScroll;
