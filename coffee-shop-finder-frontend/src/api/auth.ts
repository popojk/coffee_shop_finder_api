import axios, { AxiosInstance, isAxiosError } from 'axios';

export default class AuthAPI {
	private baseURL = 'http://localhost:8000/api/users';
	private instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: this.baseURL,
		});
	}

	async login(username: string, password: string) {
		try {
			const requestBody = {
				username,
				password,
			};
			const response = await this.instance.post('/login', requestBody);
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async register(username: string, password: string) {
		try {
			const requestBody = {
				username,
				password,
			};
			const response = await this.instance.post('', requestBody);
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}
