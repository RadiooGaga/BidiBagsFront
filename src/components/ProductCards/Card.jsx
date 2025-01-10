import React from 'react'
import StyledProductCards from '../../StyledComponents/StyledProductCards';
const { ProductCard, DivImgProductCard, ProductCardPic, ProductDetails, ProductCardH4 } = StyledProductCards; 


export const Card = React.memo(({ product, category, collection, visibleStyle, visibleEye, closedEye, onClick, onCollectionClick, children })=> {

  const isProduct = product != null;
  const isCategory = category != null;
  const isCollection = collection != null;

  const isVisible = (isCategory && category.visible) || (isCollection && collection.visible);
  // Determinar la imagen y los nombres a mostrar dependiendo del tipo de datos (category o collection)
  const imageSrc = isProduct ? product.img : (isCategory ? category.img : collection.img);
  const name = isCategory ? category.categoryName : (isCollection ? collection.collectionName : '');

  return (
    <ProductCard style={visibleStyle || {}}>
        <DivImgProductCard >
          <ProductCardPic onClick={onClick}  src={imageSrc || '/default-image.jpg'} />
        </DivImgProductCard>
        <ProductDetails>
        {product && (
          <>
            <ProductCardH4>{product.categoryName}</ProductCardH4>
            <ProductCardH4 onClick={onCollectionClick}>colección: {product.collectionName}</ProductCardH4>
          </>
        )}
        {category && (
          <ProductCardH4>{category.categoryName}</ProductCardH4>
        )}
         {collection && (
          <ProductCardH4>colección: {collection.collectionName}</ProductCardH4>
        )}
        {isCategory && (
          <img
            src={isVisible ? visibleEye.img : closedEye.img}
            alt={isVisible ? 'Ojo abierto' : 'Ojo cerrado'}
            style={{ width: '25px', height: '25px' }}
          />
        )}
        {children}
      </ProductDetails>
    </ProductCard>
  );
});