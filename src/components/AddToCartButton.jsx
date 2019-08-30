import React from "react";
import { Button, message } from "antd";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components/macro";

import { ReactComponent as AddToCart } from "../assets/images/icons/add_to_cart_2.svg";

export default function AddToCartButton({ id }) {
  const products = useStoreState(state => state.products.products);
  const selectedProduct = products.find(
    product => product.id.toString() === id
  );
  const { availability } = selectedProduct;
  const addProductToCart = useStoreActions(actions => actions.cart.addToCart);

  const handleAddToCart = () => {
    try {
      addProductToCart(selectedProduct);
      message.success("Item successfully added to cart!");
    } catch (error) {
      message.error(`Error. The item wasn't added to the cart. ${error}`);
    }
  };

  const StyledIcon = styled(AddToCart)`
    fill: ${availability ? "white" : props => props.theme.disabled};
    max-width: 21%;
    vertical-align: middle;
    padding-right: 0.5rem;
    line-height: normal;
  `;

  return (
    <StyledButton
      type="primary"
      size="large"
      disabled={availability ? false : true}
      onClick={handleAddToCart}
    >
      <StyledIcon />
      <StyledText>Add to Cart</StyledText>
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  width: 10rem;
  line-height: normal;
`;

const StyledText = styled.span`
  vertical-align: middle;
`;
