import React from "react";
import { useStoreState } from "easy-peasy";
import { Typography } from "antd";
import styled from "styled-components/macro";

export default function AmountToPay({ text }) {
  const cartTotalValue = useStoreState(state => state.cart.cartTotalValue);

  return (
    <div>
      <Typography.Text type="secondary">{text}</Typography.Text>
      <Value>{cartTotalValue} €</Value>
    </div>
  );
}

const Value = styled.span`
  font-size: 4rem;
  font-weight: 700;
`;
