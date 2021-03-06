import {sign} from "jsonwebtoken";
import {User} from "../entity/User";
import {Response} from "express";
import {IUserLogin} from "../routes/types/users/response";

export interface ITokenPayload {
	userId: string;
	iat: number;
	exp: number;
}

export interface IRefreshTokenPayload extends ITokenPayload {
	tokenVersion: number;
}

export const createAccessToken = (user: IUserLogin) =>
	sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "10h",
	});

export const createRefreshToken = (user: User) => {
	return sign({userId: user.id, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: "7d",
	});
};

export const setRefreshToken = (res: Response, token: string) => {
	res.cookie("jid", token, {
		httpOnly: true,
		path: "/refresh_token",
	});
};
