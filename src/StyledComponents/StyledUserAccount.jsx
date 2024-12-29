import styled from "styled-components";


// MIS DATOS
const DataDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    min-height: 60vh;
    padding:  var(--padding-s);
    margin-left: var(--margin-m);
`

const SomeSpace = styled.div `
    display: flex;
    width: 100%;
    height: auto;
    margin-top: var(--margin-l)

`

// MIS FAVORITOS
const FavoritesDiv = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    width: 100%;
    min-height: 60vh;
    padding: var(--padding-s);
    gap: var(--gap-xl)
`

const Titles = styled.span ` 
    align-self: center;
    font-family: var(--font-walkway); 
    font-size: var(--font-size-m);
`


//CARRITO
const CartDiv = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    width: 100%;
    min-height: 60vh;
    padding: var(--padding-s);
    gap: var(--gap-xl)
`

const TotalPriceDiv = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    min-height: 80px; 
    background-color: var(--color-headerandfooter);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: var(--padding-m);
    gap: var(--gap-xl)
`;


// MI CUENTA / CIERRE DE SESION
const UserAccountDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 100%;
    min-height: 60vh;
    margin-bottom: var(--margin-m);
    flex-wrap:wrap;
    padding: var(--padding-s);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

`

const SessionDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 60vh;
    padding: var(--padding-l) var(--padding-s) var(--padding-s) var(--padding-s);
    overflow-y: scroll;
`

const ByeMessage = styled.p `
    font-family: var(--font-walkway);
    font-size: var(--font-size-m);
    color: var(--color-aubergine);
`

export default { 
    DataDiv, 
    SomeSpace,
    FavoritesDiv, 
    CartDiv,
    TotalPriceDiv,
    Titles, 
    UserAccountDiv, 
    SessionDiv, 
    ByeMessage }