import React from 'react'
import { Outlet } from 'react-router-dom';
import { NavBarAccount } from '../../components/Navbars/NavBarAccount';
import StyledMyAccountPages from '../../StyledComponents/StyledMyAccountPages';
const { SectionMyAccount, AccountDiv } = StyledMyAccountPages;

export const Account = () => {

  return (
    <SectionMyAccount>
      <NavBarAccount />
        <AccountDiv>
        <Outlet/>
        </AccountDiv>  
    </SectionMyAccount>
  )
}
