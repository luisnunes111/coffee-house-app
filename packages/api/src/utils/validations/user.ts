import * as yup from "yup";
import {msgs} from "../responseMsgs";
import {UserRole} from "./../../entity/User";

const login = yup.object().shape({
	email: yup
		.string()
		.max(255)
		.email(msgs.emailInvalid)
		.required(),
	password: yup
		.string()
		.max(255)
		.required(),
});

const register = yup.object().shape({
	email: yup
		.string()
		.max(255)
		.email(msgs.emailInvalid)
		.required(),
	password: yup
		.string()
		.max(255)
		.required(),
	name: yup
		.string()
		.min(3)
		.max(150)
		.required(),
	role: yup
		.string()
		.oneOf([UserRole.Employee, UserRole.Manager])
		.required(),
});

export default {
	login,
	register,
};
