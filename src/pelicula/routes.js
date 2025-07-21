import express from "express";
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest,
} from "./controller.js";

import {
  validatePeliculaBody,
  validatePeliculaId,
} from "./middleware.js";

const peliculaRoutes = express.Router();

// POST /pelicula → agregar nueva película
peliculaRoutes.post("/pelicula", validatePeliculaBody, handleInsertPeliculaRequest);

// GET /peliculas → obtener todas las películas
peliculaRoutes.get("/peliculas", handleGetPeliculasRequest);

// GET /pelicula/:id → obtener una película por su ID
peliculaRoutes.get("/pelicula/:id", validatePeliculaId, handleGetPeliculaByIdRequest);

// PUT /pelicula/:id → actualizar una película por su ID
peliculaRoutes.put("/pelicula/:id", validatePeliculaId, validatePeliculaBody, handleUpdatePeliculaByIdRequest);

// DELETE /pelicula/:id → eliminar una película por su ID
peliculaRoutes.delete("/pelicula/:id", validatePeliculaId, handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
