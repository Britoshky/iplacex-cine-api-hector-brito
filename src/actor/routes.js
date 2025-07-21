import express from "express";
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest,
} from "./controller.js";

import {
  validateActorBody,
  validateActorExists,
  validateActorId,
} from "./middleware.js";

const actorRoutes = express.Router();

// POST /actor → Agrega un actor (usa middleware de validación de cuerpo)
actorRoutes.post("/actor", validateActorBody, handleInsertActorRequest);

// GET /actores → Obtener todos los actores
actorRoutes.get("/actores", handleGetActoresRequest);

// GET /actor/:id → Obtener un actor por ID (usa middleware de validación y existencia)
actorRoutes.get("/actor/:id", validateActorExists, handleGetActorByIdRequest);

// GET /actor/pelicula/:id → Obtener actores por ID de película
actorRoutes.get("/actor/pelicula/:id", validateActorId, handleGetActoresByPeliculaIdRequest);

export default actorRoutes;
