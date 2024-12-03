import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Error } from '../../components/Error/Error';
import { useApi } from '../../utils/useApi';
import { useAuth } from '../../utils/AuthContext';
import StyledProductPages from '../../StyledComponents/StyledProductPages';
import { CardDetails } from '../../components/ProductCards/CardDetails';

const { ProductsContainer } = StyledProductPages;

export const ById = () => {

  const { id } = useParams();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const { products, loading, error } = useApi({
    endpoint: `/bidi-bags/product/${id}`,
    searchType: 'ById',
  });

  // Asegurarse de que los datos del producto se han cargado antes de continuar
  useEffect(() => {
    if (user && user.favorites && products) {
        const isProductFavorite = user.favorites.some(fav => fav._id === products._id); 
        setIsFavorite(isProductFavorite);
    }
  }, [user, products]); 
 

  if (loading) {
    <Error text="Cargando el producto" />;
  }

  if (error) {
     <Error text="Hubo un error al cargar el producto. Por favor, inténtalo de nuevo." />;
  }
  if (!products) {
    <Error text="No es posible encontrar el producto" />;
  }
  

  return (
  
    <ProductsContainer>
      <CardDetails
        products={products}
        isFavorite={isFavorite} 
        setIsFavorite={setIsFavorite} 
      />
    </ProductsContainer>

  );
};


