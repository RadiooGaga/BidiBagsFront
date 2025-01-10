import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Message } from '../../components/Message/Message';


export const CreateProduct = () => {


  const { apiUrl } = useApiProvider();
  const { token } = useAuth();

  const [ categories, setCategories ] = useState([]);
  const [ collections, setCollections ] = useState([]); 
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();

    // Cargar categorías y colecciones 
    useEffect(() => {
      fetch(`${apiUrl}/categories`)
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error('Error al cargar categorías:', err));
  
      fetch(`${apiUrl}/collections`)
        .then((res) => res.json())
        .then((data) => setCollections(data))
        .catch((err) => console.error('Error al cargar colecciones:', err));
    }, [apiUrl]);


  //campos del form
  const fields = [
    { name: 'categoryName', label: 'Categoría',  type: 'select', required: true, 
      options: categories.map((category) => ({
        value: category.categoryName,
        label: category.categoryName,
      })) },
    { name: 'collectionName', label: 'Colección', type: 'select', required: false,
      options: collections.map((collection) => ({
        value: collection.collectionName,
        label: collection.collectionName,
      }))
     },
    { name: 'img', label: 'Imagen', type: 'file', required: true },
    { name: 'price', label: 'Precio', placeholder: 'ejemplo: 30', type: 'number', required: true },
    { name: 'inStock', label: 'En Stock', type: 'checkbox', className: 'customCheckbox' },
    { name: 'description', label: 'Descripción breve del producto', type: 'text', required: true },
    { name: 'details', label: 'Detalles del producto', type: 'textarea', required: true },
  ];


  const handleRegister = (formData) => {
    if (!formData.img) {
      setErrorMessage('Por favor selecciona una imagen.');
      return;
    }
  
   // FormData para enviar los datos incluyendo la imagen como archivo
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
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST',
          body: form, // Enviamos los datos del form
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) setErrorMessage('404: Error al crear el producto');
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Creando producto...');
            setTimeout(() => {
              setSuccessMessage('Producto creado!');
              setTimeout(() => {
                navigate('/admin-account/products');
              }, 1000);
            }, 1500);
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
      {successMessage && <Message textMessage={successMessage} />}
      {errorMessage && <Message textMessage={errorMessage} />}
    </>
  );
};