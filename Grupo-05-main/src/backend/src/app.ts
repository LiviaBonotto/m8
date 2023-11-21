import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 5500;

app.get("/", (req: Request, res: Response) => {
	res.send({
		message: "Hello world",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
