import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import history from "../src/app/helper/history";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter history={history}>
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
