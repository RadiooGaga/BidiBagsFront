import styled from "styled-components";

const SectionTheDesign = styled.section `
    display: flex;
    flex-wrap:wrap;
    align-items:center;
    width: 95%;
    min-height: 80vh;
    box-sizing: border-box;
    padding: var(--padding-l) var(--padding-m);
`

const DesignStory = styled.div `
    width: 100%;
    display: block;
    min-height: 80vh;
    margin: 0 auto;
    padding: var(--padding-l);

    @media screen and (max-width: 768px) {
        width: 100%;
        display: flex;
        flex-direction: column; 
        padding: var(--padding-s);
    }
`;


const Figure = styled.figure `
    width: 40%;
    float: left;
    margin: 0 var(--margin-l) var(--margin-s) 0; 

    @media screen and (max-width: 768px){
        width: 100%;
    }

    @media screen and (min-width: 769px) and (max-width: 1443px){
        width: 60%;
    }

`

const DesignerImg = styled.img `
    width: 100%;
    object-fit: cover;
    /*filter: grayscale(100%);*/

 @media screen and (max-width: 768px){
    width:100%;
    margin:0;
 }
    
`

const FigCaption = styled.figcaption `
    display: flex;
    width: 100%;
    font-family: var( --font-walkway);
    color: var(--color-text);
    font-weight: 100;
    font-size: var(--font-size-s);
    padding: 0 30px 12px 0px;
    align-self: flex-start;

    @media screen and (max-width: 768px) {
        padding: var(--padding-s) 0;
    }
`


const DesignStoryParagraph = styled.p `
    display: block;
    width: 100%;
    margin: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;



export default { 
    SectionTheDesign,
    DesignStory,
    Figure,
    FigCaption,
    DesignerImg,
    DesignStoryParagraph
}

