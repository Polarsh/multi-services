import express from "express";
import {
  getAllBookings,
  getBookingsByUserId,
  updateBookingById,
} from "../controllers/bookingController.js";

const router = express.Router();

// Obtener todas las reservas
router.get("/", getAllBookings);

// Obtener reservas por userId
router.get("/user/:userId", getBookingsByUserId);

// Actualizar una reserva por ID
router.put("/:id", updateBookingById);

export default router;