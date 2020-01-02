import {Response, Request} from "express";
import {ITokenPayload} from "../../services/auth";
import {msgs} from "../../utils/responseMsgs";
import {RequestWithIdentity} from "../middlewares/isAuth";
import notifications from "../repositories/notifications";

async function getAll(req: Request, res: Response) {
	try {
		const result = await notifications.getAll();
		if (result) {
			return res.send({success: true, data: result});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, error: msgs.generic500});
	}
	return res.status(500).send({success: false});
}

async function getUserNotifications(req: Request, res: Response) {
	try {
		const {userId} = (req as RequestWithIdentity<ITokenPayload>).identity;

		const result = await notifications.geAllById(userId);
		if (result) {
			return res.send({success: true, data: result});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, error: msgs.generic500});
	}
	return res.status(500).send({success: false});
}

async function updateNotification(req: Request, res: Response) {
	try {
		const {id} = req.params;

		if (id == null || id === "") {
			return res.status(400).send({success: false, error: msgs.generic400});
		}
		const result = await notifications.updateNotification(id);
		if (result) {
			return res.send({success: true});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, error: msgs.generic500});
	}
	return res.status(500).send({success: false});
}

async function deleteNotification(req: Request, res: Response) {
	try {
		const {id} = req.params;

		if (id == null || id === "") {
			return res.status(400).send({success: false, error: msgs.generic400});
		}
		const result = await notifications.deleteNotification(id);
		if (result) {
			return res.send({success: true});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, error: msgs.generic500});
	}
	return res.status(500).send({success: false});
}

export default {
	getAll,
	getUserNotifications,
	updateNotification,
	deleteNotification,
};
