import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/macro";
import { setBasepath } from "hookrouter";

import AppLayout from "./components/AppLayout";
import { store } from "./store";
import { theme } from "./styles/theme";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

setBasepath(
  process.env.NODE_ENV === "development"
    ? "/tods-test"
    : `${process.env.PUBLIC_URL}`
);

ReactDOM.render(
  <Provider store={store}>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <AppLayout appContent={<App />} />
      </ThemeProvider>
    </StoreProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
