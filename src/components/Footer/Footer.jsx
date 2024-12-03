import React from 'react'
import './Footer.css'

import { TermsNavBar } from '../Navbars/NavBarTerms'


export const Footer = () => {
  return (
    <div className='divFooter'>
      <nav className='socialmediaNavbar'></nav>
      <TermsNavBar />
    </div>
  )
}
