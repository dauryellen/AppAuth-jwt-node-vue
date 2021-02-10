/**
 * file: src/routes/user.routes.js
 * description: arquivo responsável pelas rotas do User
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

// rota responsável por criar um novo 'User': (POST) localhost:3000/api/v1/register
router.post("/register", userController.registerNewUser);

// rota responsável pelo login
router.post("/login", userController.loginUser);
router.get("/userProfile", userController.returnUserProfile);

module.exports = router;
