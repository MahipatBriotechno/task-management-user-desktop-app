import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import "./styles/titlebar.css";

import { Router } from "./router";
import { Provider } from 'react-redux';
import store from './state-management/store';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
	<Provider store={store}>
   
    <Router />
	</Provider>
  </React.StrictMode>
);
