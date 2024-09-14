import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: '*', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204 //
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from the users endpoint!' });
});

app.use("/api/auth", cors(corsOptions) , authRoutes);
app.use("/api/messages", cors(corsOptions),  messageRoutes);
app.use("/api/users",cors(corsOptions), userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});

export default app;
