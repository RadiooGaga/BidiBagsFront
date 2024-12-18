import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApi } from '../../utils/useApi';
import { CardDetails } from '../../components/ProductCards/CardDetails';
import { Error } from '../../components/Error/Error';

export const ById = () => {

  const { id } = useParams();
  const { user, toggleFavorite } = useAuth();
  const [ isFavorite, setIsFavorite] = useState(true);
  const navigate = useNavigate();

  const { products, loading, error } = useApi({
    endpoint: `/products/${id}`,
    url: '',
  });

  useEffect(() => {
    if (user && user.favorites && products) {
      const isProductFavorite = user.favorites.some((fav) => fav._id === products._id);
      setIsFavorite(isProductFavorite);
    }
  }, [user, products]);

  const handleFavoriteClick = async () => {
    
    if (products) {
        await toggleFavorite(products);
        setIsFavorite((prevState) => !prevState);  // Cambiar el estado de favoritos
        navigate('/account/favorites'); // Navegar a la página de favoritos
      } else {
        console.error("Producto no definido al intentar agregar/eliminar de favoritos");
      }
  };

  const handleFavoriteToggle = async (product) => {
    await toggleFavorite(product); // Actualiza backend y contexto
  };
  

  const handleAddToCart = () => {
    console.log('Producto añadido al carrito:', products);
  };

  if (loading) return <Error text="Cargando el producto" />;
  if (error) return <Error text="Hubo un error al cargar el producto. Por favor, inténtalo de nuevo." />;
  if (!products) return <Error text="No es posible encontrar el producto" />;

  return (
    <CardDetails
      product={products}
      heartClicked={handleFavoriteClick}
      isFavorite={user && user.favorites ? user.favorites.includes(products._id) : false} // Vincula con el estado del usuario
      onFavoriteClick={() => handleFavoriteToggle(products)} // Alternar favorito
      onAddToCart={handleAddToCart}
    />
  );
};