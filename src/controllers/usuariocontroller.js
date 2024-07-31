import conn from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

//*helpers
import createUserToken from "../helpers/create-user-token.js";

//*criar usuario
export const register = (request, response) => {
  const { nome, email, telefone, senha, confirmSenha } = request.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
  const checkEmailData = ["email", email];

  conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "não foi possível buscar usuário" });
      return;
    }
    if (data.length > 0) {
      response.status(409).json({ err: "Email já está em uso" });
      return;
    }
    //*criar a senha do usuário
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);
    //*console.log(salt);
    //*console.log("Senha recebida: ", senha);
    //*console.log("Senha criptografada: ", senhaHash);

    const id = uuidv4();
    const imagem = "userDefault.png";

    const insertSQL = /*sql*/ `
    INSERT INTO usuarios (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)`;

    const insertData = [
      "usuario_id",
      "nome",
      "email",
      "telefone",
      "senha",
      "imagem",
      id,
      nome,
      email,
      telefone,
      senhaHash,
      imagem,
    ];
    conn.query(insertSQL, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao cadastrar usuário" });
        return;
      }
      const usuarioSQL = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
      const usuarioData = ["usuario_id", id];
      conn.query(usuarioSQL, usuarioData, async (err, data) => {
        if (err) {
          console.error(err);
          response.status(500).json({ err: "Erro ao selecionar usuario" });
          return;
        }
        const usuario = data[0];

        try {
          await createUserToken(usuario, request, response);
        } catch (error) {
          console.error(error);
        }
      });
      //*usuario esteja logado na aplicação
      //*createUserToken()
      // response.status(201).json({ message: "Usuário cadastrado" });
    });
  });
};

//*login
export const login = (request, response) => {
  const { email, senha } = request.body;
  //*validações
  if (!email) {
    response.status(400).json({ message: "Campo de email é obrigatório" });
  }
  if (!senha) {
    response.status(400).json({ message: "Campo de senha é obrigatório" });
  }
  const checkSQL = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
  const checkData = ["email", email];
  conn.query(checkSQL, checkData, async (err, data) => {
    if (err) {
      console.log(err);
      response.status(400).json({ message: "Erro ao buscar usuário" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ err: "Usuário não encontrado" });
      return;
    }
    const usuario = data[0];
    //*verificar se a senha existe/comparar senha
    const compararSenha = await bcrypt.compare(senha, usuario.senha);
    // *console.log("senha do usuário: ", senha);
    // *console.log("senha do objeto: ", usuario.senha);
    // *console.log("comparar senha: ", compararSenha)
    if (!compararSenha) {
      return response.status(401).json({ message: "Senha inválida" });
    }
    try {
      await createUserToken(usuario, request, response);
    } catch (error) {
      console.error(error);
      response.status(500).json({ err: "Erro ao processar informação" });
    }
  });
};
