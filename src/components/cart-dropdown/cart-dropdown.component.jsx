import React, { useContext } from "react";

import Button from "../button/button.component";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import CardItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CardItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button styles={{ fontSize: 12 }} onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
