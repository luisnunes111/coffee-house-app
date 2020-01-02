import {Application, Request, Response} from "express";
import products from "./controllers/products";
import users from "./controllers/users";
import {isAuth} from "./middlewares/isAuth";
import notifications from "./controllers/notifications";

export default (app: Application) => {
	app.get("/", (_: Request, res: Response) => {
		res.send("Hello world\n");
	});

	app.post("/login", users.login);
	app.post("/register", users.register);
	app.post("/logout", isAuth, users.logout);
	app.get("/refresh_token", users.refreshToken);
	app.get("/users", isAuth, users.getAll);

	app.post("/product", isAuth, products.createOne);
	app.get("/products", isAuth, products.getAll);
	app.get("/products/export", isAuth, products.exportList);
	app.get("/product/:id", isAuth, products.getOne);
	app.put("/product/:id", isAuth, products.updateOne);
	app.delete("/product/:id", isAuth, products.deleteOne);

	app.get("/notifications", isAuth, notifications.getAll);
	app.get("/user/notifications", isAuth, notifications.getUserNotifications);
	app.put("/notification/:id", isAuth, notifications.updateNotification);
	app.delete("/notification/:id", isAuth, notifications.deleteNotification);
};
