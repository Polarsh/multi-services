import express from "express";
import {
  getAllUsers,
  getUsersByType,
  getUserById,
  updateUserById,
  deleteUserById,
  addRatingToProfessional,
} from "../controllers/userController.js";

/* import { authenticateUser } from "../middleware/authMiddleware.js"; */

const router = express.Router();

// Obtener todos los usuarios
router.get("/all", getAllUsers);

// Obtener usuarios por tipo
// Pasar el tipo de usuario como query parameter: /api/users?userType=cliente
router.get("/", getUsersByType); 

// Obtener usuario por ID
router.get("/:id", getUserById);

// Actualizar usuario por ID
router.put("/:id", updateUserById);

// Eliminar usuario por ID (Borrado lógico)
router.delete("/:id", deleteUserById);

// Añadir calificación y comentario a un profesional
router.post("/:id/rating", addRatingToProfessional);

export default router;
