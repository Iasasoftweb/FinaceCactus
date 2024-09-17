import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ZonasModels = db.define("tbzonas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  zonas: { type: DataTypes.STRING },
  estado: { type: DataTypes.INTEGER, defaultValue: "HABILITADO" },
});

export default ZonasModels;
