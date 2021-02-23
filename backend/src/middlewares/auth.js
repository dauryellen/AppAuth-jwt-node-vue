/**
 * arquivo responsável por confirmar se um determinado(a) 'User' tem autorização para fazer p login
 */

const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Falha na autenticação." });
  }
};
