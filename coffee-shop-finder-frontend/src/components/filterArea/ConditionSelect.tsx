import React, { useState } from 'react';

type Props = {
	title: string;
	isChecked: boolean;
	changeCondition: (condition: boolean) => void;
};
const ConditionSelect = ({ title, isChecked, changeCondition }: Props) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		changeCondition(isChecked);
	};

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

export default ConditionSelect;
