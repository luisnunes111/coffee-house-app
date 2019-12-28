import express, {Request, Response} from "express";

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

// App
const app = express() as any;
app.get("/", (_: Request, res: Response) => {
	res.send("Hello world\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
