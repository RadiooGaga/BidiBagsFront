import styled from "styled-components";

 const ProductCard = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: var(--padding-s);
    width: 320px;
    height: 380px;
    background-color: var(--color-headerandfooter);
    border-radius: 5px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
    gap: var(--gap-s);
    cursor: pointer;

      @media screen and (max-width: 480px) {
         gap: var(--gap-m);
    }

   
`

const DivImgProductCard = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 320px;
    gap: var(--gap-s);
`

const ProductCardPic = styled.img `
    width: 100%;
    height: 320px;
    object-fit: cover;
`


const ProductDetails = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
`


// Diseño de la tarjeta de producto completa

const GalleryImgDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: auto;
    gap: var(--gap-s);
    overflow-y: scroll;

     @media screen and (max-width: 769px) {
      width: 100%;  
    }
     @media screen and (min-width: 770px) and (max-width: 1023px) {
      width: 49%;  
    }

    @media screen and (min-width: 1024px) and (max-width: 1443px) {
      width: 41%;
    }
`
const ProductCardGalleryPic = styled.img `
    width: 100%;
    object-fit: cover;
`

const Intro = styled.div `
    width:100%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: var(--gap-xl);
   
`

const ContentProduct = styled.div `
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;

    @media screen and (max-width: 769px) {
        width: 100%;
        gap: var(--gap-l);
        font-size: var(--font-size-s);
    }

    @media screen and (min-width: 770px) and (max-width: 1443px) {
        display:flex;
        justify-content: space-evenly;
    }
`


const TextContent = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;

 
`

const ProductCardH2 = styled.h2 `
    font-size: var(--font-size-l);
`
const ProductCardH3 = styled.h3 `
    font-size: var(--font-size-m);
`
const ProductCardH4 = styled.h4 `
    font-size: var(--font-size-s);
`

const SpanContent = styled.span `
    font-size: var(--font-size-m);
`

 const Description = styled.div  `
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: var(--padding-xl) var(--padding-l);
    border-bottom: 1px solid var(--color-text);

     @media screen and (max-width: 769px) {
        padding: var(--padding-s) var(--padding-s) var(--padding-l) var(--padding-s);
        
    }
    @media screen and (min-width: 770px) and (max-width: 1443px) {
        padding: var(--padding-m) ;
        border:none;
    }
    
`

const Details = styled.div  `
    display: flex;
    justify-content: center;
    float: right;
    width: 100%;
    height: auto;
    padding: var(--padding-xl);
    border-bottom: 1px solid var(--color-text);

   @media screen and (max-width: 769px) {
        padding: var(--padding-s);
    }
    @media screen and (min-width: 770px) and (max-width: 1443px) {
        padding: var(--padding-m);
    }
`


const Paragraph = styled.p `
    font-family: var(--font-walkway);
    font-size: var(--font-size-m);
    margin: 0 0 var(--margin-l) 0;

    @media screen and (max-width: 480px) {
       margin: 0 0 var(--margin-m) 0;
       font-size: var(--font-size-s);
    }

    @media screen and (min-width: 481px) and (max-width: 769px) {
        font-size: var(--font-size-s);
    }

    @media screen and (min-width: 770px) and (max-width: 1443px) {
         font-size: var(--font-size-s);
    }
`

const Heart = styled.img `
    width: 35px;
    height: 35px;
`

//-----------------



export default { 
    ProductCard, 
    DivImgProductCard, 
    ProductCardPic, 
    ProductDetails,
    GalleryImgDiv,
    ContentProduct,
    Intro,
    TextContent,
    ProductCardH2,
    ProductCardH3,
    ProductCardH4,
    SpanContent,
    Description,
    Details,
    ProductCardGalleryPic,
    Paragraph,
    Heart
      

}