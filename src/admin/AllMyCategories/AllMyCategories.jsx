import React  from 'react'
import { useApi } from '../../utils/useApi';
import { useApiProvider } from '../../utils/ApiContext';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/ProductCards/Card';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
const { DowloadCsvDiv, Titles } = StyledMyAccountPages;



export const AllMyCategories = () => {

  const { apiUrl } = useApiProvider();
  const { categories, loading, error } = useApi({
    endpoint: `/categories`,
    url: '',
  });

  const handleDownloadCsv = async () => {
    try {
      const token = localStorage.getItem('token'); // sacar el token almacenado
      if (!token) throw new Error("No se encontró el token");

      const response = await fetch(`${apiUrl}/categories/export/csv`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // incluir el token en el encabezado
          },
      });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "categorias.csv"; 
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error("Error al descargar el CSV:", error);
        alert("Hubo un error al intentar descargar el archivo");
    }
};
  
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
      <DowloadCsvDiv>
        <Titles>TODAS MIS CATEGORÍAS</Titles>
      <Button 
        type="button"
        text="Descargar csv"
        colorText="white"
        width="180px"
        padding="10px"
        backgroundColor="var(--color-almostBlack)"
        hoverBackgroundColor="var(--color-aubergine)"
        tapBackgroundColor="var(--color-pushTheButton)"
        onClick={handleDownloadCsv}></Button>
        </DowloadCsvDiv>
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