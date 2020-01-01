import "reflect-metadata"; // typeorm dependecy
import express, {Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import connectPostgres from "./configs/postgres-connection";

const PORT = process.env.PORT;

const startServer = async () => {
	connectPostgres();

	const app: Application = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	if (process.env.NODE_ENV === "development") {
		app.use(cors());
		app.options("*", cors());
	}

	routes(app);

	app.listen(PORT, () => console.log(`api running on port: ${PORT}!\n`));
};

// console.log("envs:", process.env);

startServer();
