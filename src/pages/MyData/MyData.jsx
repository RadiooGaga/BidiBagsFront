import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { FormComponent } from '../../components/FormComponent/FormComponent'
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../utils/AuthContext';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { DataDiv, SomeSpace } = StyledUserAccount;

const apiUrl = import.meta.env.VITE_API_URL;

export const MyData = () => {

  const navigate = useNavigate();
 
  const { user, token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
/*
  const fields = [
    { name: 'userName', label: 'Nombre', type: 'text', autocomplete: 'given-name', required: true },
    { name: 'userSurname', label: 'Apellidos', type: 'text', autocomplete: 'family-name', required: true },
    { name: 'street', label: 'Calle', type: 'text',  required: true },
    { name: 'city', label: 'Ciudad', type: 'text',  required: true },
    { name: 'postalCode', label: 'Codigo Postal', type: 'number', required: true },
    { name: 'country', label: 'Pais', type: 'text', required: true },
  ];*/

  useEffect(() => {   
    if (user && token) {
      setLoading(true);
      setError(null);

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

  if (loading) {
    return <h3>Cargando datos del usuario...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  if (!userData) {
    return <h3>No se encontraron datos del usuario</h3>;
  }


  const goToSession = () => {
    navigate('/account/session')
  }

  return (
    <DataDiv>
        {/*<FormComponent fields={fields} text={text} onSubmit={handleLogin} />*/}
      <h3>Nombre y apellidos</h3>
        <p>{userData.userName} {userData.userSurname}</p>
        <br />
      <h3>Email</h3>
      <p>{userData.email}</p>
        <br />
      <h3>Dirección de envío</h3>
        <p>Calle: {userData.street}</p>
        <p>Ciudad: {userData.city}</p>
        <p>Código Postal: {userData.postalCode}</p>
        <p>País: {userData.country}</p>
        <br />
      <h3>Dirección de Facturación</h3>
        <p>Calle: {userData.street}</p>
        <p>Ciudad: {userData.city}</p>
        <p>Código Postal: {userData.postalCode}</p>
        <p>País: {userData.country}</p>
      
      <SomeSpace>
        <Button
        type="button"
        text="MODIFICAR DATOS"
        width='240px'
        backgroundColor="var(--color-almostBlack)"
        colorText="white"
        hoverBackgroundColor="var(--color-aubergine)"
        tapBackgroundColor="var(--color-pushTheButton)"
        padding="15px"
        onClick={ goToSession }
      />
      </SomeSpace>
    </DataDiv>
  );
};