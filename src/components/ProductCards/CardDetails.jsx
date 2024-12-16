import React from 'react'
import { useAuth } from '../../utils/AuthContext';
import { Button } from '../Button/Button'
import StyledProductPages from '../../StyledComponents/StyledProductPages';
const { ProductsContainer, ProductCardDetailed } = StyledProductPages; 
import StyledCards from '../../StyledComponents/StyledProductCards';
const { GalleryImgDiv, ProductCardGalleryPic, ContentProduct, Intro, TextContent, 
    ProductCardH2, ProductCardH3, SpanContent, Heart, Description, DecisionButtons, 
    Details,Paragraph } = StyledCards;


export const CardDetails = ({ product, isFavorite, heartClicked, onAddToCart }) => {

  const { user } = useAuth();

  return (
    <ProductsContainer>
      <ProductCardDetailed>

        <GalleryImgDiv>
          <ProductCardGalleryPic
            src={product.img}
            alt={product.collection}
          />
        </GalleryImgDiv>

        <ContentProduct>
          <Intro>
            <ProductCardH2>{product.collection}</ProductCardH2>
            <ProductCardH3>€{product.price}</ProductCardH3>
            <SpanContent>{product.inStock ? 'En stock' : 'Sin stock'}</SpanContent>
           
            <Button type="button" backgroundColor="transparent" >
              <Heart
                src={ isFavorite ? '/assets/icons/heart.png' : '/assets/icons/emptyHeart.png'}
                alt="add to favorites"
                onClick={heartClicked}
              />
            </Button>
          </Intro>
          <TextContent>
            <Description>
              <Paragraph>{product.description}</Paragraph>
              <DecisionButtons>
              {user && user.rol === 'user' && ( 
              <Button
                type="button"
                text="AÑADIR AL CARRITO"
                colorText="white"
                width="180px"
                padding="10px"
                backgroundColor="var(--color-aubergine)"
                hoverBackgroundColor="var(--color-barbiePink)"
                tapBackgroundColor="var(--color-pushTheButton)"
                onClick={onAddToCart}
              />)} 
              
              {user && user.rol === 'admin' && ( 
                <>
                  <Button
                  type="button"
                  text="EDITAR PRODUCTO"
                  colorText="white"
                  width="180px"
                  padding="10px"
                  backgroundColor="var(--color-aubergine)"
                  hoverBackgroundColor="var(--color-barbiePink)"
                  tapBackgroundColor="var(--color-pushTheButton)"
                  //onClick={onUpdateProduct}
                  />  
                   <Button
                  type="button"
                  text="ELIMINAR PRODUCTO"
                  colorText="white"
                  width="180px"
                  padding="10px"
                  backgroundColor="var(--color-pushTheButton)"
                  hoverBackgroundColor="var(--color-barbiePink)"
                  tapBackgroundColor="var(--color-aubergine))"
                  //onClick={onDeleteProduct}
                  />
                </>
              )}
              </DecisionButtons>
            </Description>
          </TextContent>
        </ContentProduct>
        <Details>
          <Paragraph>{product.details}</Paragraph>
        </Details>
      </ProductCardDetailed>
    </ProductsContainer>
  );
};