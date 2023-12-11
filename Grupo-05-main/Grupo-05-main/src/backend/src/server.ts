import app from "./app";

const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

export default server;
