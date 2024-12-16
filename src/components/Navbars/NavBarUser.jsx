import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext';
import StyledNavBars from '../../StyledComponents/StyledNavBars';
const { NavBarUser, NavBarUserLi } = StyledNavBars; 


export const UserNavBar= () => {

  // Verifica el rol del usuario desde el AuthContext
  const { user } = useAuth(); 
  const userRol = user ? user.rol : null;


  // Navegación condicional para el icono de usuario según el rol
  const accountLink = userRol === 'user' ? '/account/favorites' : '/admin-account/products';
  const shoppingCartLink = userRol === 'user' ? '/account/shopping-cart' : '/admin-account';

  const navItems = [
    { to: accountLink, icon: "/assets/icons/user.png", alt: "account", iconClass: "userIcon" },
    { to: shoppingCartLink, icon: "/assets/icons/carrito.png", alt: "cart", iconClass: "cartIcon" },
  ];


  return (
    <NavBarUser>
      <ul>
        {navItems.map((item, index) => (
          <NavBarUserLi key={index} id='navBarUserLi'>
            <NavLink 
              to={item.to} 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <div className={item.divClass}>
                <img className={item.iconClass} src={item.icon} alt={item.alt} />
              </div>
            </NavLink>
          </NavBarUserLi>
        ))}
      </ul>
      </NavBarUser>
  );
};

 
