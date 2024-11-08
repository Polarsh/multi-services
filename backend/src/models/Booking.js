import { model, Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    professionalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publicationId: {
      type: Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendiente", "completado", "cancelado"],
      default: "pendiente",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Añade `createdAt` y `updatedAt`
  }
);

const Booking = model("Booking", BookingSchema);

export default Booking;
