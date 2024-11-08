import Publication from "../models/Publication.js";

// Crear una nueva publicación
export const createPublication = async (req, res) => {
  const { professionalId, name, description, price, category } = req.body;

  try {
    const newPublication = new Publication({
      professionalId,
      name,
      description,
      price,
      category,
    });
    await newPublication.save();
    res.status(201).json({
      message: "Publicación creada exitosamente",
      publication: newPublication,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la publicación" });
  }
};

// Obtener todas las publicaciones activas
export const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find({ status: "active" });
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
};

// Obtener una publicación por ID
export const getPublicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const publication = await Publication.findById(id);
    if (!publication || publication.status === "deleted") {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la publicación" });
  }
};

// Actualizar una publicación por ID
export const updatePublicationById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, status } = req.body;

  try {
    const publication = await Publication.findById(id);
    if (!publication || publication.status === "deleted") {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    // Actualizar los campos disponibles
    if (name !== undefined) publication.name = name;
    if (description !== undefined) publication.description = description;
    if (price !== undefined) publication.price = price;
    if (category !== undefined) publication.category = category;
    if (
      status !== undefined &&
      ["active", "paused", "deleted"].includes(status)
    ) {
      publication.status = status;
    }

    await publication.save();
    res.status(200).json({ message: "Publicación actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la publicación" });
  }
};

// Borrar publicación lógicamente por ID (cambiar estado a "eliminado")
export const deletePublicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const publication = await Publication.findById(id);
    if (!publication || publication.status === "deleted") {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    publication.status = "deleted";
    await publication.save();
    res.status(200).json({ message: "Publicación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la publicación" });
  }
};
