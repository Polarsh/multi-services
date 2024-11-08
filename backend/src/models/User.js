// models/User.js
import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["admin", "cliente", "profesional"],
      required: true,
    },
    specialties: {
      type: [String],
      default: [],
    },
    ratings: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        comment: {
          type: String,
        },
        clientId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    status: {
      type: String,
      enum: ["activo", "borrado"],
      default: "activo",
    },
  },
  {
    timestamps: true, // Añade `createdAt` y `updatedAt`
  }
);

const User = model("User", UserSchema);

export default User;
