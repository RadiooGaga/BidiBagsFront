import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null); 
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    // Cargar los datos del usuario y token desde localStorage (si existen)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);



   // MÉTODO PARA INICIAR SESIÓN
  const login = (userData, authToken) => {
    //console.log('Usuario recibido al iniciar sesión:',  userData); 
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };


   // MÉTODO PARA CERRAR SESIÓN
   const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };



  // MÉTODO ACTUALIZAR USUARIO
  const updateUser = async (newUserData) => {
    if (!user || !user._id || !token) {
      throw new Error("Usuario o token no están disponibles.");
    }

    try {
      
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
      if (!data || !data.user) {
        throw new Error('Respuesta inesperada del servidor.');
      }
  
  
      // Actualizar el estado local del usuario y reemplazar con la respuesta del backend
      setUser(data.user); 
      localStorage.setItem('user', JSON.stringify(data.user));
      //console.log('Usuario actualizado en la base de datos y en el estado local.');
      return data.user;

    } catch (error) {
      console.error('No se pudo actualizar el usuario:', error);
      throw new Error('No se pudo actualizar el usuario.');
    }
  };
  


  // MÉTODO AÑADIR/ELIMINAR DE FAVORITOS
  const toggleFavorite = async (product) => {

    if (!user || !user.favorites) {
      console.error("El usuario no está autenticado o no tiene favoritos inicializados.");
      return;
    }
  
    const productId = product._id;
      if (!productId) {
        console.error("Producto inválido proporcionado a toggleFavorite:", product);
        return;
      }
  
    const isFavorite = user.favorites.includes(productId);
  
    // Crear el nuevo array de favoritos
    const updatedFavorites = isFavorite
      ? user.favorites.filter((id) => id !== productId) // se elimina si ya es favorito
      : [...user.favorites, productId]; // se agrega si no lo es
  
    try {
      // se actualiza el backend
      const updatedUser = await updateUser({ favorites: updatedFavorites });

      // Actualizar el estado local del usuario en el contexto
      setUser(updatedUser); 
  
      //console.log("Favoritos actualizados:", updatedFavorites);
    } catch (error) {
      console.error("Error al actualizar favoritos en el backend:", error);
      alert("Hubo un problema al actualizar tus favoritos. Por favor, inténtalo de nuevo.");
    }
  };



    // MÉTODO AÑADIR/ELIMINAR DEL CARRITO
    const toggleCart = async (product) => {

      if (!user || !user.cart) {
        console.error("El usuario no está autenticado o no tiene productos en el carrito.");
        return;
      }
    
      const productId = product._id;
        if (!productId) {
          console.error("Producto inválido proporcionado a toggleCart:", product);
          return;
        }
    
      const isOnCart = user.cart.includes(productId);
    
      // Crear el nuevo array de productso del carrito
      const updatedCart = isOnCart
        ? user.cart.filter((id) => id !== productId) // se elimina si ya está en el carrito
        : [...user.cart, productId]; // se agrega si no lo es
    
      try {
        // se actualiza el backend
        const updatedUser = await updateUser({ cart: updatedCart });
  
        // Actualizar el estado local del usuario en el contexto
        setUser(updatedUser); 
    
        //console.log("Productos del carrito actualizados:", updatedCart);
      } catch (error) {
        console.error("Error al actualizar los productos del carrito en el backend:", error);
        alert("Hubo un problema al actualizar tu carrito. Por favor, inténtalo de nuevo.");
      }
    };


  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, toggleFavorite, toggleCart }}>
      {children}
    </AuthContext.Provider>
  );
};