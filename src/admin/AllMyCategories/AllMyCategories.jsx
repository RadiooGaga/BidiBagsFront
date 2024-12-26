import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../utils/useApi';
import { useApiProvider } from '../../utils/ApiContext';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/ProductCards/Card';
import { Warning } from '../../components/Warning/Warning';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
const { DowloadCsvDiv, Titles } = StyledMyAccountPages;



export const AllMyCategories = () => {

  const { apiUrl } = useApiProvider();
  const navigate = useNavigate()
  const [ errorMessage, setErrorMessage ] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false); 
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  const { categories, loading, error } = useApi({ endpoint: `/categories`, url: '' });

  const handleOpenWarning = (id) => {
    setCategoryToDelete(id);
    setShowWarning(true);
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  //BORRAR CATEGORÍA
  const handleDeleteItem = () => {

    if (!categoryToDelete) return;

    fetch(`${apiUrl}/delete-category/${categoryToDelete}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) setErrorMessage('404: Error al eliminar la categoría');
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setSuccessMessage('Categoría eliminada!');
        setShowWarning(false);
        setCategoryToDelete(null);
        setTimeout(() => {
          navigate('/admin-account/categories');
        }, 1500); 
      } else {
        setErrorMessage(data.message || 'Hubo un error al actualizar la categoría');
        setTimeout(() => setErrorMessage(''), 2000);
      }
    })
    .catch((error) => {
      console.error('Error al actualizar la categoría:', error);
      alert('Error al eliminar la categoría');
    });
  }



  //descargar csv
  const handleDownloadCsv = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error("No se encontró el token");

      const response = await fetch(`${apiUrl}/categories/export/csv`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
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

  const handleUpdate = (id) => {
    navigate(`/admin-account/update-category/${id}`)
  }

  // determina si la categoría está visible para el usuario
  const getVisibilityText = (visible) => {
    return visible ? "visible" : "oculto";
  };

  if (loading) return <p>Cargando categorías...</p>;
  if (error) { <Error text="Hubo un error al cargar las categorias. Por favor, inténtalo de nuevo." />}

  return (
    <>
     {showWarning && (
        <Warning 
          text="¿Eliminar esta categoría?"
          onClose={handleCloseWarning}
          onClick={handleDeleteItem}
        />
      )}
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
              >
              <Button 
              text="editar" 
              colorText={"var(--color-barbiePink)"} 
              backgroundColor={"transparent"}
              onClick={() => handleUpdate(category._id)} 
              />
              <Button 
              text="eliminar" 
              colorText={"var(--color-aubergine)"} 
              backgroundColor={"transparent"}
              onClick={() => handleOpenWarning(category._id)} 
              />
              </Card>
                   
          ))
        )}
      </>
  );
} 


