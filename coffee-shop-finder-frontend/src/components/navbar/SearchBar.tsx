import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import ShopsAPI from '@/api/shops';
import {
	keyWordState,
	cityState,
	districtState,
	hasWifiState,
	hasSocketState,
	hasNoLimitedTimeState,
	resultListState,
} from '@/states';

type Shop = {
	id: string;
	name: string;
	address: string;
	rating: number;
	hasWifi: boolean;
	hasSocket: boolean;
	hasNoLimitedTime: boolean;
};

const SearchBar = ({}) => {
	const [keyWord, setKeyWord] = useRecoilState<string>(keyWordState);
	const [city, setCity] = useRecoilState<string>(cityState);
	const [districtList, setDistrictList] = useRecoilState<string[]>(districtState);
	const [hasWifi, setHasWifi] = useRecoilState<boolean>(hasWifiState);
	const [hasSocket, setHasSocket] = useRecoilState<boolean>(hasSocketState);
	const [hasNoLimitedTime, setHasNoLimitedTime] = useRecoilState<boolean>(hasNoLimitedTimeState);

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyWord(event.target.value);
		setCity('');
		setDistrictList([]);
		setHasWifi(false);
		setHasSocket(false);
		setHasNoLimitedTime(false);
	};

	return (
		<form className='mt-5'>
			<label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
				搜尋
			</label>
			<div className='relative w-auto'>
				<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
					<svg
						className='w-4 h-4 text-gray-500 dark:text-gray-400'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 20 20'
					>
						<path
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
						/>
					</svg>
				</div>
				<input
					type='search'
					id='default-search'
					className='block h-[50px] w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500'
					placeholder='搜尋你喜歡的咖啡廳吧!'
					onChange={handleChange}
					required
				/>
				{/* <button
					type='submit'
					className='text-white absolute end-2.5 bottom-1 top-1 bg-[#D1590B] hover:bg-[#F18741] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
					// onClick={handleOnClick}
				>
					搜尋
				</button> */}
			</div>
		</form>
	);
};

export default SearchBar;
