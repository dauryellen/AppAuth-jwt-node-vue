/**
 * file: src/controllers/user.controller.js
 * description: arquivo responsável pelo CRUD da classe User
 */

const User = require("../models/user.model");

// método responsável por criar um novo User
exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    console.log(isUser);

    if (isUser.length >= 1) {
      return res
        .status(409)
        .json({ message: "Sorry! This email is already registered!" });
    }

    const newUser = new User(req.body);
    const user = await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({ message: "User created succesfully!", user, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        error: "Erro ao realizar o login. Verifique suas credenciais.",
      });
    }

    const token = await user.generateAuthToken();
    res
      .status(201)
      .json({ message: "Usuário(a) logado(a) com sucesso!", user, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};
