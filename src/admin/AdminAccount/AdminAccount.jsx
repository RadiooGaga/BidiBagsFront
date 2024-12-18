import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
const { SectionMyAccount, AccountDiv } = StyledMyAccountPages;
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
import { NavBarAdminAccount } from '../NavBarAdminAccount/NavBarAdminAccount';
import { useAuth } from '../../utils/AuthContext';



export const AdminAccount = () => {
  const { user } = useAuth(); // Obtener información del usuario

  // Verifica si el usuario tiene el rol adecuado
  if (!user || user.rol !== 'admin') {
    return <Navigate to="/access-denied" /> 
    // Redirige a una página de acceso denegado
  }

  return (
    <SectionMyAccount>
      <NavBarAdminAccount/>
        <AccountDiv>
        <Outlet/>
        </AccountDiv>  
    </SectionMyAccount>
  )
}