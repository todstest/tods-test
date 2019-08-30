import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import styled from "styled-components/macro";
import { lighten } from "polished";
import Cards from "react-credit-cards";
import axios from "axios";
import { navigate } from "hookrouter";
import { connect } from "react-redux";

import "react-credit-cards/lib/styles.scss";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from "./paymentUtils";
import AmountToPay from "../AmountToPay";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CheckoutForm extends React.Component {
  state = {
    disabled: false,
    focused: "",
    loading: false
  };

  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.addCheckoutData(values);
        async function sendDummyRequest(data) {
          try {
            await axios.post(`https://fakeapi:5000/api/purchase-request`, data);
          } catch (err) {
            console.log(`Returned error request as expected: ${err}`);
            return navigate("/cart/checkout/successful-purchase", true);
          }
        }
        sendDummyRequest(values);
      }
    });
  };

  handleCheckbox = () => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const { disabled } = this.state;

    this.setState({ disabled: !disabled });
    if (disabled) {
      setFieldsValue({ billing_address: "" });
    }
    if (!disabled) {
      const shippingAddressCompiled = getFieldValue("shipping_address");
      setFieldsValue({
        billing_address: shippingAddressCompiled
      });
    }
  };

  handlePaymentInputs = ({ target }) => {
    const { setFieldsValue } = this.props.form;

    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setFieldsValue({ [target.name]: target.value });
  };

  handlePaymentInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  syncWithBillingAddress = e => {
    const { disabled } = this.state;
    const { setFieldsValue } = this.props.form;
    if (disabled) {
      setFieldsValue({
        billing_address: e.target.value
      });
    }
  };

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldsError,
      isFieldTouched,
      getFieldError
    } = this.props.form;

    // Only show error after a field is touched.
    const shipping_addressError =
      isFieldTouched("shipping_address") && getFieldError("shipping_address");
    const billing_addressError =
      isFieldTouched("billing_address") && getFieldError("billing_address");
    const credit_card_payment_numberError =
      isFieldTouched("credit_card_payment_number") &&
      getFieldError("credit_card_payment_number");
    const credit_card_payment_nameError =
      isFieldTouched("credit_card_payment_name") &&
      getFieldError("credit_card_payment_name");
    const credit_card_payment_expiryError =
      isFieldTouched("credit_card_payment_expiry") &&
      getFieldError("credit_card_payment_expiry");
    const credit_card_payment_cvcError =
      isFieldTouched("credit_card_payment_cvc") &&
      getFieldError("credit_card_payment_cvc");

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          validateStatus={shipping_addressError ? "error" : ""}
          help={shipping_addressError || ""}
        >
          {getFieldDecorator("shipping_address", {
            rules: [
              {
                required: true,
                message: "Please input your shipping address"
              }
            ]
          })(
            <Input
              prefix={<StyledIcon type="environment" />}
              placeholder="Shipping Address"
              onChange={this.syncWithBillingAddress}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("same_address")(
            <Checkbox onChange={this.handleCheckbox}>
              shipping address is the same as billing address
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item
          validateStatus={billing_addressError ? "error" : ""}
          help={billing_addressError || ""}
        >
          {getFieldDecorator("billing_address", {
            rules: [
              {
                required: true,
                message: "Please input your billing address"
              }
            ]
          })(
            <Input
              prefix={<StyledIcon type="shopping" />}
              placeholder="Billing Address"
              disabled={this.state.disabled}
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={credit_card_payment_numberError ? "error" : ""}
          help={credit_card_payment_numberError || ""}
        >
          {getFieldDecorator("credit_card_payment_number", {
            rules: [
              {
                required: true,
                message: "Please input your credit card number"
              }
            ]
          })(
            <Input
              prefix={<StyledIcon type="number" />}
              placeholder="Credit Card Number"
              name="number"
              pattern="[\d| ]{16,22}"
              onChange={this.handlePaymentInputs}
              onFocus={this.handlePaymentInputFocus}
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={credit_card_payment_nameError ? "error" : ""}
          help={credit_card_payment_nameError || ""}
        >
          {getFieldDecorator("credit_card_payment_name", {
            rules: [
              {
                required: true,
                message: "Please input your name"
              }
            ]
          })(
            <Input
              prefix={<StyledIcon type="user" />}
              placeholder="Your Name"
              name="name"
              onFocus={this.handlePaymentInputFocus}
            />
          )}
        </Form.Item>
        <InlineFormItem
          validateStatus={credit_card_payment_expiryError ? "error" : ""}
          help={credit_card_payment_expiryError || ""}
        >
          {getFieldDecorator("credit_card_payment_expiry", {
            rules: [
              {
                required: true,
                message: "Please input your card expire date"
              }
            ]
          })(
            <Input
              prefix={<StyledIcon type="calendar" />}
              placeholder="Valid through"
              name="expiry"
              pattern="\d\d/\d\d"
              onChange={this.handlePaymentInputs}
              onFocus={this.handlePaymentInputFocus}
            />
          )}
        </InlineFormItem>
        <InlineFormItemToRight
          validateStatus={credit_card_payment_cvcError ? "error" : ""}
          help={credit_card_payment_cvcError || ""}
        >
          {getFieldDecorator("credit_card_payment_cvc", {
            rules: [
              {
                required: true,
                message: "Please input your credit card CVC"
              }
            ]
          })(
            <Input
              prefix={<StyledIcon type="eye-invisible" />}
              placeholder="CVC"
              name="cvc"
              pattern="\d{3,4}"
              onChange={this.handlePaymentInputs}
              onFocus={this.handlePaymentInputFocus}
            />
          )}
        </InlineFormItemToRight>
        <Form.Item>
          <Cards
            number={getFieldValue("credit_card_payment_number") || ""}
            name={getFieldValue("credit_card_payment_name") || ""}
            expiry={getFieldValue("credit_card_payment_expiry") || ""}
            cvc={getFieldValue("credit_card_payment_cvc") || ""}
            focused={this.state.focused}
          />
        </Form.Item>
        <FormItemCenteredOnMobile>
          <AmountToPay text="Amount to pay: " />
        </FormItemCenteredOnMobile>
        <FormItemCenteredOnMobile>
          {hasErrors(getFieldsError()) ? (
            <Button type="primary" htmlType="submit" disabled>
              Proceed with the purchase
            </Button>
          ) : this.state.loading ? (
            <SuccessButton type="primary" htmlType="submit" loading>
              Proceeding...
            </SuccessButton>
          ) : (
            <SuccessButton type="primary" htmlType="submit">
              Proceed with the purchase
            </SuccessButton>
          )}
        </FormItemCenteredOnMobile>
      </Form>
    );
  }
}

const SuccessButton = styled(Button)`
  background: ${props => props.theme.success_alt} !important;
  border-color: ${props => props.theme.success_alt} !important;
  &:hover {
    background: ${props => lighten(0.1, props.theme.success_alt)} !important;
    border-color: ${props => lighten(0.1, props.theme.success_alt)} !important;
  }
`;

const StyledIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25) !important;
`;

const InlineFormItem = styled(Form.Item)`
  display: inline-block !important;
  width: 48% !important;
`;

const InlineFormItemToRight = styled(InlineFormItem)`
  float: right;
`;

const FormItemCenteredOnMobile = styled(Form.Item)`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const WrappedCheckoutForm = Form.create({ name: "checkout_process" })(
  CheckoutForm
);

export default connect(
  state => ({ checkout: state.checkout }),
  dispatch => ({
    addCheckoutData: dispatch.checkout.addCheckoutData
  })
)(WrappedCheckoutForm);
