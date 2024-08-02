import { Router } from "express";

//*Importar Controllers de usuario
import {
  register,
  login,
  checkUser,
  getUserById
} from "../controllers/usuariocontroller.js";

//*importar os helpers
import validarUsuario from "../helpers/validar-user.js";

const router = Router();

//*localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);
router.post("/login", login);
router.get("/checkuser", checkUser);
router.get("/:id", getUserById);

export default router;
