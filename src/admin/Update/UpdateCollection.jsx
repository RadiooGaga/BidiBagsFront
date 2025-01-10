import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Message } from '../../components/Message/Message';


export const UpdateCollection = () => {

  const { id } = useParams()
  const { apiUrl } = useApiProvider();
  const { token } = useAuth();
  const [ updateCollectionData, setUpdateCollectionData] = useState(null);
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    //cargar la colección por id cuando el componente se monta
    fetch(`${apiUrl}/collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        setUpdateCollectionData(data);
      })
      .catch((err) => console.error('Error al cargar la colección:', err));
  }, [apiUrl, id]);


  const fields = [
    { name: 'collectionName', label: 'Colección', type: 'text', placeholder: 'ej: bolsos', required: true },
    { name: 'img', label: 'Imagen', type: 'file' },
    { name: 'visible', label: 'Visible', type: 'checkbox', className: 'customCheckbox' }
  ];


  //ACTUALIZAR
  const handleUpdate = (formData) => {
    //nuevo form donde con datos presentes en preview
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'img' && !(formData[key] instanceof File)) {
        //console.log(`Saltando campo ${key}:`, formData[key]);
        return;
      }
  
      if (formData[key] !== undefined) {
        form.append(key, formData[key]);
        //console.log(`Campo ${key}:`, formData[key]);
      }
    });

      fetch(`${apiUrl}/update-collection/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'PATCH',
        body: form,
      })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) setErrorMessage('404: Error al actualizar la colección');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccessMessage('Colección actualizada!');
          setTimeout(() => {
            navigate('/admin-account/collections');
          }, 1500); 
        } else {
          setErrorMessage(data.message || 'Hubo un error al actualizar la colección');
          setTimeout(() => setErrorMessage(''), 2000);
        }
      })
      .catch((error) => {
        console.error('Error al actualizar la colección:', error);
        setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };


  return (
    <>
    {updateCollectionData ? (
      <FormComponent 
      fields={fields} 
      text="ACTUALIZAR COLECCIÓN" 
      onSubmit={handleUpdate}
      initialData={updateCollectionData}
      />
    ) : ( <p>cargando datos...</p>
    )}

    {successMessage && <Message textMessage={successMessage} />}
    {errorMessage && <Message textMessage={errorMessage} />}
    </>
  );
};