import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const gotoCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your Cart is Empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={gotoCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
