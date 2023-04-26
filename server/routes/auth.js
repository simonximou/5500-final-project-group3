const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Token = require("..//models/token");
const sendMail = require("..//utils/sendEmail");
const crypto = require("crypto");// not sure if this is going to work 

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user 
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isFree: req.body.isFree,
      isAdmin: req.body.isAdmin,
      isVip:req.body.isVip,
    });

    //save user and respond
    const user = await newUser.save();

    //create and save a token in db
    const token = await new Token({
      userId: user._id, 
      token: crypto.randomBytes(32).toString("hex")
    }).save();

    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;

    await sendMail(user.email, "Email verification-Daily horoscope", url);

 
    res.status(200).send({message: "Please verify your email~"});
  } catch (err) {
    res.status(500).json(err)
  }
});

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

    if (!user.verified) {
      let token = await Token.findOne({
        userId: user._id
      });
      if (!token) {
        const token = await new Token({
          userId: user._id, 
          token: crypto.randomBytes(32).toString("hex")
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendMail(user.email, "Email verification-Daily horoscope", url);
      }
      return res.status(400).send({message: "Please verify your email before login~"});
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

//TOKEN VERIFICATION
router.get("/:id/verify/:token", async(req, res) => {
  try {
    const usr = await User.findOne({_id: req.params.id});
    if (!usr) return res.status(400).send("Invalid link!");

    const token = await Token.findOne({
      userId: usr._id,
      token: req.params.token
    });
    if (!token) return res.status(400).send({message: "Invalid link!"});
    
    await User.updateOne({_id: usr._id, verified: true});
    await token.remove();
    res.status(200).send({message: "Email verified successfully!"});
  } catch (error) {
    res.status(500).json(err)
  }
});


module.exports = router;
