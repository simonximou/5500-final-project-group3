const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user){
      res.status(404).json("user not found");
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword){
      res.status(400).json("wrong password")
      return;
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
