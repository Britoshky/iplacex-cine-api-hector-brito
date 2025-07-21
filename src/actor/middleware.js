import { body, param, validationResult } from "express-validator";
import { ObjectId } from "mongodb";

/* ---------- helpers ---------- */
const sendErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

/* ---------- 1. validar :id de actor ---------- */
export const validateActorId = [
  param("id")
    .custom((value) => ObjectId.isValid(value))
    .withMessage("ID no válido"),
  (req, res, next) => {
    if (sendErrors(req, res)) return;
    next();
  },
];

/* ---------- 2. validar cuerpo (insert / update) ---------- */
export const validateActorBody = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("edad")
    .isInt({ min: 0 })
    .withMessage("La edad debe ser un número entero positivo"),
  body("estaRetirado")
    .optional()
    .isBoolean()
    .withMessage("estaRetirado debe ser booleano"),
  body("premios")
    .optional()
    .isArray()
    .withMessage("premios debe ser un arreglo"),
  body("idPelicula").notEmpty().withMessage("idPelicula es obligatorio"),
  (req, res, next) => {
    if (sendErrors(req, res)) return;
    next();
  },
];

/* ---------- 3. validar existencia de actor (middleware dedicado) ---------- */
import { actorCollection } from "../common/collections.js";

export const validateActorExists = [
  ...validateActorId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const objectId = ObjectId.createFromHexString(id);
      const actor = await actorCollection().findOne({ _id: objectId });
      if (!actor) {
        return res.status(404).json({ error: "Actor no encontrado" });
      }

      req.actor = actor;
      next();
    } catch (err) {
      console.error("Error al validar existencia del actor:", err);
      res.status(500).json({ error: "Error interno al validar actor" });
    }
  },
];

