import React, { useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useApi } from '../../utils/useApi';
import StyledProductPages from '../../StyledComponents/StyledProductPages';
const { ProductCardDetailed } = StyledProductPages; 
import StyledCards from '../../StyledComponents/StyledProductCards';
const { GalleryImgDiv, ProductCardGalleryPic, ContentProduct, Intro, TextContent, 
    ProductCardH2, ProductCardH3, SpanContent, Heart, Description, Details,Paragraph } = StyledCards;


    export const CardDetails = () => {
        const { id } = useParams(); // Obtener el id de la URL
        const { products, loading, error } = useApi({
          endpoint: `/bidi-bags/product/${id}`,
          searchType: 'ById',
        });
    
        const { user, toggleFavorite } = useAuth();
        const navigate = useNavigate();
        const [isFavorite, setIsFavorite] = useState(false);
    
        // Asegúrate de que los datos del producto se han cargado antes de continuar
        useEffect(() => {
            if (user && user.favorites && products) {
                const isProductFavorite = user.favorites.some(fav => fav._id === products._id); 
                setIsFavorite(isProductFavorite);
            }
        }, [user, products]); // Dependiendo de 'user' y 'products'
    
        const handleFavoriteClick = () => {
            console.log('Producto recibido en handleFavoriteClick:', products);
            toggleFavorite(products); // Usar el objeto completo de producto
            setIsFavorite(!isFavorite); 
            navigate('/account/favorites'); 
        };
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error loading product</p>;
    
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