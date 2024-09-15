import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import db from "./database/db.js";
import ClienteRoute from "./routes/routes.js";
import TipoDocs from "./routes/routeTipodocs.js";
import path, { extname } from "path";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { upload } from "./controller/ClienteController.js";
import ClientesModel from "./models/ClienteModels.js";

//Inizializations
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/clientes", ClienteRoute);
app.use("/tipodocs", TipoDocs);

app.post("/uploadImg/", upload.single("imgDNI2"), async (req, res) => {
  if (upload) {
    res.json({
      fileName: req.file.filename,
      filePath: `/uploads/clientes/avata/${req.file.filename}`,
    });
  }
});



app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads/clientes/avata/"))
);
// app.use('/public/images/clientes', express.static('./uploads'));

try {
  await db.authenticate();
  console.log("Conexion exitosa al la DB");
} catch (error) {
  console.log("Error de coneccion al la DB: $error");
}

app.listen(8000, () => {
  console.log("Servidor Conectado: 8000");
});
