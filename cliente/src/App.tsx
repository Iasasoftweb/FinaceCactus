import "./App.css";
import React from "react";
import ShowClients from "./pages/Clientes/ShowCliente";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/dashboard/Nav";
import Sidebar from "./components/dashboard/Sidebar";
import Home from "./components/dashboard/Home";
import { useState } from "react";
import "../src/pages/Dashboard/Dashboard.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditCliente from "./pages/Clientes/EditCliente";
import CreateCliente from "./pages/Clientes/CreateCliente";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="app vh-100">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <div className="main-content">
        <Nav OpenSidebar={OpenSidebar} />

        <div className="content ">
          <Routes>
            <Route path="/clientes" element={<ShowClients />} />
            <Route path="/" element={<Home />} />
            <Route path="/clientes/edit/:id" element= {<EditCliente />} /> 
            <Route path="/clientes/create/" element= {<CreateCliente />} /> 

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
