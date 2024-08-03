import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import { request } from "express";

export const create = async (reques, response) => {
  const { nome, peso, cor, descricao } = request.body;
  const disponivel = 1;

  const token = getToken(request);
  const user = await getUserByToken(token);

  if (!nome) {
    response.status(400).json("o nome do objeto é obrigatório");
    return;
  }
  if (!peso) {
    response.status(400).json("o nome do objeto é obrigatório");
    return;
  }
  if (!cor) {
    response.status(400).json("o nome do objeto é obrigatório");
    return;
  }
  if (!descricao) {
    response.status(400).json("o nome do objeto é obrigatório");
    return;
  }
  const objeto_id = uuidv4();
  const usuario_id = user.usuario_id;
  const insertSQL = /*sql*/ `INSERT INTO objetos (??,??,??,??,??,??,??)
  VALUES
  (?,?,?,?,?,?,?)`;
  const insertData = [
    "objeto_id",
    "nome",
    "peso",
    "cor",
    "descricao",
    "disponivel",
    "usuario_id",
    objeto_id,
    nome,
    peso,
    cor,
    descricao,
    disponivel,
    usuario_id,
  ];
  conn.query(insertSQL, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "erro ao cadastrar objeto" });
    }
    if (request.files) {
      const insertImageSQL = /*sql*/ `INSERT INTO objeto_imagens
        (image_id, objeto_id, image_path) VALUES ?`;
      const imageValues = request.file.map((file) => [
        uuidv4(),
        objeto_id,
        file.filename
      ]);
      conn.query(insertImageSQL, [imageValues], (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao salvar imagens do objeto"})
            return
        }
      })
    }
  });
};
