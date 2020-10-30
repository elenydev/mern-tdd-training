import User from "../models/user.js";
import socket from "../socket.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  try {
    const existingUser = await User.find({ email: email });;
    if (existingUser.length === 0) {
      const hashedPw = await bcrypt.hash(password, 12);
      const user = new User({ email: email, password: hashedPw });
      await user.save();
      res.send(user);
      socket.getIO().emit("user", { action: "createUser", user: user });
    }
    else{
      res.send(null);
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find({ email: email });
    if (user.length !== 0 && bcrypt.compare(password, user.password)) {
      socket.getIO().emit("user", { action: "getUser", user: user });
      res.send({ user: user });
    } else {
      res.status(404).send({ message: "User doesn't exist" });
    }
    next();
  } catch (err) {
    console.log(err)
    next(err);
  }
};

export const logOut = async (req,res,next) =>{
  const id = req.body.id
  try {
    const user = await User.findById({_id: id});
      socket.getIO().emit('user', { action: 'logOut', user:user})
      res.json({message : 'Logged out'})
    }
  catch (err) {
    console.log(err)
    next(err);
  }
}
