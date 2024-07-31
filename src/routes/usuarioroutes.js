import { Router } from "express";

//*Importar Controllers de usuario
import { register, login } from "../controllers/usuariocontroller.js";

//*importar os helpers
import validarUsuario from "../helpers/validar-user.js";

const router = Router();

//*localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);
router.post("/login", login);

export default router;
