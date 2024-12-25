import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { render } from "react-dom";

import App from "./App.tsx";
import { store } from "./redux/store.ts";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
