import { body, param, validationResult } from "express-validator";
import { ObjectId } from "mongodb";

/* ---------- helper ---------- */
const sendErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

/* ---------- 1. Validar :id de película ---------- */
export const validatePeliculaId = [
  param("id")
    .custom((value) => ObjectId.isValid(value))
    .withMessage("ID no válido"),
  (req, res, next) => {
    if (sendErrors(req, res)) return;
    next();
  },
];

/* ---------- 2. Validar el cuerpo al crear o actualizar una película ---------- */
export const validatePeliculaBody = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de la película es obligatorio"),

  body("generos")
    .isArray({ min: 1 })
    .withMessage("Los géneros deben ser un arreglo con al menos un elemento"),

  body("anioEstreno")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("El año de estreno debe ser un número válido"),

  (req, res, next) => {
    if (sendErrors(req, res)) return;
    next();
  },
];
