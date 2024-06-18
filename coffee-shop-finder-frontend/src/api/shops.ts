import axios, { AxiosInstance, isAxiosError } from 'axios';

export default class ShopsAPI {
	private baseURL = 'http://localhost:8000/api/shops';
	private instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: this.baseURL,
		});
	}

	async getShops(
		keyWord: string,
		city: string,
		district: string[],
		hasSocket: boolean,
		hasWifi: boolean,
		hasNoLimitedTime: boolean,
		page: number,
		pageSize: number
	) {
		let districtString = '';
		if (district.length > 0) {
			for (let i = 0; i < district.length; i++) {
				districtString += `&district=${district[i]}`;
			}
		} else {
			districtString = '&district=';
		}
		let queryString = `/fuzzy?keyWord=${keyWord}&city=${city}${districtString}&hasSocket=${hasSocket}&hasWifi=${hasWifi}&hasNoLimitedTime=${hasNoLimitedTime}&page=${page}&page_size=${pageSize}`;
		const response = await this.instance.get(queryString);
		return response;
	}

	async getShopById(shopId: string) {
		const response = await this.instance.get('/detail', {
			params: {
				shop_id: shopId,
			},
		});
		return response;
	}
}
