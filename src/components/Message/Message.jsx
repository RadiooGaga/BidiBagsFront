import React from 'react'
import './Message.css'

export const Message = ({ textMessage }) => {
  return (
    <div className='messageDiv'>
        <p className='messageText'>{ textMessage }</p>
        </div>
  )
}
