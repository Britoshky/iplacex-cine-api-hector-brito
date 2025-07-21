import { ObjectId } from "mongodb";
import { PeliculaCollection } from "../common/collections.js";

// 🔸 1. INSERTAR una película
export const handleInsertPeliculaRequest = async (req, res) => {
  try {
    const getPeliculaCollection = PeliculaCollection();
    const { nombre, generos, anioEstreno } = req.body;

    const pelicula = {
      nombre,
      generos,
      anioEstreno,
    };

    const result = await getPeliculaCollection.insertOne(pelicula);

    res.status(201).json({
      message: "Película agregada correctamente",
      peliculaId: result.insertedId,
    });
  } catch (error) {
    console.error("Error al insertar película:", error);
    res.status(500).json({ error: "Error al insertar la película" });
  }
};

// 🔸 2. OBTENER todas las películas
export const handleGetPeliculasRequest = async (req, res) => {
  try {
    const getPeliculaCollection = PeliculaCollection();
    const peliculas = await getPeliculaCollection.find().toArray();
    res.status(200).json(peliculas);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

// 🔸 3. OBTENER una película por ID
export const handleGetPeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const objectId = ObjectId.createFromHexString(id);
    const getPeliculaCollection = PeliculaCollection();
    const pelicula = await getPeliculaCollection.findOne({ _id: objectId });

    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.status(200).json(pelicula);
  } catch (error) {
    console.error("Error al buscar película:", error);
    res.status(500).json({ error: "Error al buscar película por ID" });
  }
};

// 🔸 4. ACTUALIZAR una película por ID
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, generos, anioEstreno } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const objectId = ObjectId.createFromHexString(id);
    const getPeliculaCollection = PeliculaCollection();

    const result = await getPeliculaCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          nombre,
          generos,
          anioEstreno,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.status(200).json({ message: "Película actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar película:", error);
    res.status(500).json({ error: "Error al actualizar película" });
  }
};

// 🔸 5. ELIMINAR una película por ID
export const handleDeletePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const objectId = ObjectId.createFromHexString(id);
    const getPeliculaCollection = PeliculaCollection();
    const result = await getPeliculaCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.status(200).json({ message: "Película eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar película:", error);
    res.status(500).json({ error: "Error al eliminar película" });
  }
};
