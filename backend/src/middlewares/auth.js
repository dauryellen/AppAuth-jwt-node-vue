/**
 * arquivo responsável por confirmar se um determinado(a) 'User' tem autorização para fazer login
 */

const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
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
