/**
 * arquivo responsável pelo modelo da classe 'User'
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, maxlenght: 50, required: true },
    email: { type: String, maxlenght: 30, required: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// responsável por fazer o hash da senha antes de salvar
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// gerar uma autenticação
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    "secret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// responsável por fazer pesquisa de user por email
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new Error({ error: "Login inválido" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: "Senha inválida" });
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
