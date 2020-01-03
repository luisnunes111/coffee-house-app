import React from "react";
import {RouteComponentProps} from "react-router-dom";

export enum UserRole {
	Employee = "employee",
	Manager = "manager",
}

export interface IRegisterFormValues {
	email: string;
	name: string;
	password: string;
	role: UserRole;
}

const RegisterPage: React.FC<RouteComponentProps> = React.memo(_ => {
	return <div></div>;
});

export default RegisterPage;
