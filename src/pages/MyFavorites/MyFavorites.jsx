import React from 'react';
import { Card } from '../../components/ProductCards/Card';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { FavoritesDiv } = StyledUserAccount;

export const MyFavorites = () => {

  const navigate = useNavigate()
  const { user } = useAuth();

  const handleFavoriteClick = (id) => {
      navigate(`/product/${id}`)
  };


    return (
        <FavoritesDiv>
            <h2>Mis Favoritos</h2>
            {user.favorites && user.favorites.length > 0 ? (
                user.favorites.map((product) => {
                    {/*console.log(product, "HAY PRODUCTO?");*/}
                    return (
                        <Card
                            key={product._id}
                            img={product.img}  
                            onClick={() => handleFavoriteClick(product._id)}// Navegar al _id
                        />
                    );
                })
            ) : (
                <p>No tienes productos en tus favoritos.</p>
            )}
        </FavoritesDiv>
    );
};
