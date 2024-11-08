import Booking from "../models/Booking.js";

// Crear una nueva reserva
export const createBooking = async (req, res) => {
  const { clientId, professionalId, publicationId, bookingDate, totalAmount } =
    req.body;

  try {
    const newBooking = new Booking({
      clientId,
      professionalId,
      publicationId,
      bookingDate,
      totalAmount,
    });
    await newBooking.save();
    res.status(201).json({
      message: "Reserva creada exitosamente",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

// Obtener todas las reservas
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

// Obtener reservas por userId
export const getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Buscar reservas como cliente
    const clientBookings = await Booking.find({ clientId: userId });

    // Buscar reservas como profesional
    const professionalBookings = await Booking.find({
      professionalId: userId,
    });

    // Combinar ambas listas
    const bookings = [...clientBookings, ...professionalBookings];

    if (bookings.length === 0) {
      return res.status(404).json({
        error: "No se encontraron reservas para el usuario especificado",
      });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

// Actualizar una reserva por ID
export const updateBookingById = async (req, res) => {
  const { id } = req.params;
  const { status, bookingDate, totalAmount } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    // Actualizar los campos disponibles
    if (status && ["pendiente", "completado", "cancelado"].includes(status)) {
      booking.status = status;
    }
    if (bookingDate !== undefined) booking.bookingDate = bookingDate;
    if (totalAmount !== undefined) booking.totalAmount = totalAmount;

    await booking.save();
    res
      .status(200)
      .json({ message: "Reserva actualizada exitosamente", booking });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva" });
  }
};
