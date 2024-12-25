//write a controller for me which returns hello
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req: Request, res: Response) => {
  //prepare salt for hashing
  const { userName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  //check if the user exists in database
  if (email) {
    try {
      res.status(400).json({ message: "User already exists" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  try {
    const newUser = await User.create({
      userName,
      email,
      password: encryptedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//controller for login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //validate if user exists or not in database
  const doesUserExist = await User.findOne({ where: { email } });
  if (!doesUserExist) {
    res.status(400).json({ message: "User does not exist,please register" });
  }
  //compare the password
  const isPasswordValid = await bcrypt.compare(
    password,
    doesUserExist?.password as string
  );
  //check if the password is valid or not
  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid password" });
  }
  //save the user in jwt session token
  const token = jwt.sign({ userId: doesUserExist?.id }, "anshumann");
  //return the token
  res.status(200).json({ message: "User logged in successfully", token });
};
