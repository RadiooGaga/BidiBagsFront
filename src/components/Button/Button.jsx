import React from 'react'
import { motion } from "framer-motion"

export const Button = ({ type, text, width, backgroundColor, colorText, padding, hoverBackgroundColor, 
  tapBackgroundColor,  onClick, children }) => {
    
    return (
      <motion.button
          type={type}
          style={{
          width: width,
          backgroundColor: backgroundColor,
          color: colorText,
          padding: padding,
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          children,
        }}
        whileHover={{ 
          scale: 1.1 ,
          backgroundColor: hoverBackgroundColor
          
         }}
        whileTap={{ 
          scale: 0.9,
          backgroundColor: tapBackgroundColor
        }}
        onClick={onClick}
      >
        {text}{children}
      </motion.button>
    );
};
