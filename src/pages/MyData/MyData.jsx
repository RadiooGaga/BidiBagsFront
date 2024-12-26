import React, { useState, useEffect } from 'react';
import { useApiProvider } from '../../utils/ApiContext';
import { Button } from '../../components/Button/Button';
import { FormUpdateUser } from '../../components/FormUpdateUser/FormUpdateUser';
import { useAuth } from '../../utils/AuthContext';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { DataDiv, SomeSpace } = StyledUserAccount;

export const MyData = () => {
  const { apiUrl } = useApiProvider();
  const { user, token, updateUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [ userDataVisible, setUserDataVisible ] = useState(true);
  const [formVisible, setFormVisible] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const fields = [
    { name: 'email', label: 'Email', for: 'email', type: 'email', placeholder: 'tuemail@gmail.com', autocomplete: 'email', required: true },
    { name: 'password', label: 'Contraseña', for: 'password',  type: 'password', placeholder: '*************', autocomplete: 'current-password', required: true },
    { name: 'shippingAdress', label: 'Dirección de Envío', for: 'shippingAdress',
      fields: [
        { name: 'street', label: '', for: 'street', placeholder: 'Dirección de envío', type: 'text', required: true },
        { name: 'city', label: 'Ciudad', for: 'city', type: 'text', required: true },
        { name: 'postalCode', label: 'Código Postal', for:  'postalCode',  type: 'text', required: true },
        { name: 'country', label: 'País', for:  'country',  type: 'text', required: true }
      ],
    },
    { name: 'billingAdress', label: 'Dirección de Facturación',
      fields: [
        { name: 'street2', label: '', for: 'street2', placeholder: 'Dirección de facturación', type: 'text', required: true },
        { name: 'city2', label: 'Ciudad', for: 'city2', type: 'text',  required: true },
        { name: 'postalCode2', label: 'Código Postal', for: 'postalCode2', type: 'text', required: true },
        { name: 'country2', label: 'País', for:  'country2',  type: 'text', required: true },
      ],
    },
  ];

  useEffect(() => {   
    if (user && token) {
      setLoading(true);
      setError(null);
      setUserDataVisible(true);

      fetch(`${apiUrl}/user/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error('Error al obtener los datos del usuario:', err);
          setError('Hubo un problema al obtener los datos del usuario');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, token]);



  const handleUpdate = (formData) => {
    const userId = user._id;
    const requestData = {
      email: formData.email,
      password: formData.password,
      shippingAddress: formData.shippingAdress,
      billingAddress: formData.billingAdress,
    };

    fetch(`${apiUrl}/update-user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          updateUser(data.user);
          setMessage('Datos actualizados!');
          setFormVisible(false); // Oculta el formulario después de actualizar
        } else {
          setMessage('Hubo un error al actualizar los datos.');
        }
      })
      .catch((err) => {
        console.error('Error al actualizar el usuario', err);
        setMessage('Error desconocido');
      });
  };

  if (loading) {
    return <h3>Cargando datos del usuario...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  if (!userData) {
    return <h3>No se encontraron datos del usuario</h3>;
  }

  return (
    <DataDiv>
      {!formVisible && (
        <>
          <h3>Nombre y apellidos</h3>
          <p>{userData.userName} {userData.userSurname}</p>
          <br />
          <h3>Email</h3>
          <p>{userData.email}</p>
          <br />
          <h3>Dirección de envío</h3>
          {userData.shippingAddress && userData.shippingAddress.length > 0 ? (
            <>
              <p>Calle: {userData.shippingAddress[0].street}</p>
              <p>Ciudad: {userData.shippingAddress[0].city}</p>
              <p>Código Postal: {userData.shippingAddress[0].postalCode}</p>
              <p>País: {userData.shippingAddress[0].country}</p>
            </>
          ) : (
            <p>No hay dirección de envío disponible</p>
          )}
          <br />
          <h3>Dirección de Facturación</h3>
          {userData.billingAddress && userData.billingAddress.length > 0 ? (
            <>
              <p>Calle: {userData.billingAddress[0].street2}</p>
              <p>Ciudad: {userData.billingAddress[0].city2}</p>
              <p>Código Postal: {userData.billingAddress[0].postalCode2}</p>
              <p>País: {userData.billingAddress[0].country2}</p>
            </>
          ) : (
            <p>No hay dirección de facturación disponible</p>
          )}
          <SomeSpace>
            <Button
              type="button"
              text="MODIFICAR DATOS"
              width="240px"
              backgroundColor="var(--color-almostBlack)"
              colorText="white"
              hoverBackgroundColor="var(--color-aubergine)"
              tapBackgroundColor="var(--color-pushTheButton)"
              padding="15px"
              onClick={() => setFormVisible(true)} // Mostrar formulario
            />
          </SomeSpace>
        </>
      )}
      {formVisible && (
        <FormUpdateUser text="MODIFICAR DATOS" fields={fields} onSubmit={handleUpdate} />
      )}
      {message && <p>{message}</p>}
    </DataDiv>
  );
};