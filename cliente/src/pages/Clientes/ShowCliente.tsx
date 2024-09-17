import * as React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./clientes.css";
import TitleTop from "../../components/TitleTop/TItleTop";
import { LuUsers2 } from "react-icons/lu";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import { CiEdit } from "react-icons/ci";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { TbRefresh } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import AllClient from "../../data/clientes/AllClentes.tsx";
import { Avatar, Pagination } from "@mui/material";
import PaginationItem from "../../components/Pagination/PaginatedItems.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modalpopup from "../../components/Modalpopup/Modalpopup.tsx";

const CompShowClientes = () => {
  const [clients, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [clienteDatos, setClienteData] = useState([]);
  const [btnNuevoEstado, setBtnNuevoEstado] = useState(false);
  const [isModalpopupOpen, setIsModalpopupOpen] = useState(false);
  const [idCliente, setClienteID] = useState(0);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [tipoModal, setTipoModal] = useState(true);

  const PER_PAGE = 8;
  const countpage = Math.ceil(clienteDatos.length / PER_PAGE);
  const _DATA = PaginationItem(clients, PER_PAGE);

  const navigate = useNavigate();

  const handlePageChance = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const URIs = "http://localhost:8000/clientes/";
  const UrisImg = "http://localhost:8000/uploads/";

  useEffect(() => {
    setModoEdicion(modoEdicion);
  }, [modoEdicion]);

  const FormInsert = () => {
    navigate("/Clientes/Create/");
  };

  const datosCliente = () => {
    try {
      setTimeout(() => {
        AllClient().then((allClientes) => {
          setClientes(allClientes);
          setClienteData(allClientes);
          setTotalItems(allClientes.length);
          setIsLoading(false);
        }),
          10000;
      });
    } catch (error) {
      console.error("Error de Coneccion", error);
    }
  };
  
  useEffect(() => {
    datosCliente();
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const ShowClients = () => {
    setSearch("");
    datosCliente();
  };
  const closeModalpopup = () => {
    setIsModalpopupOpen(false);
  };

  const openModalpopup = () => {
    setIsModalpopupOpen(true);
  };

  const CaptureDnI = (id) => {
    setClienteID(id);
    setTipoModal(true);
    openModalpopup();
  };

  const CapturaPhoto = (id) => {
    setClienteID(id);
    setTipoModal(false);
    openModalpopup();
  };

  const filtrar = (condicionesFiltrar) => {
    const resultados = clienteDatos.filter((elementos) => {
      if (
        elementos.dni
          .toString()
          .toLowerCase()
          .includes(condicionesFiltrar.toLowerCase()) ||
        elementos.nombres
          .toString()
          .toLowerCase()
          .includes(condicionesFiltrar.toLowerCase()) ||
        elementos.apellidos
          .toString()
          .toLowerCase()
          .includes(condicionesFiltrar.toLowerCase())
      ) {
        return elementos;
      }
    });

    setClientes(resultados);
  };

  const deleteClientes = async (id) => {
    Swal.fire({
      title: "Esta seguro?",
      text: "No prodras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URIs}${id}`);
          ShowClients();
          Swal.fire({
            title: "Eliminado!",
            text: "Registro ha sigo eliminado",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al eliminar el registro.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <TitleTop
        titulos={"Clientes"}
        subtitulos={"Manenimiento de Clientes"}
        btnVisible={false}
        btnLabel={"Refrescar"}
        visibleEstado={false}
        estado="Show"
        icon={
          <LuUsers2 className="fs-1  border-1 rounded-circle p-2 text-info" />
        }
      />

      <br />

      <main className="shadow-sm">
        <div className="row bg-light p-4">
          <div className="col-md-12 col-sm-12">
            <br />
            <div className=" d-flex justify-content-lg-between">
              <div className="mb-3 d-flex">
                <div className="w-100">
                  <InputGroup className="">
                    <InputGroup.Text id="search">
                      <IoIosSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      className="clFont"
                      id="search"
                      placeholder="Buscar clientes"
                      value={search}
                      onChange={searcher}
                    />
                  </InputGroup>
                </div>

                <div className="mx-2">
                  <button
                    className="btn btn-warning clFont text-dark"
                    onClick={ShowClients}
                  >
                    {" "}
                    <TbRefresh />
                  </button>
                </div>
              </div>
              <div className="mx-4">
                <button
                  className="btn btn-danger text-white clFont"
                  onClick={() => FormInsert()}
                  disabled={btnNuevoEstado}
                >
                  + Nuevo Cliente
                </button>
              </div>
            </div>

            {isLoading ? (
              <h6 className=" text-black-50 text-center hv-100">Cargando...</h6>
            ) : (
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr className="clFont text-center ">
                      <th className="clFont" style={{ width: 50 }}>
                        Id
                      </th>
                      <th className="clFont text-center">
                        {" "}
                        <AiOutlineCamera className="fs-5" />{" "}
                      </th>
                      <th className="clFont" style={{ width: 125 }}>
                        Dni
                      </th>
                      <th className="clFont">Nombres</th>
                      <th className="clFont">Apellido</th>
                      <th className="clFont">Apodo</th>
                      <th className="clFont">Sector</th>
                      <th className="clFont" style={{ width: 115 }}>
                        Telefonos
                      </th>
                      <th className="clFont">Ciudad</th>
                      <th className="clFont" style={{ width: 100 }}>
                        Documentos
                      </th>
                      <th className="clFont">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_DATA.currentData().map((item) => (
                      <tr key={item.id}>
                        <td className="clFont">{item.id}</td>
                        <td className="clFont">
                          {
                            <Avatar
                              src={`${UrisImg}${item.imgFOTOS}`}
                              sx={{ width: 40, height: 40 }}
                            />
                          }{" "}
                        </td>
                        <td className="clFont">{item.dni}</td>
                        <td className="clFont">{item.nombres}</td>
                        <td className="clFont">{item.apellidos}</td>
                        <td className="clFont">{item.apodo}</td>
                        <td className="clFont">{item.sector}</td>
                        <td className="clFont">{item.telefono1}</td>
                        <td className="clFont">{item.ciudad}</td>
                        <td className="text-center">
                          <Link to="">
                            <FaRegAddressCard
                              className="me-3 text-primary fs-5"
                              onClick={() => CaptureDnI(item.id)}
                            />
                            {isModalpopupOpen && (
                              <Modalpopup
                                closeModal={closeModalpopup}
                                ModoEdicion={modoEdicion}
                                id={idCliente}
                                tipo={tipoModal}
                              />
                            )}
                          </Link>

                          <Link to="">
                            <MdOutlineAddAPhoto
                              className="me-3 text-black-50 fs-5"
                              onClick={() => CapturaPhoto(item.id)}
                            />

                            {isModalpopupOpen && (
                              <Modalpopup
                                closeModal={closeModalpopup}
                                ModoEdicion={modoEdicion}
                                id={idCliente}
                                tipo={tipoModal}
                              />
                            )}
                          </Link>
                        </td>

                        <td className="text-center">
                          <Link to="">
                            <AiOutlineDelete
                              className="text-danger me-4 fs-5"
                              onClick={() => deleteClientes(item.id)}
                            />
                          </Link>

                          <Link key={item.id} to={`/clientes/edit/${item.id}`}>
                            <CiEdit className="text-primary fs-5" />

                            {isModalpopupOpen && (
                              <Modalpopup
                                closeModal={closeModalpopup}
                                ModoEdicion={modoEdicion}
                                id={idCliente}
                                tipo={tipoModal}
                              />
                            )}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <ThemeProvider theme={theme}>
                  <div className="d-flex align-items-center ">
                    <Pagination
                      count={countpage}
                      size="large"
                      page={page}
                      color="secundary"
                      onChange={handlePageChance}
                    />

                    <div>
                      <p className="clFont m-auto">
                        Total de Clientes : {totalItems}
                      </p>
                    </div>
                  </div>
                </ThemeProvider>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    //
  );
};

export default CompShowClientes;

const theme = createTheme({
  palette: {
    secundary: {
      main: "#0EB582",
    },
  },
});
