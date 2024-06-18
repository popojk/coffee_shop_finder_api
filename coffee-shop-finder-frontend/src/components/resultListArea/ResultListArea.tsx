import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { useRecoilState } from 'recoil';
import {
	keyWordState,
	cityState,
	districtState,
	hasWifiState,
	hasSocketState,
	hasNoLimitedTimeState,
	resultListState,
} from '@/states';
import ShopsAPI from '@/api/shops';

type Shop = {
	id: string;
	name: string;
	address: string;
	rating: number;
	hasWifi: boolean;
	hasSocket: boolean;
	hasNolimitedTime: boolean
};

const ResultListArea = ({}) => {
	const [keyWord, setKeyWord] = useRecoilState<string>(keyWordState);
	const [city, setCity] = useRecoilState<string>(cityState);
	const [districtList, setDistrictList] = useRecoilState<string[]>(districtState);
	const [hasWifi, setHasWifi] = useRecoilState<boolean>(hasWifiState);
	const [hasSocket, setHasSocket] = useRecoilState<boolean>(hasSocketState);
	const [hasNoLimitedTime, setHasNoLimitedTime] = useRecoilState<boolean>(hasNoLimitedTimeState);
	const [resultList, setResultList] = useRecoilState<Shop[]>(resultListState);

	useEffect(() => {
		try {
			const shopAPI = new ShopsAPI();
			let response = shopAPI
				.getShops(keyWord, city, districtList, hasSocket, hasWifi, hasNoLimitedTime, 1, 10)
				.then((response) => {
					if (response.status === 200) {
						setResultList(response.data);
					}
				})
				.catch((err) => {
					setResultList([])
				});
		} catch (err) {
			console.log(err);
		}
	}, [keyWord, city, districtList, hasWifi, hasSocket, hasNoLimitedTime]);

	return (
		<div className='mt-[20px] h-[50%] min-h-[200px] max-h-[45vh] bg-neutral-100 rounded-lg shadow-md overflow-y-auto'>
			{resultList.length > 0 ?
				resultList.map((shop: Shop) => {
					return (
						<ListItem
							id={shop.id}
							name={shop.name}
							address={shop.address}
							rating={shop.rating}
							hasSocket={shop.hasSocket}
							hasWifi={shop.hasWifi}
							hasNoLimitedTime={shop.hasNolimitedTime}
							isLiked={false}
							reviewCount={shop.rating}
						/>
					);
				})
			:
			<div className='ml-2 mt-1'>沒有符合條件的咖啡廳喔😓</div>
			}
		</div>
	);
};

export default ResultListArea;
