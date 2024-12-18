/*import React from 'react';
import { useApiProvider } from '../../utils/ApiContext';

export const DeleteItem = ({ itemToDelete, onDeleteSuccess }) => {
  const { apiUrl } = useApiProvider();

  if (!itemToDelete) return null; 
  // Evita renderizar si no hay item a borrar

  const handleDelete = () => {
    const itemType = itemToDelete.category ? 'category' : 'product';

    fetch(`${apiUrl}/delete-${itemType}/${itemToDelete._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} eliminado correctamente.`);
          if (onDeleteSuccess) onDeleteSuccess(itemToDelete._id); 
        } else {
          alert(`Hubo un error al eliminar el ${itemType}`);
        }
      })
      .catch((error) => {
        console.error(`Error al eliminar el ${itemType}:`, error);
        alert(`Hubo un error al eliminar el ${itemType}`);
      });
  };

  return (
    <div>
      <p>¿Estás seguro de que quieres eliminar este elemento?</p>
      <button onClick={handleDelete}>Eliminar</button>
      <button onClick={() => alert('Cancelado')}>Cancelar</button>
    </div>
  );
};*/