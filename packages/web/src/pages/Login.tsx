import React, {useCallback} from "react";
import {RouteProps} from "react-router-dom";
import {Form, Icon, Input, Button} from "antd";
import {withFormik, FormikErrors, FormikProps} from "formik";
import validationSchema from "../utils/validations/login";

const FormItem = Form.Item;

const LoginPage: React.FC<RouteProps> = React.memo(props => {
	const onSubmit = useCallback(async (values: IFormValues) => {
		console.log(values);
		return null;
	}, []);

	return (
		<div style={{display: "flex"}}>
			<LoginForm submit={onSubmit} />
		</div>
	);
});

export default LoginPage;

interface ILoginProps {
	submit: (values: IFormValues) => Promise<FormikErrors<IFormValues> | null>;
}

interface IFormValues {
	email: string;
	password: string;
}
const _LoginForm: React.FC<FormikProps<IFormValues> & ILoginProps> = React.memo(props => {
	const {values, handleChange, handleBlur, handleSubmit, touched, errors} = props;

	return (
		<form style={{margin: "auto", width: 400}} onSubmit={handleSubmit}>
			<FormItem
				help={touched.email && errors.email ? errors.email : ""}
				validateStatus={touched.email && errors.email ? "error" : undefined}>
				<Input
					name="email"
					prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
					placeholder="Email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</FormItem>
			<FormItem
				help={touched.password && errors.password ? errors.password : ""}
				validateStatus={touched.password && errors.password ? "error" : undefined}>
				<Input
					name="password"
					prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
					type="password"
					placeholder="Password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</FormItem>
			<FormItem>
				<Button type="primary" htmlType="submit" disabled={false}>
					Log in
				</Button>
			</FormItem>
		</form>
	);
});

const LoginForm = withFormik<ILoginProps, IFormValues>({
	validationSchema,
	mapPropsToValues: () => ({email: "", password: ""}),
	handleSubmit: async (values, {props, setErrors}) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		}
	},
})(_LoginForm);
