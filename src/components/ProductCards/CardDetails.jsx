import React from 'react'
import { Button } from '../Button/Button'
import StyledProductPages from '../../StyledComponents/StyledProductPages';
const { ProductsContainer, ProductCardDetailed } = StyledProductPages; 
import StyledCards from '../../StyledComponents/StyledProductCards';
const { GalleryImgDiv, ProductCardGalleryPic, ContentProduct, Intro, TextContent, 
    ProductCardH2, ProductCardH3, SpanContent, Heart, Description, Details,Paragraph } = StyledCards;


    export const CardDetails = ({ product, isFavorite, onFavoriteClick, onAddToCart }) => {

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
            <Button type="button" backgroundColor="transparent" onClick={onFavoriteClick}>
              <Heart
                src={isFavorite ? '/assets/icons/heart.png' : '/assets/icons/emptyHeart.png'}
                alt="add to favorites"
              />
            </Button>
          </Intro>
          <TextContent>
            <Description>
              <Paragraph>{product.description}</Paragraph>
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
              />
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