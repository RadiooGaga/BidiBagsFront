import styled from 'styled-components';


const CategoryContainer  = styled.div `
    display: grid;   
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: auto;  
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 50%;
    min-height: 80vh;
    gap: var(--gap-m);
    box-sizing: border-box;

    @media screen and (max-width: 480px) {

        display: grid;    
        grid-template-columns: repeat(2, 1fr); 
        grid-template-rows: auto; 
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 95%;
        height: auto;
        margin: 10px 0 10px 0;
        gap: var(--gap-m);
   
    }

    @media screen and (min-width: 481px) and (max-width: 768px){
            width: 90%;
            height: auto;
            display: grid;    
            grid-template-columns: repeat(2, 1fr); 
            grid-template-rows: auto; 
            margin: var(--margin-m) 0; 
    }

    @media screen and (min-width: 769px) and (max-width: 1023px){
            width: 95%;  
            height: auto;
            margin: var(--margin-m) 0;
    }

    @media screen and (min-width: 1024px) and (max-width: 1443px){
            width:80%;
            height: auto;
            margin: var(--margin-m) 0; 
    }

    @media screen and (min-width: 1444px) and (max-width: 1919px) {
            width:60%;
    }
`

export default { CategoryContainer }