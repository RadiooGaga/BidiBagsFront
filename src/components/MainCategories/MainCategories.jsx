import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryBox } from '../ProductCards/CategoryBox';
import { useApi } from '../../utils/useApi';
import './MainCategories.css';

const apiUrl = import.meta.env.VITE_API_URL;

export const MainCategories = () => {
   // Estado para las categorías visibles
  const [visible, setVisible] = useState([]); 
  const navigate = useNavigate();

  const { categories, loading, error } = useApi({
    endpoint: `/bidi-bags/categories`,
    searchType: 'ById',
  });

  // Filtrar las categorías visibles cuando los datos cambian
  useEffect(() => {
    if (categories && categories.length > 0) {
      const visibleItems = categories.filter(item => item.visible === true);
      setVisible(visibleItems);
    }
  }, [categories]);

  if (loading) {
    <Error text="Cargando las categorias" />;
  }

  if (error) {
     <Error text="Hubo un error al cargar las categorias. Por favor, inténtalo de nuevo." />;
  }

  return (
    <div className="categoryContainer">
      {/* esto me filtra las categorías por visibles */}
      {visible.length > 0 ? (
        visible.map(({ img, categoryName }, index) => (
          <CategoryBox 
            key={index} 
            img={img} 
            categoryName={categoryName}
            onClick={() => navigate(`/category/${categoryName}`)}  
          />
        ))
      ) : (
        <p>Aún no hay productos añadidos a esta categoría.</p>
      )}
    </div>
  );
};
