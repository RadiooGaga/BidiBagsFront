import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../utils/useApi';
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/ProductCards/Card';
import { Warning } from '../../components/Warning/Warning';
import { Message } from '../../components/Message/Message';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
const { DowloadCsvDiv, Titles } = StyledMyAccountPages;



export const AllMyCollections = () => {

    const { apiUrl } = useApiProvider();
    const { token } = useAuth();
    const navigate = useNavigate()

    const [ errorMessage, setErrorMessage ] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false); 
    const [collectionToDelete, setCollectionToDelete] = useState(null);

    const { collections, loading, error, dispatch  } = useApi({ 
    endpoint: `/collections`, 
    url: '' 

    });

    const handleUpdate = (id) => {
        navigate(`/admin-account/update-collection/${id}`)
    }

    const handleOpenWarning = (id) => {
        setCollectionToDelete(id);
        setShowWarning(true);
    };

    const handleCloseWarning = () => {
        setShowWarning(false);
    };


  // determina si la colección está visible para el usuario
  const getVisibility = (visible) => {
    return {
      img: visible ? "/assets/icons/eyeOpened.png" : "/assets/icons/eyeClosed.png",
    };
  };
  


  //descargar csv
  const handleDownloadCsv = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error("No se encontró el token");

      const response = await fetch(`${apiUrl}/collections/export/csv`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "collections.csv"; 
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error("Error al descargar el CSV:", error);
        alert("Hubo un error al intentar descargar el archivo");
    }
  };


  if (loading) return <p>Cargando colecciones...</p>;
  if (error) { <Error text="Hubo un error al cargar las colecciones. Por favor, inténtalo de nuevo." />}


    //BORRAR COLECCIÓN
    const handleDeleteItem = () => {

      if (!collectionToDelete) return;
  
      fetch(`${apiUrl}/delete-collection/${collectionToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'DELETE',
      })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) setErrorMessage('404: Error al eliminar la colección');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccessMessage('Eliminando colección...');
          setCollectionToDelete(null);

          // Actualizar el estado manualmente para eliminar la colección
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              collections: collections.filter(collection => collection._id !== collectionToDelete)
            }
          });

          setTimeout(() => {
            setSuccessMessage('Colección eliminada!');
            setTimeout(() => {
              setSuccessMessage('');
              setShowWarning(false);
              navigate('/admin-account/collections');
            }, 1000);
          }, 1000);
        } else {
          setErrorMessage(data.message || 'Hubo un error al eliminar la colección');
          setTimeout(() => setErrorMessage(''), 2000);
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la colección:', error);
        alert('Error al eliminar la colección');
      });
    }


  return (
    <>
     {showWarning && (
        <Warning 
          text="¿Eliminar esta colección?"
          onClose={handleCloseWarning}
          onClick={handleDeleteItem}
        />
        
      )}
      <DowloadCsvDiv>
        <Titles>TODAS MIS COLECCIONES</Titles>
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
      {collections && collections.length === 0 ? (
        <p>No hay colecciones disponibles</p>
      ) : (
          collections.map((collection) => (
            <Card
            key={collection._id}
            collection={collection}
            visibleStyle={{ opacity: collection.visible ? "1" : "0.3" }} 
            visibleEye={getVisibility(true)}
            closedEye={getVisibility(false)}
            
            >
              <Button 
              colorText={"var(--color-barbiePink)"} 
              backgroundColor={"transparent"}
              onClick={() => handleUpdate(collection._id)} 
              >
                <img 
                  src="/assets/icons/lapiz.png" 
                  alt="lapiz" 
                  style={{ width: '20px', height: '20px' }} 
                />
              </Button>
                <Button 
                  colorText={"var(--color-aubergine)"} 
                  backgroundColor={"transparent"}
                  onClick={() => handleOpenWarning(collection._id)}
                >
                  <img 
                    src="/assets/icons/papelera.png" 
                    alt="papelera" 
                    style={{ width: '20px', height: '20px' }} 
                  />
                </Button>
              </Card>     
          ))
        )}

        {successMessage && <Message textMessage={successMessage} />}
        {errorMessage && <Message textMessage={errorMessage} />}
      </>
  );
} 