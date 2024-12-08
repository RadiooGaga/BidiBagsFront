import React,{ useState, useEffect } from 'react';
import { Card } from '../../components/ProductCards/Card';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { FavoritesDiv, MisFavoritos } = StyledUserAccount;

const apiUrl = import.meta.env.VITE_API_URL;

export const MyFavorites = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && user.favorites && user.favorites.length > 0) {
        try {
          // Consultar todos los productos favoritos por sus IDs
          const responses = await Promise.all(
            user.favorites.map((id) =>
              fetch(`${apiUrl}/products/${id}`).then((res) => res.json())
            )
          );
          setFavoriteProducts(responses);
        } catch (error) {
          console.error('Error al obtener productos favoritos:', error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const handleClickOnFavorite = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <MisFavoritos>MIS FAVORITOS</MisFavoritos>
      <FavoritesDiv>
        {favoriteProducts && favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => {
            // Cada producto ahora es un objeto con todos sus datos
            console.log('Producto actual del map:', product);
            return (
              <Card
                key={product._id} // Importante para evitar errores en la lista
                product={product} // Pasar todo el objeto producto
                onClick={() => handleClickOnFavorite(product._id)} // Navegar al producto
              />
            );
          })
        ) : (
          <span>No tienes productos en tus favoritos.</span>
        )}
      </FavoritesDiv>
    </>
  );
};