import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import { Message } from '../../components/Message/Message';
import  StyledBlogAdmin  from '../../StyledComponents/StyledBlogAdmin';
const { FormBlogComponentDiv, StyleTextSelector, ChosenStyle, FontSelector } = StyledBlogAdmin;


export const BlogEditor = () => {

  const { token } = useAuth(); 
  const { apiUrl } = useApiProvider();
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'content', label: 'Contenido', type: 'textarea', required: true },
    { name: 'img', label: 'Imagen', type: 'file', required: true },
  ];


// MANEJO DEL REGISTRO
const handlePost = (formData) => {

  const form = new FormData();
  form.append('title', formData.title);
  form.append('content', formData.content);
  form.append('img', formData.img); 


    fetch(`${apiUrl}/create-post`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'POST', 
      body: form,
    })
    .then(res => {
      if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); 
    })
    .then(data => {
      if (data.post) {
        setSuccessMessage('Creando post...');
        setTimeout(() => {
          setSuccessMessage('Post creado!');
          setTimeout(() => {
            navigate('/latest-post');
          }, 1000);
        }, 1500);
      } else {
          throw new Error(data.message || 'Fallo al crear el post');
      }
    })
    .catch(error => {
      console.error('Error al crear el post:', error);
      setErrorMessage(error.message || 'Error desconocido');
      setTimeout(() => setErrorMessage(''), 2000);
    });
  };

    const applyStyle = (style, value) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style[style] = value;
        range.surroundContents(span);
      };

    const handleBold = () => applyStyle("fontWeight");
    const handleItalic = () => applyStyle("fontStyle");
    const handleUnderline = () => applyStyle("textDecoration");
    const handleFontChange = (fontFamily) => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontFamily = fontFamily;
      range.surroundContents(span);
    };


    return (
      <FormBlogComponentDiv>
        <StyleTextSelector>
          <ChosenStyle onClick={handleBold}><b>B</b></ChosenStyle>
          <ChosenStyle onClick={handleItalic}><i>I</i></ChosenStyle>
          <ChosenStyle onClick={handleUnderline}><u>U</u></ChosenStyle>
              <FontSelector
              onChange={(e) => handleFontChange(e.target.value)}
              >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              </FontSelector>
        </StyleTextSelector>    
        
          {successMessage && <Message textMessage={successMessage} />}
          {errorMessage && <Message textMessage={errorMessage} />}

        <FormComponent 
        fields={fields} 
        text="SUBIR POST" 
        onSubmit={handlePost} />
        </FormBlogComponentDiv>
        
    );
};

