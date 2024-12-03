import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext'
import { useParams, useNavigate } from 'react-router-dom';
import { Error } from '../../components/Error/Error';
import { useApi } from '../../utils/useApi';
import StyledProductPages from '../../StyledComponents/StyledProductPages';
import { CardDetails } from '../../components/ProductCards/CardDetails';

const { ProductsContainer } = StyledProductPages;

export const ById = () => {

  const { id } = useParams(); // Obtener el id de la URL
  const { products, loading, error } = useApi({
    endpoint: `/bidi-bags/product/${id}`,
    searchType: 'ById',
  });

  if (!products) {
    <Error text="No es posible encontrar el producto" />;
 }

  if (loading) {
    <Error text="Cargando el producto" />;
  }

  if (error) {
     <Error text="Hubo un error al cargar el producto. Por favor, inténtalo de nuevo." />;
  }
  

  return (
  
    <ProductsContainer>
        <CardDetails
        key={products._id}
        img={products.img}
        collection={products.collection}
        price={products.price}
        description={products.description}
        details={products.details}
        inStock={products.inStock}
        favorites={products.favorites}
        
      />
    </ProductsContainer>

  );
};


