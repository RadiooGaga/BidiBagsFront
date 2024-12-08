import styled from "styled-components";

const SectionTheBlog = styled.section `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    min-height: 80vh;
    box-sizing: border-box;
    background-color: var(--color-headerandfooter);
    gap: 30px;


    @media screen and (max-width: 480px) {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
`

const DivTheBlogIntro = styled.div `
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;
    gap: 20px;
    padding: 30px;
`

const DivTheBlogContent = styled.div `
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
`

const PostTitle = styled.h2 `
    font-size: var(--font-size-l);
    text-transform: uppercase;
    padding-left: 30px;
`

const PostImage = styled.img `
    width: 30%;
    height: auto;
    object-fit: cover;
    padding: 30px;

    @media screen and (max-width: 480px) {
        width: 100%;
    }
`

const PostContent = styled.p `
    width: 100%;
    flex: 1;
    font-size: var(--font-size-m); 
    font-familiy: var(--font-sansation);
    padding: 0 30px;
    color: var(--color-text);
`



export default {
    SectionTheBlog,
    DivTheBlogIntro,
    DivTheBlogContent,
    PostTitle,
    PostImage,
    PostContent  
}