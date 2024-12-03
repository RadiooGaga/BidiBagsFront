import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../utils/useApi';
import { Card } from '../../components/ProductCards/Card';
import { Error } from '../../components/Error/Error';
import { Loading } from '../../components/Loading/Loading';
import StyledProductPages from '../../StyledComponents/StyledProductPages';
const { ProductsContainer } = StyledProductPages; 



export const ByCategory = () => {

  const { categoryName } = useParams();
  const navigate = useNavigate();

  const { products, loading, error } = useApi({
    endpoint:`/bidi-bags/category/${categoryName}`, 
    searchType:'ByCategory'
  }); 
  if (!products || products.length === 0) {
    return <Error 
    text={`No se encontraron productos en la categoría "${categoryName}"`} />;
  }


  const handleSelectionClick = (id) => { 
    console.log("Haciendo clic en producto con ID:", id);
    navigate(`/product/${id}`);
  };
  

  if (loading) return (
    <Loading
    loading={loading}
    text="Buscando productos..."
    message={`Cargando productos para la categoría: ${categoryName}`}
  />
  )

  if (error) {
    return <Error 
    text="Hubo un error al cargar los productos. Por favor, inténtalo de nuevo." />;
  }

  

  return (
    <ProductsContainer>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            img={product.img}
            onClick={() => handleSelectionClick(product._id)}
          />
        ))
      ) : (
        <p>No hay productos disponibles.</p> // Si no hay productos, muestra un mensaje
      )}
    </ProductsContainer>
  );
}
