import styled from 'styled-components';

const SectionFooterPages = styled.section `
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
    background-color: var(--color-white);

    @media screen and (max-width: 480px) {
    padding: var(--padding-s);
}`


const SectionFooterPagesH3 = styled.h3 `
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


export default { SectionFooterPages, DivTerms, SectionFooterPagesH3, TermsParagraph, Underline  }