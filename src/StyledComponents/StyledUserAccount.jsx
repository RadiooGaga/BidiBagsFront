import styled from "styled-components";

const UserAccountDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 100%;
    min-height: 60vh;
    margin: var(--margin-m);
    flex-wrap:wrap;
    padding: var(--padding-s);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

`

const DataDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 60vh;
    padding: var(--padding-s);
    gap: var(--gap-xl)
`

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

 const ByeMessage = styled.p `
    font-family: var(--font-walkway);
    font-size: var(--font-size-m);
    color: var(--color-aubergine);
`

export default { UserAccountDiv, DataDiv, FavoritesDiv, ByeMessage }