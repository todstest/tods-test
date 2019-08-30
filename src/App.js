import React, { lazy } from "react";
import { useRoutes } from "hookrouter";
import "./styles/libs/react-transitions.css";

import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./components/Homepage";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout/Checkout";
const SuccessFulPurchase = lazy(() =>
  import("./components/Checkout/SuccessFulPurchase")
);

const routes = {
  "/": () => <HomePage />,
  "/products/:id": ({ id }) => <ProductDetails id={id} />,
  "/cart": () => <Cart />,
  "/cart/checkout": () => <Checkout />,
  "/cart/checkout/successful-purchase": () => <SuccessFulPurchase />
};

const App = () => {
  const routeResult = (
    <div className="transition-container">{useRoutes(routes)}</div>
  );

  return routeResult || <NotFoundPage />;
};

export default App;
