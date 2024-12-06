import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/FormComponent/FormComponent';

const apiUrl = import.meta.env.VITE_API_URL;

export const CreateCategory = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'categoryName', label: 'Categoría', type: 'text', placeholder: 'ej: bolsos', required: true },
    { name: 'img', label: 'Imagen', type: 'file', required: true },
    { name: 'visible', label: 'Visible', type: 'checkbox', className: 'customCheckbox' }
  ];

  const handleRegister = (formData) => {
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
            console.log(data, 'Categoría creada!');
            navigate('/'); 
          } else {
            setErrorMessage(data.message || 'Hubo un error al subir la categoría');
            setTimeout(() => setErrorMessage(''), 2000);
          }
        })
        .catch((error) => {
          console.error('Error al subir la categoría:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
          setTimeout(() => setErrorMessage(''), 2000);
        });
  };

  return (
    <>
      <FormComponent fields={fields} text="SUBIR CATEGORÍA" onSubmit={handleRegister} />
      {errorMessage && <p>{errorMessage}</p>}
      </>
  );
};
