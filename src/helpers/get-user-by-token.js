import jwt from "jsonwebtoken";
const getUserByToken = async (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      response.status(401).json({ err: "Acesso negado" });
      return;
    }
    const decoded = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL");
    console.log(decoded)
  });
};

export default getUserByToken
