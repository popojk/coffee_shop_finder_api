const { atom, selector } = require('recoil');

export const keyWordState = atom({
	key: 'keyWord',
	default: '',
});

export const cityState = atom({
	key: 'city',
	default: '',
});

export const districtState = atom({
	key: 'district',
	default: [],
});

export const hasWifiState = atom({
	key: 'hasWifi',
	default: false,
});

export const hasSocketState = atom({
	key: 'hasSocket',
	default: false,
});

export const hasNoLimitedTimeState = atom({
	key: 'hasNoLimitedTime',
	default: false,
});

export const resultListState = atom({
	key: 'resultList',
	default: [],
});

export const userState = atom({
	key: 'user',
	default: null,
});
