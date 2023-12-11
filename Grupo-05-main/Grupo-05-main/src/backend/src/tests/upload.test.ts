import request from "supertest";
import app from "../app";
import path from "path";

jest.setTimeout(30000); //coloquei um timeout de 30 segundos

describe("Teste da Rota Protegida", () => {
	let token: string;

	beforeAll(async () => {
		// Obtenha um token JWT válido
		const response = await request(app)
			.post("/login")
			.send({ username: "user", password: "password" });
		token = response.body.access_token;
	});

	it("deve acessar a rota protegida com token válido", async () => {
		const filePath = path.join(__dirname, "nfe.xml");

		const res = await request(app)
			.post("/upload")
			.set("Authorization", `Bearer ${token}`)
			.attach("file", filePath);

		expect(res.statusCode).not.toBe(401);
	});

	//   it("não deve acessar a rota protegida sem token", async () => {
	//     const filePath = path.join(__dirname, "nfe.xml");

	//     const res = await request(app)
	//         .post("/upload").attach("file", filePath);

	//     expect(res.statusCode).toBe(401);
	//   });
});
