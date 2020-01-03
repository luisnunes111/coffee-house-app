import React, {useCallback, useState} from "react";
import {RouteComponentProps, Link} from "react-router-dom";
import {FormikProps, FormikErrors, withFormik} from "formik";
import {Form, Input, Icon, Button, Typography, Alert, Select, message} from "antd";
import validationSchema, {UserRole} from "../utils/validations/register";
import API from "../api";

const FormItem = Form.Item;
const {Option} = Select;

export interface IRegisterFormValues {
	email: string;
	name: string;
	password: string;
	role: UserRole;
}

const RegisterPage: React.FC<RouteComponentProps> = React.memo(props => {
	const [error, setError] = useState();

	const _onSubmit = useCallback(async (values: IRegisterFormValues) => {
		console.log("values", values);

		const result = await API.user.register(values);
		if (result.success) {
			message.success("Register completed");
			props.history.push("/");
		} else {
			message.info(result.error);
			setError(result.error);
		}

		return null;
	}, []);

	return (
		<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
			<div style={{width: 400}}>
				<Typography.Title level={2} style={{paddingTop: 15}}>
					Register
				</Typography.Title>
				<div style={{marginBottom: 35, paddingTop: 0}}>
					<Typography.Text style={{fontSize: "1rem"}}>
						<Link to="/">Back to login</Link>
					</Typography.Text>
				</div>

				{error && <Alert key={error} message="Error" description={error} type="error" style={{marginBottom: 20}} />}
				<RegisterForm submit={_onSubmit} />
			</div>
		</div>
	);
});

export default RegisterPage;

interface IRegisterProps {
	submit: (values: IRegisterFormValues) => Promise<FormikErrors<IRegisterFormValues> | null>;
}

const _RegisterForm: React.FC<FormikProps<IRegisterFormValues> & IRegisterProps> = React.memo(props => {
	const {values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue} = props;

	return (
		<form style={{margin: "auto", width: 400}} onSubmit={handleSubmit}>
			<FormItem
				help={touched.email && errors.email ? errors.email : ""}
				validateStatus={touched.email && errors.email ? "error" : undefined}>
				<Input name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
			</FormItem>

			<FormItem
				help={touched.name && errors.name ? errors.name : ""}
				validateStatus={touched.name && errors.name ? "error" : undefined}>
				<Input name="name" placeholder="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
			</FormItem>

			<FormItem
				help={touched.password && errors.password ? errors.password : ""}
				validateStatus={touched.password && errors.password ? "error" : undefined}>
				<Input
					name="password"
					type="password"
					placeholder="Password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</FormItem>

			<FormItem
				label="Role"
				help={touched.role && errors.role ? errors.role : ""}
				validateStatus={touched.role && errors.role ? "error" : undefined}>
				<Select
					value={values.role as any}
					style={{width: 120}}
					onChange={(value: number) => {
						setFieldValue("role", value);
					}}>
					<Option value={UserRole.Employee}>{UserRole.Employee}</Option>
					<Option value={UserRole.Manager}>{UserRole.Manager}</Option>
				</Select>
			</FormItem>

			<FormItem>
				<Button type="primary" htmlType="submit" disabled={false}>
					Register
				</Button>
			</FormItem>
		</form>
	);
});

const RegisterForm = withFormik<IRegisterProps, IRegisterFormValues>({
	validationSchema,
	validateOnChange: true,
	handleSubmit: async (values, {props, setErrors}) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		}
	},
})(_RegisterForm);
