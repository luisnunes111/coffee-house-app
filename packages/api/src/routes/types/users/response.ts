export interface ILoginResponse {
	accessToken: string;
	user: IUserLogin;
}

export interface IUserLogin {
	id: string;
	name: string;
	email: string;
	role: string;
}
