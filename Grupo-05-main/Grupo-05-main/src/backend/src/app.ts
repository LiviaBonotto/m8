import { generateToken } from "./services/jwtService";
import { authenticateToken } from "./utils/authenticateToken";
import express, { Request, Response } from "express";
import multer from "multer";
import axios from "axios";
const polly = require("polly-js");
const FormData = require("form-data");
const fs = require("fs");
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { createLog, getLogs } from "./controllers/logsController";

const app = express();
const PORT = 5500;
const upload = multer({ dest: "uploads/" });

app.use(express.json());

// MongoDB Connection
mongoose
	.connect(process.env.DB_CONNECTION_STRING as string)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

// Logs Routes
app.post("/logs", createLog);
app.get("/logs", getLogs);

// Root
app.get("/", (req: Request, res: Response) => {
	res.send({
		message: "Hello world",
	});
});

app.post("/upload", upload.single("file"), (req, res) => {
	const xmlFile = req.file;
	if (!xmlFile) {
		return res.status(400).send("Nenhum arquivo foi enviado.");
	}

	polly()
		.retry(4)
		.executeForPromise(async function () {
			console.log("foi");
			let data = new FormData();
			data.append("file", fs.createReadStream(xmlFile.path));
			await axios
				.post("http://localhost:5000/upload", data)
				.then((response) => {
					res.json(response.data);
				});
		});
});

app.post("/login", (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (username === "user" && password === "password") {
		const token = generateToken({ username });
		return res.json({ access_token: token });
	}
	return res.status(401).send("Credenciais inválidas");
});

export default app;
