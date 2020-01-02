import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import {ITokenPayload} from "../../services/auth";

export interface RequestWithIdentity<T = ITokenPayload> extends Request {
	identity: T;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers["authorization"];

	if (!authorization) {
		res.status(401);
		res.end();
		return;
	}

	try {
		const token = authorization.split(" ")[1];
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

		(req as RequestWithIdentity<ITokenPayload>).identity = payload as ITokenPayload;
	} catch (err) {
		console.log(err);
		res.status(401);
		res.end();
	}

	return next();
};
