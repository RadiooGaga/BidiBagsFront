import React, { useState } from 'react'
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import StyledLoginRegister from '../../StyledComponents/StyledLoginRegister';
const { SectionLoginRegister, ErrorMessageDiv } = StyledLoginRegister


export const Login = () => {

    const { apiUrl } = useApiProvider();
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
        password: formData.password,
      };
    
      fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then(async (res) => {
          const data = await res.json(); 
          if (!res.ok) {
            throw new Error(data?.error || `Error ${res.status}: ${res.statusText}`);
          }
          return data;
        })
        .then((data) => {
          if (data.success) {
            console.log("Login exitoso:", data);
    
            // Guardar datos y redirigir
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            login(data.user, data.token);
    
            if (data.user.rol === "admin") {
              navigate("/admin-account/products");
            } else {
              navigate("/account/favorites");
            }
          } else {
            throw new Error(data?.message || "Hubo un error desconocido.");
          }
        })
        .catch((error) => {
          console.error("Error al hacer login:", error);
          setErrorMessage(error.message);
        })
        .finally(() => {
          setTimeout(() => setErrorMessage(""), 2000);
        });
    };
  

  return (
    <SectionLoginRegister>
        {errorMessage && ( <ErrorMessageDiv>{errorMessage}</ErrorMessageDiv>)}
      <FormComponent fields={fields} text={text} onSubmit={handleLogin} />
    </SectionLoginRegister>
  );
};