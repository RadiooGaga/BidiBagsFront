import styled from "styled-components";

//Barra de navegación menu principal
const NavBarMain = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    background-color: var(--color-white);

    @media screen and (max-width: 480px) {
        width: 50%;
        justify-content: space-between;
    }

    @media screen and (min-width: 481px) and (max-width: 768px){
        width: 50%;
        justify-content: space-between;
    }
    
    @media screen and (min-width: 769px) and (max-width: 1023px){
        width: 50%;
    }
    @media screen and (min-width: 1443px){
        width: 30%;
    }

    @media screen and (min-width: 1444px) and (max-width: 1443px){
    width: 50%;
    }

`

const NavBarMainUl = styled.ul `
    gap: var(--gap-xxl);
    padding-left: 20px;


  /* AQUI VA A IR EL MENU HAMBURGUESA */
    @media screen and (max-width: 480px) {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        gap: var(--gap-s);
        padding-left: 0px;
            
    }

  @media screen and (min-width: 481px) and (max-width: 768px){
          justify-content: center;
          padding-left: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1443px){
          width: 40%;
  }`



//Barra de navegación del usuario
const NavBarUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 30%;
  gap: var(--gap-m);

    @media screen and (max-width: 480px) {
      justify-content: end;
      gap: var(--gap-s);
    }

`;

const NavBarUserLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  margin: 0 10px;

  .userIcon,
  .heartIcon,
  .cartIcon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;


//Barra de navegación del footer
const NavBarTerms = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 60%;
  background-color: var(--color-white);
  gap: var(--gap-l);
  padding: 5px 3em;

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: space-around;
    padding: 5px;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
    padding: 5px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 80%;
    justify-content: end;
    padding: 5px 1em;
  }

  @media screen and (min-width: 1024px) and (max-width: 1443px) {
    width: 65%;
    justify-content: end;
    padding: 5px 1em;
  }
`;

const NavBarTermsUl = styled.ul`
  gap: var(--gap-xxl);

  @media screen and (max-width: 480px) {
    gap: var(--gap-l);
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    gap: var(--gap-l);
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    gap: var(--gap-xl);
  }
`;

const NavBarTermsLink = styled.li`
  font-size: var(--font-size-s);

  @media screen and (max-width: 480px) {
    font-size: var(--font-size-xs);
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    font-size: var(--font-size-xs);
  }
`;

export default { 
    NavBarMain, 
    NavBarMainUl, 
    NavBarUser, 
    NavBarUserLi, 
    NavBarTerms, 
    NavBarTermsUl, 
    NavBarTermsLink };