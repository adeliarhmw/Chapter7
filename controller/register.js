const bcrypt = require("bcrypt");
const user_game = require("../models/user_game");

module.exports = {
  viewsRegisterForm: (req, res) => {
    res.render("register");
  },
  viewsRegister: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await user_game.create({
        username,
        password: hashedPassword,
        id_role: 2,
      });
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
};
