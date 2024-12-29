import React from 'react'
import StyledProductCards from '../../StyledComponents/StyledProductCards';
const { ProductCard, DivImgProductCard, ProductCardPic, ProductDetails, ProductCardH4 } = StyledProductCards; 


export const CardOnCart = React.memo(({ product, onClick, children })=> {

  const isProduct = product != null;

  return (
    <ProductCard  onClick={onClick}>
        <DivImgProductCard >
          <ProductCardPic src={isProduct ? product.img : category.img} /> 
        </DivImgProductCard>
        <ProductDetails>
          <ProductCardH4>{ product.price }</ProductCardH4>
          <ProductCardH4>{ product.collectionName }</ProductCardH4>
          {children}
        </ProductDetails>
    </ProductCard>
  )
})