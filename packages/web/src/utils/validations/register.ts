import * as yup from "yup";
import validationMsgs from "./messages";

export enum UserRole {
	Employee = "employee",
	Manager = "manager",
}

export default yup.object().shape({
	email: yup
		.string()
		.min(3, validationMsgs.emailNotLongEnough)
		.max(255)
		.email(validationMsgs.invalidEmail)
		.required(),
	password: yup
		.string()
		.min(3, validationMsgs.passwordNotLongEnough)
		.max(255)
		.required(),
	name: yup
		.string()
		.min(3, validationMsgs.nameNotLongEnough)
		.max(150)
		.required(),
	role: yup
		.string()
		.oneOf([UserRole.Employee, UserRole.Manager])
		.required(),
});
