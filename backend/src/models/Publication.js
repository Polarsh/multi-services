import { model, Schema } from "mongoose";

const PublicationSchema = new Schema(
  {
    professionalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paused", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true, // Añade `createdAt` y `updatedAt`
  }
);

const Publication = model("Publication", PublicationSchema);

export default Publication;
