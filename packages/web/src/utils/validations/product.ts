import * as yup from "yup";
import validationMsgs from "./messages";

export default yup.object().shape({
	name: yup
		.string()
		.min(3, validationMsgs.productNameNotLongEnough)
		.max(200)
		.required(),
	description: yup.string(),
	quantity: yup.number().required(),
	type: yup.number().required(),
});
