import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import './FormUpdateUser.css'

export const FormUpdateUser = React.memo(({ className, fields, text, onSubmit }) => {
  const initializeFormData = (fields) => {
    return fields.reduce((acc, field) => {
      if (field.fields) {
        acc[field.name] = initializeFormData(field.fields);
      } else {
        acc[field.name] = field.type === 'checkbox' ? false : ''; // No manejar checkbox aquí
      }
      return acc;
    }, {});
  }

  const [formData, setFormData] = useState(initializeFormData(fields));

  const handleChange = (e, fieldName, parentName) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value; // No manejar file o checkbox

    setFormData((prevData) => {
      if (parentName) {
        // Si es un subcampo, actualizamos dentro del objeto padre
        return {
          ...prevData,
          [parentName]: {
            ...prevData[parentName],
            [fieldName]: newValue,
          },
        };
      }
      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field, parentName = null) => {
    const {
      type,
      name,
      label,
      className,
      required,
      placeholder,
      autocomplete,
      wrapperClass, 
      fields: subFields, // Subcampos anidados
    } = field;

    if (subFields) {
      // Renderizar subcampos
      return (
        <div key={name} className="field-group">
          <h3>{label}</h3>
          {subFields.map((subField) => renderField(subField, name))}
        </div>
      );
    }

    const commonProps = {
      id: name,
      name,
      className: className || '',
      required: required || false,
      onChange: (e) => handleChange(e, name, parentName),
      value: parentName ? formData[parentName]?.[name] || '' : formData[name] || '',
    };

    let fieldContent;
    switch (type) {
      case 'textarea':
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <textarea {...commonProps} />
          </>
        );
        break;
      default:
        fieldContent = (
          <>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
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
    <form onSubmit={handleSubmit}>
      {fields.map((field) => renderField(field))} {/* Renderizar cada campo */}
      <Button
            type="submit"
            className="button"
            text={text}
            width="100%"
            backgroundColor="var(--color-almostBlack)"
            colorText="white"
            hoverBackgroundColor="var(--color-aubergine)"
            tapBackgroundColor="var(--color-pushTheButton)"
            padding="15px"
          />
    </form>
  );
});