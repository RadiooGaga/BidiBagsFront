import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Message } from '../../components/Message/Message';


export const CreateCategory = () => {
  const { apiUrl } = useApiProvider();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'categoryName', label: 'Categoría', type: 'text', placeholder: 'ej: bolsos', required: true, id: 'categoryName' },
    { name: 'img', label: 'Imagen', type: 'file', required: true, id: 'img' },
    { name: 'visible', label: 'Visible', type: 'checkbox', className: 'customCheckbox', id: 'visible' }
  ];

  const handleCreateCategory = (formData) => {
    if (!formData.img) {
      setErrorMessage('Por favor selecciona una imagen.');
      return;
    }
  
   const form = new FormData();
   form.append('categoryName', formData.categoryName);
   form.append('visible', formData.visible);
   form.append('img', formData.img);

        // Solicitud POST a la API del registro
        fetch(`${apiUrl}/create-category`, {
          method: 'POST',
          body: form, // Enviamos los datos como form
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) setErrorMessage('404: Error al crear la categoría');
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Creando categoría...');
            setTimeout(() => {
              setSuccessMessage('Categoría creada!');
              setTimeout(() => {
                navigate('/admin-account/categories');
              }, 1000);
            }, 1500);
          } else {
            setErrorMessage(data.message || 'Hubo un error al crear la categoría');
            setTimeout(() => setErrorMessage(''), 1500);
          }
        })
        .catch((error) => {
          console.error('Error al crear la categoría:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
          setTimeout(() => setErrorMessage(''), 1500);
        });
  };

  return (
    <>
      <FormComponent fields={fields} text="SUBIR CATEGORÍA" onSubmit={handleCreateCategory} />
      {successMessage && <Message textMessage={successMessage} />}
      {errorMessage && <Message textMessage={errorMessage} />}
      </>
  );
};



/*

// Al borrar una categoría o hacer cambios
const handleDeleteCategory = async (categoryId) => {
  const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    // Elimina el caché de categorías
    localStorage.removeItem('categories'); 
    // Realiza una nueva solicitud para obtener las categorías actualizadas
    refetch(); // Si usas un hook como useApi que permita refetch
  }
};
*/