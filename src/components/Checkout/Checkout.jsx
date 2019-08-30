import React from "react";
import { Row, Col } from "antd";
import { Helmet } from "react-helmet";

import CheckoutForm from "./Checkout.form";

export default function Checkout() {
  return (
    <div className="react-transition scale-in">
      <Helmet>
        <title>MyBrand - Checkout</title>
      </Helmet>
      <Row type="flex" justify="center">
        <Col xs={24} sm={22} md={14} lg={12} xl={12}>
          <CheckoutForm />
        </Col>
      </Row>
    </div>
  );
}
