import React from 'react';
import Select from './Select';

const FilterArea = ({}) => (
	<div className='mt-[40px] h-auto bg-neutral-100 rounded-lg shadow-md'>
		<div className='flex mx-[30px] py-[15px] border-b-2'>
			<div className='w-[10%] text-sm'>城市</div>
			<div className='w-[90%]'>
				<select
					id='underline_select'
					className='block px-0 ml-1 w-[100px] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
				>
					<option selected>選擇城市</option>
					<option value='US'>台北市</option>
					<option value='CA'>基隆市</option>
					<option value='FR'>新北市</option>
					<option value='DE'>新竹市</option>
					<option value='DE'>新竹縣</option>
					<option value='DE'>桃園市</option>
					<option value='DE'>宜蘭縣</option>
					<option value='DE'>臺中市</option>
					<option value='DE'>苗栗縣</option>
					<option value='DE'>彰化縣</option>
					<option value='DE'>南投縣</option>
					<option value='DE'>雲林縣</option>
					<option value='DE'>高雄市</option>
					<option value='DE'>臺南市</option>
					<option value='DE'>嘉義市</option>
					<option value='DE'>嘉義縣</option>
					<option value='DE'>屏東縣</option>
					<option value='DE'>澎湖縣</option>
					<option value='DE'>花蓮縣</option>
					<option value='DE'>臺東縣</option>
				</select>
			</div>
		</div>
		<div className='flex mx-[30px] py-[15px] border-b-2'>
			<div className='w-[10%] text-sm'>地區</div>
			<div className='w-[90%] flex flex-wrap'>
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
				<Select title={'台北市'} />
			</div>
		</div>
		<div className='flex px-[30px] py-[15px]'>
			<div className='w-[10%] text-sm'>條件</div>
			<div className='w-[90%] flex flex-wrap'>
				<Select title={'有插座'} />
				<Select title={'有WIFI'} />
				<Select title={'無限時'} />
			</div>
		</div>
	</div>
);

export default FilterArea;
