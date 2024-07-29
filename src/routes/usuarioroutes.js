import { Router } from "express";

//*Importar Controllers de usuario
import { register } from "../controllers/usuariocontroller.js";

//*importar os helpers
import validarUsuario from "../helpers/validar-user.js";

const router = Router();

//*localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);

export default router;
