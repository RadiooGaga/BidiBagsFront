import React, { useState } from 'react';
import './FormComponent.css';
import { Button } from '../Button/Button';


export const FormComponent = React.memo(({ className, fields, text, onSubmit }) => {
 /* const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {})
  );*/
  const [formData, setFormData] = useState(
    (Array.isArray(fields) && fields.length > 0) 
      ? fields.reduce((acc, field) => ({ 
          ...acc, 
          [field.name]: field.type === 'checkbox' ? false : '' 
        }), {}) 
      : {}
  ); 
  const [imgPreview, setImgPreview] = useState(null);


  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    };


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
      wrapperClass, // Cambiado para ser más semántico
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
            <textarea {...commonProps} />
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
        <div className="imagePreview">
          <p>Vista previa de la imagen:</p>
          <img src={imgPreview} alt="Vista previa" style={{ maxWidth: '100%', height: 'auto' }} />
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