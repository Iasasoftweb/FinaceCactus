import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import './index.css'

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; // Tema de PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos principales de PrimeReact
import "primeicons/primeicons.css"; // Iconos de PrimeIcons
import "primeflex/primeflex.css"; // PrimeFlex para el diseño
import "./sakai-template/public/themes/bootstrap4-light-blue/theme.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  
      <App />
    
  </BrowserRouter>
);
