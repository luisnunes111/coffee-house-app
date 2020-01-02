import {UserRole} from "../../../entity/User";

export interface IUserRegisterRequest {
	email: string;
	name: string;
	password: string;
	role: UserRole;
}

export interface IUserLoginRequest {
	email: string;
	password: string;
}
