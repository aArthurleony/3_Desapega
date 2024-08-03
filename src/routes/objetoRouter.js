import { Router } from "express";
import { create } from "../controllers/objetoController.js";

//*helpers
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

const router = Router();
router.post("/create", verifyToken, create, imageUpload.array("imagens", 10), create);

export default router;
