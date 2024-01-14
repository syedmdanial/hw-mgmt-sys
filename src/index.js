import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";
import "./helpers/axios.interceptor";
import MainRoutes from "./routes/mainRoutes";
import { store, persistor } from "./store/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <MainRoutes />
      <ToastContainer />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
