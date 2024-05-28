import React from 'react';

type Props = {
	title: string;
};
const Select = ({ title }: Props) => (
	<div className='flex items-center mb-4 mx-1.5'>
		<input id='default-checkbox' type='checkbox' value='' className='w-4 h-4' />
		<label className='ms-2 text-sm font-medium text-gray-900'>{title}</label>
	</div>
);

export default Select;
