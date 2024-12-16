import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button'
import { useApi } from '../../utils/useApi';
import { useApiProvider } from '../../utils/ApiContext';
import { Card } from '../../components/ProductCards/Card';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
const { DowloadCsvDiv, Titles } = StyledMyAccountPages;



export const AllMyProducts = () => {
  
  const navigate = useNavigate();
  const { apiUrl } = useApiProvider();
    const { products, loading, error } = useApi({
      endpoint:`/products`, 
      url:'',
    }); 

    const handleFavoriteClick = (id) => {
      navigate(`/products/${id}`)
    };


    const handleDownloadCsv = async () => {
      try {
        const token = localStorage.getItem('token'); // sacar el token almacenado
        if (!token) throw new Error("No se encontró el token");

        const response = await fetch(`${apiUrl}/products/export/csv`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // incluir el token en el encabezado
            },
        });
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "productos.csv"; 
          document.body.appendChild(a);
          a.click();
          a.remove();
      } catch (error) {
          console.error("Error al descargar el CSV:", error);
          alert("Hubo un error al intentar descargar el archivo");
      }
  };

  
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Hubo un error al cargar los productos. Por favor, inténtalo de nuevo. </p>

    
    return (
      <>
      <DowloadCsvDiv>
        <Titles>TODOS MIS PRODUCTOS</Titles>
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
