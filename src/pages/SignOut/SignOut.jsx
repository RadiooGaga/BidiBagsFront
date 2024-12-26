import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { Button } from '../../components/Button/Button';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { UserAccountDiv, SessionDiv, ByeMessage } = StyledUserAccount;



export const SignOut = () => {

  const { logout } = useAuth(); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 
  const handleLogout = () => {
    setMessage('Hasta pronto!');
    setTimeout(() => {
      logout();
      navigate('/');
    }, 1000);
  };

  return (
    <UserAccountDiv>
      <SessionDiv>
    
      <Button
        type="button"
        text="CERRAR SESIÓN"
        width='260px'
        margin='30px 0 30px 0'
        backgroundColor="var(--color-barbiePink)"
        colorText="white"
        hoverBackgroundColor="var(--color-aubergine)"
        tapBackgroundColor="var(--color-pushTheButton)"
        padding="15px"
        onClick={handleLogout}
      />
      {message && 
      <ByeMessage>{message}</ByeMessage>}
      </SessionDiv>
    </UserAccountDiv>
  );
};