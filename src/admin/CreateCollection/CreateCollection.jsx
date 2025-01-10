import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Message } from '../../components/Message/Message';


export const CreateCollection = () => {


  const { apiUrl } = useApiProvider();
  const { token } = useAuth();
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'collectionName', label: 'Colección', type: 'text', placeholder: 'ej: bolsos', required: true, id: 'collectionName' },
    { name: 'img', label: 'Imagen', type: 'file', required: true, id: 'img' },
    { name: 'visible', label: 'Visible', type: 'checkbox', className: 'customCheckbox', id: 'visible' }
  ];

  const handleCreateCollection = (formData) => {
    if (!formData.img) {
      setErrorMessage('Por favor selecciona una imagen.');
      return;
    }
  
   const form = new FormData();
   form.append('collectionName', formData.collectionName);
   form.append('visible', formData.visible);
   form.append('img', formData.img);

        // Solicitud POST a la API del registro
        fetch(`${apiUrl}/create-collection`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST',
          body: form, // Enviamos los datos como form
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) setErrorMessage('404: Error al crear la colección');
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Creando colección...');
            setTimeout(() => {
              setSuccessMessage('Colección creada!');
              setTimeout(() => {
                navigate('/admin-account/collections');
              }, 1000);
            }, 1500);
          } else {
            setErrorMessage(data.message || 'Hubo un error al crear la colección');
            setTimeout(() => setErrorMessage(''), 1500);
          }
        })
        .catch((error) => {
          console.error('Error al crear la colección:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
          setTimeout(() => setErrorMessage(''), 1500);
        });
  };

  return (
    <>
      <FormComponent fields={fields} text="SUBIR COLECCIÓN" onSubmit={handleCreateCollection} />
      {successMessage && <Message textMessage={successMessage} />}
      {errorMessage && <Message textMessage={errorMessage} />}
      </>
  );
};
