import * as yup from "yup";
import validationMsgs from "./messages";

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
});
