import React, { useState, useEffect} from 'react';
import { useApi } from '../../utils/useApi';
import { Error } from '../../components/Error/Error';
import { Box } from '../../components/ProductCards/Box';
import StyledMainCategories from '../../StyledComponents/StyledMainCategories';
import { useNavigate } from 'react-router-dom';
const { Container } = StyledMainCategories;


export const AllCategories = () => {

    const navigate = useNavigate()
    const [visibleCategories, setVisibleCategories] = useState([]);

    const { categories, loading, error } = useApi({
        endpoint: `/categories`,
        url: ''
    });

    // Filtrar las categorías visibles cuando las categorías cambian
    useEffect(() => {
      if (categories && categories.length > 0) {
        const visibleItems = categories.filter(item => item.visible === true);
        setVisibleCategories(visibleItems);
      }
    }, [categories]);
    
      if (loading) {
        return <Error text="Cargando las categorías..." />;
      }
  
      if (error) {
         <Error text="Hubo un error al cargar las categorias. Por favor, inténtalo de nuevo." />;
      }


  return (
    <Container>
      {visibleCategories.map(({ categoryName, img }, index) => (
        <Box 
          key={index} 
          categoryName={categoryName}
          img={img} 
          onClick={() => navigate(`/products/category/${categoryName}`)}  
        />
      ))}
    </Container>
  );
};