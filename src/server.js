import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

//importar conexçao
import conn from "./config/conn.js";

//importacao dos modulos TABELA
import "./models/usuariomodel.js"

//Importar as rotas
import usuarioRouter from "./routes/usuarioroutes.js"

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())   

//utilizar as rotas
app.use("/usuarios", usuarioRouter)

//404
app.use((request, response) => {
  response.status(404).json({ message: "Rota nao encontrada" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT: " + PORT);
});
