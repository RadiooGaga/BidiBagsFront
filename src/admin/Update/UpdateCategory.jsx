import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Warning } from '../../components/Warning/Warning';


export const UpdateCategory = () => {

  const { id } = useParams()
  const { apiUrl } = useApiProvider();
  const [ updateCategoryData, setUpdateCategoryData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    //cargar la categoria por id cuando el componente se monta
    fetch(`${apiUrl}/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        setUpdateCategoryData(data);
      })
      .catch((err) => console.error('Error al cargar la categoría:', err));
  }, [apiUrl, id]);


  const fields = [
    { name: 'categoryName', label: 'Categoría', type: 'text', placeholder: 'ej: bolsos', required: true },
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

      fetch(`${apiUrl}/update-category/${id}`, {
        method: 'PATCH',
        body: form,
      })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) setErrorMessage('404: Error al actualizar la categoría');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccessMessage('Categoría actualizada!');
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
        setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };




  return (
    <>
    {updateCategoryData ? (
      <FormComponent 
      fields={fields} 
      text="ACTUALIZAR CATEGORIA" 
      onSubmit={handleUpdate}
      initialData={updateCategoryData}
      />
    ) : ( <p>cargando datos...</p>
    )}
    {errorMessage && (
      <div>
        <p style={{ color: 'var(--color-error)', marginTop: '10px' }}>
        {errorMessage}
        </p> 
      </div>
    )}
    </>
  );
};