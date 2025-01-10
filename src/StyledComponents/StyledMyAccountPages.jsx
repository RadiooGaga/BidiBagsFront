import styled from 'styled-components';

const SectionMyAccount = styled.section `
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 85vh; /*cambiar dp*/
    padding: var(--padding-l);

    @media screen and (max-width: 769px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: var(--padding-m);
    }
      
    @media screen and (min-width: 770px) and (max-width: 1023px){
        padding: var(--padding-m);
    }
`;

const DowloadCsvDiv = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: var(--padding-l);

    @media screen and (max-width: 1023px){
        align-items: center;
        gap: var(--gap-m);
    }
`


const AccountDiv = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 75vh;
    margin: var(--margin-m);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    overflow-y: scroll;
    flex-wrap: wrap;
    gap: var(--gap-l);
    padding: var(--padding-l);

    @media screen and (max-width: 480px) {
        width: 100%;
        padding: 0;
        gap: var(--gap-s);
        padding-bottom: var(--padding-l);
    }

    @media screen and (min-width: 481px) and (max-width: 769px) {
        width: 100%;
        padding: 0;
        gap: var(--gap-m);
        padding-bottom: var(--padding-l);
    }

    @media screen and (min-width: 770px) and (max-width: 1023px){
        width: 100%;
        padding: 0;
        gap: var(--gap-m);
        padding-bottom: var(--padding-l);
    }
}
`

const AccountNavDiv = styled.nav `
    width: 20%;
    display: flex;
    padding: var(--padding-m);
    margin-left: var(--margin-l);
    border-right: 1px solid var(--color-text);

    @media screen and (max-width: 769px) {
      width: 100%;
      border: none;
      border-bottom: 1px solid var(--color-text);
      margin-left: 0px;
      margin-bottom: var(--margin-l);
      padding: var(--padding-s);
    }

    @media screen and (min-width: 770px) and (max-width: 1023px){
        margin: 0px;
    }
`

const AccountNavUl = styled.ul `
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

`

const StyledLabel = styled.span `
    align-self: center;
    font-family: var(--font-walkway);
    font-size: var(--font-size-m);
    cursor: pointer;
    &:hover {
        color: var( --color-barbiePink)
    }
`

const FormSection = styled.section `
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 70vh;
    margin: var(--margin-m);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: var(--padding-m);
    gap: var(--gap-s);
`

const Titles = styled.span ` 
    align-self: center;
    font-family: var(--font-walkway); 
    font-size: var(--font-size-m);

`

export default { SectionMyAccount, DowloadCsvDiv, AccountDiv, AccountNavDiv, AccountNavUl, StyledLabel, FormSection, Titles }