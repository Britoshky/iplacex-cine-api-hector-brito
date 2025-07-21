import { client, dbName } from "./db.js";

export function actorCollection() {
  return client.db(dbName).collection("actor");
}

export function PeliculaCollection() {
  return client.db(dbName).collection("pelicula");
}
