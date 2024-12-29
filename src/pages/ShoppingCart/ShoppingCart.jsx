import React,{ useState, useEffect } from 'react';
import { CardOnCart } from '../../components/ProductCards/CardOnCart';
import { useApiProvider } from '../../utils/ApiContext';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import StyledUserAccount from '../../StyledComponents/StyledUserAccount';
const { CartDiv, Titles, TotalPriceDiv } = StyledUserAccount;


// PÁGINA CARRITO DE LA COMPRA
export const ShoppingCart = () => {

  const { apiUrl } = useApiProvider();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ productsInCart, setProductsInCart ] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  
  // Sincronizar la lista de productos del carrito
  const fetchCartProducts = async () => {
    if (user && user.cart.length > 0) {
      try {
        const responses = await Promise.all(
          user.cart.map((id) =>
            fetch(`${apiUrl}/products/${id}`).then((res) => res.json())
          )
        );
        const validProducts = responses.filter((product) => product && product._id);
        setProductsInCart(validProducts);
        calculateTotalPrice(validProducts);
      } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
      }
    } else {
      setProductsInCart([]); // Si no hay productos en el carrito, limpiar la lista
      setTotalPrice(0);
    }
  };

    // Calcular el precio total del carrito
    const calculateTotalPrice = (products) => {
      const total = products.reduce((sum, product) => sum + (product.price || 0), 0);
      setTotalPrice(total);
    };

  // Cargar los nuevos productos cada vez que cambien
  useEffect(() => {
    fetchCartProducts();
  }, [user.cart]);


  // ACCION DE COMPRA
  const handleBuyProducts = () => {
    alert('TODAVÍA SIN HABILITAR, CURASAO 💖')
  }

 

  return (
    <>
      <Titles>MI CARRITO</Titles>
      <CartDiv>
        {productsInCart.length > 0 ? (
          productsInCart.map((product) => (
            <CardOnCart
              key={product._id}
              product={product}
              onClick={() => navigate(`/products/${product._id}`)} // Navegar al producto
            />
          ))
        ) : (
          <span>No tienes productos en tu carrito.</span>
        )}
      <TotalPriceDiv>Total: €{totalPrice.toFixed(2)} 
        <Button
        type="button"
        text="COMPRAR"
        width="200px"
        backgroundColor="var(--color-almostBlack)"
        colorText="white"
        hoverBackgroundColor="var(--color-aubergine)"
        tapBackgroundColor="var(--color-pushTheButton)"
        padding="15px"
        onClick={handleBuyProducts} 
      />
      </TotalPriceDiv>
      </CartDiv>
    </>
  );
};