import React from 'react'
import StyledProductCards from '../../StyledComponents/StyledProductCards';
const { ProductCard, DivImgProductCard, ProductCardPic, ProductDetails, ProductCardH4 } = StyledProductCards; 


export const Card = React.memo(({ product, category, visibleStyle, visibleText, onClick, children })=> {

  const isProduct = product != null;
  const isCategory = category != null;
  

  return (
    <ProductCard  onClick={onClick} style={visibleStyle || {}}>
        <DivImgProductCard >
          <ProductCardPic src={isProduct ? product.img : category.img} /> 
        </DivImgProductCard>
        <ProductDetails>
          <ProductCardH4>{isProduct ? product.collectionName : category.categoryName}</ProductCardH4>
          <ProductCardH4>{isProduct ? product.visibleText : visibleText}</ProductCardH4> 
          {children}
        </ProductDetails>
    </ProductCard>
  )
})