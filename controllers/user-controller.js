import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { dbPath, secretKey } from "../config.js";

let users = [];

function loadUsers() {
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      console.log("error reading data: " + err);
      return;
    }
    let dbData = JSON.parse(data);
    users = dbData.users || [];
  });
}

export function getAllUsers(req, res) {
  res.json(users);
}

export function getUser(req, res) {
  let userId = parseInt(req.params.id);
  let user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("user not found");
  } else {
    res.json(user);
  }
}

export async function registerUser(req, res) {
  let { uName, uEmail, uPass } = req.body;

  let emailCheck = users.find((u) => u.email === uEmail);
  if (emailCheck) {
    return res.status(400).send("this email is already in use");
  }

  let hashedPassword = await bcrypt.hash(uPass, 10);
  let activationCode = String(Math.floor(323232 + Math.random() * 424242));
  let newUser = {
    id: users.length + 1,
    name: uName,
    email: uEmail,
    password: hashedPassword,
    activated: false,
    activationCode,
  };

  users.push(newUser);
  fs.writeFile(dbPath, JSON.stringify({ users, posts }, null, 2), (err) => {
    if (err) {
      return res.status(500).send("error saving user");
    }

    let transport = nodemailer.createTransport({});
    transport.sendMail({
      from: "no-reply@sosi.com",
      to: uEmail,
      subject: "Account activation",
      text: `Use this code to activate your account: ${activationCode}`,
    });

    res.status(201).send("user created. check your email for activation code");
  });
}

export function activateUser(req, res) {
  let { uEmail, activationCode } = req.body;
  let user = users.find((u) => u.email === uEmail);

  if (!user || user.activationCode !== activationCode) {
    return res.status(400).send("invalid activation code");
  }

  user.activated = true;
  fs.writeFile(dbPath, JSON.stringify({ users, posts }, null, 2), (err) => {
    if (err) {
      return res.status(500).send("error activating user");
    }
    res.send("user activated");
  });
}

export async function authenticateUser(req, res) {
  let { uEmail, uPass } = req.body;
  let user = users.find((u) => u.email === uEmail);

  if (!user || !user.activated) {
    return res.status(400).send("user not found or not activated");
  }

  let passMatch = await bcrypt.compare(uPass, user.password);
  if (!passMatch) {
    return res.status(400).send("invalid inputs");
  }
  let jwtToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
  res.json({ jwtToken });
}

loadUsers();
