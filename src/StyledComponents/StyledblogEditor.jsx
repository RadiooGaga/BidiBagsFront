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
    justify-content: start;
    align-items: center;
    text-align: start;
    width: 100%;
    gap: var(--gap-m);
    margin-bottom: var(--margin-m);
`

const FontSelector = styled.div `
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




const InputFileBlog = styled.select `
    width: auto;
    min-height: 30px;
    margin-bottom: var(--margin-s);
    padding: 0 var(--padding-s);
    border-radius: 3px;
    border: 1px solid var(--color-almostBlack);
    background-color: var(--color-almostWhite);
`


const ChosenStyle = styled.button `
    width: 30px;
    height: 30px;
`


export default {
    FormBlogComponentDiv,
    StyleTextSelector,
    FontSelector,
    InputFileBlog,
    ChosenStyle 
}