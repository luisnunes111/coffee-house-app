import {Application, Request, Response} from "express";
import products from "./controllers/products";
import users from "./controllers/users";

export default (app: Application) => {
	app.get("/", (_: Request, res: Response) => {
		res.send("Hello world\n");
	});

	app.post("/login", users.login);
	app.post("/register", users.register);
	app.post("/logout", users.logout);

	app.post("/product", products.createOne);
	app.get("/products", products.getAll);
	app.get("/product/:id", products.getOne);
	app.put("/product/:id", products.updateOne);
	app.delete("/product/:id", products.deleteOne);
};
