// contexto para usar la apiUrl en cada lugar

import React, { createContext, useContext } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

// Crear provider
export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ apiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApiProvider = () => {
  return useContext(ApiContext);
};