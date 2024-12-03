import styled from "styled-components";

const Cube = styled.div`
  margin: 5px; 
  box-sizing: border-box; 
  height: 100%;
  position: relative;
  transform-style: preserve-3d;

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    flex: 1 1 calc(33%);
    aspect-ratio: 1 / 1; /* Mantiene la proporción de 1:1 para hacer un cuadrado */
    height: auto;
  }
`;

const Side = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  border-radius: 2%;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.5);
  opacity: ${({ $variant }) => ($variant === "principal" ? "0.6" : "1")};
    background-image: ${({ $variant, $backgroundImage }) =>
      $variant === "principal" ? `url(${$backgroundImage})` : "none"};
    background-size: ${({ $variant }) => ($variant === "principal" ? "cover" : "initial")};
    transform: ${({ $variant }) =>
      $variant === "front"
        ? "translateZ(0px)"
        : $variant === "back"
        ? "translateZ(50px)"
        : $variant === "principal"
        ? "translateZ(30px)"
        : "none"};
`;

const CategoryTitle = styled.div`
  font-family: var(--font-sansation);
  font-size: var(--font-size-l);
  color: var(--color-text);
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: rgba(240, 248, 255, 0.442);

  @media screen and (max-width: 480px) {
    font-size: var(--font-size-s);
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    font-size: var(--font-size-m);
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: var(--font-size-m);
  }

  @media screen and (min-width: 1024px) and (max-width: 1443px) {
    font-size: var(--font-size-ms);
  }

  @media screen and (min-width: 1444px) and (max-width: 1919px) {
    font-size: var(--font-size-l);
  }
`;

export default {
    Cube,
    Side,
    CategoryTitle
}