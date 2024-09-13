import React, { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import Favatar from "../../assets/img/favatar.png";
import Mavatar from "../../assets/img/mavatar.png";
import "./Menutop.css";
import { useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";

function NavAvatar() {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [nomUsuario, setNomUsuario] = useState(null);
  const [tipoRol, setTipoRol] = useState(null);

  const getNombreUsuario = (items) => {
    setNomUsuario(items);
  };

  const geTipoRol = (items) => {
    setTipoRol(items);
  };

  const items = [
    {
      id: 1,
      nombreUsuario: "Ismael Santos",
      icon: Mavatar,
      rerfil: "Administrador",
      sexo: "m",
    },

  ];

  return (
    <div>
     
     {isMobile ? (
         
         <div>
          
         </div>

     ) : (
        <div>
          <li className="nav-item dropdown pe-3 list-unstyled lh-1 ">
        <Link to="/"
          className="nav-link nav-profile d-flex align-content-center pe-0 text-decoration-none"
          data-bs-toggle="dropdown"
        >
          {items.map((usuario) => (
            <div className="" key={usuario.id}>
              <img
                src={usuario.icon}
                alt=""
                className=" rounded-circle border-1"
                onClick={() => [
                  getNombreUsuario(usuario.nombreUsuario),
                  geTipoRol(usuario.rerfil),
                ]}
              />

              <span className="items"> {usuario.nombreUsuario}</span>
            </div>
          ))}
        </Link>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <div></div>
          <li className="dropdown-header  text-black ">
            <span className=" fw-bold  ">{nomUsuario}</span>
            <br></br>
            <span className="  fw-light">{tipoRol}</span>
          </li>

          <li className="dropdown-divider"> </li>

          <li className="dropdown-item items py-3 bg-light text-black-50">
            <span className="bi bi-gear text-danger fs-6 me-2"></span> Configuración
          </li>
          <li className="dropdown-item items py-3 text-black-50">
            <span className="bi bi-speedometer2 text-info fs-6 me-2"></span> Dashboard
          </li>
          <li className="dropdown-item items py-3 bg-light text-black-50">
            <span className="bi bi-box-arrow-right text-success fs-6 me-2"></span>
            Cambiar Usuario
          </li>

          <li className="dropdown-item items py-3 text-black-50">
            <span className="bi bi-gear text-danger fs-6 me-2"></span> Cerrar
          </li>
        </ul>
      </li>
        </div>


     )}

      
    </div>
  );
}

export default NavAvatar;
