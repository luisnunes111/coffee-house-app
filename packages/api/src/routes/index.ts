import {Application, Request, Response} from "express";
import products from "./controllers/products";

export default (app: Application) => {
	app.get("/", (_: Request, res: Response) => {
		res.send("Hello world\n");
	});

	app.post("/product", products.createOne);
	app.get("/products", products.getAll);
	app.get("/product/:id", products.getOne);
	app.put("/product/:id", products.updateOne);
	app.delete("/product/:id", products.deleteOne);
};
