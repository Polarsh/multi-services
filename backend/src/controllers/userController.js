import User from "../models/User.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "activo" }).select("-password"); // Solo usuarios activos
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener usuarios por tipo
export const getUsersByType = async (req, res) => {
  const { userType } = req.query;
  try {
    const users = await User.find({ userType, status: "activo" }).select(
      "-password"
    ); // Filtra por tipo de usuario y estado activo
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios por tipo" });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id, status: "activo" }).select(
      "-password"
    ); // Verifica estado activo
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Actualizar usuario por ID
export const updateUserById = async (req, res) => {
  const { id } = req.params;

  const { name, phone, specialties } = req.body;
  try {
    const user = await User.findOne({ _id: id, status: "activo" });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizamos los campos disponibles
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (user.userType === "profesional" && specialties !== undefined) {
      if (specialties) user.specialties = specialties;
    }

    await user.save();
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar usuario por ID (Borrado lógico)
export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id, status: "activo" });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizamos el estado del usuario a 'borrado'
    user.status = "borrado";

    await user.save();
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// Añadir calificación y comentario a un profesional
export const addRatingToProfessional = async (req, res) => {
  const { id } = req.params; // ID del profesional a calificar
  const { rating, comment } = req.body;
  const clientId = req.user._id; // ID del cliente que está realizando la calificación

  try {
    // Verificamos que el usuario a calificar sea un profesional
    const professional = await User.findOne({
      _id: id,
      userType: "profesional",
      status: "activo",
    });
    if (!professional) {
      return res
        .status(404)
        .json({ error: "Profesional no encontrado o no es un profesional" });
    }

    // Añadimos la calificación al profesional
    professional.ratings.push({ rating, comment, clientId });
    await professional.save();

    res
      .status(200)
      .json({ message: "Calificación y comentario añadidos exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al añadir la calificación y comentario" });
  }
};
