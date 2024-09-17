import express from "express";
import {
  CreateClientes,
  deleteCliente,
  updateClienteImg,
  ImgDelete,
  getAllClientes,
  uploadImg,
  getCliente,
  updateCliente,
  existeDni,
  upload,
} from "../controller/ClienteController.js";
import multer from "multer";
import path from "path";
//import upload from "../routes/uploadMiddleware.js"

const router = express.Router();

router.get("/", getAllClientes);
router.get("/:id", getCliente);
router.get("/buscar-dni/:dni", existeDni);
router.post("/", CreateClientes);
router.put("/:id", updateCliente);

router.delete("/:id", deleteCliente);
router.delete("/deleteimagen/imagen/:image", ImgDelete);

export default router;
