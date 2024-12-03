import styled from 'styled-components';

const SectionTerms = styled.section `
    display: flex;
    justify-content: center;
    align-items:center;
    width:100%;
    height: auto;
    padding: var(--padding-s);
;`



const DivTerms = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:95%;
    height: auto;
    padding: var(--padding-l);

    @media screen and (max-width: 480px) {
    padding: var(--padding-s);
}`


const SectionTermsH3 = styled.h3 `
    margin-bottom: 20px;
`

const TermsParagraph = styled.p `
    display: flex;
    flex-direction: column;
    font-weight: 100;
    text-align: justify;
`

const Underline = styled.span `
    text-decoration: underline;
`


export default { SectionTerms, DivTerms, SectionTermsH3, TermsParagraph, Underline  }