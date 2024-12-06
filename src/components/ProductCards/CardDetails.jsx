import React, { useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import StyledProductPages from '../../StyledComponents/StyledProductPages';
const { ProductCardDetailed } = StyledProductPages; 
import StyledCards from '../../StyledComponents/StyledProductCards';
const { GalleryImgDiv, ProductCardGalleryPic, ContentProduct, Intro, TextContent, 
    ProductCardH2, ProductCardH3, SpanContent, Heart, Description, Details,Paragraph } = StyledCards;


    export const CardDetails = ({ products }) => {

        const [isFavorite, setIsFavorite] = useState(false);
        const { user, toggleFavorite } = useAuth();
        const navigate = useNavigate();

        // Establecer el estado de 'isFavorite' basado en los favoritos del usuario
        useEffect(() => {
            if (user && user.favorites) {
            const isProductFavorite = user.favorites.some(fav => fav._id === products._id);
            setIsFavorite(isProductFavorite);
            }
        }, [user, products]);

        const handleFavoriteClick = () => {
            console.log('Producto recibido en handleFavoriteClick:', products);
            toggleFavorite(products); // Usar el objeto completo de producto
            setIsFavorite(!isFavorite); 
            navigate('/account/favorites'); 
        };

        return (
            <ProductCardDetailed>
                <GalleryImgDiv>
                    <ProductCardGalleryPic
                        src={products.img} 
                        alt={products.collection} 
                    />
                </GalleryImgDiv>
                <ContentProduct>
                    <Intro>
                        <ProductCardH2>{products.collection}</ProductCardH2>
                        <ProductCardH3>€{products.price}</ProductCardH3>
                        <SpanContent>{products.inStock ? "En stock" : "Sin stock" }</SpanContent> 
                        <Button type='button' backgroundColor='transparent' onClick={handleFavoriteClick}>
                            <Heart
                                src={isFavorite ? '/assets/icons/heart.png' : '/assets/icons/emptyHeart.png'}
                                alt="add to favorites" 
                            />
                        </Button>
                    </Intro> 
                    <TextContent>   
                        <Description>
                            <Paragraph>{products.description}</Paragraph>
                        </Description> 
                    </TextContent>
                </ContentProduct>   
                <Details>
                    <Paragraph>{products.details}</Paragraph>
                </Details>    
            </ProductCardDetailed>
        );
    };