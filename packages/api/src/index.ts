import express, {Request, Response} from "express";
import {createConnection} from "typeorm";
import "reflect-metadata"; //typeorm dependecy

const PORT = 4000;
const HOST = "0.0.0.0";

console.log("env vars", process.env.POSTGRES_PASSWORD, process.env.POSTGRES_USER, process.env.POSTGRES_DB, process.env.NODE_ENV);

const startServer = async () => {
	let retries = 5;

	while (retries) {
		try {
			await createConnection();
			break;
		} catch (error) {
			retries--;
			console.log("retries: ", retries, "Error:", error);
			await Promise.resolve((res: any) => setTimeout(res, 5000));
		}
	}

	const app = express();
	app.get("/", (_: Request, res: Response) => {
		res.send("Hello world 4\n");
	});

	app.listen(PORT, HOST);
	console.log(`Running on http://${HOST}:${PORT}`);
};

startServer();
