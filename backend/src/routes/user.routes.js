/**
 * file: src/routes/user.routes.js
 * description: arquivo responsável pelas rotas do User
 */

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controllers");

// ==> rota responsável por criar um novo 'User': (POST) localhost:3000/api/v1/register
router.post("/register", userController.registerNewUser);

// ==> rota responsável por criar um novo login 'User': (POST) localhost:3000/api/v1/login
router.post("/login", userController.loginUser);

// ==> rota responsável por retornar o perfil/profile do 'User': (POST) localhost:3000/api/v1/userProfile
router.get("/userProfile", auth, userController.returnUserProfile);

module.exports = router;
