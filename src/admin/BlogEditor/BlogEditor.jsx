import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/FormComponent/FormComponent';
import './BlogEditor.css'

const apiUrl = import.meta.env.VITE_API_URL;

export const BlogEditor = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fields = [
        { name: 'title', label: 'Título', type: 'text', required: true },
        { name: 'content', label: 'Contenido', type: 'textarea', required: true },
        { name: 'img', label: 'Imagen', type: 'file', required: true },
    ];

 
  // MANEJO DEL REGISTRO
  const handlePost = (formData) => {
    console.log(formData, "Datos recibidos en handlePost:")

    const hasEmptyFields = fields.some((field) => {
        const value = formData[field.name];
        return field.required && (!value || (field.type === 'file' && !value.name));
      });
    if (hasEmptyFields) { // si hay campos vacíos...
      setErrorMessage("Complete la edición");
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('img', formData.img); 
// Debugging: Mostrar los valores de FormData
for (let [key, value] of form.entries()) {
  console.log(key, value);
}
    console.log(form, "datos del post");

    // Solicitud POST a la API del registro
    fetch(`${apiUrl}/bidi-bags/create-post`, {
        method: 'POST', 
        body: form,
      })
      .then(res => {
        if (!res.ok) {
          console.log(res, 'Error!');
            if (res.status === 500) setErrorMessage('500: Error en el servidor');
        }
        return res.json();
    })
      .then(data => {
        if (data.success) {
            console.log(data, 'Post subido!');
            navigate('/blog'); 
        } else {
            setErrorMessage(data.message || 'Hubo un error al registrar el post');
            setTimeout(() => setErrorMessage(''), 2000);
        }
      })
      .catch(error => {
          console.error('Error al registrar:', error);
          setErrorMessage(error.message || 'Error desconocido. Intenta de nuevo.');
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
        <div className='formBlogComponentDiv'>
          <div className='styleTextSelector'>
            <button className='chosenStyle' onClick={handleBold}><b>B</b></button>
            <button className='chosenStyle' onClick={handleItalic}><i>I</i></button>
            <button className='chosenStyle' onClick={handleUnderline}><u>U</u></button>
                <select
                onChange={(e) => handleFontChange(e.target.value)}
                className="fontSelector"
                >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                </select>
          </div>
          <FormComponent 
          className='formBlogComponentDiv'
          fields={fields} 
          text="SUBIR POST" 
          onSubmit={handlePost} />
          </div>
      );
};

