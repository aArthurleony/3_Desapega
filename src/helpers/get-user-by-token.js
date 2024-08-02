import jwt from "jsonwebtoken";
const getUserByToken = async (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      response.status(401).json({ err: "Acesso negado" });
      return;
    }
    const decoded = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL");
    //* console.log("função get user: ", decoded);

    const userID = decoded.id
    // *console.log("userID: ",userID)
    const checkSQL = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
    const checkData = ["usuario_id", userID]
  });
};

export default getUserByToken;
