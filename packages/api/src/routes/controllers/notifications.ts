import {Request, Response} from "express";
import {msgs} from "../../utils/responseMsgs";

async function getAll(req: Request, res: Response) {
	try {
		console.log("identity", (req as any).identity);
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

export default {
	getAll,
};
