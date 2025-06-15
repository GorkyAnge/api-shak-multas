const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/firebase");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ mensaje: "Email and password are required" });
  }
  try {
    const usersRef = db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();
    if (!userSnapshot.empty) {
      return res.status(400).send({ mensaje: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = usersRef.doc();
    await userRef.set({ email, password: hashedPassword });

    const token = jwt.sign({ id: userRef.id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send({ mensaje: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ mensaje: "Email and password are required" });
  }
  try {
    const usersRef = db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();
    if (userSnapshot.empty) {
      return res.status(400).send({ mensaje: "User not found" });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ mensaje: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userDoc.id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ mensaje: "Error logging in", error });
  }
};

module.exports = { register, login };
