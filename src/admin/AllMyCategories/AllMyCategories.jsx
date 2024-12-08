import React from 'react'
import { useApi } from '../../utils/useApi';
import { Card } from '../../components/ProductCards/Card';


export const AllMyCategories = () => {

  const { categories, loading, error } = useApi({
    endpoint: `/categories`,
    searchType: 'AllMyCategories',
  });

  
  const getVisibilityText = (visible) => {
    return visible ? "Visible: Sí" : "Visible: No";
  };

  if (loading) return <p>Cargando categorías...</p>;
  console.log(categories)
  if (error) {
    <Error text="Hubo un error al cargar las categorias. Por favor, inténtalo de nuevo." />;
 }


  return (
    <>
      {categories.length === 0 ? (
        <p>No hay categorías disponibles</p>
      ) : (
          categories.map((category) => (
              <Card
              key={category._id}
              category={category}
              visibleText={getVisibilityText(category.visible)}
              visibleStyle={{ opacity: category.visible ? "100%" : "30%" }} 
            />          
          ))
        )}
      </>
  );
}