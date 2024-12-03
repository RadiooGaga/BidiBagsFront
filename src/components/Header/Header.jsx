import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { UserNavBar } from '../Navbars/NavBarUser'
import { MainNavBar } from '../Navbars/NavBarMain'

export const Header = () => {

  return (
    <div className='divHeader'>
      <div className='divBrand'>
        <NavLink to="/" className={({isActive}) => isActive ? "active" : "" }>
          <div><h1 id='brand'>BIDI BAGS</h1><span>©</span><h2 id='designer'>By Paloma Iturriaga</h2></div>
        </NavLink > 
        </div>  
        <MainNavBar />
        <UserNavBar />
    </div>
  )
}
