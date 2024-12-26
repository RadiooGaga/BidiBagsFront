import React from 'react';
import {  NavLink } from 'react-router-dom';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
const { AccountNavDiv, AccountNavUl, StyledLabel } = StyledMyAccountPages; 


export const NavBarAdminAccount = () => {

  const navItems = [
    { to: "products", label: "TODOS MIS PRODUCTOS", alt: "allMyProducts" },
    { to: "categories", label: "TODAS MIS CATEGORÍAS", alt: "allMyCategories" },
    { to: "create-category", label: "CREAR CATEGORIA", alt: "createCategory" },
    { to: "create-product", label: "CREAR PRODUCTO", alt: "createProduct" },
    { to: "stock", label: "INVENTARIO", alt: "stock" },
    { to: 'create-post', label: 'ENTRADA EN BLOG', alt: 'createPost'},
    { to: "signout", label: "MI CUENTA", alt: "signout" }
    
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