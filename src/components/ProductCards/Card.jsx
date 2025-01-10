import React from 'react'
import StyledProductCards from '../../StyledComponents/StyledProductCards';
const { ProductCard, DivImgProductCard, ProductCardPic, ProductDetails, ProductCardH4 } = StyledProductCards; 


export const Card = React.memo(({ product, category, visibleStyle, visibleEye, closedEye, onClick, children })=> {

  const isProduct = product != null;
  const isCategory = category != null;

  const isVisible = isCategory && category.visible  
  

  return (
    <ProductCard  onClick={onClick} style={visibleStyle || {}}>
        <DivImgProductCard >
          <ProductCardPic src={isProduct ? product.img : category.img} /> 
        </DivImgProductCard>
        <ProductDetails>
          <ProductCardH4>{isProduct ? product.collectionName : category.categoryName}</ProductCardH4>
          {isCategory && (
          <img
          src={isVisible ? visibleEye.img : closedEye.img }
          alt={isVisible ? 'Ojo abierto' : 'Ojo cerrado' }
          style={{ width: '25px', height: '25px' }}
        />
          )}
          {children}
        </ProductDetails>
    </ProductCard>
  )
})