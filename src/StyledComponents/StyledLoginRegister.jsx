import styled from "styled-components";

const SectionLoginRegister = styled.section `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:90%;
    height: 80vh;
    box-sizing: border-box;

`

const AccountAlreadyDiv = styled.div `
    display: flex;
    width: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--padding-s);


    @media screen and (max-width: 480px) {
        width: 320px;
        padding: var(--padding-l);  
    }

    @media screen and (min-width: 481px) and (max-width: 768px){
            width: 420px;
            padding: var(--padding-l);
    }

    @media screen and (min-width: 769px) and (max-width: 1023px){
            width: 500px;
            padding: var(--padding-s);
    }
}
`

const AccountAlreadyP = styled.p `
    margin: var(--margin-s);
`

const ErrorMessageDiv = styled.div `
    color: palevioletred;
`


export default { SectionLoginRegister, AccountAlreadyDiv, AccountAlreadyP, ErrorMessageDiv }