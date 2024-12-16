import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';


export const CreateCategory = () => {
  const { apiUrl } = useApiProvider();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'categoryName', label: 'Categoría', type: 'text', placeholder: 'ej: bolsos', required: true },
    { name: 'img', label: 'Imagen', type: 'file', required: true },
    { name: 'visible', label: 'Visible', type: 'checkbox', className: 'customCheckbox' }
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
          body: form, // Enviamos los datos como FormData
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) setErrorMessage('404: Error al crear la categoría');
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMessage('¡Categoría creada!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/admin-account/categories'); 
            }, 1500);
          } else {
            setErrorMessage(data.message || 'Hubo un error al subir la categoría');
            setTimeout(() => setErrorMessage(''), 1500);
          }
        })
        .catch((error) => {
          console.error('Error al subir la categoría:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
          setTimeout(() => setErrorMessage(''), 1500);
        });
  };

  return (
    <>
      <FormComponent fields={fields} text="SUBIR CATEGORÍA" onSubmit={handleCreateCategory} />
      {errorMessage && (
      <div>
        <p style={{ color: 'var(--color-error)', marginTop: '10px' }}>
        {errorMessage}
        </p> 
      </div>
    )}
    
    {successMessage && (
      <div>
      <p style={{ color: 'var(--color-success)', marginTop: '10px' }}>
        {successMessage}
      </p>
      </div>
    )}
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