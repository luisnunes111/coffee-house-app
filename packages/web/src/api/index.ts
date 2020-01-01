import products from "./models/products";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const API = {
	products: products,
};
export default API;

class APIManager {
	private _client: AxiosInstance;

	constructor() {
		this._client = axios.create({
			method: "GET",
			baseURL: process.env.REACT_APP_API_URL,
			headers: {
				Accept: "application/json",
			},
		} as AxiosRequestConfig);
	}

	request = <T>(endpoint: string, config?: AxiosRequestConfig) => {
		const finalUrl = this._client.defaults.baseURL + endpoint;

		return new Promise((resolve, _) => {
			return this._client
				.request({...config, baseURL: finalUrl})
				.then(response => resolve(response.data))
				.catch(error => {
					console.log(error);
					if (error.response) {
						resolve(error.response.data);
					} else {
						resolve({success: false, error: "Application error"});
					}
				});
		}) as Promise<Utils.ApiResponse<T>>;
	};

	addAuthHeader = (token: string) => {
		this._client.defaults.headers.common.Authorization = "Bearer " + token;
	};

	removeAuthHeader = () => {
		delete this._client.defaults.headers.common.Authorization;
	};
}

export const APIClient = new APIManager();
