import styled from 'styled-components';


const ProductsContainer = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
    width: 90%;
    min-height: 80vh;
    box-sizing: border-box;
    padding: var(--padding-s);
    gap: var(--gap-l);
`

const ProductCardDetailed = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 70%;
    min-height: 70vh;
    box-sizing: border-box;
    padding: var(--padding-s);

    @media screen and (max-width: 769px) {
      display: flex;
      width:100%;
      flex-direction: column;
      gap: var(--gap-l);
    }
    @media screen and (min-width: 770px) and (max-width: 1443px) {
        width: 100%
    }
   
`
/*
const ProductCardContainer = styled.div `
    display: flex;
    justify-content:center;
    align-items: center;
    width: 90%;
    min-height: 80vh;
    box-sizing: border-box;
    padding: var(--padding-s);
    background-color: blue;
`
*/
export default { ProductsContainer, ProductCardDetailed,/* ProductCardContainer*/ }