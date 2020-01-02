import {Request, Response} from "express";
import userValidation from "../../utils/validations/user";
import userRepository from "../repositories/users";
import {IUserLoginRequest, IUserRegisterRequest} from "../types/users/request";
import {msgs} from "../../utils/responseMsgs";
import {setRefreshToken, createRefreshToken, createAccessToken} from "../../services/auth";
import {ILoginResponse, IUserLogin} from "../types/users/response";

async function login(req: Request, res: Response) {
	try {
		let isModelValid = await userValidation.login.isValid(req.body as IUserLoginRequest);

		if (!isModelValid) {
			res.status(400).send({success: false, error: msgs.generic400});
			return;
		}

		const dbResult = await userRepository.login(req.body as IUserLoginRequest);

		if (!dbResult.success) {
			res.status(dbResult.status!).send({success: dbResult.success, error: dbResult.msg});
			return;
		}
		const user: IUserLogin = {id: dbResult.data!.id, name: dbResult.data!.name, email: dbResult.data!.email, role: dbResult.data!.role};
		setRefreshToken(res, createRefreshToken(dbResult.data!));

		const response: ILoginResponse = {
			accessToken: createAccessToken(user),
			user,
		};
		res.send({success: true, data: response});
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function register(req: Request, res: Response) {
	try {
		let isModelValid = await userValidation.register.isValid(req.body as IUserLoginRequest);

		if (!isModelValid) {
			res.status(400).send({success: false, error: msgs.generic400});
			return;
		}

		const repoResult = await userRepository.register(req.body as IUserRegisterRequest);
		if (!repoResult.success) {
			res.status(repoResult.status!).send({success: repoResult.success, error: repoResult.msg});
			return;
		}
		res.send({success: true});
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function logout(req: Request, res: Response) {
	try {
		setRefreshToken(res, "");
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

export default {
	login,
	register,
	logout,
};
