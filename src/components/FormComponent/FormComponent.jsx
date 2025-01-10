import React, { useState } from 'react';
import './FormComponent.css';
import { Button } from '../Button/Button';


export const FormComponent = React.memo(({ className, fields, text, onSubmit, initialData = {}  }) => {

  const [formData, setFormData] = useState(
    //validar si fields es un array y que contiene elementos. Si no, establece objeto vacío.
    (Array.isArray(fields) && fields.length > 0)
      ? fields.reduce((acc, field) => ({
          ...acc,
          //Comprueba si hay datos de inicio y si el valor correspondiente a field.name no es undefined.
          [field.name]: initialData && initialData[field.name] !== undefined
            ? initialData[field.name]  // Si hay datos iniciales, se usa
            : (field.type === 'checkbox' ? false : ''), // Si no, usa el valor por defecto.
            //false para tipo chekbox y '' para los demás.
        }), {})
      : {}
  );

  const [imgPreview, setImgPreview] = useState(initialData.img || null);


  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    };

    //si el campo es un archivo tipo file y está seleccionado, lee la imagen y la convierte a url
    if (type === 'file' && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgPreview(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field) => {
    const {
      type,
      name,
      label,
      className,
      required,
      placeholder,
      autocomplete,
      options,
      wrapperClass, // Clase que envuelve el contenido del campo
    } = field;

    const commonProps = {
      id: name,
      name,
      className: className || '',
      required: required || false,
      onChange: handleChange,
    };

    let fieldContent;

    switch (type) {
      case 'checkbox':
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <input type="checkbox" checked={formData[name] || false} {...commonProps} />
          </>
        );
        break;
      case 'textarea':
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <textarea 
            value={formData[name] || ''} 
            {...commonProps} />
          </>
        );
        break;
      case 'file':
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <input type="file" {...commonProps} />
          </>
        );
        break;
        case 'select': 
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <select value={formData[name] || ''} {...commonProps}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {options &&
                options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            </>
      );
      break;
    default:
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              value={formData[name] || ''}
              placeholder={placeholder || ''}
              autoComplete={autocomplete || 'off'}
              {...commonProps}
            />
          </>
        );
        break;
    }
 
    return wrapperClass ? (
      <div key={name} className={wrapperClass}>
        {fieldContent}
      </div>
    ) : (
      <React.Fragment key={name}>{fieldContent}</React.Fragment>
    );
    
  };


  return (
    <>
    <form onSubmit={handleSubmit} className={className || 'default-form-class'}>
      {fields.map(renderField)} {/* Renderizar cada campo */}
      {imgPreview && (
        <div id="imagePreview">
          <p>Vista previa de la imagen:</p>
          <img src={imgPreview} alt="Vista previa" />
        </div>
      )}
      <Button
        type="submit"
        className='button'
        text={text}
        width="100%"
        backgroundColor="var(--color-almostBlack)"
        colorText="white"
        hoverBackgroundColor="var(--color-aubergine)"
        tapBackgroundColor="var(--color-pushTheButton)"
        padding="15px"
      />
    </form>
    </>
  );
});