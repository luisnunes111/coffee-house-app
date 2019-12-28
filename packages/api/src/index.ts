import express, {Request, Response} from "express";

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

// console.log("env vars", process.env.POSTGRES_PASSWORD, process.env.POSTGRES_USER, process.env.POSTGRES_DB, process.env.NODE_ENV);
// App
const app = express();
app.get("/", (_: Request, res: Response) => {
	res.send("Hello world 2\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
