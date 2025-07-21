import { ObjectId } from "mongodb";
import { actorCollection, PeliculaCollection } from "../common/collections.js";

export const handleInsertActorRequest = async (req, res) => {
  try {
    const { nombre, edad, estaRetirado, premios, idPelicula } = req.body;

    if (!ObjectId.isValid(idPelicula)) {
      return res.status(400).json({ error: "ID de película no válido" });
    }

    const pelicula = await PeliculaCollection().findOne({
      _id: new ObjectId(idPelicula),
    });

    if (!pelicula) {
      return res.status(400).json({ error: "Película no encontrada" });
    }

    const actor = {
      idPelicula: pelicula._id.toString(),
      nombre,
      edad,
      estaRetirado: !!estaRetirado,
      premios: premios || [],
    };

    await actorCollection().insertOne(actor);

    res.status(201).json({ message: "Actor agregado correctamente", actor });
  } catch (error) {
    console.error("Error al insertar actor:", error);
    res.status(500).json({ error: "Error interno al insertar actor" });
  }
};

export const handleGetActoresRequest = async (req, res) => {
  try {
    const actores = await actorCollection().find().toArray();
    res.status(200).json(actores);
  } catch (error) {
    console.error("Error al obtener actores:", error);
    res.status(500).json({ error: "Error al obtener actores" });
  }
};

export const handleGetActorByIdRequest = async (req, res) => {
  try {
    res.status(200).json(req.actor);
  } catch (error) {
    console.error("Error al obtener actor:", error);
    res.status(500).json({ error: "Error al obtener actor por ID" });
  }
};

export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID de película no válido" });
    }

    const actores = await actorCollection().find({ idPelicula: id }).toArray();

    res.status(200).json(actores);
  } catch (error) {
    console.error("Error al obtener actores por película:", error);
    res.status(500).json({ error: "Error al obtener actores de la película" });
  }
};
