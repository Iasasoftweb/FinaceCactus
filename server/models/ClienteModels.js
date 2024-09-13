import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ClientesModel = db.define("tclientes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  dni: { type: DataTypes.STRING, defaultValue :1 },
  tipo_dni: { type: DataTypes.INTEGER , defaultValue:1},
  nombres: { type: DataTypes.STRING, defaultValue: 'd' },
  apellidos: { type: DataTypes.STRING, defaultValue: 'd' },
  sexo: { type: DataTypes.STRING, defaultValue: 'd' },
  apodo: { type: DataTypes.STRING },
  estadocivil: { type: DataTypes.STRING },
  ciudad: { type: DataTypes.STRING },
  escolaridad: { type: DataTypes.STRING },
  ocupacion: { type: DataTypes.STRING },
  direccion: { type: DataTypes.STRING, defaultValue: 'd' },
  sector: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  telefono1: { type: DataTypes.STRING,  defaultValue: 'd' },
  telefono2: { type: DataTypes.STRING },
  fecha_nac: { type: DataTypes.DATE },
  nacionalidad: { type: DataTypes.STRING },
  referencia: { type: DataTypes.STRING },
  lugartrabajo: { type: DataTypes.STRING },
  telefonotrabajo: { type: DataTypes.STRING },
  sueldo: { type: DataTypes.DECIMAL },
  fechaingresotrabajo: { type: DataTypes.DATE },
  imgDNI1: { type: DataTypes.STRING},
  imgDNI2: { type: DataTypes.STRING },
  imgFOTOS: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, timestamps: false },
  updatedAt: { type: DataTypes.DATE, timestamps: false },
});



export default ClientesModel;
