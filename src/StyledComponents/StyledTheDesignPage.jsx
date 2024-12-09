import styled from "styled-components";

const SectionTheDesign = styled.section `
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    align-items:center;
    width: 95%;
    min-height: 80vh;
    box-sizing: border-box;
    padding: var(--padding-l) var(--padding-m);
    margin-bottom: var(--margin-l);
`

const DesignStory = styled.div `
    width: 40%;
    float:left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 30px; /* Espacio entre el texto y la imagen */

    @media screen and (max-width: 768px) {
        width: 100%;
          margin-right: 0px; 
          float: none;
    }
`;


const Figure = styled.figure `
    display: flex;
    width: 100%;
    height:auto;
    flex-direction: column;

    @media screen and (max-width: 768px){
        align-items: flex-start;
        width: 100%;
    }

`

const DesignerImg = styled.img `
    max-width: 34em;
    margin: 30px 0 30px 30px;
    object-fit: cover;
    /*filter: grayscale(100%);*/

 @media screen and (max-width: 768px){
    width:100%;
    margin:0;
    padding: 0 var(--padding-m);
 }
    
`

const FigCaption = styled.figcaption `
    display: flex;
    font-family: var( --font-walkway);
    color: var(--color-text);
    font-weight: 100;
    font-size: var(--font-size-s);
    padding: 0 30px 12px 30px;
    align-self: flex-start;

    @media screen and (max-width: 768px) {
         padding: 0 0 0 var(--padding-m);
    }

`

const DesignStoryH2 = styled.h2 `
    font-family: var( --font-sansation);
    font-weight: 100;
    font-size: var(--font-size-m);
    color: var(--color-text);
    margin-left:30px;

    @media screen and (max-width: 768px) {
        padding: 0 0 var(--padding-m);
    }

`

const DesignStoryParagraph = styled.p `
    display:flex;
    flex-wrap;wrap;
    width: 50%;
    flex: 1 1 auto;
    margin: 0;
    padding: var(--padding-m);
    z-index:1;
 

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
    DesignStoryH2,
    DesignStoryParagraph
}