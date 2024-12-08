import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Establecer el estado del usuario
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Cargar los datos del usuario y token desde localStorage (si existen)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Método para iniciar sesión
  const login = (userData, authToken) => {
    console.log('Usuario recibido al iniciar sesión:',/* userData*/); // Verifica qué campos incluye
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

   // Método para cerrar sesión
   const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };



  const updateUser = async (newUserData) => {
    try {
      // solicitud al backend para actualizar el usuario
      const response = await fetch(`${apiUrl}/update-user/${user._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUserData), 
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario en la base de datos.');
      }
      const data = await response.json();
  
      // Actualizar el estado local del usuario y reemplazar con la respuesta del backend
      setUser(data.user); 
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Usuario actualizado en la base de datos y en el estado local.');
      return data.user;

    } catch (error) {
      console.error('No se pudo actualizar el usuario:', error);
      throw new Error('No se pudo actualizar el usuario.');
    }
  };
  


  // Método para añadir o eliminar productos de favoritos
const toggleFavorite = (product) => {
  console.log(product, "EL PRODUCTO QUE SE ALMACENA EN CÓDIGO TOGGLE");

  if (!user || !user.favorites) {
    console.error("El usuario no está autenticado o no tiene favoritos inicializados.");
    return;
  }

  const productId = product._id;
  if (!productId) {
    console.error("Producto inválido proporcionado a toggleFavorite:", productId);
    return;
  }

  // Verificar si el producto ya está en los favoritos
  const isFavorite = user.favorites.some(item => item._id === productId);

  // Crear una lista actualizada de favoritos
  const updatedFavorites = isFavorite
    ? user.favorites.filter(item => item._id !== productId) // Eliminar si ya está
    : [...user.favorites, product]; // Agregar si no está

  // Actualizar los favoritos del usuario
  try {
    updateUser({ favorites: updatedFavorites });
    console.log("USUARIO ACTUALIZADO!");
  } catch (error) {
    console.error("Error al actualizar los favoritos:", error);
  }
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

