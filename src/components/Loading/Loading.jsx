import React, { useEffect, useState } from 'react';
import './Loading.css';

export const Loading = ({ loading, text, message }) => {
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowNoProductsMessage(false);
    } else {
      setShowNoProductsMessage(true);
    }
  }, [loading]);

  return (
    <div>
      {loading ? ( 
        <div className='loading'>{text}</div>
      ) : (
        showNoProductsMessage && (
          <div className='noProductsFound'>
            {message.toUpperCase()} 
          </div>
        )
      )}
    </div>
  );
};


