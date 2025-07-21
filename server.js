import express from "express";
import cors from "cors";
import {client} from "./src/common/db.js";
import actorRoutes from "./src/actor/routes.js";
import peliculaRoutes from "./src/pelicula/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});

app.use("/api", actorRoutes);
app.use("/api", peliculaRoutes);

client.connect()
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB Atlas:", err);
  });
