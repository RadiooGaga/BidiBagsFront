import React from 'react'
import { NavLink } from 'react-router-dom'
import StyledNavBars from '../../StyledComponents/StyledNavBars';
const { NavBarTerms, NavBarTermsUl, NavBarTermsLink  } = StyledNavBars; 


export const TermsNavBar = () => {
  
  const navItems = [
    { to: "/politicas-de-envio", label: "Políticas de envío" },
    { to: "/politica-de-cookies", label: "Política de cookies" },
    { to: "/contacto", label: "Contacto" },
    { to: "/legal", label: "Legal" },
    { to: "/terminos-y-condiciones", label: "Términos y condiciones" },
  ];

  return (
    <NavBarTerms>
        <NavBarTermsUl>
          {navItems.map((item, index) => (
            <NavBarTermsLink key={index}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {item.label}
              </NavLink>
            </NavBarTermsLink>
          ))}
        </NavBarTermsUl>
      </NavBarTerms>
  );
};
