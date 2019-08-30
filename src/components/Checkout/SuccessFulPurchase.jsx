import React, { useEffect } from "react";
import { Result, Button, Descriptions } from "antd";
import { A } from "hookrouter";
import { Helmet } from "react-helmet";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function SuccessFulPurchase() {
  const checkoutData = useStoreState(state => state.checkout.checkout);
  const rewardUser = useStoreActions(actions => actions.confetti.rewardUser);
  const clearCart = useStoreActions(actions => actions.cart.clearCart);
  const clearCheckout = useStoreActions(
    actions => actions.checkout.clearCheckout
  );
  rewardUser(true);
  // The order was submitted successfully to the server. We can clear the cart.
  clearCart();

  // We want to remove the confettis as soon as this component un-mount.
  useEffect(() => {
    return () => {
      rewardUser(false);
      clearCheckout();
    };
  }, [rewardUser, clearCheckout]);

  const checkoutDataDisplay = (
    <Descriptions title="Data">
      <Descriptions.Item label="Shipping address">
        {checkoutData.shipping_address}
      </Descriptions.Item>
      <Descriptions.Item label="Billing address">
        {checkoutData.billing_address}
      </Descriptions.Item>
      <Descriptions.Item label="Credit card owner name">
        {checkoutData.credit_card_payment_name}
      </Descriptions.Item>
      <Descriptions.Item label="Credit card number">
        {checkoutData.credit_card_payment_number}
      </Descriptions.Item>
      <Descriptions.Item label="Expiry date">
        {checkoutData.credit_card_payment_expiry}
      </Descriptions.Item>
      <Descriptions.Item label="CVC">
        {checkoutData.credit_card_payment_cvc}
      </Descriptions.Item>
    </Descriptions>
  );

  return (
    <div className="react-transition drop-in">
      <Helmet>
        <title>MyBrand - Purchase Confirmation</title>
      </Helmet>
      <Result
        status="success"
        title="Order Confirmed!"
        subTitle={`Order number: ${Math.floor(
          Math.random() * 1000000000001
        )} Here are the transaction details that were sent to the server: `}
        extra={[
          checkoutDataDisplay,
          <br />,
          <A href="/">
            <Button type="primary" key="console">
              Back to Catalogue
            </Button>
          </A>
        ]}
      />
    </div>
  );
}
