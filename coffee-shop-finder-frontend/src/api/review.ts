import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios';

export default class ReviewAPI {
	private baseURL = 'http://localhost:8000/api/reviews';
	private instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: this.baseURL,
		});
	}

	async postReview(reviewText: string, userId: number, shopId: string, token: string) {
		const requestBody = {
			rating: 5,
			content: reviewText,
			userId,
			shopId
		}
		const response = await this.instance.post('', requestBody, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response;
	}

}