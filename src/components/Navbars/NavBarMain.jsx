import React from 'react'
import { NavLink } from 'react-router-dom'
import StyledNavBars from '../../StyledComponents/StyledNavBars';
const {  NavBarMain, NavBarMainUl } = StyledNavBars; 

export const MainNavBar = () => {

  const navItems = [
    { to: "/", label: "Menu", alt: 'Menu'},
    { to: "/concept", label: "Concept", alt: "Concept" },
    { to: "/latest-post", label: "Blog", alt: 'Blog' }
  ];

  return (
    <NavBarMain>
      <NavBarMainUl>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink 
              to={item.to} 
              className={({ isActive }) => isActive ? "active" : ""
            }
            alt={item.alt}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        </NavBarMainUl>
      </NavBarMain>
  );
}
