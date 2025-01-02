import styled from "styled-components";


const FormBlogComponentDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: var(--padding-s);
    gap: var(--gap-s);
    box-sizing: border-box;
`

const StyleTextSelector = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: start;
    width: 100%;
    gap: var(--gap-m);
    margin-bottom: var(--margin-m);
`

const FontSelector = styled.select `
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: start;
    width: 100%;
    gap: var(--gap-m);
    margin-bottom: var(--margin-m);
    width: auto;
    height: 30px;
    margin: 0;
`

const ChosenStyle = styled.button `
    width: 30px;
    height: 30px;
`


export default {
    FormBlogComponentDiv,
    StyleTextSelector,
    FontSelector,
    ChosenStyle 
}