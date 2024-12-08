import styled from "styled-components";

const SectionTheDesign = styled.section `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    min-height: 80vh;
    box-sizing: border-box;

    @media screen and (max-width: 768px){
        padding: var(--padding-m);
    }
`

const DivDesignStory = styled.div `
    width: 100%;
    min-height: 80%;
    text-align: left;

    @media screen and (max-width: 480px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        align-items: center;
    }

    @media screen and (min-width: 481px) and (max-width: 768px){
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        align-items: center;
    }
`

const DesignerImg = styled.img `
    float: left; /* texto envuelve imagen */
    max-width: 34em;
    padding: 0 30px 12px 30px;
    object-fit: cover;
    /*filter: grayscale(100%);*/

    @media screen and (max-width: 768px){
        max-width: 100%;
    }

    @media screen and (min-width: 1444px) and (max-width: 1919px) {
        margin-bottom: var(--margin-l);
    }
    
`


const DesignStoryH2 = styled.h2 `
    font-family: var( --font-sansation);
    font-weight: 100;
    font-size: var(--font-size-m);
    color: var(--color-text);
    margin: 0 var(--margin-m);
`

const DesignStoryParagraph = styled.p `
    font-weight: 100;
    text-align: justify;
    padding: var(--padding-l)

    @media screen and (max-width: 480px) {
        text-align: justify;
        padding: var(--padding-m)
    }

    @media screen and (min-width: 481px) and (max-width: 768px){
        text-align: justify;
        padding: var(--padding-l)
    }

    @media screen and (min-width: 769px) and (max-width: 1023px){
        text-align: justify;
        padding: var(--padding-m)
    }

`



export default { 
    SectionTheDesign,
    DivDesignStory,
    DesignerImg,
    DesignStoryH2,
    DesignStoryParagraph
}