import { createStore, action } from "easy-peasy";

import { recalculateTotalAmountToPay } from "./utils";
import { mocks } from "./seedModifier";

const productsModel = {
  products: mocks
};

const checkoutModel = {
  checkout: {},
  addCheckoutData: action((state, payload) => {
    state.checkout = payload;
  }),
  clearCheckout: action(state => {
    state.checkout = {};
  })
};

const cartModel = {
  cart: [],
  cartTotalValue: 0,
  addToCart: action((state, payload) => {
    const itemToBeAdded = state.cart.find(product => product.id === payload.id);
    if (itemToBeAdded) {
      itemToBeAdded.copies += 1;
    } else {
      state.cart.push(payload);
    }
    state.cartTotalValue = recalculateTotalAmountToPay(
      state.cart,
      "price",
      "discountedPrice",
      "copies"
    );
  }),
  removeFromCart: action((state, payload) => {
    const itemToBeRemoved = state.cart.find(
      product => product.id === payload.id
    );
    state.cart = state.cart.filter(
      product => product.id !== itemToBeRemoved.id
    );
    state.cartTotalValue = recalculateTotalAmountToPay(
      state.cart,
      "price",
      "discountedPrice",
      "copies"
    );
  }),
  updateItemCopies: action((state, payload) => {
    if (payload.copies && payload.copies > 0) {
      const itemToBeUpdated = state.cart.find(
        product => product.id === payload.id
      );
      itemToBeUpdated.copies = payload.copies;
      state.cartTotalValue = recalculateTotalAmountToPay(
        state.cart,
        "price",
        "discountedPrice",
        "copies"
      );
    }
  }),
  clearCart: action(state => {
    state.cart = [];
    state.cartTotalValue = 0;
  })
};

const confettiModel = {
  confetti: false,
  rewardUser: action((state, payload) => {
    state.confetti = payload;
  })
};

const storeModel = {
  products: productsModel,
  cart: cartModel,
  confetti: confettiModel,
  checkout: checkoutModel
};

export const store = createStore(storeModel);
