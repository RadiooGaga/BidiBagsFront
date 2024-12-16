import React,{ useState, useEffect } from 'react';
import { Card } from '../../components/ProductCards/Card';
import { useApiProvider } from '../../utils/ApiContext';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { FavoritesDiv, Titles } = StyledUserAccount;



export const MyFavorites = () => {

  const { apiUrl } = useApiProvider();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  
  // Sincronizar la lista de productos favoritos
  const fetchFavorites = async () => {
    if (user && user.favorites.length > 0) {
      try {
        const responses = await Promise.all(
          user.favorites.map((id) =>
            fetch(`${apiUrl}/products/${id}`).then((res) => res.json())
          )
        );
        const validProducts = responses.filter((product) => product && product._id);
        setFavoriteProducts(validProducts);
      } catch (error) {
        console.error("Error al obtener productos favoritos:", error);
      }
    } else {
      setFavoriteProducts([]); // Si no hay favoritos, limpiar la lista
    }
  };

  // Cargar los nuevos favoritos cada vez que cambien
  useEffect(() => {
    fetchFavorites();
  }, [user.favorites]);

 

  return (
    <>
      <Titles>MIS FAVORITOS</Titles>
      <FavoritesDiv>
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <Card
              key={product._id}
              product={product}
              onClick={() => navigate(`/products/${product._id}`)} // Navegar al producto
            />
          ))
        ) : (
          <span>No tienes productos en tus favoritos.</span>
        )}
      </FavoritesDiv>
    </>
  );
};