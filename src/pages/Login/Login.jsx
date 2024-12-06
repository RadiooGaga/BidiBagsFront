import React, { useState } from 'react'
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Login.css'

const apiUrl = import.meta.env.VITE_API_URL;



export const Login = () => {

    const navigate = useNavigate()
    const { login } = useAuth();
    const [ errorMessage, setErrorMessage ] = useState('');
    const text = 'INICIAR SESIÓN';

    const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'tuemail@gmail.com', autocomplete: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: '*************', autocomplete: 'current-password', required: true },
    ];

    // MANEJO DEL LOGIN
    const handleLogin = (formData) => {
      const hasEmptyFields = Object.values(formData).some(value => !value);
      if (hasEmptyFields) { // si hay campos vacíos...
        setErrorMessage("Complete el formulario");
        setTimeout(() => setErrorMessage(''), 2000);
        return;
      };
 
      // Datos que se envían
      const requestData = {
        email: formData.email,
        password: formData.password
      };

      // Solicitud POST a la API del registro
      fetch(`${apiUrl}/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), 
      })
      .then(res => {
        if (!res.ok) {
          // Manejo de errores según el código de estado
          switch (res.status) {
            case 400:
              setErrorMessage('400: Contraseña incorrecta');
              break;
            case 404:
              setErrorMessage('404: Usuario no encontrado; revise el formulario');
              break;
            case 500:
              setErrorMessage('500: Error en el servidor');
              break;
            default:
              setErrorMessage(`Error ${res.status}: ${res.statusText}`);
          }
          return; // Salir si hay error
        }
  
        return res.json(); // Procesar respuesta válida
      })
      .then(data => {
        if (!data) return; // Evitar procesar si hubo error antes
  
        if (data.success) {
          console.log("Login exitoso:", data);
  
          // Guardar datos en el almacenamiento local
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
  
          // Llamar a la función de login y redirigir según el rol
          login(data.user, data.token);
  
          if (data.user.rol === 'admin') {
            navigate('/admin-account');
          } else {
            navigate('/account');
          }
        } else {
          setErrorMessage(data?.message || 'Hubo un error desconocido.');
        }
      })
      .catch(error => {
        console.error('Error al hacer login:', error);
        setErrorMessage("Error desconocido. Intenta de nuevo.");
      })
      .finally(() => {
        // Limpiar mensaje de error después de 2 segundos
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };
  

  return (
    <section className='sectionLogin'>
        {errorMessage && ( <div className="errorMessage">{errorMessage}</div>)}
      <FormComponent fields={fields} text={text} onSubmit={handleLogin} />
    </section>
  );
};