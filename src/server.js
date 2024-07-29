import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

//importar conexçao
import conn from "./config/conn.js"

const app = express();

app.get("/", (request, response) => {
  response.send("Olá mundo!");
});

app.listen(PORT, () => {
  console.log("Servidor on PORT: " + PORT);
});
