import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

//importar conexçao
import conn from "./config/conn.js";

//importacao dos modulos TABELA
import "./models/usuariomodel.js"

//404
const app = express();

app.get("/", (request, response) => {
  response.send("Olá mundo!");
});

app.use((request, response) => {
  response.status(404).json({ message: "Rota nao encontrada" });
});
app.listen(PORT, () => {
  console.log("Servidor on PORT: " + PORT);
});
