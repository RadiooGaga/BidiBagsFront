import React, { useState } from 'react'
import { useAuth } from '../../utils/AuthContext';
import { useApiProvider } from '../../utils/ApiContext'
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button'
import { Warning } from '../../components/Warning/Warning';
import { Message } from '../Message/Message';
import StyledProductPages from '../../StyledComponents/StyledProductPages';
const { ProductsContainer, ProductCardDetailed } = StyledProductPages; 
import StyledCards from '../../StyledComponents/StyledProductCards';
const { GalleryImgDiv, ProductCardGalleryPic, ContentProduct, Intro, TextContent, 
    ProductCardH2, ProductCardH3, SpanContent, Heart, Description, DecisionButtons, 
    Details,Paragraph } = StyledCards;


export const CardDetails = React.memo(({ product, isFavorite, heartClicked, onSubmit, onAddToCart }) => {

  const productId = product._id;

  const { apiUrl } = useApiProvider();
  const { user } = useAuth();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ productToDelete, setProductToDelete ] = useState(null);
  const [ showWarning, setShowWarning ] = useState(false); 
  const navigate = useNavigate()


  const handleUpdate = () => {
    navigate(`/admin-account/update-product/${productId}`)
  }

  const handleOpenWarning = (productId) => {
    setProductToDelete(productId);
    setShowWarning(true);
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };


  const onDeleteProduct = () => {

    if (!productToDelete) return;

    fetch(`${apiUrl}/delete-product/${productToDelete}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) setErrorMessage('404: Error al eliminar el producto');
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setSuccessMessage('Eliminando producto...');
        setProductToDelete(null);
        setTimeout(() => {
          setSuccessMessage('Producto eliminado!');
          setTimeout(() => {
            navigate('/admin-account/products');
          }, 1000);
        }, 1500);
      } else {
        setErrorMessage(data.message || 'Hubo un error al eliminar el producto');
        setTimeout(() => setErrorMessage(''), 2000);
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto');
    });
  }

  return (
    <ProductsContainer>
        {showWarning && (
        <Warning 
          text="¿Eliminar este producto?"
          onClose={handleCloseWarning}
          onClick={onDeleteProduct}
        />
      )}
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
                  onClick={handleUpdate}
                  />  
                   <Button
                  type="button"
                  text="ELIMINAR PRODUCTO"
                  colorText="white"
                  width="180px"
                  padding="10px"
                  backgroundColor="var(--color-pushTheButton)"
                  hoverBackgroundColor="var(--color-barbiePink)"
                  tapBackgroundColor="var(--color-aubergine)"
                  onClick={() => handleOpenWarning(productId)}
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
            {successMessage && <Message textMessage={successMessage} />}
            {errorMessage && <Message textMessage={errorMessage} />}
    </ProductsContainer>
  );
});