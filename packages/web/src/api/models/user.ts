import {APIClient} from "..";
import {ILoginFormValues} from "../../pages/Login";
import {IRegisterFormValues} from "../../pages/Register";

/**
 * Login user
 */
const login = async (data: ILoginFormValues): Promise<Utils.ApiResponse<Models.ILogin>> => {
	return await APIClient.request<Models.ILogin>("/login", {method: "post", data: data});
};

/**
 * Register user
 */
const register = async (data: IRegisterFormValues): Promise<Utils.ApiResponse<null>> => {
	return await APIClient.request<null>("/register", {method: "post", data: data});
};

/**
 * Logout user
 */
const logout = async (): Promise<Utils.ApiResponse<null>> => {
	return await APIClient.request<null>("/logout", {method: "post"});
};

export default {
	login,
	register,
	logout,
};
