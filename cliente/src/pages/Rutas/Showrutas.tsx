import * as React from "react";
import { useEffect, useState } from "react";
import "./showrutas.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import TitleTop from "../../components/TitleTop/TItleTop";
import { PiMapPinAreaFill, PiMapPinAreaLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Allzonas } from "../../data/zonas/zonasdata";
import PaginationItem from "../../components/Pagination/PaginatedItems.tsx";
import { Avatar, Pagination } from "@mui/material";
import AllClient from "../../data/clientes/AllClentes.tsx";
import { useNavigate } from "react-router-dom";
function Showrutas() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [zonasd, setData] = useState([]);

  const PER_PAGE = 8;
  const countpage = Math.ceil(zonasd.length / PER_PAGE);
  const _DATA = PaginationItem(zonasd, PER_PAGE);

  const navigate = useNavigate();

  const handlePageChance = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const datoszonas = () => {
    try {
      setTimeout(() => {
        Allzonas().then((allzonas) => {
          setData(allzonas);
          setIsLoading(false);
        });
      }, 10000);
    } catch (error) {
      console.error("Error de Coneccion", error);
    }
  };

  useEffect(() => {
    datoszonas();
  }, []);

  return (
    <div>
      <TitleTop
        titulos={"Rutas"}
        subtitulos={"Manenimiento de Rutas"}
        btnVisible={false}
        btnLabel={"Refrescar"}
        visibleEstado={false}
        estado="Show"
        icon={
          <PiMapPinAreaLight className="fs-1  border-1 rounded-circle p-2 text-info" />
        }
      />

      <main className="shadow-sm">
        <div className="row bg-light p-4 ">

          <div className="d-flex justify-content-center">
            <div>
                
            </div>

            {isLoading ? (
              <h6 className=" text-black-50 text-center hv-100">Cargando...</h6>
            ) : (
               
            <Table striped bordered hover className=" w-auto" >
              <tbody>
                {_DATA.currentData().map((item) => (
                  <tr>
                    <td>
                      <PiMapPinAreaFill className="text-info fs-5" />
                    </td>
                    <td style={{width:'250px'}} className="clFont">{item.zonas}</td>
                    <td className="text-center px-4">
                      <AiOutlineDelete className="me-4 text-danger" />
                      <CiEdit className="text-primary" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Showrutas;
