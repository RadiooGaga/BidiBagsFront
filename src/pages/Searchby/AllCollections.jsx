import React, { useState, useEffect} from 'react';
import { useApi } from '../../utils/useApi';
import { Error } from '../../components/Error/Error';
import { Box } from '../../components/ProductCards/Box';
import StyledMainCategories from '../../StyledComponents/StyledMainCategories';
import { useNavigate } from 'react-router-dom';
const { Container, Title } = StyledMainCategories;


export const AllCollections = () => {

    const navigate = useNavigate()
    const [visibleCollections, setVisibleCollections] = useState([]);

    const { collections, loading, error } = useApi({
        endpoint: `/collections`,
        url: ''
    });

    // Filtrar las categorías visibles cuando las categorías cambian
    useEffect(() => {
      if (collections && collections.length > 0) {
        const visibleItems = collections.filter(item => item.visible === true);
        setVisibleCollections(visibleItems);
      }
    }, [collections]);
    
      if (loading) {
        return <Error text="Cargando las colecciones..." />;
      }
  
      if (error) {
         <Error text="Hubo un error al cargar las colecciones. Por favor, inténtalo de nuevo." />;
      }


  return (
    <Container>
      <Title>COLECCIONES</Title>
      {visibleCollections.map(({ collectionName, img }, index) => (
        <Box 
          key={index} 
          collectionName={collectionName}
          img={img} 
          onClick={() => navigate(`/products/collection/${collectionName}`)}  
        />
      ))}
    </Container>
  );
};