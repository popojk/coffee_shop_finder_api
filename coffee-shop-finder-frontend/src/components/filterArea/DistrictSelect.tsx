import { cityState } from '@/states';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
	title: string;
	addDistrict: (newDistrict: string) => void;
	removeDistrict: (districtToRemove: string) => void;
};
const DistrictSelect = ({ title, addDistrict, removeDistrict }: Props) => {
	const [isChecked, setIsChecked] = useState(false);
	const [city, setCity] = useRecoilState<string>(cityState);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
	};

	useEffect(() => {
		if (isChecked) {
			addDistrict(title);
		} else {
			removeDistrict(title);
		}
	}, [isChecked]);

	useEffect(() => {
		setIsChecked(false);
	}, [city]);

	return (
		<div className='flex items-center mb-4 mx-1.5'>
			<input
				id='default-checkbox'
				type='checkbox'
				checked={isChecked}
				onChange={handleCheckboxChange}
				className='w-4 h-4'
			/>
			<label className='ms-2 text-sm font-medium text-gray-900'>{title}</label>
		</div>
	);
};

export default DistrictSelect;
