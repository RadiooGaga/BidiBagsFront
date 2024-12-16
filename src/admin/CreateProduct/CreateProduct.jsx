import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';


export const CreateProduct = () => {
  const { apiUrl } = useApiProvider();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'categoryName', label: 'Categoría', placeholder: 'categoría a la que pertenece', type: 'text', required: true },
    { name: 'collectionName', label: 'Colección', placeholder: 'nombre de la colección', type: 'text', required: true },
    { name: 'img', label: 'Imagen', type: 'file', required: true },
    { name: 'price', label: 'Precio', type: 'number', required: true },
    { name: 'inStock', label: 'En Stock', type: 'checkbox', className: 'customCheckbox' },
    { name: 'description', label: 'Descripción breve del producto', type: 'text', required: true },
    { name: 'details', label: 'Detalles del producto', type: 'textarea', required: true },
  ];

  const handleRegister = (formData) => {
    if (!formData.img) {
      setErrorMessage('Por favor selecciona una imagen.');
      return;
    }
  
   // Crear un FormData para enviar los datos incluyendo la imagen como archivo
   const form = new FormData();
   form.append('categoryName', formData.categoryName);
   form.append('collectionName', formData.collectionName);
   form.append('price', formData.price);
   form.append('inStock', formData.inStock);
   form.append('description', formData.description);
   form.append('details', formData.details);
   form.append('img', formData.img); 

        // Solicitud POST a la API del registro
        fetch(`${apiUrl}/create-product`, {
          method: 'POST',
          body: form, // Enviamos los datos como FormData
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) setErrorMessage('404: Error al crear el producto');
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            console.log(data, 'Producto creado!');
            navigate('/all-products'); 
          } else {
            setErrorMessage(data.message || 'Hubo un error al subir el producto');
            setTimeout(() => setErrorMessage(''), 2000);
          }
        })
        .catch((error) => {
          console.error('Error al subir producto:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
          setTimeout(() => setErrorMessage(''), 2000);
        });
  };

  return (
    <>
      <FormComponent fields={fields} text="SUBIR PRODUCTO" onSubmit={handleRegister} />
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};