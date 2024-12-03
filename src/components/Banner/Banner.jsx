import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Banner.css';


export const MenuCategories = [
  '/assets/pics/wanning1.jpg',
  '/assets/pics/retoque1.jpg',
  '/assets/pics/bolso-lace1.jpg',
  '/assets/pics/mochila1.jpg',
  '/assets/pics/patchwork1.jpg',
  '/assets/pics/mini1.jpg',
  '/assets/pics/sudadera1.jpg',
  '/assets/pics/chubasquero1.jpg',
  '/assets/pics/poncho1.jpg',
];


export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % MenuCategories.length);
    }, 4000); // Cambia cada 4 segundos (4000 ms)
    
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <div className='banner-container'>
      <AnimatePresence mode='sync'>
        <motion.img 
          className='banner-image'
          key={currentIndex} // Cambia la clave para cada nueva imagen
          src={MenuCategories[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2  }}
          transition={{ duration: 1.5, ease: "easeInOut"}}
        />
      </AnimatePresence>
      </div>
  );
};


