// routes/publicationRoutes.js
import express from "express";
import {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublicationById,
  deletePublicationById,
} from "../controllers/publicationController.js";

const router = express.Router();

// Crear una nueva publicación
router.post("/", createPublication);

// Obtener todas las publicaciones activas
router.get("/", getAllPublications);

// Obtener una publicación por ID
router.get("/:id", getPublicationById);

// Actualizar una publicación por ID
router.put("/:id", updatePublicationById);

// Borrar publicación lógicamente por ID (cambiar estado a "eliminado")
router.delete("/:id", deletePublicationById);

export default router;
