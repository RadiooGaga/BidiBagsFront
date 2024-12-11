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
    console.log(favoriteProducts, "ESTADO DE FAVORITOS");
  }, [favoriteProducts]);

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

                  
        // Verificar la estructura de las respuestas
        console.log(responses, "PRODUCTOS RECIBIDOS DESDE LA API");

        // Filtrar cualquier respuesta que no tenga el formato esperado
        const validProducts = responses.filter(product => product && product._id);
          setFavoriteProducts(validProducts);
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
            if (!product || !product._id) {
              console.error("Producto no válido:", product);
              return null; // Evita renderizar productos inválidos
            }
            return (
              <Card
                key={product._id} 
                product={product} 
                onClick={() => handleClickOnFavorite(product._id)} 
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