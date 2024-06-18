import React, { useState, useEffect } from 'react';
import DistrictSelect from './DistrictSelect';
import ConditionSelect from './ConditionSelect';
import { useRecoilState } from 'recoil';
import {
	keyWordState,
	cityState,
	districtState,
	hasWifiState,
	hasSocketState,
	hasNoLimitedTimeState,
} from '@/states';

interface DistrictData {
	[key: string]: string[];
}

const FilterArea = () => {
	const [districtMap, setDistrictMap] = useState<DistrictData | null>(null);
	const [cities, setCities] = useState<string[]>([]);

	const [keyWord, setKeyWord] = useRecoilState<string>(keyWordState);
	const [city, setCity] = useRecoilState<string>(cityState);
	const [districtList, setDistrictList] = useRecoilState<string[]>(districtState);
	const [hasWifi, setHasWifi] = useRecoilState<boolean>(hasWifiState);
	const [hasSocket, setHasSocket] = useRecoilState<boolean>(hasSocketState);
	const [hasNoLimitedTime, setHasNoLimitedTime] = useRecoilState<boolean>(hasNoLimitedTimeState);

	useEffect(() => {
		// fetch district data
		fetch('./district.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				setDistrictMap(data);
				setCities(Object.keys(data));
			})
			.catch((error) => console.log('Error loading JSON', error));
	}, []);

	const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDistrictList([]);
		setHasWifi(false);
		setHasSocket(false);
		setHasNoLimitedTime(false);
		setCity(event.target.value);
	};

	const addDistrict = (newDistrict: string) => {
		setDistrictList((prevDistrict) => [...prevDistrict, newDistrict]);
	};

	const removeDistrict = (districtToRemove: string) => {
		setDistrictList((prevDistrict) =>
			prevDistrict.filter((district) => district !== districtToRemove)
		);
	};

	return (
		<div className='mt-[20px] h-auto bg-neutral-100 rounded-lg shadow-md'>
			<div className='flex mx-[30px] py-[15px] border-b-2'>
				<div className='w-[10%] text-sm'>城市</div>
				<div className='w-[90%]'>
					<select
						id='underline_select'
						className='block px-0 ml-1 w-[100px] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
						onChange={handleCityChange}
					>
						<option value=''>{'選擇城市'}</option>
						{cities.map((city: string) => (
							<option value={city}>{city}</option>
						))}
					</select>
				</div>
			</div>
			{city !== '' && (
				<div className='flex mx-[30px] py-[15px] border-b-2'>
					<div className='w-[10%] text-sm'>地區</div>
					<div className='w-[90%] flex flex-wrap'>
						{districtMap &&
							districtMap[city] &&
							districtMap[city].map((district: string) => {
								return (
									<DistrictSelect
										title={district}
										addDistrict={addDistrict}
										removeDistrict={removeDistrict}
									/>
								);
							})}
					</div>
				</div>
			)}
			<div className='flex px-[30px] py-[15px]'>
				<div className='w-[10%] text-sm'>條件</div>
				<div className='w-[90%] flex flex-wrap'>
					<ConditionSelect
						title={'有插座'}
						isChecked={hasSocket}
						changeCondition={(hasSockeet) => {
							setHasSocket(!hasSocket);
						}}
					/>
					<ConditionSelect
						title={'有WIFI'}
						isChecked={hasWifi}
						changeCondition={(hasWifi) => {
							setHasWifi(!hasWifi);
						}}
					/>
					<ConditionSelect
						title={'無限時'}
						isChecked={hasNoLimitedTime}
						changeCondition={(hasNoLimitedTime) => {
							setHasNoLimitedTime(!hasNoLimitedTime);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default FilterArea;
