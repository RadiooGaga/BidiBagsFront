import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Message } from '../../components/Message/Message';



export const UpdateProduct = () => {

  const { id } = useParams();
  const { token } = useAuth(); 
  const { apiUrl } = useApiProvider();

  const [ categories, setCategories ] = useState([]); 
  const [ collections, setCollections ] = useState([]);
  const [ updateProductData, setUpdateProductData] = useState(null);
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    //cargar el producto por id cuando el componente se monta
    fetch(`${apiUrl}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        setUpdateProductData(data);
      })
      .catch((err) => console.error('Error al cargar el producto:', err));
  }, [apiUrl, id]);


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


  const fields = [
    { name: 'categoryName', label: 'Categoría',  type: 'select', required: true, 
      options: categories.map((category) => ({
        value: category.categoryName,
        label: category.categoryName,
      })) },
    { name: 'collectionName', label: 'Colección', type: 'select', required: true,
      options: collections.map((collection) => ({
        value: collection.collectionName,
        label: collection.collectionName,
      }))
     },
    { name: 'img', label: 'Imagen', type: 'file' },
    { name: 'price', label: 'Precio', type: 'number', required: true },
    { name: 'inStock', label: 'En Stock', type: 'checkbox', className: 'customCheckbox' },
    { name: 'description', label: 'Descripción breve del producto', type: 'text', required: true },
    { name: 'details', label: 'Detalles del producto', type: 'textarea', required: true },
  ];

  console.log(fields, "CAMPOS DEL UPDATE PRODUCT")
  //nuevo form donde todos los datos estén presentes en preview
  const handleUpdate = (formData) => {

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

        fetch(`${apiUrl}/update-product/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'PATCH',
          body: form,
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) setErrorMessage('404: Error al actualizar el producto');
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Producto actualizado!');
            setTimeout(() => {
              navigate(`/products/${id}`);
            }, 1500); 
          } else {
            setErrorMessage(data.message || 'Hubo un error al actualizar el producto');
            setTimeout(() => setErrorMessage(''), 2000);
          }
        })
        .catch((error) => {
          console.error('Error al actualizar producto:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
          setTimeout(() => setErrorMessage(''), 2000);
        });
  };

  return (
    <>
    {updateProductData ? (
      <FormComponent 
      fields={fields} 
      text="ACTUALIZAR PRODUCTO" 
      onSubmit={handleUpdate}
      initialData={updateProductData}
      />
    ) : ( <p>cargando datos...</p>
    )}

    {successMessage && <Message textMessage={successMessage} />}
    {errorMessage && <Message textMessage={errorMessage} />}
    
    </>
  );
};

