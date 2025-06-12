import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  Username: String,
  Password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("🌐 MongoDB Atlas Connected!");
});

app.post("/", async (req, res) => {
  console.log("Received:", req.body);
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("✅ User saved to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
