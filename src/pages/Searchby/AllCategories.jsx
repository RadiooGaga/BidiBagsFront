import React, { useState, useEffect} from 'react';
import { useApi } from '../../utils/useApi';
import { Error } from '../../components/Error/Error';
import { CategoryBox } from '../../components/ProductCards/CategoryBox';
import StyledMainCategories from '../../StyledComponents/StyledMainCategories';
import { useNavigate } from 'react-router-dom';
const { CategoryContainer } = StyledMainCategories;


export const AllCategories = () => {

    const navigate = useNavigate()
    const [visibleCategories, setVisibleCategories] = useState([]);

    const { categories, loading, error } = useApi({
        endpoint: `/categories`,
        url: '',
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
        <CategoryContainer>
          {visibleCategories.map(({ categoryName, img }, index) => (
            <CategoryBox 
              key={index} 
              categoryName={categoryName}
              img={img} 
              onClick={() => navigate(`/products/category/${categoryName}`)}  
            />
          ))}
        </CategoryContainer>
      );
    };
