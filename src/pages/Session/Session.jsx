import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { Button } from '../../components/Button/Button';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { UserAccountDiv, SessionDiv, ByeMessage } = StyledUserAccount;

const apiUrl = import.meta.env.VITE_API_URL;

export const Session = () => {

  const { user, token, updateUser, logout } = useAuth(); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'tuemail@gmail.com', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: '*************', required: true },
  ];

  const handleUpdate = (formData) => {

    const userId = user._id || user.id; 
    const hasEmptyFields = Object.values(formData).some(value => !value);
    if (hasEmptyFields) { 
      setMessage("Complete el formulario");
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    console.log('Formulario enviado');

    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    // Actualiza el usuario en el backend
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
        console.log('Respuesta del servidor:', data); // Lo que devuelve el backend
        if (data && data.user) {
          updateUser(data.user);
          setMessage('Datos actualizados!');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          setMessage('Hubo un error al actualizar los datos.');
        }
      })
      .catch((err) => {
        console.error('Error al actualizar el usuario', err);
        setMessage('Error desconocido');
      });
  };

  const handleLogout = () => {
    setMessage('Hasta pronto!');
    setTimeout(() => {
      logout();
      navigate('/');
    }, 1000);
  };

  return (
    <UserAccountDiv>
      <SessionDiv>
      <FormComponent
        text="MODIFICAR DATOS"
        fields={fields}
        onSubmit={handleUpdate}
      />
      <Button
        type="button"
        text="CERRAR SESIÓN"
        width='260px'
        backgroundColor="var(--color-barbiePink)"
        colorText="white"
        hoverBackgroundColor="var(--color-aubergine)"
        tapBackgroundColor="var(--color-pushTheButton)"
        padding="15px"
        onClick={handleLogout}
      />
      {message && 
      <ByeMessage>{message}</ByeMessage>}
      </SessionDiv>
    </UserAccountDiv>
  );
};