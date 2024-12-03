import React from 'react'
import StyledProductCards from '../../StyledComponents/StyledProductCards';
const { ProductCard, DivImgProductCard, ProductCardPic, ProductDetails, ProductCardH4 } = StyledProductCards; 


export const Card = React.memo(({ img, categoryName, visibleText, visibleStyle, onClick })=> {

  return (
    <ProductCard  onClick={onClick} style={visibleStyle}>
        <DivImgProductCard >
          <ProductCardPic src={img} /> 
        </DivImgProductCard>
        <ProductDetails>
          <ProductCardH4>{categoryName}</ProductCardH4>
          <ProductCardH4>{visibleText}</ProductCardH4> 
      
        </ProductDetails>
    </ProductCard>
  )
})