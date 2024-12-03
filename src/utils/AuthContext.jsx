import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

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
    console.log('Usuario recibido al iniciar sesión:', userData); // Verifica qué campos incluye
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const updateUser = async (newUser) => {
    try {
      const updatedUser = { ...user, ...newUser };
      setUser(updatedUser); // Actualiza el estado global del usuario
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('No se pudo actualizar el usuario:', error);
      throw new Error('No se pudo actualizar el usuario');
    }
  };
  

  // Método para cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Método para añadir o eliminar productos de favoritos
  const toggleFavorite = (product) => {

    if (!user || !user.favorites) {
      console.error("El usuario no está autenticado o no tiene favoritos inicializados.");
      return;
    }
    const productId = product._id || product.id; // Maneja ambos casos
    if (!productId  ) {
      console.error("Producto inválido proporcionado a toggleFavorite:", productId );
      return;
    }

    // Verificar si el producto está en favoritos
    const isFavorite = user.favorites.some(item => item._id === productId || item.id === productId);

    // Crear una lista actualizada de favoritos
    const updatedFavorites = isFavorite
      ? user.favorites.filter(item => item._id !== product._id) // Eliminar si ya está
      : [...user.favorites, product]; // Agregar si no está

    // Actualizar los favoritos en el estado de usuario
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

