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
    { to: "changes-and-returns", label: "CAMBIOS / DEVOLUCIONES", alt: "myChanges"},
    { to: "session", label: "MI CUENTA", alt: "session" },
  ];

  return (
  
    <AccountNavDiv>
      <AccountNavUl>
        {navItems.map((item, index) => (
          <li key={index} >
            <NavLink 
              key={index}
              to={item.to} 
              className={({ isActive }) => isActive ? `active` : ''
            }
            alt={item.alt}
            >
              <StyledLabel>{item.label}</StyledLabel>
            </NavLink>
          </li>
        ))}
      </AccountNavUl>
    </AccountNavDiv>

  )
}