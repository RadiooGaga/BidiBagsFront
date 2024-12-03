import React, { useState, useEffect} from 'react';
import { Button } from '../../components/Button/Button';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './LoginRegister.css'


const apiUrl = import.meta.env.VITE_API_URL;

export const LoginRegister = () => {

    const [ errorMessage, setErrorMessage ] = useState('')
    const { user, login } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
          navigate('/account'); // Redirigir si ya está autenticado
      }
    }, [user, navigate]);

    const fields = [
      { name: 'userName', label: 'Nombre', type: 'text', placeholder: 'Nombre', autocomplete: 'given-name',required: true },
      { name: 'userSurname', label: 'Apellidos', type: 'text', placeholder: 'Apellidos', autocomplete: 'family-name',required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'tuemail@gmail.com', autocomplete: 'email', required: true },
      { name: 'password', label: 'Contraseña', type: 'password', placeholder: '*************', autocomplete: 'current-password', required: true },
    ];

  
  // MANEJO DEL REGISTRO
  const handleRegister = (formData) => {
    const hasEmptyFields = Object.values(formData).some(value => !value);
    if (hasEmptyFields) { // si hay campos vacíos...
      setErrorMessage("Complete el formulario");
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }
    console.log('Formulario enviado:', formData);
 

     // Datos que se envían
    const requestData = {
      userName: formData.userName,
      userSurname: formData.userSurname,
      email: formData.email,
      password: formData.password
    };

    // Solicitud POST a la API del registro
    fetch(`${apiUrl}/bidi-bags/register`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData), 
    })
    .then(res => {
      if (!res.ok) {
          if (res.status === 404) throw new Error('404: Usuario no encontrado');
          if (res.status === 409) throw new Error('409: El usuario ya existe');
          if (res.status === 500) throw new Error('500: Error en el servidor');
          throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return res.json();
  })
    .then(data => {
      if (data.success) {
          console.log(data, 'Registro exitoso!');
          login(data.user, data.token); // Actualizar contexto
          navigate('/account'); // Redirigir al área de cuenta
      } else {
          setErrorMessage(data.message || 'Hubo un error al registrar el usuario');
          setTimeout(() => setErrorMessage(''), 2000);
      }
    })
    .catch(error => {
        console.error('Error al registrar:', error);
        setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
        setTimeout(() => setErrorMessage(''), 2000);
    });
  };


  const handleClick = () => {
    navigate('/login'); 
  };

  return (
    <section className='sectionRegister'>
      {user ? (
        <div className="already-logged">
          <p>Ya estás registrado y autenticado. Serás redirigido a tu cuenta.</p>
        </div>
      ) : (
        <FormComponent fields={fields} text="REGÍSTRATE" onSubmit={handleRegister} />
      )}
  
      {errorMessage && ( // Renderizar el mensaje de error si existe
        <div className='errorMessageDiv'>
          {errorMessage}
        </div>
      )}
  
      <div className='accountAlreadyDiv'>
        <p className='registerFormP'>¿YA TIENES UNA CUENTA?</p>
  
        <Button
          type="button"
          text="INICIA SESIÓN"
          width="480px"
          backgroundColor="var(--color-almostBlack)"
          colorText="white"
          hoverBackgroundColor="var(--color-aubergine)" 
          tapBackgroundColor="var(--color-pushTheButton)" 
          padding="15px"
          onClick={handleClick}
        />
      </div>
    </section >
  );
};


