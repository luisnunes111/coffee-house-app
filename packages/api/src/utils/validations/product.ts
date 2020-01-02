import * as yup from "yup";

export default yup.object().shape({
	name: yup
		.string()
		.min(3)
		.max(200)
		.required(),
	description: yup.string(),
	quantity: yup.number().required(),
	type: yup.number().required(),
});
