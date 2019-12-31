import "reflect-metadata"; // typeorm dependecy
import express, {Application} from "express";
import connectPostgres from "./configs/postgres-connection";
import bodyParser from "body-parser";
import routes from "./routes";

const PORT = process.env.PORT;

const startServer = async () => {
	connectPostgres();

	const app: Application = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	routes(app);

	app.listen(PORT, () => console.log(`api running on port: ${PORT}!\n`));
};

// console.log("envs:", process.env);

startServer();
