import * as yup from "yup";

export default yup.object().shape({
	name: yup
		.string()
		.required()
		.max(200),
	description: yup.string(),
	quantity: yup.number().required(),
	type: yup.number().required(),
});
