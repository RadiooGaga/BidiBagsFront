import React from 'react';
import {  NavLink } from 'react-router-dom';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
import { useAuth } from '../../utils/AuthContext';
const { AccountNavDiv, AccountNavUl, StyledLabel } = StyledMyAccountPages; 


export const NavBarAccount = () => {

  const { user } = useAuth()

  const navItems = [
    { to: `my-data/${user._id}`, label: "MIS DATOS", alt: "myData"},
    { to: "favorites", label: "MIS FAVORITOS", alt: "myFavorites"},
    { to: "order-status", label: "ESTADO DEL PEDIDO", alt: "myOrderStatus"},
    { to: "payment-methods", label: "MÉTODOS DE PAGO", alt: "paymentMethods"},
    { to: "changes-and-returns", label: "CAMBIOS / DEVOLUCIONES", alt: "myChanges"},
    { to: "signout", label: "MI CUENTA", alt: "signout" },
  ];

  return (
  
    <AccountNavDiv>
      <AccountNavUl>
        {navItems.map((item, index) => (
          <li key={index} >
          <NavLink 
              to={item.to} 
              className={({ isActive }) => isActive ? 'active' : ''}
              aria-label={item.alt} // Usamos aria-label para la accesibilidad
            >
              <StyledLabel>{item.label}</StyledLabel>
            </NavLink>
          </li>
        ))}
      </AccountNavUl>
    </AccountNavDiv>

  )
}