import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsByUserId,
  updateBookingById,
} from "../controllers/bookingController.js";

const router = express.Router();

// Crear una nueva reserva
router.post("/", createBooking);

// Obtener todas las reservas
router.get("/", getAllBookings);

// Obtener reservas por userId
router.get("/user/:userId", getBookingsByUserId);

// Actualizar una reserva por ID
router.put("/:id", updateBookingById);

export default router;
