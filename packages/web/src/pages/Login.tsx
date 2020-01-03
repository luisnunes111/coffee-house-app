import React, {useCallback, useEffect} from "react";
import {RouteComponentProps, Link} from "react-router-dom";
import {Form, Icon, Input, Button, Alert, Typography} from "antd";
import {withFormik, FormikErrors, FormikProps} from "formik";
import validationSchema from "../utils/validations/login";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../store/user/actions";
import {store} from "../App";
import {AppState} from "../configurations/redux";

const FormItem = Form.Item;

const LoginPage: React.FC<RouteComponentProps> = React.memo(props => {
	const dispatch = useDispatch();
	const {data, error} = useSelector((app: AppState) => app.user);

	useEffect(() => {
		if (data != null) {
			props.history.push("/products");
		}
	}, [data]);

	const _onSubmit = useCallback(async (values: ILoginFormValues) => {
		dispatch(loginAction(values));

		return null;
	}, []);

	return (
		<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
			<div style={{width: 400}}>
				<Typography.Title level={2} style={{paddingTop: 15}}>
					Login
				</Typography.Title>
				<div style={{marginBottom: 35, paddingTop: 0}}>
					<Typography.Text style={{fontSize: "1.1rem"}}>
						Don't have an account?{" "}
						<Link to="/register" style={{textDecoration: "underline", color: "cyan"}}>
							Register
						</Link>
					</Typography.Text>
				</div>

				{error && <Alert key={error} message="Error" description={error} type="error" style={{marginBottom: 20}} />}
				<LoginForm submit={_onSubmit} />
			</div>
		</div>
	);
});

export default LoginPage;

interface ILoginProps {
	submit: (values: ILoginFormValues) => Promise<FormikErrors<ILoginFormValues> | null>;
}

export interface ILoginFormValues {
	email: string;
	password: string;
}

const _LoginForm: React.FC<FormikProps<ILoginFormValues> & ILoginProps> = React.memo(props => {
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

const LoginForm = withFormik<ILoginProps, ILoginFormValues>({
	validationSchema,
	mapPropsToValues: () => ({email: "user1@a.a", password: "password"}),
	handleSubmit: async (values, {props, setErrors}) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		}
	},
})(_LoginForm);
