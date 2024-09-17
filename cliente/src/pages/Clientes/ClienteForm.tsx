import axios from "axios";
import { useForm, type } from "react-hook-form";
import Swal from "sweetalert2";
import React, { useState, useEffect, useRef } from "react";
import Provincias from "../../data/Apis/Provincias.json";
import Paises from "../../data/Apis/Paises.json";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { Avatar } from "@mui/material";
import styled from "styled-components";

const ClienteForm = ({ ModoEdicion, idCliente }) => {
  const [dataCliente, setDataCliente] = useState([]);
  const [tipoDocs, setTipoDocs] = useState([]);
  const [filet, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const [imgFilename, setImgFileName] = useState(null);

  const URIs = "http://localhost:8000/tipodocs/";
  const URIs2 = "http://localhost:8000/clientes/";
  const UrisImg = "http://localhost:8000/uploads/";
  const UrisImgDelete = "http://localhost:8000/clientes/deleteimagen/imagen/";

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const inputFileRef = useRef(null);
  const delImg = async (img) => {
    console.log(img);
    try {
      await axios.delete(`${UrisImgDelete}${img}`);
      console.log(" Imagen Elimnada :" + img);
    } catch (error) {
      console.error("No se pudo eliminar el archivos");
    }
  };

  const inputFile = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    axios
      .get(URIs)
      .then((response) => {
        setTipoDocs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: { tipo_dni: 1, fecha_nac: new Date() },
  });

  const changeUpFile = (v) => {
    uploadImagen(v);
  };

  const prevFOTO = (v1) => {};

  const upFoto = (originalName) => {
    console.log(originalName);
    setValue("imgFOTOS", originalName);
    prevFOTO(originalName);
    setImgFileName(originalName);
    setPreview(originalName);
  };

  const formatTelefono = (valor) => {
    const soloNumeros = valor.replace(/\D/g, "");
    const formato = soloNumeros.replace(
      /(\d{3})(\d{0,3})(\d{0,4})/,
      "$1-$2-$3"
    );
    return formato;
  };

  const formatDNI = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    const formatedValue = cleanedValue.replace(
      /(\d{3})(\d{7})(\d{1})/,
      "$1-$2-$3"
    );

    return formatedValue;
  };

  const handleInputChange = (e) => {
    const upperCaseValue = e.target.value.toUpperCase();
    setValue(e.target.name, upperCaseValue, { shouldValidate: true });
  };

  const handleDNIChange = (event) => {
    const formattedDNI = formatDNI(event.target.value);
    setValue("dni", formattedDNI);
  };

  const handleTelefono1Change = (event) => {
    const formattedTelefono = formatTelefono(event.target.value);
    setValue("telefono1", formattedTelefono);
  };

  const handleTelefono2Change = (event) => {
    const formattedTelefono = formatTelefono(event.target.value);
    setValue("telefono2", formattedTelefono);
  };

  const handleTelefono3Change = (event) => {
    const formattedTelefono = formatTelefono(event.target.value);
    setValue("telefonotrabajo", formattedTelefono);
  };

  const uploadImagen = async (originalName) => {
    console.log(filet);
    if (filet) {
      delImg(filet);
    }

    const formatdata = new FormData();
    formatdata.append("imgDNI2", originalName);

    try {
      const res = await axios.post(
        "http://localhost:8000/uploadImg/",
        formatdata
      );

      upFoto(res.data.fileName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (ModoEdicion) {
      axios
        .get(`http://localhost:8000/clientes/${idCliente}`)
        .then((response) => {
          setDataCliente(response.data);
          reset(response.data);
          setFile(response.data.imgFOTOS);
          setPreview(response.data.imgFOTOS);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ModoEdicion]);

  const onSubmit = async (data: FieldValues) => {
    if (ModoEdicion) {
      await axios.put(`http://localhost:8000/clientes/${idCliente}`, data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        html: '<p style="color: gray; font-weight: normal;">Cliente Actualizado.</p>',
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
    } else {
      const findDni = await axios.get(
        `http://localhost:8000/clientes/buscar-dni/${data.dni}`
      );

      if (findDni.data) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Este cliente ya esta creado.",
        });
      } else {
        const respond = await axios.post(URIs2, data);
        console.log(respond);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        Swal.fire({
          position: "top-end",
          icon: "success",
          html: '<p style="color: gray; font-weight: normal;">Cliente Guardo.</p>',
          showConfirmButton: false,
          timer: 2000,
        });

        reset();
      }
    }
  };

  return (
    <div className="row p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-1 border-light-subtle "
      >
        <div className="row d-flex justify-content-center p-1">
          <div className="pt-2 pb-2  col-md-12 mx-2 col-sm-12 ">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <div className="d-flex justify-content-center ">
                  {preview ? (
                    <Avatar
                      src={`${UrisImg}${preview}`}
                      sx={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <Avatar
                      src={`${preview}`}
                      sx={{ width: 100, height: 100 }}
                    />
                  )}
                </div>

                <input
                  type="file"
                  className="clFont form-control"
                  onChange={(e) => {
                    setValue("imgDNI2", e.target.files[0].name);
                    changeUpFile(e.target.files[0]);
                    setImgFileName(e.target.files[0]);
                  }}
                  ref={inputFileRef}
                  style={{ display: "none" }}
                  accept=".jpg, .jpeg, .png"
                />
                <input
                  type="text"
                  {...register("imgFOTOS")}
                  readOnly
                  className="clFont form-control"
                  style={{ display: !preview ? "none" : "none" }}
                />

                <div className="d-flex justify-content-center mt-2">
                  <button
                    className="btn btn-success clFont text-white"
                    onClick={inputFile}
                    type="button"
                  >
                    Cargar Imagen
                  </button>
                </div>
              </div>

              <div className="col-md-3 col-sm-12 p-4">
                <div className="row ">
                  <label className="clFont label-control text-start d-block">
                    Tipo de DNI *{" "}
                  </label>
                  <select
                    className="clFont form-select"
                    {...register("tipo_dni")}
                  >
                    {tipoDocs.map((item) => (
                      <option
                        value={item.id}
                        className="clFont"
                        key={item.id}
                        selected
                      >
                        {item.tipodoc}
                      </option>
                    ))}
                  </select>
                </div>
                <br />

                <div className=" row">
                  <label
                    htmlFor=""
                    className="label-control clFont text-start d-block"
                  >
                    {" "}
                    Apellido de Cliente *
                  </label>
                  <input
                    type="text"
                    className="form-control clFont"
                    {...register("apellidos", {
                      required: "Este campo es obligatorio",
                    })}
                    onChange={handleInputChange}
                  />
                  {errors.apellidos && (
                    <p className="text-red-500 clFont">
                      {" "}
                      {errors.apellidos.message}{" "}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-md-3 col-sm-12 p-4">
                <div className="row">
                  <label className="clFont label-control text-start d-block">
                    Documento DNI *
                  </label>
                  <input
                    {...register("dni", {
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 13,
                        message: "El DNI no debe tener menos 13 caracateres",
                      },
                      maxLength: {
                        value: 13,
                        message: "El DNI no debe tener mas de 13 caracteres",
                      },
                    })}
                    onChange={handleDNIChange}
                    type="text"
                    className="clFont form-control"
                    placeholder="000-0000000-0"
                  />
                  {errors.dni && (
                    <p className="text-red-500 clFont">
                      {" "}
                      {errors.dni.message}{" "}
                    </p>
                  )}
                </div>
                <br />
                <div className="row">
                  <label
                    htmlFor=""
                    className="label-control clFont text-start d-block"
                  >
                    Apodo
                  </label>
                  <input
                    type="text"
                    className="clFont form-control"
                    {...register("apodo")}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-3 col-sm-12 p-4">
                <div className="row">
                  <label
                    htmlFor=""
                    className="label-control clFont text-start d-block"
                  >
                    {" "}
                    Nombre de Cliente *
                  </label>
                  <input
                    type="text"
                    className="form-control clFont"
                    {...register("nombres", {
                      required: "Este campo es obligatorio",
                    })}
                    onChange={handleInputChange}
                  />
                  {errors.nombres && (
                    <p className="text-red-500 clFont">
                      {" "}
                      {errors.nombres.message}{" "}
                    </p>
                  )}
                </div>
                <br />
                <div className="row">
                  <label
                    htmlFor=""
                    className="label-control clFont text-start d-block"
                  >
                    Sexo
                  </label>
                  <select
                    id=""
                    className="form-select clFont"
                    {...register("sexo")}
                  >
                    <option value="M" selected>
                      Masculino
                    </option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 col-sm-12 p-2">
                <label
                  htmlFor=""
                  className="clFont label-control text-start d-block"
                >
                  {" "}
                  Fecha Nacimiento
                </label>
                <input
                  type="date"
                  className="clFont form-control"
                  {...register("fecha_nac")}
                />
              </div>

              <div className="col-md-2 col-sm-12 p-2">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Estado Civil{" "}
                </label>

                <select
                  id=""
                  className="form-select clFont"
                  {...register("estadocivil")}
                >
                  <option value="SOLTERO" selected>
                    Soltero
                  </option>
                  <option value="CASADO">Casado</option>
                  <option value="UNION LIBRE">Unión Libre</option>
                </select>
              </div>
              <div className="col-md-2 col-sm-12 p-2">
                <label
                  htmlFor=""
                  className="label-control clFont text-start d-block"
                >
                  Nacionalidad
                </label>
                <select
                  id=""
                  className="clFont form-select"
                  {...register("nacionalidad")}
                >
                  {Paises.map((paises) => (
                    <option value={paises.name} key={paises.id}>
                      {paises.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2 col-sm-12 p-2">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Ciudad
                </label>
                <select
                  id=""
                  className="clFont form-select"
                  {...register("ciudad")}
                >
                  {Provincias.map((provincia) => (
                    <option value={provincia.name} key={provincia.code}>
                      {" "}
                      {provincia.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 col-sm-12 p-2">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Nivel Académico
                </label>

                <select
                  id=""
                  className="form-select clFont"
                  {...register("escolaridad")}
                >
                  <option value="BACHILLER">Bachiller</option>
                  <option value="UNIVERSITARIO">Universitario</option>
                  <option value="NINGUNO" selected>
                    Ninguno
                  </option>
                </select>
              </div>
              <div className="col-md-2 col-sm-12 p-2">
                <label
                  htmlFor=""
                  className="clFont label-control text-start d-block"
                >
                  {" "}
                  Ocupación
                </label>
                <input
                  type="text"
                  className="form-control clFont"
                  {...register("ocupacion")}
                  onChange={handleInputChange}
                />
              </div>
            </div>
<br />
            <div className="row">
              <div className="col-md-2 col-sm-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Fecha Ingreso
                </label>
                <input
                  type="date"
                  className="form-control clFont"
                  disabled
                  {...register("fechaingresotrabajo")}
                />
              </div>

              <div className="col-md-2 col-sm-12">

              </div>
              <div className="col-md-4 col-sm-12"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Referencia
                </label>
                <textarea
                  className="form-control clFont"
                  {...register("referencia")}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Dirección Residencia
                </label>
                <textarea
                  className="form-control clFont"
                  {...register("direccion", {
                    required: "Este campo es obigatorio",
                  })}
                  onChange={handleInputChange}
                />

                {errors.direccion && (
                  <p className="text-red-500 clFont">
                    {" "}
                    {errors.direccion.message}{" "}
                  </p>
                )}
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Telefono 1
                </label>
                <input
                  {...register("telefono1", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 12,
                      message: "No debe de tener menos de 12 caracteres",
                    },
                    maxLength: {
                      value: 12,
                      message: "No debe de tener mas de 12 caracteres",
                    },
                  })}
                  type="text"
                  className="form-control clFont"
                  placeholder="000-000-0000"
                  onChange={handleTelefono1Change}
                />
                {errors.telefono1 && (
                  <p className="text-red-500 clFont">
                    {" "}
                    {errors.telefono1.message}{" "}
                  </p>
                )}
              </div>
              <div className="col-md-4 col-sm-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Telefono 2
                </label>
                <input
                  {...register("telefono2")}
                  type="text"
                  className="form-control clFont"
                  placeholder="000-000-0000"
                  onChange={handleTelefono2Change}
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Telefono Trabajo
                </label>
                <input
                  {...register("telefonotrabajo")}
                  type="text"
                  className="form-control clFont"
                  placeholder="000-000-0000"
                  onChange={handleTelefono3Change}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <label
                  htmlFor=""
                  className="clFont text-start d-block label-control"
                >
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control clFont"
                  {...register("email")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className=" d-flex justify-content-end p-2">
            <button
              className="btn btn-primary clFont text-white p-2 mx-2"
              type="sumit"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <MdOutlineSaveAlt />
              {!ModoEdicion ? "Insertar" : "Guardar Cambios"}
            </button>
            <button
              className="btn btn-success clFont text-white p-2"
              onClick={handleBack}
              type="button"
            >
              <MdOutlineCancel />
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
