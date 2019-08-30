import React from "react";
import { List, Divider, Avatar, Row, Col, Button, InputNumber } from "antd";
import styled from "styled-components/macro";
import { useStoreState, useStoreActions } from "easy-peasy";
import { A } from "hookrouter";
import { Helmet } from "react-helmet";
import useWindowSize from "react-use/lib/useWindowSize";

import AmountToPay from "./AmountToPay";

export default function Cart() {
  const { width } = useWindowSize();
  const cartItems = useStoreState(state => state.cart.cart);
  const removeProductFromCart = useStoreActions(
    actions => actions.cart.removeFromCart
  );
  const updateItemCopies = useStoreActions(
    actions => actions.cart.updateItemCopies
  );

  const handleCopies = ({ copies, id }) => {
    updateItemCopies({ copies, id });
  };

  const CartList = (
    <List
      itemLayout="horizontal"
      dataSource={cartItems}
      renderItem={item => (
        <List.Item
          actions={[
            width > 490 ? (
              <InputNumber
                type="number"
                value={item.copies || 1}
                min={1}
                onChange={e => handleCopies({ copies: e, id: item.id })}
                name={item.id}
              />
            ) : (
              <ShorterInputNumber
                type="number"
                value={item.copies || 1}
                min={1}
                onChange={e => handleCopies({ copies: e, id: item.id })}
                name={item.id}
              />
            ),
            width > 490 ? (
              <Button
                icon="delete"
                className="custom-error-button"
                onClick={() => removeProductFromCart(item)}
              >
                delete
              </Button>
            ) : (
              <Button
                icon="delete"
                className="custom-error-button"
                shape="circle"
                onClick={() => removeProductFromCart(item)}
              />
            )
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={<A href={`/products/${item.id}`}>{item.name}</A>}
            description={
              item.discountedPrice
                ? `${item.discountedPrice} €`
                : `${item.price} €`
            }
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="react-transition flip-in-x">
      <Helmet>
        <title>MyBrand - Cart</title>
      </Helmet>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <AmountToPay text="Estimated Total: " />
          {cartItems.length > 0 && (
            <A href="/cart/checkout">
              <Button type="primary" block>
                Checkout
              </Button>
            </A>
          )}
          <Divider />
          {CartList}
        </Col>
      </Row>
    </div>
  );
}

const ShorterInputNumber = styled(InputNumber)`
  max-width: 4rem;
`;
