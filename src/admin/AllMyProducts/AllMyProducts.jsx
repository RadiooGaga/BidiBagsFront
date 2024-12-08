import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../utils/useApi';
import { Card } from '../../components/ProductCards/Card';

export const AllMyProducts = () => {
  
  const navigate = useNavigate();
    const { products, loading, error } = useApi({
      endpoint:`/products`, 
      searchType:'AllMyProducts'
    }); 

    const handleFavoriteClick = (id) => {
      navigate(`/products/${id}`)
  };

  
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Hubo un error al cargar los productos. Por favor, inténtalo de nuevo. </p>

    
    return (
      <>
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
          products.map((product) => (
            <Card
            key={product._id}
            product={product}  
            onClick={() => handleFavoriteClick(product._id)}// Navegar al _id
        />
          ))
        )}
      </>
    );
}
